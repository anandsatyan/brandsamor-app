import { randomBytes, randomUUID } from 'node:crypto';
import { getMongoDb } from '../db/mongo.mjs';
import { createEmptyScentState, toPublicConsultation } from './state.mjs';

const COLLECTION = 'scentConsultations';

function newRecoveryToken() {
  return randomBytes(24).toString('hex');
}

export async function createConsultation() {
  const db = await getMongoDb();
  const consultationId = randomUUID();
  const recoveryToken = newRecoveryToken();
  const now = new Date();
  const state = createEmptyScentState(consultationId);

  const opening = {
    id: randomUUID(),
    role: 'assistant',
    content:
      'Tell me about the fragrance you want to create.\n\nYou can name a perfume you would like to use as inspiration, or describe an idea from scratch.',
    quickReplies: ['Use a fragrance as inspiration', 'Start from scratch'],
    createdAt: now,
  };

  const doc = {
    consultationId,
    recoveryToken,
    state,
    messages: [opening],
    briefVersions: [{ version: 1, state, createdAt: now, reason: 'created' }],
    providerMode: null,
    submittedAt: null,
    samplingProject: null,
    createdAt: now,
    updatedAt: now,
  };

  await db.collection(COLLECTION).insertOne(doc);
  return toPublicConsultation(doc);
}

export async function getConsultationById(consultationId, recoveryToken) {
  if (!consultationId) return null;
  const db = await getMongoDb();
  const doc = await db.collection(COLLECTION).findOne({ consultationId: String(consultationId) });
  if (!doc) return null;
  if (recoveryToken && doc.recoveryToken !== String(recoveryToken)) return null;
  return doc;
}

export async function getPublicConsultation(consultationId, recoveryToken) {
  const doc = await getConsultationById(consultationId, recoveryToken);
  if (!doc) return null;
  if (recoveryToken && doc.recoveryToken !== String(recoveryToken)) return null;
  // Allow read with matching token only for recovery; for GET we require token
  return toPublicConsultation(doc);
}

export async function saveConsultationTurn(consultationId, recoveryToken, mutator) {
  const db = await getMongoDb();
  const existing = await db.collection(COLLECTION).findOne({
    consultationId: String(consultationId),
    recoveryToken: String(recoveryToken),
  });
  if (!existing) return null;

  // structuredClone turns ObjectId into a plain buffer object; never clone/replace _id.
  const originalId = existing._id;
  const { _id: _ignored, ...rest } = existing;
  const next = await mutator(structuredClone(rest));
  next.updatedAt = new Date();
  delete next._id;

  await db.collection(COLLECTION).replaceOne({ _id: originalId }, next);
  return { ...next, _id: originalId };
}

export async function appendMessagesAndState({
  consultationId,
  recoveryToken,
  userMessage,
  assistantMessage,
  quickReplies,
  nextState,
  providerMode,
  turnMeta,
}) {
  return saveConsultationTurn(consultationId, recoveryToken, async (doc) => {
    const now = new Date();
    doc.messages = Array.isArray(doc.messages) ? doc.messages : [];
    doc.messages.push({
      id: randomUUID(),
      role: 'user',
      content: userMessage,
      createdAt: now,
    });
    doc.messages.push({
      id: randomUUID(),
      role: 'assistant',
      content: assistantMessage,
      quickReplies: quickReplies || [],
      createdAt: new Date(),
      meta: turnMeta || null,
    });
    doc.state = nextState;
    doc.providerMode = providerMode || doc.providerMode;
    doc.briefVersions = Array.isArray(doc.briefVersions) ? doc.briefVersions : [];
    doc.briefVersions.push({
      version: nextState.currentVersion,
      state: nextState,
      createdAt: new Date(),
      reason: 'conversation_turn',
    });
    // Cap history growth
    if (doc.briefVersions.length > 40) {
      doc.briefVersions = doc.briefVersions.slice(-40);
    }
    if (doc.messages.length > 80) {
      doc.messages = doc.messages.slice(-80);
    }
    return doc;
  });
}

export async function markSubmitted({ consultationId, recoveryToken, contact, approvalText }) {
  return saveConsultationTurn(consultationId, recoveryToken, async (doc) => {
    doc.state = {
      ...doc.state,
      contact: { ...(doc.state.contact || {}), ...contact },
      stage: 'submitted_for_sampling',
    };
    doc.submittedAt = new Date();
    doc.samplingProject = {
      status: 'awaiting_internal_review',
      approvalText: approvalText || null,
      submittedAt: doc.submittedAt,
      // Formula intentionally omitted from customer surfaces
      formulaStatus: 'not_generated',
    };
    doc.messages.push({
      id: randomUUID(),
      role: 'assistant',
      content:
        'Your scent direction has been sent to the Brandsamor development team for formulation and sampling review.',
      quickReplies: [],
      createdAt: new Date(),
    });
    return doc;
  });
}
