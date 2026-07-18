import { randomUUID } from 'node:crypto';

export function createEmptyScentState(consultationId) {
  return {
    consultationId: consultationId || randomUUID(),
    stage: 'discovery',
    entryMode: 'unknown',
    customerLanguage: {
      originalRequest: undefined,
      importantQuotes: [],
    },
    brandContext: {
      brandName: undefined,
      brandDescription: undefined,
      targetCustomer: undefined,
      genderPositioning: undefined,
      expectedRetailPrice: undefined,
      currency: undefined,
      destinationMarkets: [],
    },
    references: [],
    scentDirection: {
      workingNames: [],
      oneSentenceConcept: undefined,
      primaryFamily: undefined,
      supportingFamilies: [],
      descriptors: [],
      desiredMood: [],
      avoidedEffects: [],
      topNotes: [],
      heartNotes: [],
      baseNotes: [],
      freshness: undefined,
      sweetness: undefined,
      warmth: undefined,
      darkness: undefined,
      originality: undefined,
      cleanliness: undefined,
    },
    performance: {
      opening: undefined,
      projection: undefined,
      sillage: undefined,
      longevityTargetHours: undefined,
      concentrationDirection: undefined,
    },
    useContext: {
      occasions: [],
      climates: [],
      seasons: [],
      timeOfDay: [],
    },
    restrictions: {
      requestedNotes: [],
      avoidedNotes: [],
      excludedRawMaterialIds: [],
      vegan: undefined,
      alcoholFree: undefined,
      allergenConcerns: [],
      additionalRequirements: [],
    },
    lockedElements: [],
    openQuestions: [],
    contradictions: [],
    confidence: {
      referenceUnderstanding: 0,
      scentDirection: 0,
      performance: 0,
      overall: 0,
    },
    contact: {
      fullName: undefined,
      email: undefined,
      phone: undefined,
      brandName: undefined,
      country: undefined,
    },
    currentVersion: 1,
  };
}

function getByPath(obj, path) {
  const parts = String(path).split('.').filter(Boolean);
  let cur = obj;
  for (const part of parts) {
    if (cur == null || typeof cur !== 'object') return undefined;
    cur = cur[part];
  }
  return cur;
}

function setByPath(obj, path, value) {
  const parts = String(path).split('.').filter(Boolean);
  if (!parts.length) return;
  let cur = obj;
  for (let i = 0; i < parts.length - 1; i += 1) {
    const part = parts[i];
    if (cur[part] == null || typeof cur[part] !== 'object') {
      cur[part] = {};
    }
    cur = cur[part];
  }
  cur[parts[parts.length - 1]] = value;
}

function uniqueStrings(values) {
  const seen = new Set();
  const out = [];
  for (const value of values) {
    const text = String(value ?? '').trim();
    if (!text) continue;
    const key = text.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(text);
  }
  return out;
}

export function applyStatePatch(state, patch = {}) {
  const next = structuredClone(state);
  const set = patch.set && typeof patch.set === 'object' ? patch.set : {};
  const add = patch.add && typeof patch.add === 'object' ? patch.add : {};
  const remove = patch.remove && typeof patch.remove === 'object' ? patch.remove : {};
  const lock = Array.isArray(patch.lock) ? patch.lock : [];
  const unlock = Array.isArray(patch.unlock) ? patch.unlock : [];

  for (const [path, value] of Object.entries(set)) {
    setByPath(next, path, value);
  }

  for (const [path, values] of Object.entries(add)) {
    const existing = getByPath(next, path);
    const list = Array.isArray(existing) ? existing : [];
    const incoming = Array.isArray(values) ? values : [values];
    setByPath(next, path, uniqueStrings([...list, ...incoming]));
  }

  for (const [path, values] of Object.entries(remove)) {
    const existing = getByPath(next, path);
    if (!Array.isArray(existing)) continue;
    const drop = new Set(
      (Array.isArray(values) ? values : [values]).map((v) => String(v).trim().toLowerCase()),
    );
    setByPath(
      next,
      path,
      existing.filter((item) => !drop.has(String(item).trim().toLowerCase())),
    );
  }

  if (lock.length) {
    next.lockedElements = uniqueStrings([...next.lockedElements, ...lock]);
  }
  if (unlock.length) {
    const drop = new Set(unlock.map((v) => String(v).trim().toLowerCase()));
    next.lockedElements = next.lockedElements.filter(
      (item) => !drop.has(String(item).trim().toLowerCase()),
    );
  }

  next.currentVersion = Number(next.currentVersion || 1) + 1;
  return next;
}

export function hasScentCardContent(state) {
  const d = state?.scentDirection;
  if (!d) return false;
  return Boolean(
    d.primaryFamily ||
      d.oneSentenceConcept ||
      (d.descriptors && d.descriptors.length) ||
      (d.topNotes && d.topNotes.length) ||
      (d.heartNotes && d.heartNotes.length) ||
      (d.baseNotes && d.baseNotes.length),
  );
}

