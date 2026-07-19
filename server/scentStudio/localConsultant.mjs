import { findReferencesInText, searchReferenceFragrances, toModelSafeReference } from './referenceDirectory.mjs';
import { hasScentCardContent } from './state.mjs';

function includesAny(text, words) {
  return words.some((w) => text.includes(w));
}

function extractQuotedNotes(text) {
  const lower = text.toLowerCase();
  const noteCandidates = [
    'bergamot',
    'lemon',
    'lime',
    'grapefruit',
    'orange',
    'mandarin',
    'ginger',
    'black tea',
    'tea',
    'rose',
    'jasmine',
    'lavender',
    'iris',
    'violet',
    'peony',
    'neroli',
    'orange blossom',
    'sandalwood',
    'cedar',
    'vetiver',
    'patchouli',
    'amber',
    'musk',
    'vanilla',
    'tonka',
    'coconut',
    'sea salt',
    'sage',
    'cardamom',
    'cinnamon',
    'incense',
    'oud',
    'leather',
    'smoke',
    'fig',
    'pear',
    'apple',
    'berry',
    'honey',
    'caramel',
  ];
  return noteCandidates.filter((n) => lower.includes(n));
}

function titleCase(text) {
  return String(text)
    .split(' ')
    .map((w) => (w ? w[0].toUpperCase() + w.slice(1) : w))
    .join(' ');
}

function buildPyramidFromReference(ref, likes = [], dislikes = [], adds = []) {
  const avoid = new Set(dislikes.map((d) => d.toLowerCase()));
  const filterNotes = (notes) =>
    (notes || []).filter((n) => ![...avoid].some((a) => n.toLowerCase().includes(a)));

  let top = filterNotes(ref.topNotes).slice(0, 4);
  let heart = filterNotes(ref.heartNotes).slice(0, 4);
  let base = filterNotes(ref.baseNotes).slice(0, 4);

  for (const add of adds) {
    const label = titleCase(add);
    if (includesAny(add, ['citrus', 'bergamot', 'lemon', 'lime', 'ginger', 'tea', 'salt'])) {
      if (!top.map((x) => x.toLowerCase()).includes(add)) top = [...top, label].slice(0, 5);
    } else if (includesAny(add, ['wood', 'cedar', 'sandal', 'amber', 'musk', 'vanilla', 'oud', 'leather'])) {
      if (!base.map((x) => x.toLowerCase()).includes(add)) base = [...base, label].slice(0, 5);
    } else if (!heart.map((x) => x.toLowerCase()).includes(add)) {
      heart = [...heart, label].slice(0, 5);
    }
  }

  const descriptors = [
    ...(ref.accordDescriptors || []).slice(0, 3),
    ...likes.map(titleCase),
  ].slice(0, 6);

  return {
    primaryFamily: ref.primaryFamily || 'aromatic',
    supportingFamilies: ref.supportingFamilies || [],
    descriptors,
    topNotes: top,
    heartNotes: heart,
    baseNotes: base,
    oneSentenceConcept: `A custom direction inspired by ${ref.brand ? `${ref.brand} ` : ''}${ref.name}, shaped around your preferences.`,
    workingNames: [`${ref.name.split(' ')[0]} Direction`],
  };
}

