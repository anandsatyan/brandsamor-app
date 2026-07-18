import type { ScentCard, ScentConsultation } from '../types';

function isPlaceholderName(name?: string | null) {
  const value = String(name || '').trim();
  if (!value) return true;
  return /^(untitled(\s+scent)?|new scent|studio draft)$/i.test(value);
}

export function deriveConversationTitle(consultation: Pick<ScentConsultation, 'scentCard'> | null | undefined): string {
  const card = consultation?.scentCard;
  if (!card) return 'New scent conversation';

  if (!isPlaceholderName(card.workingName)) {
    return card.workingName.trim();
  }

  const notes = [...(card.topNotes || []), ...(card.heartNotes || []), ...(card.baseNotes || [])]
    .map((n) => String(n).trim())
    .filter(Boolean);

  if (notes.length >= 2) {
    return `${notes[0]} · ${notes[1]}${notes[2] ? ` · ${notes[2]}` : ''}`;
  }
  if (notes.length === 1) {
    return `${notes[0]} direction`;
  }

  const descriptors = (card.descriptors || []).map((d) => String(d).trim()).filter(Boolean);
  if (descriptors.length) {
    return descriptors
      .slice(0, 2)
      .map((d) => d.charAt(0).toUpperCase() + d.slice(1))
      .join(' & ');
  }

  if (card.primaryFamily && card.primaryFamily !== 'Emerging direction') {
    return `${card.primaryFamily.replace(/-/g, ' ')} draft`;
  }

  return 'New scent conversation';
}

export function titleFromScentCard(card: ScentCard | null | undefined): string {
  return deriveConversationTitle({ scentCard: card ?? null } as ScentConsultation);
}