export function toPublicScentCard(state) {
  if (!hasScentCardContent(state)) return null;

  const d = state.scentDirection;
  const p = state.performance || {};
  const stage = state.stage || 'discovery';

  let status = 'Exploring';
  if (stage === 'refining') status = 'Refining';
  if (
    stage === 'ready_for_formula' ||
    stage === 'formula_generated' ||
    stage === 'submitted_for_sampling'
  ) {
    status = 'Ready for sampling review';
  }

  const performanceBits = [
    p.projection ? `${p.projection} projection` : null,
    p.sillage ? `${p.sillage} sillage` : null,
    p.longevityTargetHours ? `~${p.longevityTargetHours}h wear` : null,
    p.concentrationDirection || null,
  ].filter(Boolean);

  return {
    workingName: d.workingNames?.[0] || 'Untitled scent',
    primaryFamily: d.primaryFamily || 'Emerging direction',
    descriptors: (d.descriptors || []).slice(0, 6),
    topNotes: d.topNotes || [],
    heartNotes: d.heartNotes || [],
    baseNotes: d.baseNotes || [],
    performanceDirection: performanceBits.join(' · ') || 'Performance still taking shape',
    status,
    oneSentenceConcept: d.oneSentenceConcept || null,
    version: state.currentVersion,
  };
}

export function deriveConsultationTitle(state) {
  const card = toPublicScentCard(state);
  const working = card?.workingName;
  if (working && !/^(untitled(\s+scent)?|new scent|studio draft)$/i.test(working)) {
    return working;
  }
  const notes = [
    ...(state?.scentDirection?.topNotes || []),
    ...(state?.scentDirection?.heartNotes || []),
    ...(state?.scentDirection?.baseNotes || []),
  ]
    .map((n) => String(n).trim())
    .filter(Boolean);
  if (notes.length >= 2) return `${notes[0]} · ${notes[1]}${notes[2] ? ` · ${notes[2]}` : ''}`;
  if (notes.length === 1) return `${notes[0]} direction`;
  const descriptors = (state?.scentDirection?.descriptors || []).filter(Boolean);
  if (descriptors.length) {
    return descriptors
      .slice(0, 2)
      .map((d) => String(d).charAt(0).toUpperCase() + String(d).slice(1))
      .join(' & ');
  }
  return 'New scent conversation';
}

export function toPublicConsultation(doc) {
  if (!doc) return null;
  const scentCard = toPublicScentCard(doc.state);
  return {
    consultationId: doc.consultationId,
    recoveryToken: doc.recoveryToken,
    stage: doc.state?.stage || 'discovery',
    title: deriveConsultationTitle(doc.state),
    messages: Array.isArray(doc.messages)
      ? doc.messages.map((m) => ({
          id: m.id,
          role: m.role,
          content: m.content,
          quickReplies: m.quickReplies || [],
          createdAt: m.createdAt,
        }))
      : [],
    scentCard,
    saveStatus: 'saved',
    submittedAt: doc.submittedAt || null,
    providerMode: doc.providerMode || null,
  };
}

export function validateTurnOutput(raw) {
  if (!raw || typeof raw !== 'object') return null;
  const assistantMessage = String(raw.assistantMessage ?? '').trim();
  if (!assistantMessage) return null;

  return {
    assistantMessage,
    quickReplies: Array.isArray(raw.quickReplies)
      ? raw.quickReplies.map((x) => String(x).trim()).filter(Boolean).slice(0, 4)
      : [],
    statePatch:
      raw.statePatch && typeof raw.statePatch === 'object'
        ? {
            set: raw.statePatch.set && typeof raw.statePatch.set === 'object' ? raw.statePatch.set : {},
            add: raw.statePatch.add && typeof raw.statePatch.add === 'object' ? raw.statePatch.add : {},
            remove:
              raw.statePatch.remove && typeof raw.statePatch.remove === 'object'
                ? raw.statePatch.remove
                : {},
            lock: Array.isArray(raw.statePatch.lock) ? raw.statePatch.lock : [],
            unlock: Array.isArray(raw.statePatch.unlock) ? raw.statePatch.unlock : [],
          }
        : { set: {}, add: {}, remove: {}, lock: [], unlock: [] },
    changedFields: Array.isArray(raw.changedFields) ? raw.changedFields.map(String) : [],
    preservedFields: Array.isArray(raw.preservedFields) ? raw.preservedFields.map(String) : [],
    inferredFields: Array.isArray(raw.inferredFields) ? raw.inferredFields : [],
    contradictions: Array.isArray(raw.contradictions) ? raw.contradictions.map(String) : [],
    nextQuestionPurpose: raw.nextQuestionPurpose ? String(raw.nextQuestionPurpose) : undefined,
    shouldUpdateScentCard: Boolean(raw.shouldUpdateScentCard),
    readyForFormula: Boolean(raw.readyForFormula),
  };
}
