import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import '@fontsource/manrope/400.css';
import '@fontsource/manrope/500.css';
import '@fontsource/manrope/600.css';
import '@fontsource/manrope/700.css';
import '../styles/sampling.css';

import { OptionCard } from '../components/form/OptionCard';
import { MultiSelectChip } from '../components/form/MultiSelectChip';
import { FieldInput } from '../components/form/FieldInput';
import { SearchableCountrySelect } from '../components/form/SearchableCountrySelect';
import { SamplingPageShell, ScreenTransition } from '../components/layout/SamplingPageShell';
import { WizardFooter } from '../components/layout/WizardFooter';
import { StickyActionBar, PrimaryButton, TextLinkButton } from '../components/layout/StickyActionBar';
import { VialIllustration } from '../components/sampling/VialIllustration';
import { FragranceCard } from '../components/sampling/FragranceCard';
import { CurationTransition } from '../components/sampling/CurationTransition';
import { ReviewSection } from '../components/feedback/ReviewSection';
import { ConfirmDialog } from '../components/feedback/ConfirmDialog';

import {
  AUDIENCE_OPTIONS,
  ADVENTURE_OPTIONS,
  BOTTLE_SIZE_OPTIONS,
  BRAND_PERSONALITY_OPTIONS,
  BRAND_STAGE_OPTIONS,
  BUSINESS_TYPE_OPTIONS,
  COUNTRIES,
  EXCLUSION_OPTIONS,
  getLabel,
  INTENSITY_OPTIONS,
  PACKAGING_OPTIONS,
  SCENT_EXPRESSION_OPTIONS,
  SCENT_FAMILY_OPTIONS,
  USE_CASE_OPTIONS,
} from '../data/questions';
import { getFragranceById } from '../data/fragranceLibrary';
import { useSamplingState } from '../hooks/useSamplingState';
import { trackSamplingEvent } from '../lib/analytics';
import { runRecommendationEngine } from '../lib/recommendationEngine';
import { hasContactErrors, validateContact } from '../lib/validation';
import {
  STEP_BRAND,
  STEP_COMPLETE,
  STEP_CONTACT,
  STEP_CURATION,
  STEP_EXPERIENCE,
  STEP_PREFERENCES,
  STEP_RESULTS,
  STEP_REVIEW,
  STEP_SCENT,
  STEP_WELCOME,
} from '../types/sampling';

const RECOMMEND = 'recommend';

const toggleExclusive = (current: string[], value: string, max: number, exclusiveValues: string[]) => {
  if (exclusiveValues.includes(value)) {
    return current.includes(value) ? [] : [value];
  }
  const withoutExclusive = current.filter((v) => !exclusiveValues.includes(v));
  if (withoutExclusive.includes(value)) {
    return withoutExclusive.filter((v) => v !== value);
  }
  if (withoutExclusive.length >= max) return withoutExclusive;
  return [...withoutExclusive, value];
};