function buildScratchPyramid(text, notes) {
  const lower = text.toLowerCase();
  const tropical = includesAny(lower, ['tropical', 'beach', 'resort', 'island', 'ocean']);
  const woody = includesAny(lower, ['wood', 'woody', 'cedar', 'sandal', 'forest']);
  const citrus = includesAny(lower, ['citrus', 'fresh', 'bright', 'zesty']);
  const sweet = includesAny(lower, ['sweet', 'gourmand', 'vanilla', 'dessert']);
  const clean = includesAny(lower, ['clean', 'soap', 'crisp', 'fresh laundry']);
  const warm = includesAny(lower, ['warm', 'cozy', 'fireplace', 'amber']);

  let primaryFamily = 'fresh-aromatic';
  if (woody) primaryFamily = 'woody';
  if (tropical) primaryFamily = 'fresh-fruity';
  if (sweet && warm) primaryFamily = 'oriental-gourmand';
  if (warm && woody) primaryFamily = 'woody-amber';

  const topNotes = [];
  const heartNotes = [];
  const baseNotes = [];
  const descriptors = [];

  if (citrus || tropical) {
    topNotes.push('Bergamot', 'Yuzu');
    descriptors.push('bright', 'airy');
  }
  if (tropical) {
    topNotes.push('Green mango');
    heartNotes.push('Frangipani', 'Sea air');
    descriptors.push('tropical', 'sunlit');
  }
  if (clean) {
    heartNotes.push('Soft white florals');
    baseNotes.push('Clean musk');
    descriptors.push('polished', 'clean');
  }
  if (woody) {
    baseNotes.push('Cedar', 'Sandalwood');
    descriptors.push('woody');
  }
  if (warm) {
    baseNotes.push('Soft amber');
    descriptors.push('warm');
  }
  if (sweet && !includesAny(lower, ['not sweet', 'less sweet', 'no dessert'])) {
    heartNotes.push('Soft tonka');
    descriptors.push('gently sweet');
  }

  for (const n of notes) {
    const label = titleCase(n);
    if (includesAny(n, ['bergamot', 'lemon', 'lime', 'citrus', 'ginger', 'tea', 'salt', 'pear'])) {
      if (!topNotes.includes(label)) topNotes.push(label);
    } else if (includesAny(n, ['wood', 'cedar', 'sandal', 'amber', 'musk', 'vanilla', 'oud', 'leather', 'smoke'])) {
      if (!baseNotes.includes(label)) baseNotes.push(label);
    } else if (!heartNotes.includes(label)) {
      heartNotes.push(label);
    }
  }

  if (!topNotes.length) topNotes.push('Crisp citrus');
  if (!heartNotes.length) heartNotes.push('Soft florals');
  if (!baseNotes.length) baseNotes.push('Light woods', 'Musk');

  return {
    primaryFamily,
    supportingFamilies: woody ? ['woody'] : tropical ? ['fruity', 'aquatic'] : ['aromatic'],
    descriptors: [...new Set(descriptors)].slice(0, 6),
    topNotes: topNotes.slice(0, 5),
    heartNotes: heartNotes.slice(0, 5),
    baseNotes: baseNotes.slice(0, 5),
    oneSentenceConcept: tropical
      ? 'A clean, expensive tropical fragrance with bright air and soft woods — no sunscreen coconut.'
      : 'A custom fragrance direction shaped from your mood, preferences and use context.',
    workingNames: [tropical ? 'Resort Air' : woody ? 'Quiet Woods' : 'Studio Draft'],
  };
}

/**
 * Deterministic consultant used when no OpenAI-compatible model is configured.
 * Good enough to exercise the full UI and state loop locally.
 */
