import { randomUUID } from 'node:crypto';
import { getMongoDb } from '../db/mongo.mjs';
import { createMagicToken, hashMagicToken } from './auth.mjs';
import { toPublicConsultation } from '../scentStudio/state.mjs';

const CUSTOMERS = 'customers';
const MAGIC_LINKS = 'magicLinks';
const CONSULTATIONS = 'scentConsultations';
const SAMPLING = 'samplingSessions';

let indexesEnsured = false;

export async function ensureAccountIndexes() {
  if (indexesEnsured) return;
  const db = await getMongoDb();
  await db.collection(CUSTOMERS).createIndexes([
    { key: { userId: 1 }, unique: true, name: 'uniq_userId' },
    { key: { email: 1 }, unique: true, name: 'uniq_email' },
  ]);
  await db.collection(MAGIC_LINKS).createIndexes([
    { key: { tokenHash: 1 }, unique: true, name: 'uniq_tokenHash' },
    { key: { expiresAt: 1 }, expireAfterSeconds: 0, name: 'ttl_expiresAt' },
  ]);
  await db.collection(CONSULTATIONS).createIndexes([
    { key: { userId: 1, updatedAt: -1 }, name: 'idx_userId_updatedAt' },
    { key: { 'state.contact.email': 1 }, name: 'idx_contact_email' },
  ]);
  await db.collection(SAMPLING).createIndexes([
    { key: { userId: 1, updatedAt: -1 }, name: 'idx_sampling_userId_updatedAt' },
  ]);
  indexesEnsured = true;
}

function normalizeEmail(email) {
  return String(email || '')
    .trim()
    .toLowerCase();
}

export async function getCustomerById(userId) {
  if (!userId) return null;
  const db = await getMongoDb();
  return db.collection(CUSTOMERS).findOne({ userId: String(userId) });
}

export async function getCustomerByEmail(email) {
  const normalized = normalizeEmail(email);
  if (!normalized) return null;
  const db = await getMongoDb();
  return db.collection(CUSTOMERS).findOne({ email: normalized });
}

export async function upsertCustomerByEmail(email, { fullName } = {}) {
  await ensureAccountIndexes();
  const normalized = normalizeEmail(email);
  if (!normalized || !normalized.includes('@')) {
    throw new Error('A valid email is required');
  }
  const db = await getMongoDb();
  const existing = await db.collection(CUSTOMERS).findOne({ email: normalized });
  const now = new Date();
  if (existing) {
    const patch = { updatedAt: now, lastLoginAt: now };
    if (fullName && !existing.fullName) patch.fullName = String(fullName).trim();
    await db.collection(CUSTOMERS).updateOne({ userId: existing.userId }, { $set: patch });
    return { ...existing, ...patch };
  }

  const doc = {
    userId: randomUUID(),
    email: normalized,
    fullName: fullName ? String(fullName).trim() : null,
    createdAt: now,
    updatedAt: now,
    lastLoginAt: now,
  };
  await db.collection(CUSTOMERS).insertOne(doc);
  return doc;
}

export async function createMagicLink({ email, nextPath = '/' }) {
  await ensureAccountIndexes();
  const normalized = normalizeEmail(email);
  if (!normalized || !normalized.includes('@')) {
    throw new Error('A valid email is required');
  }

  const token = createMagicToken();
  const tokenHash = hashMagicToken(token);
  const now = new Date();
  const expiresAt = new Date(now.getTime() + 30 * 60 * 1000); // 30 minutes
  const db = await getMongoDb();

  // Invalidate prior unused links for this email
  await db.collection(MAGIC_LINKS).deleteMany({ email: normalized, usedAt: null });

  await db.collection(MAGIC_LINKS).insertOne({
    tokenHash,
    email: normalized,
    nextPath: sanitizeNextPath(nextPath),
    createdAt: now,
    expiresAt,
    usedAt: null,
  });

  return { token, email: normalized, expiresAt, nextPath: sanitizeNextPath(nextPath) };
}

export async function consumeMagicLink(token) {
  await ensureAccountIndexes();
  if (!token) return null;
  const tokenHash = hashMagicToken(token);
  const db = await getMongoDb();
  const doc = await db.collection(MAGIC_LINKS).findOne({ tokenHash });
  if (!doc) return null;
  if (doc.usedAt) return null;
  if (doc.expiresAt && new Date(doc.expiresAt).getTime() < Date.now()) return null;

  await db.collection(MAGIC_LINKS).updateOne(
    { tokenHash },
    { $set: { usedAt: new Date() } },
  );

  const customer = await upsertCustomerByEmail(doc.email);
  await claimResourcesForCustomer(customer);

  return {
    customer,
    nextPath: sanitizeNextPath(doc.nextPath),
  };
}

function sanitizeNextPath(nextPath) {
  const raw = String(nextPath || '/').trim();
  if (!raw.startsWith('/') || raw.startsWith('//')) return '/';
  // Only allow in-app experience paths
  if (
    raw.startsWith('/create-a-scent') ||
    raw.startsWith('/curated-sampling') ||
    raw.startsWith('/account')
  ) {
    return raw.slice(0, 240);
  }
  return '/';
}

/**
 * Attach existing Mongo docs that already carry this email to the customer account.
 */