export const SamplingExperience = () => {
  const {
    state,
    saveFlash,
    hasSavedBrief,
    updateLead,
    updateAnswers,
    goToStep,
    setRecommendations,
    resetState,
    resumeBrief,
    startNew,
    persist,
  } = useSamplingState();

  const { currentStep, lead, answers, recommendations, selectionSummary } = state;
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [contactErrors, setContactErrors] = useState<Record<string, string>>({});
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [showLogic, setShowLogic] = useState(false);
  const [experienceSubStep, setExperienceSubStep] = useState(0);

  useEffect(() => {
    headingRef.current?.focus({ preventScroll: true });
  }, [currentStep]);

  const handleCurationComplete = useCallback(() => {
    const result = runRecommendationEngine(answers);
    setRecommendations(result.recommendations, result.selectionSummary);
    trackSamplingEvent('curation_completed');
    goToStep(STEP_RESULTS);
  }, [answers, goToStep, setRecommendations]);

  const validateAndContinueContact = () => {
    const errors = validateContact(lead);
    if (hasContactErrors(errors)) {
      setContactErrors(errors as Record<string, string>);
      return;
    }
    setContactErrors({});
    trackSamplingEvent('lead_step_completed');
    goToStep(STEP_BRAND);
  };

  const handlePersonalityToggle = (value: string) => {
    const next = toggleExclusive(answers.brandPersonalities, value, 3, [RECOMMEND]);
    updateAnswers({ brandPersonalities: next });
    if (value === RECOMMEND) trackSamplingEvent('recommend_for_me_selected', { step: 'personality' });
  };

  const handleScentFamilyToggle = (value: string) => {
    const next = toggleExclusive(answers.scentFamilies, value, 3, [RECOMMEND]);
    updateAnswers({ scentFamilies: next });
    if (value === RECOMMEND) trackSamplingEvent('recommend_for_me_selected', { step: 'scent' });
  };

  const handleExclusionToggle = (value: string) => {
    const next = toggleExclusive(answers.exclusions, value, 10, ['none', 'unsure']);
    updateAnswers({ exclusions: next });
  };

  const startCuration = () => {
    trackSamplingEvent('brief_reviewed');
    trackSamplingEvent('curation_started');
    goToStep(STEP_CURATION);
  };

  const handleSaveExit = () => {
    persist(state);
    goToStep(STEP_WELCOME);
  };

  const downloadBrief = () => {
    const data = { lead, answers, recommendations, selectionSummary, exportedAt: new Date().toISOString() };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `brandsamor-brief-${lead.fullName.replace(/\s+/g, '-').toLowerCase() || 'sample'}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const printBrief = () => window.print();

  const countryName = COUNTRIES.find((c) => c.code === lead.country)?.name ?? lead.country;

  const renderWelcome = () => (
    <ScreenTransition>
      <div className="flex flex-1 flex-col items-center justify-center py-8 text-center">
      <p className="type-eyebrow tracking-[0.2em]">
        Curated fragrance sampling
      </p>
      <h1
        ref={headingRef}
        tabIndex={-1}
        className="mt-4 max-w-2xl type-h1"
      >
        Five fragrance directions, selected for your brand.
      </h1>
      <p className="mt-4 max-w-xl type-body-lg text-[#725F52]">
        Tell us about your brand, audience and the kind of fragrance experience you want to create.
        Brandsamor will use your brief to curate exactly five fragrance samples for you.
      </p>
      <div className="mt-8 flex justify-center gap-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <VialIllustration key={i} index={i} animate size="md" />
        ))}
      </div>
      <ul className="mt-8 flex flex-col gap-2 text-sm font-medium text-[#2B1809] sm:flex-row sm:gap-6">
        <li>Curated around your brand</li>
        <li>No fragrance expertise required</li>
        <li>Exactly five focused options</li>
      </ul>
      <div className="mt-10 flex flex-col items-center gap-4">
        <PrimaryButton
          onClick={() => {
            startNew();
          }}
        >
          Create my sample brief
        </PrimaryButton>
        {hasSavedBrief && (
          <TextLinkButton onClick={resumeBrief}>Resume saved brief</TextLinkButton>
        )}
      </div>
      </div>
    </ScreenTransition>
  );

  const renderContact = () => (
    <ScreenTransition>
      <h1 ref={headingRef} tabIndex={-1} className="sampling-question">
        First, where should we send your sample recommendations?
      </h1>
      <p className="mt-3 text-center type-body-sm text-[#725F52] sm:type-body">
        We will use these details to save your brief and contact you about your Brandsamor sample kit.
      </p>
      <div className="mt-8 space-y-5">
        <FieldInput
          id="fullName"
          label="Full name"
          value={lead.fullName}
          onChange={(v) => updateLead({ fullName: v })}
          error={contactErrors.fullName}
        />
        <FieldInput
          id="email"
          label="Work email"
          type="email"
          value={lead.email}
          onChange={(v) => updateLead({ email: v })}
          error={contactErrors.email}
        />
        <FieldInput
          id="phone"
          label="WhatsApp or phone number"
          type="tel"
          value={lead.phone}
          onChange={(v) => updateLead({ phone: v })}
          error={contactErrors.phone}
        />
        <FieldInput
          id="brandName"
          label="Brand or business name"
          value={lead.brandName ?? ''}
          onChange={(v) => updateLead({ brandName: v })}
          optional
        />
        <SearchableCountrySelect
          id="country"
          label="Country"
          value={lead.country}
          onChange={(v) => updateLead({ country: v })}
          error={contactErrors.country}
        />
        <FieldInput
          id="website"
          label="Website or social profile"
          value={lead.websiteOrSocial ?? ''}
          onChange={(v) => updateLead({ websiteOrSocial: v })}
          optional
        />
        <label className="flex items-start gap-3">
          <input
            type="checkbox"
            checked={lead.consent}
            onChange={(e) => updateLead({ consent: e.target.checked })}
            className="mt-1 h-5 w-5 rounded border-[#EADFD3] accent-[#FF600A]"
          />
          <span className="text-sm text-[#2B1809]">
            I agree that Brandsamor may contact me about my fragrance sample brief and sample kit.
          </span>
        </label>
        {contactErrors.consent && (
          <p className="text-sm text-[#B42318]" role="alert">
            {contactErrors.consent}
          </p>
        )}
      </div>
      <WizardFooter onBack={() => goToStep(STEP_WELCOME)}>
        <PrimaryButton onClick={validateAndContinueContact}>Continue</PrimaryButton>
      </WizardFooter>
    </ScreenTransition>
  );

  const renderBrand = () => (
    <ScreenTransition>
      <h1 ref={headingRef} tabIndex={-1} className="sampling-question">
        Tell us about your brand and audience.
      </h1>
      <div className="mt-8 space-y-8">
        <fieldset>
          <legend className="mb-4 type-h5">Where are you in the process?</legend>
          <div className="space-y-3">
            {BRAND_STAGE_OPTIONS.map((opt) => (
              <OptionCard
                key={opt.value}
                label={opt.label}
                selected={answers.brandStage === opt.value}
                onClick={() => updateAnswers({ brandStage: opt.value })}
              />
            ))}
          </div>
        </fieldset>
        {answers.brandStage && (
          <fieldset>
            <legend className="mb-4 type-h5">What best describes your business?</legend>
            <div className="grid gap-3 sm:grid-cols-2">
              {BUSINESS_TYPE_OPTIONS.map((opt) => (
                <OptionCard
                  key={opt.value}
                  label={opt.label}
                  icon={opt.icon}
                  selected={answers.businessType === opt.value}
                  onClick={() => updateAnswers({ businessType: opt.value })}
                />
              ))}
            </div>
            {answers.businessType === 'other' && (
              <div className="mt-4">
                <FieldInput
                  id="businessOther"
                  label="Tell us more"
                  value={answers.businessTypeOther ?? ''}
                  onChange={(v) => updateAnswers({ businessTypeOther: v })}
                  optional
                  placeholder="Describe your business type"
                />
              </div>
            )}
          </fieldset>
        )}
        {answers.businessType && (
          <fieldset>
            <legend className="mb-4 type-h5">Who is the collection mainly intended for?</legend>
            <div className="space-y-3">
              {AUDIENCE_OPTIONS.map((opt) => (
                <OptionCard
                  key={opt.value}
                  label={opt.label}
                  selected={answers.audienceDefinition === opt.value}
                  onClick={() => updateAnswers({ audienceDefinition: opt.value })}
                />
              ))}
            </div>
            {answers.audienceDefinition === 'defined' && (
              <div className="mt-4">
                <FieldInput
                  id="audienceDesc"
                  label="Describe the customer in a few words"
                  value={answers.audienceDescription ?? ''}
                  onChange={(v) => updateAnswers({ audienceDescription: v })}
                  optional
                  placeholder="Example: style-conscious boutique shoppers in their late twenties and thirties"
                />
              </div>
            )}
          </fieldset>
        )}
        {answers.audienceDefinition && (
          <fieldset>
            <legend className="mb-4 type-h5">How should the fragrance collection feel?</legend>
            <p className="mb-4 type-body-sm text-[#725F52]">
              This describes the scent style and marketing direction, not the gender identity of the person
              wearing it.
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              {SCENT_EXPRESSION_OPTIONS.map((opt) => (
                <OptionCard
                  key={opt.value}
                  label={opt.label}
                  selected={answers.scentExpression === opt.value}
                  onClick={() => {
                    updateAnswers({ scentExpression: opt.value });
                    if (opt.value === RECOMMEND) {
                      trackSamplingEvent('recommend_for_me_selected', { step: 'expression' });
                    }
                  }}
                />
              ))}
            </div>
          </fieldset>
        )}
      </div>
      <WizardFooter onBack={() => goToStep(STEP_CONTACT)}>
        <PrimaryButton
          disabled={
            !answers.brandStage ||
            !answers.businessType ||
            !answers.audienceDefinition ||
            !answers.scentExpression
          }
          onClick={() => goToStep(STEP_SCENT)}
        >
          Continue
        </PrimaryButton>
      </WizardFooter>
    </ScreenTransition>
  );

  const renderScentDirection = () => (
    <ScreenTransition>
      <h1 ref={headingRef} tabIndex={-1} className="sampling-question">
        Which scent directions feel closest to your brand?
      </h1>
      <p className="mt-3 text-center type-body-sm text-[#725F52] sm:type-body">
        Choose up to three personality traits and scent families, or let Brandsamor recommend the mix.
      </p>
      <fieldset className="mt-8">
        <legend className="mb-4 type-h5">What should the fragrance say about your brand?</legend>
        <p className="mb-3 text-sm font-semibold text-[#2B1809]">
          {answers.brandPersonalities.length} of 3 selected
        </p>
        <div className="flex flex-wrap gap-3">
          {BRAND_PERSONALITY_OPTIONS.map((opt) => {
            const selected = answers.brandPersonalities.includes(opt.value);
            const atMax =
              answers.brandPersonalities.length >= 3 &&
              !selected &&
              !answers.brandPersonalities.includes(RECOMMEND);
            return (
              <MultiSelectChip
                key={opt.value}
                label={opt.label}
                selected={selected}
                disabled={atMax}
                onClick={() => handlePersonalityToggle(opt.value)}
              />
            );
          })}
        </div>
      </fieldset>
      {answers.brandPersonalities.length > 0 && (
        <fieldset className="mt-8">
          <legend className="mb-4 type-h5">Which scent families feel closest?</legend>
          <div className="space-y-3">
            {SCENT_FAMILY_OPTIONS.map((opt) => {
              const selected = answers.scentFamilies.includes(opt.value);
              const atMax =
                answers.scentFamilies.length >= 3 &&
                !selected &&
                !answers.scentFamilies.includes(RECOMMEND);
              return (
                <OptionCard
                  key={opt.value}
                  label={opt.label}
                  description={opt.description}
                  horizontal
                  selected={selected}
                  disabled={atMax}
                  onClick={() => handleScentFamilyToggle(opt.value)}
                />
              );
            })}
          </div>
        </fieldset>
      )}
      <WizardFooter onBack={() => goToStep(STEP_BRAND)}>
        <PrimaryButton
          disabled={answers.brandPersonalities.length === 0 || answers.scentFamilies.length === 0}
          onClick={() => {
            setExperienceSubStep(0);
            goToStep(STEP_EXPERIENCE);
          }}
        >
          Continue
        </PrimaryButton>
      </WizardFooter>
    </ScreenTransition>
  );

  const renderExperience = () => {
    const allAnswered = answers.intensity && answers.useCase && answers.adventureLevel;

    return (
      <ScreenTransition>
        <h1 ref={headingRef} tabIndex={-1} className="sampling-question">
          How should the fragrances feel when worn?
        </h1>
        <div className="mt-8 space-y-8">
          <fieldset className={experienceSubStep >= 0 ? 'opacity-100' : 'opacity-40'}>
            <legend className="mb-4 type-h5">Preferred intensity</legend>
            <div className="space-y-3">
              {INTENSITY_OPTIONS.map((opt) => (
                <OptionCard
                  key={opt.value}
                  label={opt.label}
                  selected={answers.intensity === opt.value}
                  onClick={() => {
                    updateAnswers({ intensity: opt.value });
                    if (experienceSubStep < 1) setExperienceSubStep(1);
                  }}
                />
              ))}
            </div>
          </fieldset>
          {answers.intensity && (
            <fieldset>
              <legend className="mb-4 type-h5">
                Where do you imagine customers wearing or using them most?
              </legend>
              <div className="space-y-3">
                {USE_CASE_OPTIONS.map((opt) => (
                  <OptionCard
                    key={opt.value}
                    label={opt.label}
                    selected={answers.useCase === opt.value}
                    onClick={() => {
                      updateAnswers({ useCase: opt.value });
                      if (experienceSubStep < 2) setExperienceSubStep(2);
                    }}
                  />
                ))}
              </div>
            </fieldset>
          )}
          {answers.useCase && (
            <fieldset>
              <legend className="mb-4 type-h5">How adventurous should the selection be?</legend>
              <div className="space-y-3">
                {ADVENTURE_OPTIONS.map((opt) => (
                  <OptionCard
                    key={opt.value}
                    label={opt.label}
                    selected={answers.adventureLevel === opt.value}
                    onClick={() => updateAnswers({ adventureLevel: opt.value })}
                  />
                ))}
              </div>
            </fieldset>
          )}
        </div>
        {allAnswered && (
          <WizardFooter onBack={() => goToStep(STEP_SCENT)}>
            <PrimaryButton onClick={() => goToStep(STEP_PREFERENCES)}>Continue</PrimaryButton>
          </WizardFooter>
        )}
      </ScreenTransition>
    );
  };

  const renderPreferences = () => (
    <ScreenTransition>
      <h1 ref={headingRef} tabIndex={-1} className="sampling-question">
        Help us avoid the wrong directions.
      </h1>
      <div className="mt-8 space-y-8">
        <fieldset>
          <legend className="mb-4 type-h5">
            Are there any scent styles or notes you definitely want to avoid?
          </legend>
          <div className="flex flex-wrap gap-3">
            {EXCLUSION_OPTIONS.map((opt) => (
              <MultiSelectChip
                key={opt.value}
                label={opt.label}
                selected={answers.exclusions.includes(opt.value)}
                onClick={() => handleExclusionToggle(opt.value)}
              />
            ))}
          </div>
        </fieldset>
        <FieldInput
          id="liked"
          label="Are there fragrances you already like?"
          value={answers.likedFragrances ?? ''}
          onChange={(v) => updateAnswers({ likedFragrances: v })}
          optional
          placeholder="Add names only if you have examples. You can leave this blank."
        />
        <FieldInput
          id="notes"
          label="Anything else we should know?"
          value={answers.additionalNotes ?? ''}
          onChange={(v) => updateAnswers({ additionalNotes: v })}
          optional
          multiline
          placeholder="Tell us about the mood, customer, launch concept, or anything you want us to consider."
        />
      </div>
      <WizardFooter onBack={() => goToStep(STEP_EXPERIENCE)}>
        <PrimaryButton
          disabled={answers.exclusions.length === 0}
          onClick={() => goToStep(STEP_REVIEW)}
        >
          Continue
        </PrimaryButton>
      </WizardFooter>
    </ScreenTransition>
  );

  const renderReview = () => (
    <ScreenTransition>
      <h1 ref={headingRef} tabIndex={-1} className="sampling-question">
        Review your fragrance brief.
      </h1>
      <div className="mt-8 space-y-4">
        <ReviewSection
          title="Contact"
          onEdit={() => goToStep(STEP_CONTACT)}
          items={[
            { label: 'Name', value: lead.fullName },
            { label: 'Email', value: lead.email },
            { label: 'Phone', value: lead.phone },
            { label: 'Brand', value: lead.brandName || 'Not provided' },
            { label: 'Country', value: countryName },
          ]}
        />
        <ReviewSection
          title="Your brand"
          onEdit={() => goToStep(STEP_BRAND)}
          items={[
            { label: 'Stage', value: getLabel(answers.brandStage) },
            { label: 'Business', value: getLabel(answers.businessType) },
            ...(answers.businessTypeOther
              ? [{ label: 'Details', value: answers.businessTypeOther }]
              : []),
            { label: 'Audience', value: getLabel(answers.audienceDefinition) },
            ...(answers.audienceDescription
              ? [{ label: 'Customer', value: answers.audienceDescription }]
              : []),
            { label: 'Expression', value: getLabel(answers.scentExpression) },
          ]}
        />
        <ReviewSection
          title="Scent direction"
          onEdit={() => goToStep(STEP_SCENT)}
          items={[
            {
              label: 'Personality',
              value: answers.brandPersonalities.map((p) => getLabel(p)).join(', '),
            },
            {
              label: 'Families',
              value: answers.scentFamilies.map((f) => getLabel(f)).join(', '),
            },
          ]}
        />
        <ReviewSection
          title="Intensity and use"
          onEdit={() => goToStep(STEP_EXPERIENCE)}
          items={[
            { label: 'Intensity', value: getLabel(answers.intensity) },
            { label: 'Use case', value: getLabel(answers.useCase) },
            { label: 'Adventure', value: getLabel(answers.adventureLevel) },
          ]}
        />
        <ReviewSection
          title="Preferences"
          onEdit={() => goToStep(STEP_PREFERENCES)}
          items={[
            {
              label: 'Avoid',
              value: answers.exclusions.map((e) => getLabel(e)).join(', '),
            },
            ...(answers.likedFragrances
              ? [{ label: 'Likes', value: answers.likedFragrances }]
              : []),
            ...(answers.additionalNotes
              ? [{ label: 'Notes', value: answers.additionalNotes }]
              : []),
          ]}
        />
      </div>
      <WizardFooter onBack={() => goToStep(STEP_PREFERENCES)}>
        <PrimaryButton onClick={startCuration}>Curate my five fragrances</PrimaryButton>
      </WizardFooter>
    </ScreenTransition>
  );

  const renderResults = () => (
    <ScreenTransition>
      <h1 ref={headingRef} tabIndex={-1} className="type-h1">
        Your five fragrance directions are ready.
      </h1>
      <p className="mt-3 text-base leading-relaxed text-[#725F52]">
        We selected a focused mix based on your brand, audience and scent preferences. These five are
        designed to help you compare distinct directions without overwhelming you.
      </p>
      <div className="mt-8 space-y-4">
        {recommendations.map((rec, i) => {
          const profile = getFragranceById(rec.fragranceId);
          if (!profile) return null;
          return <FragranceCard key={rec.fragranceId} profile={profile} recommendation={rec} index={i} />;
        })}
      </div>
      <button
        type="button"
        onClick={() => setShowLogic(!showLogic)}
        className="mt-6 text-sm font-semibold text-[#FF600A]"
      >
        {showLogic ? 'Hide selection logic' : 'View selection logic'}
      </button>
      {showLogic && selectionSummary && (
        <p className="mt-2 rounded-xl bg-[#FEF7ED] p-4 text-sm leading-relaxed text-[#725F52]">
          {selectionSummary}
        </p>
      )}
      <div className="mt-8">
        <StickyActionBar>
          <PrimaryButton onClick={() => goToStep(STEP_COMPLETE)}>Continue to my sample kit</PrimaryButton>
        </StickyActionBar>
      </div>
    </ScreenTransition>
  );

  const renderComplete = () => (
    <ScreenTransition>
      <h1 ref={headingRef} tabIndex={-1} className="type-h1">
        Your Brandsamor sample brief is complete.
      </h1>
      <div className="mt-8 space-y-6">
        <section className="rounded-2xl border border-[#EADFD3] bg-[#FFFDFC] p-5">
          <h2 className="type-h3">Your sample kit includes</h2>
          <ul className="mt-4 space-y-2 type-body-sm text-[#725F52]">
            <li>Five curated fragrance samples</li>
            <li>Tester strips</li>
            <li>Fragrance evaluation guide</li>
          </ul>
        </section>
        <section className="rounded-2xl border border-[#EADFD3] bg-[#FFFDFC] p-5">
          <h2 className="type-h3">Packaging direction (optional)</h2>
          <p className="mt-2 type-body-sm text-[#725F52]">
            Tell us how you would like your bottle and box to feel. You can skip this for now.
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {PACKAGING_OPTIONS.map((opt) => (
              <OptionCard
                key={opt.value}
                label={opt.label}
                description={opt.description}
                selected={answers.packagingDirection === opt.value}
                onClick={() => updateAnswers({ packagingDirection: opt.value })}
              />
            ))}
          </div>
          <fieldset className="mt-6">
            <legend className="mb-3 type-body-sm font-semibold text-[#2B1809]">
              Preferred bottle size
            </legend>
            <div className="flex flex-wrap gap-3">
              {BOTTLE_SIZE_OPTIONS.map((opt) => (
                <MultiSelectChip
                  key={opt.value}
                  label={opt.label}
                  selected={answers.bottleSize === opt.value}
                  onClick={() => updateAnswers({ bottleSize: opt.value })}
                />
              ))}
            </div>
          </fieldset>
        </section>
        <section className="rounded-2xl border border-[#EADFD3] bg-[#FFFDFC] p-5">
          <h2 className="type-h3">Contact details</h2>
          <p className="mt-2 type-body-sm text-[#725F52]">
            {lead.fullName} · {lead.email} · {lead.phone}
          </p>
          {lead.brandName && (
            <p className="mt-1 text-sm font-medium text-[#2B1809]">Brand: {lead.brandName}</p>
          )}
        </section>
        <section>
          <h2 className="mb-3 type-h3">Your five fragrance directions</h2>
          <div className="space-y-3">
            {recommendations.map((rec) => {
              const profile = getFragranceById(rec.fragranceId);
              if (!profile) return null;
              return (
                <div key={rec.fragranceId} className="text-sm">
                  <span className="font-semibold text-[#2B1809]">
                    No. {profile.fragranceNumber} — {profile.customerName}
                  </span>
                  <span className="text-[#725F52]"> · {profile.description}</span>
                </div>
              );
            })}
          </div>
        </section>
      </div>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <PrimaryButton
          onClick={() => {
            trackSamplingEvent('prototype_completed');
            persist({ ...state, completed: true });
            goToStep(STEP_WELCOME);
          }}
        >
          Done
        </PrimaryButton>
        <button
          type="button"
          onClick={downloadBrief}
          className="rounded-[2px] border border-[#EADFD3] px-6 py-3.5 text-base font-semibold text-[#2B1809]"
        >
          Download brief
        </button>
        <button
          type="button"
          onClick={printBrief}
          className="rounded-[2px] border border-[#EADFD3] px-6 py-3.5 text-base font-semibold text-[#2B1809]"
        >
          Print brief
        </button>
        <TextLinkButton onClick={() => setShowResetConfirm(true)}>Start over</TextLinkButton>
      </div>
      <ConfirmDialog
        open={showResetConfirm}
        title="Start a new brief?"
        message="Start a new brief? Your saved answers will be cleared from this device."
        confirmLabel="Start over"
        onConfirm={() => {
          resetState();
          setShowResetConfirm(false);
          goToStep(STEP_WELCOME);
        }}
        onCancel={() => setShowResetConfirm(false)}
      />
    </ScreenTransition>
  );

  const renderStep = () => {
    switch (currentStep) {
      case STEP_WELCOME:
        return renderWelcome();
      case STEP_CONTACT:
        return renderContact();
      case STEP_BRAND:
        return renderBrand();
      case STEP_SCENT:
        return renderScentDirection();
      case STEP_EXPERIENCE:
        return renderExperience();
      case STEP_PREFERENCES:
        return renderPreferences();
      case STEP_REVIEW:
        return renderReview();
      case STEP_CURATION:
        return <CurationTransition onComplete={handleCurationComplete} />;
      case STEP_RESULTS:
        return renderResults();
      case STEP_COMPLETE:
        return renderComplete();
      default:
        return renderWelcome();
    }
  };

  const isQuestionnaireStep = currentStep >= STEP_CONTACT && currentStep <= STEP_REVIEW;
  const contentClassName =
    currentStep === STEP_WELCOME
      ? 'max-w-2xl'
      : isQuestionnaireStep
        ? 'max-w-lg sm:max-w-xl'
        : 'max-w-3xl';

  return (
    <div className="sampling-experience">
      <SamplingPageShell
        currentStep={currentStep}
        onSaveExit={handleSaveExit}
        saved={saveFlash}
        exitOnly={currentStep === STEP_COMPLETE}
        contentClassName={contentClassName}
      >
        <AnimatePresence mode="wait">{renderStep()}</AnimatePresence>
      </SamplingPageShell>
      <style>{`
        @keyframes vial-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
      `}</style>
    </div>
  );
};