export function runLocalConsultantTurn({ state, userMessage, matchedReferences = [] }) {
  const text = String(userMessage || '').trim();
  const lower = text.toLowerCase();
  const refsInText = matchedReferences.length
    ? matchedReferences
    : findReferencesInText(text);
  const searched =
    refsInText.length === 0 && text.length < 80
      ? searchReferenceFragrances(text, { limit: 3 })
      : [];

  const wantsSampling = includesAny(lower, [
    'prepare for sampling',
    'ready for sampling',
    'submit',
    'send to brandsamor',
    "i'm ready",
    'i am ready',
    'prepare the development',
  ]);
  const keepRefining = includesAny(lower, ['keep refining', 'not yet', 'keep going']);
  const startScratch = includesAny(lower, ['start from scratch', 'from scratch', 'completely new']);
  const useInspiration = includesAny(lower, [
    'use a fragrance as inspiration',
    'as inspiration',
    'inspired by',
  ]);

  const removeMatch = lower.match(/(?:remove|less|without|no)\s+([a-z][a-z\s]{1,24})/);
  const addMatch = lower.match(/(?:add|more|include|with)\s+([a-z][a-z\s]{1,24})/);
  const removeNote = removeMatch?.[1]?.trim();
  const addNote = addMatch?.[1]?.trim();
  const notes = extractQuotedNotes(text);

  const set = {};
  const add = {};
  const remove = {};
  const lock = [];
  let assistantMessage = '';
  let quickReplies = [];
  let shouldUpdateScentCard = false;
  let readyForFormula = false;
  const changedFields = [];
  const preservedFields = [];

  if (!state.customerLanguage?.originalRequest) {
    set['customerLanguage.originalRequest'] = text;
  }
  add['customerLanguage.importantQuotes'] = [text.slice(0, 240)];

  // Ambiguous reference confirmation
  if (searched.length > 1 && refsInText.length === 0 && !hasScentCardContent(state)) {
    const options = searched.slice(0, 3);
    const insight = 'A few fragrances could match what you described.';
    const question = 'Which one did you mean?';
    assistantMessage = `${insight}\n\n${question}`;
    quickReplies = options.map((r) => `${r.brand} ${r.name}`);
    return {
      headline: 'Pick a reference',
      insight,
      question,
      noteChips: [],
      assistantMessage,
      quickReplies,
      statePatch: { set, add, remove, lock, unlock: [] },
      changedFields: ['customerLanguage'],
      preservedFields: [],
      inferredFields: [],
      contradictions: [],
      changes: [],
      shouldUpdateScentCard: false,
      readyForFormula: false,
    };
  }

  const primaryRef = refsInText[0] || (searched.length === 1 ? searched[0] : null);

  if (primaryRef && !hasScentCardContent(state)) {
    const safe = toModelSafeReference(primaryRef);
    const pyramid = buildPyramidFromReference(safe, [], [], notes);
    set.entryMode = 'reference';
    set.stage = 'refining';
    set.references = [
      {
        referenceFragranceId: safe.id,
        name: safe.name,
        brand: safe.brand,
        matchStatus: safe.matchStatus,
        likedElements: [],
        dislikedElements: [],
        requestedChanges: [],
      },
    ];
    Object.assign(set, {
      'scentDirection.workingNames': pyramid.workingNames,
      'scentDirection.oneSentenceConcept': pyramid.oneSentenceConcept,
      'scentDirection.primaryFamily': pyramid.primaryFamily,
      'scentDirection.supportingFamilies': pyramid.supportingFamilies,
      'scentDirection.descriptors': pyramid.descriptors,
      'scentDirection.topNotes': pyramid.topNotes,
      'scentDirection.heartNotes': pyramid.heartNotes,
      'scentDirection.baseNotes': pyramid.baseNotes,
      'confidence.projection': 'moderate',
      'performance.sillage': 'moderate',
      'confidence.referenceUnderstanding': safe.matchStatus === 'verified' ? 0.85 : 0.45,
      'confidence.scentDirection': 0.55,
      'confidence.overall': 0.5,
    });
    shouldUpdateScentCard = true;
    changedFields.push('references', 'scentDirection');
    const noteChips = [...pyramid.topNotes, ...pyramid.heartNotes, ...pyramid.baseNotes].slice(0, 4);
    const insight =
      safe.matchStatus === 'verified'
        ? `**${safe.brand} ${safe.name}** as a starting point — not a copy.`
        : `**${safe.brand} ${safe.name}** as a loose starting point (no verified profile on file).`;
    const question =
      safe.matchStatus === 'verified'
        ? 'What should we preserve, and what should feel different?'
        : 'What do you like in the opening or dry-down?';
    assistantMessage = `${insight}\n\n${question}`;
    quickReplies = [
      'Less sweet',
      'Fresher opening',
      'More woody',
      'More distinctive',
      'Softer dry-down',
      'Keep this direction',
    ];
    return {
      headline: 'Reference locked',
      insight,
      question,
      noteChips,
      assistantMessage,
      quickReplies,
      statePatch: { set, add, remove, lock, unlock: [] },
      changedFields,
      preservedFields,
      inferredFields: [],
      contradictions: [],
      changes: ['Reference direction sketched'],
      shouldUpdateScentCard,
      readyForFormula: false,
      nextStage: 'character',
    };
  }

  if ((startScratch || (!primaryRef && text.length > 20)) && !hasScentCardContent(state)) {
    const pyramid = buildScratchPyramid(text, notes);
    set.entryMode = startScratch || !primaryRef ? 'scratch' : state.entryMode;
    set.stage = 'refining';
    Object.assign(set, {
      'scentDirection.workingNames': pyramid.workingNames,
      'scentDirection.oneSentenceConcept': pyramid.oneSentenceConcept,
      'scentDirection.primaryFamily': pyramid.primaryFamily,
      'scentDirection.supportingFamilies': pyramid.supportingFamilies,
      'scentDirection.descriptors': pyramid.descriptors,
      'scentDirection.topNotes': pyramid.topNotes,
      'scentDirection.heartNotes': pyramid.heartNotes,
      'scentDirection.baseNotes': pyramid.baseNotes,
      'performance.projection': 'moderate',
      'confidence.scentDirection': 0.5,
      'confidence.overall': 0.45,
    });
    if (includesAny(lower, ['no coconut', 'without coconut', 'not coconut'])) {
      add['scentDirection.avoidedEffects'] = ['coconut sunscreen'];
      add['restrictions.avoidedNotes'] = ['coconut'];
    }
    shouldUpdateScentCard = true;
    changedFields.push('scentDirection');
    assistantMessage = tropicalFollowUp(lower, pyramid);
    quickReplies = tropicalQuickReplies(lower);
    const noteChips = [...pyramid.topNotes, ...pyramid.heartNotes, ...pyramid.baseNotes].slice(0, 4);
    const [insightPart, questionPart] = String(assistantMessage).split(/\n\n/);
    return {
      headline: 'Direction forming',
      insight: insightPart || pyramid.oneSentenceConcept,
      question: questionPart || 'What should we refine next?',
      noteChips,
      assistantMessage,
      quickReplies,
      statePatch: { set, add, remove, lock, unlock: [] },
      changedFields,
      preservedFields,
      inferredFields: [],
      contradictions: [],
      changes: ['Initial direction sketched'],
      shouldUpdateScentCard,
      readyForFormula: false,
    };
  }

  if (useInspiration && !hasScentCardContent(state)) {
    const insight = 'Name a perfume you like — brand + fragrance if you know it.';
    const question = 'What should stay, and what should change?';
    assistantMessage = `${insight}\n\n${question}`;
    quickReplies = ['Imagination, less soapy', 'Santal 33, less dry', 'Something like Wood Sage & Sea Salt'];
    return {
      headline: 'Inspiration',
      insight,
      question,
      noteChips: [],
      assistantMessage,
      quickReplies,
      statePatch: { set, add, remove, lock, unlock: [] },
      changedFields: [],
      preservedFields: [],
      inferredFields: [],
      contradictions: [],
      changes: [],
      shouldUpdateScentCard: false,
      readyForFormula: false,
    };
  }

  // Refinement path when card exists
  if (hasScentCardContent(state)) {
    const d = state.scentDirection;
    preservedFields.push('scentDirection.primaryFamily');

    if (removeNote) {
      remove['scentDirection.topNotes'] = [removeNote];
      remove['scentDirection.heartNotes'] = [removeNote];
      remove['scentDirection.baseNotes'] = [removeNote];
      add['restrictions.avoidedNotes'] = [removeNote];
      add['scentDirection.avoidedEffects'] = [removeNote];
      changedFields.push('restrictions.avoidedNotes');
    }
    if (addNote) {
      const label = titleCase(addNote);
      if (includesAny(addNote, ['wood', 'cedar', 'amber', 'musk', 'vanilla', 'sandal'])) {
        add['scentDirection.baseNotes'] = [label];
      } else if (includesAny(addNote, ['citrus', 'bergamot', 'tea', 'ginger', 'salt'])) {
        add['scentDirection.topNotes'] = [label];
      } else {
        add['scentDirection.heartNotes'] = [label];
      }
      add['restrictions.requestedNotes'] = [label];
      changedFields.push('scentDirection');
    }

    if (includesAny(lower, ['less sweet', 'not sweet', 'less dessert'])) {
      set['scentDirection.sweetness'] = 2;
      add['scentDirection.avoidedEffects'] = ['dessert sweetness'];
      changedFields.push('scentDirection.sweetness');
    }
    if (includesAny(lower, ['more woody', 'woodier', 'drier'])) {
      add['scentDirection.descriptors'] = ['woody', 'dry'];
      add['scentDirection.baseNotes'] = ['Cedar'];
      changedFields.push('scentDirection.descriptors');
    }
    if (includesAny(lower, ['warmer', 'more warm', 'cozier'])) {
      set['scentDirection.warmth'] = 7;
      add['scentDirection.baseNotes'] = ['Soft amber'];
      add['scentDirection.descriptors'] = ['warm'];
      changedFields.push('scentDirection.warmth');
    }
    if (includesAny(lower, ['project more', 'stronger', 'more projection', 'louder'])) {
      set['performance.projection'] = 'strong';
      set['performance.sillage'] = 'strong';
      changedFields.push('performance');
    }
    if (includesAny(lower, ['keep the', 'keep everything', 'lock'])) {
      const keepBits = notes.length ? notes : ['current pyramid'];
      lock.push(...keepBits.map(titleCase));
    }

    if (wantsSampling && !keepRefining) {
      set.stage = 'ready_for_formula';
      readyForFormula = true;
      shouldUpdateScentCard = true;
      const insight = 'This direction is clear enough for sampling review.';
      const question = 'Keep refining, or prepare it for the Brandsamor team?';
      assistantMessage = `${insight}\n\n${question}`;
      quickReplies = ['Keep refining', 'Prepare for sampling'];
      return {
        headline: 'Ready to sample',
        insight,
        question,
        noteChips: [],
        assistantMessage,
        quickReplies,
        statePatch: { set, add, remove, lock, unlock: [] },
        changedFields: ['stage'],
        preservedFields: ['scentDirection'],
        inferredFields: [],
        contradictions: [],
        changes: ['Marked ready for sampling'],
        shouldUpdateScentCard,
        readyForFormula,
      };
    }

    shouldUpdateScentCard = changedFields.length > 0 || Boolean(removeNote || addNote);
    const changeLabels = [
      removeNote ? `Reduced ${titleCase(removeNote)}` : null,
      addNote ? `Added ${titleCase(addNote)}` : null,
      includesAny(lower, ['more woody', 'woodier']) ? 'Drier, woodier base' : null,
      includesAny(lower, ['warmer']) ? 'Warmer dry-down' : null,
      includesAny(lower, ['less sweet']) ? 'Less dessert-sweet' : null,
    ].filter(Boolean);

    const confidence = Number(state.confidence?.overall || 0.45);
    const nextConfidence = Math.min(0.9, confidence + 0.08);
    set['confidence.overall'] = nextConfidence;
    set['confidence.scentDirection'] = Math.min(0.9, Number(state.confidence?.scentDirection || 0.5) + 0.08);

    const family = (d.primaryFamily || 'core character').replace(/-/g, ' ');
    const insight = changeLabels.length
      ? `Updated the card — kept **${family}**.`
      : `Kept **${family}** and anything you didn’t ask to change.`;
    const noteChips = [
      ...(addNote ? [titleCase(addNote)] : []),
      ...(d.topNotes || []).slice(0, 2),
    ].slice(0, 4);

    // After the customer left concept review to refine, stay in chat — don't
    // auto-reopen the review on every high-confidence turn.
    if (
      nextConfidence >= 0.72 &&
      state.stage !== 'ready_for_formula' &&
      !state.reviewDismissed
    ) {
      const question = 'Keep refining, or prepare for sampling?';
      assistantMessage = `${insight}\n\n${question}`;
      quickReplies = ['Keep refining', 'Prepare for sampling'];
      set.stage = 'ready_for_formula';
      readyForFormula = true;
      return {
        headline: 'Looking solid',
        insight,
        question,
        noteChips,
        assistantMessage,
        quickReplies,
        statePatch: { set, add, remove, lock, unlock: [] },
        changedFields: changedFields.length ? changedFields : ['confidence'],
        preservedFields,
        inferredFields: [],
        contradictions: [],
        changes: changeLabels,
        shouldUpdateScentCard: true,
        readyForFormula,
      };
    }

    const question = pickFollowUp(state, lower);
    assistantMessage = `${insight}\n\n${question}`;
    quickReplies = ['Make it warmer', 'Less sweet', 'Prepare for sampling'];

    shouldUpdateScentCard = true;
    return {
      headline: changeLabels.length ? 'Updated' : 'On track',
      insight,
      question,
      noteChips,
      assistantMessage,
      quickReplies,
      statePatch: { set, add, remove, lock, unlock: [] },
      changedFields: changedFields.length ? changedFields : ['confidence'],
      preservedFields,
      inferredFields: [],
      contradictions: [],
      changes: changeLabels,
      shouldUpdateScentCard,
      readyForFormula,
    };
  }

  // Mode-aware discovery when card does not exist yet
  if (!hasScentCardContent(state)) {
    const mode = state.startMode;
    if (mode === 'guided' || includesAny(lower, ['guide me', 'help me decide'])) {
      const pyramid = buildScratchPyramid(text, notes);
      Object.assign(set, {
        entryMode: 'mixed',
        stage: 'refining',
        currentStage: 'direction',
        'scentDirection.workingNames': pyramid.workingNames,
        'scentDirection.oneSentenceConcept': pyramid.oneSentenceConcept,
        'scentDirection.primaryFamily': pyramid.primaryFamily,
        'scentDirection.supportingFamilies': pyramid.supportingFamilies,
        'scentDirection.descriptors': pyramid.descriptors,
        'scentDirection.topNotes': pyramid.topNotes,
        'scentDirection.heartNotes': pyramid.heartNotes,
        'scentDirection.baseNotes': pyramid.baseNotes,
        'scentDirection.freshness': 6,
        'confidence.scentDirection': 0.45,
        'confidence.overall': 0.4,
      });
      const insight = pyramid.oneSentenceConcept || 'A direction is forming around how this should feel.';
      const question = 'Where would you imagine it being worn most?';
      const noteChips = [...pyramid.topNotes, ...pyramid.heartNotes, ...pyramid.baseNotes].slice(0, 4);
      assistantMessage = `${insight}\n\n${question}`;
      quickReplies = [
        'Everyday signature scent',
        'Evening fragrance',
        'Luxury hospitality product',
        'Giftable fragrance',
        'Broad commercial launch',
      ];
      return {
        headline: 'First sketch',
        insight,
        question,
        noteChips,
        assistantMessage,
        quickReplies,
        statePatch: { set, add, remove, lock, unlock: [] },
        changedFields: ['scentDirection'],
        preservedFields: [],
        inferredFields: [],
        contradictions: [],
        changes: ['Initial guided direction sketched'],
        shouldUpdateScentCard: true,
        readyForFormula: false,
        nextStage: 'character',
      };
    }
  }

  // Default opening
  const insight = 'Start with an idea, a fragrance you know, or a guided path.';
  const question = 'How would you like to begin?';
  assistantMessage = `${insight}\n\n${question}`;
  quickReplies = ['Create from scratch', 'Modify an existing fragrance', 'Guide me'];
  return {
    headline: 'Create a scent',
    insight,
    question,
    noteChips: [],
    assistantMessage,
    quickReplies,
    statePatch: { set, add, remove, lock, unlock: [] },
    changedFields: [],
    preservedFields: [],
    inferredFields: [],
    contradictions: [],
    changes: [],
    shouldUpdateScentCard: false,
    readyForFormula: false,
  };
}