export async function claimResourcesForCustomer(customer) {
  if (!customer?.userId || !customer?.email) return { consultations: 0, sampling: 0 };
  const db = await getMongoDb();
  const email = normalizeEmail(customer.email);

  const consultResult = await db.collection(CONSULTATIONS).updateMany(
    {
      $or: [{ userId: null }, { userId: { $exists: false } }],
      'state.contact.email': email,
    },
    { $set: { userId: customer.userId, updatedAt: new Date() } },
  );

  const samplingResult = await db.collection(SAMPLING).updateMany(
    {
      $or: [{ userId: null }, { userId: { $exists: false } }],
      'lead.email': email,
    },
    { $set: { userId: customer.userId, updatedAt: new Date() } },
  );

  return {
    consultations: consultResult.modifiedCount || 0,
    sampling: samplingResult.modifiedCount || 0,
  };
}

/**
 * Claim local browser sessions (recovery tokens / sampling session ids) onto the account.
 */
export async function claimLocalArtifacts(customer, { consultations = [], samplingSessionIds = [] } = {}) {
  if (!customer?.userId) return { consultations: 0, sampling: 0 };
  const db = await getMongoDb();
  let consultCount = 0;
  let samplingCount = 0;

  for (const item of consultations) {
    const consultationId = String(item?.consultationId || '').trim();
    const recoveryToken = String(item?.recoveryToken || '').trim();
    if (!consultationId || !recoveryToken) continue;
    const result = await db.collection(CONSULTATIONS).updateOne(
      { consultationId, recoveryToken },
      {
        $set: {
          userId: customer.userId,
          updatedAt: new Date(),
        },
      },
    );
    if (result.matchedCount) {
      // Ensure contact email is set for resume discovery without wiping other contact fields
      const doc = await db.collection(CONSULTATIONS).findOne({ consultationId });
      if (doc && !doc.state?.contact?.email && customer.email) {
        const contactPatch = {
          'state.contact.email': customer.email,
        };
        if (customer.fullName && !doc.state?.contact?.fullName) {
          contactPatch['state.contact.fullName'] = customer.fullName;
        }
        await db.collection(CONSULTATIONS).updateOne({ consultationId }, { $set: contactPatch });
      }
      consultCount += 1;
    }
  }

  for (const sessionId of samplingSessionIds) {
    const id = String(sessionId || '').trim();
    if (!id) continue;
    const result = await db.collection(SAMPLING).updateOne(
      { sessionId: id },
      {
        $set: {
          userId: customer.userId,
          updatedAt: new Date(),
          ...(customer.email ? { 'lead.email': customer.email } : {}),
        },
      },
    );
    if (result.matchedCount) samplingCount += 1;
  }

  return { consultations: consultCount, sampling: samplingCount };
}

export async function listCustomerConsultations(userId) {
  if (!userId) return [];
  const db = await getMongoDb();
  const docs = await db
    .collection(CONSULTATIONS)
    .find({ userId: String(userId) })
    .sort({ updatedAt: -1 })
    .limit(40)
    .toArray();

  return docs.map((doc) => {
    const pub = toPublicConsultation(doc);
    return {
      consultationId: pub.consultationId,
      recoveryToken: pub.recoveryToken,
      title: pub.title,
      stage: pub.stage,
      currentStage: pub.currentStage,
      updatedAt: doc.updatedAt,
      createdAt: doc.createdAt,
      submittedAt: pub.submittedAt,
      conceptReady: pub.conceptReady,
      snapshot: pub,
    };
  });
}

export async function listCustomerSamplingSessions(userId) {
  if (!userId) return [];
  const db = await getMongoDb();
  const docs = await db
    .collection(SAMPLING)
    .find({ userId: String(userId) })
    .sort({ updatedAt: -1 })
    .limit(20)
    .toArray();

  return docs.map((doc) => toPublicSamplingSession(doc));
}

export async function getOpenSamplingSessionForCustomer(userId) {
  if (!userId) return null;
  const db = await getMongoDb();
  const doc = await db.collection(SAMPLING).findOne(
    {
      userId: String(userId),
      status: { $nin: ['paid'] },
      'order.sampleOrderNumber': { $exists: false },
      'payment.paidAt': { $exists: false },
    },
    { sort: { updatedAt: -1, createdAt: -1 } },
  );
  return doc ? toPublicSamplingSession(doc) : null;
}

function toPublicSamplingSession(doc) {
  if (!doc) return null;
  return {
    sessionId: doc.sessionId,
    status: doc.status || 'open',
    currentStep: Number(doc.currentStep || 1),
    lead: doc.lead || null,
    answers: doc.answers || {},
    recommendations: doc.recommendations || [],
    selectionSummary: doc.selectionSummary || null,
    completed: doc.status === 'paid' || Boolean(doc.payment?.paidAt),
    updatedAt: doc.updatedAt || doc.createdAt || null,
    createdAt: doc.createdAt || null,
  };
}

export async function attachUserIdToConsultation(consultationId, recoveryToken, userId) {
  if (!consultationId || !recoveryToken || !userId) return false;
  const db = await getMongoDb();
  const result = await db.collection(CONSULTATIONS).updateOne(
    { consultationId: String(consultationId), recoveryToken: String(recoveryToken) },
    { $set: { userId: String(userId), updatedAt: new Date() } },
  );
  return result.matchedCount > 0;
}

export async function attachUserIdToSamplingSession(sessionId, userId, email) {
  if (!sessionId || !userId) return false;
  const db = await getMongoDb();
  const patch = { userId: String(userId), updatedAt: new Date() };
  if (email) patch['lead.email'] = normalizeEmail(email);
  const result = await db.collection(SAMPLING).updateOne({ sessionId: String(sessionId) }, { $set: patch });
  return result.matchedCount > 0;
}
