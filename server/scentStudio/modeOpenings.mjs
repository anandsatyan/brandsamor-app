export const START_MODES = ['scratch', 'inspiration', 'guided'];

export function openingForStartMode(startMode) {
  if (startMode === 'scratch') {
    return {
      headline: 'Blank slate',
      insight: 'We’ll build a fragrance around feeling, audience, or a few notes.',
      question: 'What should this scent express for your brand?',
      noteChips: [],
      content:
        'We’ll build a fragrance around feeling, audience, or a few notes.\n\nWhat should this scent express for your brand?',
      quickReplies: [
        'Fresh and energetic',
        'Clean and understated',
        'Warm and sensual',
        'Dark and luxurious',
        'Bold and distinctive',
        'Something else',
      ],
    };
  }

  if (startMode === 'inspiration') {
    return {
      headline: 'Inspired start',
      insight: 'We’ll use a fragrance you know as a starting point — not an exact copy.',
      question: 'Which fragrance should we begin from?',
      noteChips: [],
      content:
        'We’ll use a fragrance you know as a starting point — not an exact copy.\n\nWhich fragrance should we begin from?',
      quickReplies: [
        'Less sweet',
        'Fresher opening',
        'More woody',
        'More distinctive',
        'More gender-neutral',
        'Longer lasting',
      ],
    };
  }

  if (startMode === 'guided') {
    return {
      headline: 'Guided path',
      insight: 'A few short questions will shape the direction.',
      question: 'What should someone feel wearing this?',
      noteChips: [],
      content:
        'A few short questions will shape the direction.\n\nWhat should someone feel wearing this?',
      quickReplies: [
        'Confident and polished',
        'Calm and reassuring',
        'Energetic and bright',
        'Mysterious and quiet',
        'Warm and inviting',
        'Something else',
      ],
    };
  }

  return {
    headline: 'Create a scent',
    insight: 'Start with an idea, a fragrance you know, or a guided path.',
    question: 'How would you like to begin?',
    noteChips: [],
    content:
      'Start with an idea, a fragrance you know, or a guided path.\n\nHow would you like to begin?',
    quickReplies: ['Create from scratch', 'Modify an existing fragrance', 'Guide me'],
  };
}
