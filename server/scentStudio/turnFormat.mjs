/**
 * Helpers for snackable / visual assistant turns.
 * Keeps a short plain-text assistantMessage for storage while carrying
 * structured visual fields for the chat UI.
 */

function trimText(value, max = 280) {
  const text = String(value ?? '').trim();
  if (!text) return '';
  if (text.length <= max) return text;
  return `${text.slice(0, max - 1).trimEnd()}…`;
}

function uniqueStrings(values, max = 8) {
  const seen = new Set();
  const out = [];
  for (const value of values || []) {
    const text = String(value ?? '').trim();
    if (!text) continue;
    const key = text.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(text);
    if (out.length >= max) break;
  }
  return out;
}

/**
 * Build a short plain-text fallback from structured snack fields.
 */
export function composeAssistantMessage({
  headline,
  insight,
  question,
  assistantMessage,
  noteChips,
  changes,
} = {}) {
  if (assistantMessage && String(assistantMessage).trim()) {
    return String(assistantMessage).trim();
  }

  const parts = [];
  if (headline) parts.push(String(headline).trim());
  if (insight) parts.push(String(insight).trim());
  if (noteChips?.length) {
    parts.push(noteChips.map((n) => `**${n}**`).join(' · '));
  }
  if (changes?.length) {
    parts.push(changes.map((c) => `• ${c}`).join('\n'));
  }
  if (question) parts.push(String(question).trim());
  return parts.filter(Boolean).join('\n\n');
}

/**
 * Normalize snackable visual fields from model / local consultant output.
 */
export function normalizeSnackFields(raw = {}) {
  const headline = trimText(raw.headline, 72);
  const insight = trimText(raw.insight, 180);
  const question = trimText(raw.question, 160);
  const noteChips = uniqueStrings(raw.noteChips, 6);
  const changes = uniqueStrings(raw.changes, 4);

  // If the model only returned a long assistantMessage, try to split it into
  // snackable pieces for the UI without losing content.
  let message = String(raw.assistantMessage ?? '').trim();
  let derivedInsight = insight;
  let derivedQuestion = question;
  let derivedHeadline = headline;

  if (message && (!derivedInsight || !derivedQuestion)) {
    const paragraphs = message
      .split(/\n{2,}/)
      .map((p) => p.trim())
      .filter(Boolean);

    if (!derivedHeadline && paragraphs[0] && paragraphs[0].length <= 72 && paragraphs.length > 1) {
      const first = paragraphs[0];
      if (!/[.!?]$/.test(first) || first.split(/\s+/).length <= 8) {
        derivedHeadline = first.replace(/\*\*/g, '');
        paragraphs.shift();
      }
    }

    if (!derivedQuestion && paragraphs.length) {
      const last = paragraphs[paragraphs.length - 1];
      if (/\?/.test(last) || /^(should|what|where|which|how|would|do you|tell me)\b/i.test(last)) {
        derivedQuestion = trimText(last.replace(/\*\*/g, ''), 160);
        paragraphs.pop();
      }
    }

    if (!derivedInsight && paragraphs.length) {
      derivedInsight = trimText(paragraphs.join(' ').replace(/\*\*/g, ''), 180);
    }

    // Prefer the short structured reconstruction going forward.
    message = composeAssistantMessage({
      headline: derivedHeadline,
      insight: derivedInsight,
      question: derivedQuestion,
      noteChips,
      changes,
      assistantMessage: message,
    });
  }

  if (!message) {
    message = composeAssistantMessage({
      headline: derivedHeadline,
      insight: derivedInsight,
      question: derivedQuestion,
      noteChips,
      changes,
    });
  }

  return {
    assistantMessage: message,
    headline: derivedHeadline || undefined,
    insight: derivedInsight || undefined,
    question: derivedQuestion || undefined,
    noteChips,
    changes,
  };
}

export function toPublicMessageVisual(message) {
  if (!message) return null;
  const meta = message.meta && typeof message.meta === 'object' ? message.meta : {};
  const snack = normalizeSnackFields({
    assistantMessage: message.content,
    headline: message.headline ?? meta.headline,
    insight: message.insight ?? meta.insight,
    question: message.question ?? meta.question,
    noteChips: message.noteChips ?? meta.noteChips,
    changes: message.changes ?? meta.changes,
  });

  return {
    id: message.id,
    role: message.role,
    content: message.content || snack.assistantMessage,
    quickReplies: message.quickReplies || [],
    createdAt: message.createdAt,
    headline: snack.headline,
    insight: snack.insight,
    question: snack.question,
    noteChips: snack.noteChips,
    changes: snack.changes,
  };
}
