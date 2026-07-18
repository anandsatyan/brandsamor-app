import { sendJson, readJsonBody } from '../leadHandler.mjs';
import { getScentStudioConfig } from './config.mjs';
import { processConversationTurn } from './conversationEngine.mjs';
import {
  createConsultation,
  getConsultationById,
  markSubmitted,
  appendMessagesAndState,
} from './repo.mjs';
import { toPublicConsultation, toPublicScentCard } from './state.mjs';

function publicFromDoc(doc) {
  return toPublicConsultation(doc);
}

export async function handleScentStudioCreate(req, res) {
  if (req.method !== 'POST') {
    sendJson(res, 405, { error: 'Method not allowed' });
    return;
  }

  const config = getScentStudioConfig();
  if (!config.featureEnabled) {
    sendJson(res, 503, { error: 'Scent Studio is temporarily unavailable' });
    return;
  }

  try {
    const consultation = await createConsultation();
    sendJson(res, 200, {
      consultation,
      providerMode: config.useLocalConsultant ? 'local' : 'model',
    });
  } catch (error) {
    console.error('[scent-studio] create', error);
    sendJson(res, 500, { error: error instanceof Error ? error.message : 'Failed to start consultation' });
  }
}

export async function handleScentStudioGet(req, res, consultationId) {
  if (req.method !== 'GET') {
    sendJson(res, 405, { error: 'Method not allowed' });
    return;
  }

  const url = new URL(req.url || '/', 'http://localhost');
  const recoveryToken = url.searchParams.get('token') || '';
  if (!recoveryToken) {
    sendJson(res, 400, { error: 'Recovery token required' });
    return;
  }

  try {
    const doc = await getConsultationById(consultationId, recoveryToken);
    if (!doc) {
      sendJson(res, 404, { error: 'Consultation not found' });
      return;
    }
    sendJson(res, 200, { consultation: publicFromDoc(doc) });
  } catch (error) {
    console.error('[scent-studio] get', error);
    sendJson(res, 500, { error: 'Failed to load consultation' });
  }
}

export async function handleScentStudioMessage(req, res, consultationId) {
  if (req.method !== 'POST') {
    sendJson(res, 405, { error: 'Method not allowed' });
    return;
  }

  const config = getScentStudioConfig();
  if (!config.featureEnabled) {
    sendJson(res, 503, { error: 'Scent Studio is temporarily unavailable' });
    return;
  }

  try {
    const payload = await readJsonBody(req);
    const recoveryToken = String(payload?.recoveryToken || '').trim();
    const message = String(payload?.message || '').trim();

    if (!recoveryToken || !message) {
      sendJson(res, 400, { error: 'recoveryToken and message are required' });
      return;
    }

    const doc = await getConsultationById(consultationId, recoveryToken);
    if (!doc) {
      sendJson(res, 404, { error: 'Consultation not found' });
      return;
    }

    if (doc.submittedAt) {
      sendJson(res, 409, { error: 'This consultation has already been submitted' });
      return;
    }

    const { turn, nextState, providerMode } = await processConversationTurn({
      doc,
      userMessage: message,
    });

    const saved = await appendMessagesAndState({
      consultationId,
      recoveryToken,
      userMessage: message,
      assistantMessage: turn.assistantMessage,
      quickReplies: turn.quickReplies,
      nextState,
      providerMode,
      turnMeta: {
        changedFields: turn.changedFields,
        preservedFields: turn.preservedFields,
        readyForFormula: turn.readyForFormula,
      },
    });

    if (!saved) {
      sendJson(res, 404, { error: 'Consultation not found' });
      return;
    }

    sendJson(res, 200, {
      consultation: publicFromDoc(saved),
      scentCard: toPublicScentCard(saved.state),
      assistantMessage: turn.assistantMessage,
      quickReplies: turn.quickReplies,
      readyForFormula: turn.readyForFormula,
      providerMode,
    });
  } catch (error) {
    console.error('[scent-studio] message', error);
    sendJson(res, 500, {
      error: error instanceof Error ? error.message : 'Failed to process message',
    });
  }
}

export async function handleScentStudioPrepare(req, res, consultationId) {
  if (req.method !== 'POST') {
    sendJson(res, 405, { error: 'Method not allowed' });
    return;
  }

  try {
    const payload = await readJsonBody(req);
    const recoveryToken = String(payload?.recoveryToken || '').trim();
    if (!recoveryToken) {
      sendJson(res, 400, { error: 'recoveryToken is required' });
      return;
    }

    const doc = await getConsultationById(consultationId, recoveryToken);
    if (!doc) {
      sendJson(res, 404, { error: 'Consultation not found' });
      return;
    }

    // Conversational nudge — ask for missing contact via a system message path
    const { turn, nextState, providerMode } = await processConversationTurn({
      doc,
      userMessage: 'Prepare for sampling',
    });

    const saved = await appendMessagesAndState({
      consultationId,
      recoveryToken,
      userMessage: 'Prepare for sampling',
      assistantMessage:
        turn.assistantMessage ||
        'I can prepare this for sampling review. Please share your name, business email, brand or company, and country.',
      quickReplies: turn.quickReplies?.length
        ? turn.quickReplies
        : ['I will share my details next'],
      nextState: { ...nextState, stage: 'ready_for_formula' },
      providerMode,
      turnMeta: { action: 'prepare_for_sampling' },
    });

    sendJson(res, 200, { consultation: publicFromDoc(saved) });
  } catch (error) {
    console.error('[scent-studio] prepare', error);
    sendJson(res, 500, { error: 'Failed to prepare for sampling' });
  }
}

export async function handleScentStudioSubmit(req, res, consultationId) {
  if (req.method !== 'POST') {
    sendJson(res, 405, { error: 'Method not allowed' });
    return;
  }

  try {
    const payload = await readJsonBody(req);
    const recoveryToken = String(payload?.recoveryToken || '').trim();
    const contact = payload?.contact || {};
    const fullName = String(contact.fullName || '').trim();
    const email = String(contact.email || '').trim().toLowerCase();
    const brandName = String(contact.brandName || '').trim();
    const country = String(contact.country || '').trim();
    const phone = String(contact.phone || '').trim();
    const approved = Boolean(payload?.approved);

    if (!recoveryToken) {
      sendJson(res, 400, { error: 'recoveryToken is required' });
      return;
    }
    if (!approved) {
      sendJson(res, 400, { error: 'Approval is required' });
      return;
    }
    if (!fullName || !email || !country) {
      sendJson(res, 400, { error: 'Name, email, and country are required' });
      return;
    }

    const doc = await getConsultationById(consultationId, recoveryToken);
    if (!doc) {
      sendJson(res, 404, { error: 'Consultation not found' });
      return;
    }
    if (doc.submittedAt) {
      sendJson(res, 200, { consultation: publicFromDoc(doc), alreadySubmitted: true });
      return;
    }

    const saved = await markSubmitted({
      consultationId,
      recoveryToken,
      contact: { fullName, email, brandName, country, phone },
      approvalText:
        'I approve this as the starting direction for physical fragrance development. I understand that the fragrance may evolve after formulation, evaluation and sample feedback.',
    });

    sendJson(res, 200, { consultation: publicFromDoc(saved) });
  } catch (error) {
    console.error('[scent-studio] submit', error);
    sendJson(res, 500, { error: 'Failed to submit scent direction' });
  }
}
