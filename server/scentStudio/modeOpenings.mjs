export const START_MODES = ['scratch', 'inspiration', 'guided'];

export function openingForStartMode(startMode) {
  if (startMode === 'scratch') {
    return {
      content:
        'Let’s shape a fragrance from a blank slate.\n\nDescribe the feeling, audience, notes, or story you want the fragrance to express for your brand.',
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
      content:
        'We’ll use a fragrance you know as a starting point — not an exact copy.\n\nWhich fragrance should we begin from, and what do you want to preserve, reduce, or change?',
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
      content:
        'I’ll guide you with a few simple questions.\n\nWhat should someone feel when wearing this fragrance for your brand?',
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
    content:
      'Let’s create your fragrance.\n\nStart with an idea, modify a fragrance you already know, or let me guide you.',
    quickReplies: ['Create from scratch', 'Modify an existing fragrance', 'Guide me'],
  };
}
