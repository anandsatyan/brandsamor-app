import { getScentStudioConfig } from './config.mjs';
import { runLocalConsultantTurn } from './localConsultant.mjs';
import { completeChatJson } from './provider.mjs';
import { SCENT_STUDIO_SYSTEM_PROMPT, TURN_OUTPUT_SCHEMA_HINT } from './prompts.mjs';
import { findReferencesInText, toModelSafeReference } from './referenceDirectory.mjs';
import {
  applyStatePatch,
  hasScentCardContent,
  validateTurnOutput,
} from './state.mjs';

function recentMessages(messages, limit = 8) {
  const list = Array.isArray(messages) ? messages : [];
  return list.slice(-limit).map((m) => ({
    role: m.role,
    content: m.content,
  }));
}

function compactStateForModel(state) {
  return {
    stage: state.stage,
    currentStage: state.currentStage,
    startMode: state.startMode,
    entryMode: state.entryMode,
    references: state.references,
    scentDirection: state.scentDirection,
    performance: state.performance,
    useContext: state.useContext,
    restrictions: {
      requestedNotes: state.restrictions?.requestedNotes,
      avoidedNotes: state.restrictions?.avoidedNotes,
      allergenConcerns: state.restrictions?.allergenConcerns,
      additionalRequirements: state.restrictions?.additionalRequirements,
      vegan: state.restrictions?.vegan,
      alcoholFree: state.restrictions?.alcoholFree,
    },
    lockedElements: state.lockedElements,
    openQuestions: state.openQuestions,
    contradictions: state.contradictions,
    unresolvedTradeoffs: state.unresolvedTradeoffs,
    recentChanges: state.recentChanges,
    confidence: state.confidence,
    brandContext: {
      brandName: state.brandContext?.brandName,
      targetCustomer: state.brandContext?.targetCustomer,
      destinationMarkets: state.brandContext?.destinationMarkets,
      productFormat: state.brandContext?.productFormat,
      retailPositioning: state.brandContext?.retailPositioning,
    },
    developmentStatus: state.developmentStatus,
    conceptReady: state.conceptReady,
    currentVersion: state.currentVersion,
  };
}

function buildUserPayload(userMessage, state, matchedRefs) {
  return JSON.stringify({
    customerMessage: userMessage,
    currentState: compactStateForModel(state),
    matchedReferenceProfiles: matchedRefs.map(toModelSafeReference),
    instructions:
      'Return a single JSON object matching the schema. Do not include markdown. Do not invent verified reference notes when no profile is supplied.',
    responseSchema: TURN_OUTPUT_SCHEMA_HINT,
  });
}

async function runModelTurn({ state, messages, userMessage, matchedRefs }) {
  const config = getScentStudioConfig();
  const modelMessages = [
    ...recentMessages(messages, 8),
    { role: 'user', content: buildUserPayload(userMessage, state, matchedRefs) },
  ];

  let result = await completeChatJson({
    systemPrompt: SCENT_STUDIO_SYSTEM_PROMPT,
    messages: modelMessages,
  });

  let validated = validateTurnOutput(result.parsed);
  if (!validated && config.maxRepairAttempts > 0) {
    const repair = await completeChatJson({
      systemPrompt: `${SCENT_STUDIO_SYSTEM_PROMPT}\n\nYour previous response was invalid. Return ONLY valid JSON matching the schema.`,
      messages: [
        ...modelMessages,
        {
          role: 'user',
          content: `Repair this into valid schema JSON:\n${String(result.rawContent || '').slice(0, 4000)}`,
        },
      ],
      temperature: 0.2,
    });
    validated = validateTurnOutput(repair.parsed);
    result = repair;
  }

  if (!validated) {
    return {
      ok: false,
      turn: {
        assistantMessage:
          'I lost the thread for a moment. Could you say that again in one short sentence so I can update the direction?',
        quickReplies: [],
        statePatch: { set: {}, add: {}, remove: {}, lock: [], unlock: [] },
        changedFields: [],
        preservedFields: [],
        inferredFields: [],
        contradictions: [],
        shouldUpdateScentCard: false,
        readyForFormula: false,
      },
      providerMode: 'model_error',
    };
  }

  return { ok: true, turn: validated, providerMode: 'model' };
}

export async function processConversationTurn({ doc, userMessage }) {
  const config = getScentStudioConfig();
  if (!config.featureEnabled) {
    throw new Error('Scent Studio is temporarily unavailable');
  }

  const text = String(userMessage || '').trim().slice(0, 4000);
  if (!text) {
    throw new Error('Message is required');
  }

  const state = doc.state;
  const matchedRefs = findReferencesInText(text);

  let turn;
  let providerMode;

  if (config.useLocalConsultant) {
    const localTurn = runLocalConsultantTurn({
      state,
      userMessage: text,
      matchedReferences: matchedRefs,
    });
    turn = validateTurnOutput(localTurn) || localTurn;
    providerMode = 'local';
  } else {
    const modelResult = await runModelTurn({
      state,
      messages: doc.messages,
      userMessage: text,
      matchedRefs,
    });
    turn = modelResult.turn;
    providerMode = modelResult.providerMode;
  }

  let nextState = applyStatePatch(state, turn.statePatch);

  if (Array.isArray(turn.changes) && turn.changes.length) {
    nextState.recentChanges = turn.changes;
  }

  if (turn.nextStage) {
    nextState.currentStage = turn.nextStage;
  }

  if (turn.readyForFormula) {
    nextState.stage = 'ready_for_formula';
    nextState.currentStage = 'review';
    nextState.conceptReady = true;
    nextState.developmentStatus = 'concept-ready';
  } else if (hasScentCardContent(nextState)) {
    if (nextState.stage === 'discovery' || nextState.stage === 'opening') {
      nextState.stage = 'refining';
    }
    if (!nextState.currentStage || nextState.currentStage === 'opening') {
      nextState.currentStage = 'direction';
    }
    if (Number(nextState.confidence?.overall || 0) >= 0.55 && nextState.currentStage === 'direction') {
      nextState.currentStage = 'character';
    }
    if (Number(nextState.confidence?.overall || 0) >= 0.7) {
      nextState.currentStage = nextState.currentStage === 'review' ? 'review' : 'notes';
    }
  }

  if (Array.isArray(turn.contradictions) && turn.contradictions.length) {
    nextState.contradictions = turn.contradictions;
  }

  return {
    turn,
    nextState,
    providerMode,
  };
}