function tropicalFollowUp(lower, pyramid) {
  const notes = [...pyramid.topNotes, ...pyramid.heartNotes, ...pyramid.baseNotes]
    .slice(0, 4)
    .map((n) => `**${n}**`)
    .join(' · ');
  if (includesAny(lower, ['tropical', 'beach', 'resort'])) {
    return `Clean tropical — no sunscreen sweetness. Exploring ${notes}.\n\nJuicy fruits & flowers, or salty air & sun-warmed woods?`;
  }
  if (includesAny(lower, ['fresh', 'clean', 'energetic', 'understated'])) {
    return `Clean, confident, and not loud. Exploring ${notes}.\n\nBrighter and fresher, or smoother and warmer?`;
  }
  return `${pyramid.oneSentenceConcept} Exploring ${notes}.\n\nStrengthen the opening, heart, or dry-down next?`;
}

function tropicalQuickReplies(lower) {
  if (includesAny(lower, ['tropical', 'beach', 'resort'])) {
    return ['Juicy fruits and flowers', 'Salty air and sun-warmed woods', 'A balance of both'];
  }
  return ['Brighten the opening', 'Make the heart richer', 'Dry the base'];
}

function pickFollowUp(state, lower) {
  if (!state.performance?.projection) {
    return 'Should this feel intimate and close to skin, or project more clearly around you?';
  }
  if (!state.useContext?.occasions?.length) {
    return 'Where do you imagine this being worn most — everyday, evening, or a hospitality / retail setting?';
  }
  if (includesAny(lower, ['fresh']) && !includesAny(lower, ['citrus', 'aquatic', 'green', 'musk'])) {
    return 'When you say **fresh**, do you mean citrus-bright, watery-aquatic, or clean **musk**?';
  }
  return 'What would you like to adjust next?';
}
