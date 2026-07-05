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
import { ProgressHeader } from '../components/layout/ProgressHeader';
import { StepLayout, ScreenTransition } from '../components/layout/StepLayout';
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
  STEP_AUDIENCE,
  STEP_BRAND,
  STEP_COMPLETE,
  STEP_CONTACT,
  STEP_CURATION,
  STEP_EXCLUSIONS,
  STEP_EXPERIENCE,
  STEP_PACKAGING,
  STEP_PERSONALITY,
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
    headingRef.current?.focus();
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
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-12 text-center">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#FF600A]">
        Curated fragrance sampling
      </p>
      <h1
        ref={headingRef}
        tabIndex={-1}
        className="mt-4 max-w-2xl text-[34px] font-bold leading-tight text-[#2B1809] sm:text-5xl"
      >
        Five fragrance directions, selected for your brand.
      </h1>
      <p className="mt-4 max-w-xl text-base leading-relaxed text-[#725F52] sm:text-lg">
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
  );

  const renderContact = () => (
    <ScreenTransition>
      <ProgressHeader currentQuestionStep={1} onBack={() => goToStep(STEP_WELCOME)} saved={saveFlash} />
      <h1 ref={headingRef} tabIndex={-1} className="mt-8 text-[28px] font-bold leading-tight sm:text-[38px]">
        First, where should we send your sample recommendations?
      </h1>
      <p className="mt-3 text-base text-[#725F52]">
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
        <p className="text-xs text-[#725F52]">
          Prototype: your information is saved only in this browser.
        </p>
      </div>
      <div className="mt-8 lg:mt-10">
        <StickyActionBar>
          <PrimaryButton onClick={validateAndContinueContact}>Continue to my brand brief</PrimaryButton>
        </StickyActionBar>
      </div>
    </ScreenTransition>
  );

  const renderBrand = () => (
    <ScreenTransition>
      <ProgressHeader currentQuestionStep={2} onBack={() => goToStep(STEP_CONTACT)} saved={saveFlash} />
      <h1 ref={headingRef} tabIndex={-1} className="mt-8 text-[28px] font-bold sm:text-[38px]">
        Tell us what you are building.
      </h1>
      <div className="mt-8 space-y-8">
        <fieldset>
          <legend className="mb-4 text-base font-semibold text-[#2B1809]">Where are you in the process?</legend>
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
        <fieldset>
          <legend className="mb-4 text-base font-semibold text-[#2B1809]">
            What best describes your business?
          </legend>
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
      </div>
      <div className="mt-8">
        <StickyActionBar>
          <PrimaryButton
            disabled={!answers.brandStage || !answers.businessType}
            onClick={() => goToStep(STEP_AUDIENCE)}
          >
            Continue
          </PrimaryButton>
        </StickyActionBar>
      </div>
    </ScreenTransition>
  );

  const renderAudience = () => (
    <ScreenTransition>
      <ProgressHeader currentQuestionStep={3} onBack={() => goToStep(STEP_BRAND)} saved={saveFlash} />
      <h1 ref={headingRef} tabIndex={-1} className="mt-8 text-[28px] font-bold sm:text-[38px]">
        Who should these fragrances connect with?
      </h1>
      <div className="mt-8 space-y-8">
        <fieldset>
          <legend className="mb-4 text-base font-semibold text-[#2B1809]">
            Who is the collection mainly intended for?
          </legend>
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
        <fieldset>
          <legend className="mb-4 text-base font-semibold text-[#2B1809]">
            How should the fragrance collection feel?
          </legend>
          <p className="mb-4 text-sm text-[#725F52]">
            This describes the scent style and marketing direction, not the gender identity of the person
            wearing it.
          </p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {SCENT_EXPRESSION_OPTIONS.map((opt) => (
              <OptionCard
                key={opt.value}
                label={opt.label}
                selected={answers.scentExpression === opt.value}
                onClick={() => {
                  updateAnswers({ scentExpression: opt.value });
                  if (opt.value === RECOMMEND) trackSamplingEvent('recommend_for_me_selected', { step: 'expression' });
                }}
              />
            ))}
          </div>
        </fieldset>
      </div>
      <div className="mt-8">
        <StickyActionBar>
          <PrimaryButton
            disabled={!answers.audienceDefinition || !answers.scentExpression}
            onClick={() => goToStep(STEP_PERSONALITY)}
          >
            Continue
          </PrimaryButton>
        </StickyActionBar>
      </div>
    </ScreenTransition>
  );

  const renderPersonality = () => (
    <ScreenTransition>
      <ProgressHeader currentQuestionStep={4} onBack={() => goToStep(STEP_AUDIENCE)} saved={saveFlash} />
      <h1 ref={headingRef} tabIndex={-1} className="mt-8 text-[28px] font-bold sm:text-[38px]">
        What should the fragrance say about your brand?
      </h1>
      <p className="mt-3 text-base text-[#725F52]">Choose up to three. There are no wrong answers.</p>
      <p className="mt-2 text-sm font-semibold text-[#FF600A]">
        {answers.brandPersonalities.length} of 3 selected
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
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
      <div className="mt-8">
        <StickyActionBar>
          <PrimaryButton
            disabled={answers.brandPersonalities.length === 0}
            onClick={() => goToStep(STEP_SCENT)}
          >
            Continue
          </PrimaryButton>
        </StickyActionBar>
      </div>
    </ScreenTransition>
  );

  const renderScent = () => (
    <ScreenTransition>
      <ProgressHeader currentQuestionStep={5} onBack={() => goToStep(STEP_PERSONALITY)} saved={saveFlash} />
      <h1 ref={headingRef} tabIndex={-1} className="mt-8 text-[28px] font-bold sm:text-[38px]">
        Which scent directions feel closest to your brand?
      </h1>
      <p className="mt-3 text-base text-[#725F52]">
        Choose up to three, or let Brandsamor recommend the mix.
      </p>
      <div className="mt-6 space-y-3">
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
      <div className="mt-8">
        <StickyActionBar>
          <PrimaryButton
            disabled={answers.scentFamilies.length === 0}
            onClick={() => {
              setExperienceSubStep(0);
              goToStep(STEP_EXPERIENCE);
            }}
          >
            Continue
          </PrimaryButton>
        </StickyActionBar>
      </div>
    </ScreenTransition>
  );

  const renderExperience = () => {
    const allAnswered = answers.intensity && answers.useCase && answers.adventureLevel;

    return (
      <ScreenTransition>
        <ProgressHeader currentQuestionStep={6} onBack={() => goToStep(STEP_SCENT)} saved={saveFlash} />
        <h1 ref={headingRef} tabIndex={-1} className="mt-8 text-[28px] font-bold sm:text-[38px]">
          How should the fragrances feel when worn?
        </h1>
        <div className="mt-8 space-y-8">
          <fieldset className={experienceSubStep >= 0 ? 'opacity-100' : 'opacity-40'}>
            <legend className="mb-4 text-base font-semibold">Preferred intensity</legend>
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
              <legend className="mb-4 text-base font-semibold">
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
              <legend className="mb-4 text-base font-semibold">How adventurous should the selection be?</legend>
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
          <div className="mt-8">
            <StickyActionBar>
              <PrimaryButton onClick={() => goToStep(STEP_EXCLUSIONS)}>Continue</PrimaryButton>
            </StickyActionBar>
          </div>
        )}
      </ScreenTransition>
    );
  };

  const renderExclusions = () => (
    <ScreenTransition>
      <ProgressHeader currentQuestionStep={7} onBack={() => goToStep(STEP_EXPERIENCE)} saved={saveFlash} />
      <h1 ref={headingRef} tabIndex={-1} className="mt-8 text-[28px] font-bold sm:text-[38px]">
        Help us avoid the wrong directions.
      </h1>
      <div className="mt-8 space-y-8">
        <fieldset>
          <legend className="mb-4 text-base font-semibold">
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
      <div className="mt-8">
        <StickyActionBar>
          <PrimaryButton
            disabled={answers.exclusions.length === 0}
            onClick={() => goToStep(STEP_PACKAGING)}
          >
            Continue to packaging
          </PrimaryButton>
        </StickyActionBar>
      </div>
    </ScreenTransition>
  );

  const renderPackaging = () => (
    <ScreenTransition>
      <ProgressHeader currentQuestionStep={8} onBack={() => goToStep(STEP_EXCLUSIONS)} saved={saveFlash} />
      <h1 ref={headingRef} tabIndex={-1} className="mt-8 text-[28px] font-bold sm:text-[38px]">
        What should the sample packaging direction feel like?
      </h1>
      <p className="mt-3 text-base text-[#725F52]">
        Your sample kit includes one bottle-and-box packaging direction.
      </p>
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
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
      <fieldset className="mt-8">
        <legend className="mb-4 text-base font-semibold">Preferred bottle size for the eventual product</legend>
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
      <div className="mt-8">
        <StickyActionBar>
          <PrimaryButton
            disabled={!answers.packagingDirection}
            onClick={() => goToStep(STEP_REVIEW)}
          >
            Continue
          </PrimaryButton>
        </StickyActionBar>
      </div>
    </ScreenTransition>
  );

  const renderReview = () => (
    <ScreenTransition>
      <ProgressHeader
        currentQuestionStep={9}
        stepLabel="Review"
        onBack={() => goToStep(STEP_PACKAGING)}
        saved={saveFlash}
      />
      <h1 ref={headingRef} tabIndex={-1} className="mt-8 text-[28px] font-bold sm:text-[38px]">
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
          title="Brand stage"
          onEdit={() => goToStep(STEP_BRAND)}
          items={[{ label: 'Stage', value: getLabel(answers.brandStage) }]}
        />
        <ReviewSection
          title="Business type"
          onEdit={() => goToStep(STEP_BRAND)}
          items={[
            { label: 'Type', value: getLabel(answers.businessType) },
            ...(answers.businessTypeOther
              ? [{ label: 'Details', value: answers.businessTypeOther }]
              : []),
          ]}
        />
        <ReviewSection
          title="Intended audience"
          onEdit={() => goToStep(STEP_AUDIENCE)}
          items={[
            { label: 'Audience', value: getLabel(answers.audienceDefinition) },
            ...(answers.audienceDescription
              ? [{ label: 'Description', value: answers.audienceDescription }]
              : []),
          ]}
        />
        <ReviewSection
          title="Scent expression"
          onEdit={() => goToStep(STEP_AUDIENCE)}
          items={[{ label: 'Expression', value: getLabel(answers.scentExpression) }]}
        />
        <ReviewSection
          title="Brand personality"
          onEdit={() => goToStep(STEP_PERSONALITY)}
          items={[
            {
              label: 'Selected',
              value: answers.brandPersonalities.map((p) => getLabel(p)).join(', '),
            },
          ]}
        />
        <ReviewSection
          title="Scent directions"
          onEdit={() => goToStep(STEP_SCENT)}
          items={[
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
          title="Exclusions"
          onEdit={() => goToStep(STEP_EXCLUSIONS)}
          items={[
            {
              label: 'Avoid',
              value: answers.exclusions.map((e) => getLabel(e)).join(', '),
            },
          ]}
        />
        <ReviewSection
          title="Packaging"
          onEdit={() => goToStep(STEP_PACKAGING)}
          items={[
            { label: 'Direction', value: getLabel(answers.packagingDirection) },
            { label: 'Bottle size', value: getLabel(answers.bottleSize, 'Not decided') },
          ]}
        />
      </div>
      <div className="mt-8">
        <StickyActionBar
          secondary={
            <TextLinkButton onClick={() => goToStep(STEP_WELCOME)}>Save and exit</TextLinkButton>
          }
        >
          <PrimaryButton onClick={startCuration}>Curate my five fragrances</PrimaryButton>
        </StickyActionBar>
      </div>
    </ScreenTransition>
  );

  const renderResults = () => (
    <ScreenTransition>
      <h1 ref={headingRef} tabIndex={-1} className="text-[28px] font-bold sm:text-[38px]">
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
      <h1 ref={headingRef} tabIndex={-1} className="text-[28px] font-bold sm:text-[38px]">
        Your Brandsamor sample brief is complete.
      </h1>
      <div className="mt-8 space-y-6">
        <section className="rounded-2xl border border-[#EADFD3] bg-[#FFFDFC] p-5">
          <h2 className="text-lg font-bold">Your sample kit includes</h2>
          <ul className="mt-4 space-y-2 text-sm text-[#725F52]">
            <li>Five curated fragrance samples</li>
            <li>One packaging direction: {getLabel(answers.packagingDirection)}</li>
            <li>Tester strips</li>
            <li>Fragrance evaluation guide</li>
          </ul>
        </section>
        <section className="rounded-2xl border border-[#EADFD3] bg-[#FFFDFC] p-5">
          <h2 className="text-lg font-bold">Contact details</h2>
          <p className="mt-2 text-sm text-[#725F52]">
            {lead.fullName} · {lead.email} · {lead.phone}
          </p>
          {lead.brandName && (
            <p className="mt-1 text-sm font-medium text-[#2B1809]">Brand: {lead.brandName}</p>
          )}
        </section>
        <section>
          <h2 className="mb-3 text-lg font-bold">Your five fragrance directions</h2>
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
        <p className="rounded-xl border border-[#EADFD3] bg-[#FEF7ED] p-4 text-sm text-[#725F52]">
          This is a frontend prototype. Checkout and final order processing will be connected after the
          application architecture is finalised.
        </p>
      </div>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <PrimaryButton
          onClick={() => {
            trackSamplingEvent('prototype_completed');
            persist({ ...state, completed: true });
            goToStep(STEP_WELCOME);
          }}
        >
          Finish prototype
        </PrimaryButton>
        <button
          type="button"
          onClick={downloadBrief}
          className="rounded-xl border border-[#EADFD3] px-6 py-3.5 text-base font-semibold text-[#2B1809]"
        >
          Download brief
        </button>
        <button
          type="button"
          onClick={printBrief}
          className="rounded-xl border border-[#EADFD3] px-6 py-3.5 text-base font-semibold text-[#2B1809]"
        >
          Print brief
        </button>
        <TextLinkButton onClick={() => setShowResetConfirm(true)}>Start over</TextLinkButton>
      </div>
      <ConfirmDialog
        open={showResetConfirm}
        title="Start a new brief?"
        message="Start a new brief? Your saved prototype answers will be cleared from this device."
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
      case STEP_AUDIENCE:
        return renderAudience();
      case STEP_PERSONALITY:
        return renderPersonality();
      case STEP_SCENT:
        return renderScent();
      case STEP_EXPERIENCE:
        return renderExperience();
      case STEP_EXCLUSIONS:
        return renderExclusions();
      case STEP_PACKAGING:
        return renderPackaging();
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

  const useLayout = currentStep >= STEP_CONTACT && currentStep <= STEP_REVIEW;

  return (
    <div className="sampling-experience">
      {useLayout ? (
        <StepLayout
          contextTitle={
            currentStep === STEP_REVIEW
              ? 'Almost there'
              : currentStep === STEP_CONTACT
                ? 'Your brief starts here'
                : undefined
          }
          showVials={currentStep !== STEP_REVIEW}
        >
          <AnimatePresence mode="wait">{renderStep()}</AnimatePresence>
        </StepLayout>
      ) : currentStep === STEP_CURATION || currentStep === STEP_RESULTS || currentStep === STEP_COMPLETE ? (
        <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
          <AnimatePresence mode="wait">{renderStep()}</AnimatePresence>
        </div>
      ) : (
        <AnimatePresence mode="wait">{renderStep()}</AnimatePresence>
      )}
      <style>{`
        @keyframes vial-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
      `}</style>
    </div>
  );
};
