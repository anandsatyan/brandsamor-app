import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import '@fontsource/manrope/400.css';
import '@fontsource/manrope/500.css';
import '@fontsource/manrope/600.css';
import '@fontsource/manrope/700.css';
import '../styles/sampling.css';

import { useAuth } from '../../account/AuthContext';
import { SignInPanel } from '../../account/SignInPanel';
import { OptionCard } from '../components/form/OptionCard';
import { MultiSelectChip } from '../components/form/MultiSelectChip';
import { FieldInput } from '../components/form/FieldInput';
import { SearchableCountrySelect } from '../components/form/SearchableCountrySelect';
import { SamplingPageShell, ScreenTransition } from '../components/layout/SamplingPageShell';
import { WizardFooter } from '../components/layout/WizardFooter';
import { StickyActionBar, PrimaryButton, TextLinkButton } from '../components/layout/StickyActionBar';
import { FiveBottleSampleSet } from '../components/sampling/FiveBottleSampleSet';
import { CurationTransition } from '../components/sampling/CurationTransition';
import { ShopifyCheckout, type CheckoutFormData, type PaidCheckoutResult } from '../components/checkout/ShopifyCheckout';
import { OrderThankYou } from '../components/checkout/OrderThankYou';
import { ReviewSection } from '../components/feedback/ReviewSection';
import { ConfirmDialog } from '../components/feedback/ConfirmDialog';
import { getStripePublishableKey } from '../lib/stripeClient';
import {
  formatSampleKitMoney,
  getSampleKitPrice,
  sampleKitPriceLabel,
} from '../lib/sampleKitPricing';

import {
  BOTTLE_SIZE_OPTIONS,
  BRAND_PERSONALITY_OPTIONS,
  BRAND_STAGE_OPTIONS,
  BUSINESS_TYPE_OPTIONS,
  COMMERCIAL_TIER_OPTIONS,
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
import { saveSamplingStep } from '../lib/samplingApi';
import { fetchPublicFragrances, type PublicFragrance } from '../lib/fragranceApi';
import { hasContactErrors, validateContact } from '../lib/validation';
import { ORGANIZATION } from '../../seo/siteConfig';
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
  STEP_CHECKOUT,
  STEP_DONE,
  SAMPLING_STATE_VERSION,
  createEmptyLead,
  createEmptyAnswers,
  type SamplingState,
} from '../types/sampling';
import type { AccountSamplingSession } from '../../account/api';

const RECOMMEND = 'recommend';

function samplingSessionToState(session: AccountSamplingSession): SamplingState {
  return {
    version: SAMPLING_STATE_VERSION,
    currentStep: session.currentStep || STEP_CONTACT,
    lead: session.lead
      ? {
          fullName: session.lead.fullName || '',
          email: session.lead.email || '',
          phone: session.lead.phone || '',
          brandName: session.lead.brandName || '',
          country: session.lead.country || 'US',
          consent: Boolean(session.lead.consent),
        }
      : createEmptyLead(),
    answers: {
      ...createEmptyAnswers(),
      ...(session.answers || {}),
    },
    recommendations: session.recommendations || [],
    selectionSummary: session.selectionSummary || undefined,
    sessionId: session.sessionId,
    completed: Boolean(session.completed),
    updatedAt:
      typeof session.updatedAt === 'string'
        ? session.updatedAt
        : session.updatedAt
          ? new Date(session.updatedAt).toISOString()
          : new Date().toISOString(),
  };
}

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
    hasCheckoutReady,
    updateLead,
    updateAnswers,
    goToStep,
    resetState,
    resumeBrief,
    startNew,
    persist,
  } = useSamplingState();
  const { authenticated, openSampling, syncLocalToAccount } = useAuth();

  const { currentStep, lead, answers, recommendations, selectionSummary, sessionId } = state;

  // Hydrate local draft from the signed-in cloud session when local is empty/stale.
  useEffect(() => {
    if (!authenticated || !openSampling?.sessionId) return;
    const cloudUpdated = openSampling.updatedAt
      ? new Date(openSampling.updatedAt).getTime()
      : 0;
    const localUpdated = state.updatedAt ? new Date(state.updatedAt).getTime() : 0;
    const localIsEmpty = !state.sessionId && state.currentStep <= STEP_WELCOME;
    const cloudIsNewer =
      openSampling.sessionId !== state.sessionId && cloudUpdated > localUpdated + 1000;
    if (localIsEmpty || cloudIsNewer) {
      persist(samplingSessionToState(openSampling));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authenticated, openSampling?.sessionId]);

  useEffect(() => {
    if (authenticated && sessionId) {
      void syncLocalToAccount();
    }
  }, [authenticated, sessionId, syncLocalToAccount]);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [contactErrors, setContactErrors] = useState<Record<string, string>>({});
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [showWelcomeSignIn, setShowWelcomeSignIn] = useState(false);
  const [showLogic, setShowLogic] = useState(false);
  const [experienceSubStep, setExperienceSubStep] = useState(0);
  const [recommendedFragrances, setRecommendedFragrances] = useState<PublicFragrance[]>([]);
  const [loadingFragrances, setLoadingFragrances] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);
  const [paymentClientSecret, setPaymentClientSecret] = useState<string | null>(null);
  const [paymentIntentId, setPaymentIntentId] = useState<string | null>(null);
  const paymentIntentIdRef = useRef<string | null>(null);
  const [kitCharge, setKitCharge] = useState(() => getSampleKitPrice('US'));
  const [paymentRecord, setPaymentRecord] = useState<Record<string, unknown> | null>(null);
  const [orderRecord, setOrderRecord] = useState<Record<string, unknown> | null>(null);
  const [initializingPayment, setInitializingPayment] = useState(false);
  const [finalizingReturn, setFinalizingReturn] = useState(false);

  useEffect(() => {
    headingRef.current?.focus({ preventScroll: true });
  }, [currentStep]);

  useEffect(() => {
    paymentIntentIdRef.current = paymentIntentId;
  }, [paymentIntentId]);

  useEffect(() => {
    setKitCharge(getSampleKitPrice(lead.country));
  }, [lead.country]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const isReturn = params.get('payment_return') === '1';
    const returnedIntentId = params.get('payment_intent');
    const returnedSessionId = params.get('session_id') || sessionId;

    if (!isReturn || !returnedIntentId || !returnedSessionId) return;

    let cancelled = false;
    setFinalizingReturn(true);

    (async () => {
      try {
        const res = await fetch('/api/checkout/confirm-payment', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            sessionId: returnedSessionId,
            paymentIntentId: returnedIntentId,
          }),
        });
        const data = await res.json();
        if (!res.ok || !data?.ok) {
          throw new Error(data?.error ?? 'Could not confirm redirected payment');
        }
        if (cancelled) return;
        setPaymentIntentId(returnedIntentId);
        setPaymentRecord(data.payment ?? null);
        setOrderRecord(data.order ?? null);
        persist({
          ...state,
          sessionId: returnedSessionId,
          completed: true,
          currentStep: STEP_DONE,
        });
        window.history.replaceState({}, '', '/curated-sampling');
      } catch (e) {
        if (!cancelled) {
          setCheckoutError(e instanceof Error ? e.message : 'Payment confirmation failed');
          goToStep(STEP_CHECKOUT);
        }
      } finally {
        if (!cancelled) setFinalizingReturn(false);
      }
    })();

    return () => {
      cancelled = true;
    };
    // Only run on mount for redirect returns.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const completeStep = useCallback(
    async (step: string, nextStep: number) => {
      const saved = await saveSamplingStep({
        sessionId,
        step,
        lead,
        answers,
        currentStep: nextStep,
      });
      persist({
        ...state,
        sessionId: saved?.sessionId ?? sessionId,
        currentStep: nextStep,
      });
      trackSamplingEvent('step_completed', { step });
      trackSamplingEvent('step_viewed', { step: nextStep });
    },
    [answers, lead, persist, sessionId, state],
  );

  useEffect(() => {
    if (currentStep !== STEP_RESULTS && currentStep !== STEP_CHECKOUT) return;
    if (recommendations.length === 0) {
      setRecommendedFragrances([]);
      return;
    }

    let cancelled = false;
    setLoadingFragrances(true);

    (async () => {
      const slugs = recommendations.map((r) => r.fragranceId);
      const fromApi = await fetchPublicFragrances(slugs);

      const ordered: PublicFragrance[] = [];
      for (const rec of recommendations) {
        const apiFragrance = fromApi.get(rec.fragranceId);
        if (apiFragrance) {
          ordered.push(apiFragrance);
          continue;
        }
        const local = getFragranceById(rec.fragranceId);
        if (local) {
          ordered.push({
            number: Number(local.fragranceNumber),
            slug: local.id,
            name: local.customerName,
            descriptionShort: local.description,
            primaryFamily: local.primaryFamily,
            tags: local.tags,
            notes: { top: [], heart: [], base: [], hero: [] },
          });
        }
      }

      if (!cancelled) {
        setRecommendedFragrances(ordered);
        setLoadingFragrances(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [currentStep, recommendations]);

  const handleCurationComplete = useCallback(() => {
    (async () => {
      try {
        const res = await fetch('/api/sampling/curate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ lead, answers, sessionId }),
        });
        if (!res.ok) {
          throw new Error('Failed to curate recommendations');
        }
        const data = await res.json();
        const mapped = (data.recommendations ?? []).map((r: { fragranceSlug: string; role: string; reason: string }) => ({
          fragranceId: r.fragranceSlug,
          role: r.role,
          reason: r.reason,
        }));

        persist({
          ...state,
          sessionId: data.sessionId ?? sessionId,
          recommendations: mapped,
          selectionSummary: data.selectionSummary,
          currentStep: STEP_RESULTS,
        });
        trackSamplingEvent('curation_completed');
        trackSamplingEvent('step_viewed', { step: STEP_RESULTS });
      } catch (e) {
        console.error(e);
        const result = runRecommendationEngine(answers);
        persist({
          ...state,
          recommendations: result.recommendations,
          selectionSummary: result.selectionSummary,
          currentStep: STEP_RESULTS,
        });
        trackSamplingEvent('step_viewed', { step: STEP_RESULTS });
      }
    })();
  }, [answers, lead, persist, sessionId, state]);

  const validateAndContinueContact = async () => {
    const errors = validateContact(lead);
    if (hasContactErrors(errors)) {
      setContactErrors(errors as Record<string, string>);
      return;
    }
    setContactErrors({});
    trackSamplingEvent('lead_step_completed');
    await completeStep('contact', STEP_BRAND);
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
    const next = toggleExclusive(answers.exclusions, value, 4, ['none', 'unsure']);
    updateAnswers({ exclusions: next });
  };

  const startCuration = () => {
    trackSamplingEvent('brief_reviewed');
    trackSamplingEvent('curation_started');
    goToStep(STEP_CURATION);
  };

  const handleSaveExit = async () => {
    // Only persist after contact is completed (session exists / past step 1).
    const canPersistExit = Boolean(sessionId) || currentStep > STEP_CONTACT;

    if (canPersistExit) {
      await saveSamplingStep({
        sessionId,
        step: 'save_exit',
        lead,
        answers,
        currentStep,
      });
      persist(state);
      trackSamplingEvent('save_exit', { step: currentStep });
    }

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
  const resultsPriceLabel = sampleKitPriceLabel(lead.country);

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
        Tell us about your brand and the kind of fragrance experience you want to create.
        Brandsamor will use your brief to curate exactly five fragrance samples for you.
      </p>
      <div className="mt-10 flex w-full max-w-md flex-col items-center gap-4">
        {hasCheckoutReady ? (
          <>
            <PrimaryButton onClick={resumeBrief}>Continue to checkout</PrimaryButton>
            <TextLinkButton onClick={() => setShowResetConfirm(true)}>
              Start a new curated sampling
            </TextLinkButton>
          </>
        ) : showWelcomeSignIn ? (
          <>
            <div className="w-full text-left">
              <SignInPanel
                nextPath="/curated-sampling"
                compact
                title={authenticated ? 'Brief synced to your account' : 'Sign in to resume on any device'}
              />
            </div>
            <TextLinkButton
              onClick={() => {
                setShowWelcomeSignIn(false);
                startNew();
              }}
            >
              Start afresh
            </TextLinkButton>
          </>
        ) : (
          <>
            <PrimaryButton
              onClick={() => {
                startNew();
              }}
            >
              Create my sample brief
            </PrimaryButton>
            {(hasSavedBrief || (authenticated && openSampling)) && (
              <TextLinkButton
                onClick={() => {
                  if (authenticated && openSampling && !hasSavedBrief) {
                    persist(samplingSessionToState(openSampling));
                    goToStep(
                      openSampling.currentStep > STEP_WELCOME
                        ? openSampling.currentStep
                        : STEP_CONTACT,
                    );
                    return;
                  }
                  resumeBrief();
                }}
              >
                Resume saved brief
              </TextLinkButton>
            )}
            <button
              type="button"
              onClick={() => setShowWelcomeSignIn(true)}
              className="max-w-md text-balance text-sm font-medium leading-relaxed text-[#725F52] underline-offset-2 hover:text-[#2B1809] hover:underline"
            >
              Sign in if you&apos;ve already started this process, or if you want to resume a previous
              curated sampling process.
            </button>
          </>
        )}
      </div>
      <div className="mt-10 flex justify-center">
        <FiveBottleSampleSet size="sm" />
      </div>
      <ul className="mt-8 flex flex-col gap-2 text-sm font-medium text-[#2B1809] sm:flex-row sm:gap-6">
        <li>Curated around your brand</li>
        <li>No fragrance expertise required</li>
        <li>Exactly five focused options</li>
      </ul>
      <p className="mt-10 type-caption text-[#725F52]">
        © {new Date().getFullYear()}, {ORGANIZATION.legalName}
      </p>
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
        Tell us about your brand.
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
            !answers.brandStage || !answers.businessType || !answers.scentExpression
          }
          onClick={() => completeStep('brand', STEP_SCENT)}
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
            completeStep('scent', STEP_EXPERIENCE);
          }}
        >
          Continue
        </PrimaryButton>
      </WizardFooter>
    </ScreenTransition>
  );

  const renderExperience = () => {
    const allAnswered = answers.intensity && answers.useCase;

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
        </div>
        {allAnswered && (
          <WizardFooter onBack={() => goToStep(STEP_SCENT)}>
            <PrimaryButton onClick={() => completeStep('experience', STEP_PREFERENCES)}>Continue</PrimaryButton>
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
            What kind of fragrance product do you want to create?
          </legend>
          <p className="mb-4 type-body-sm text-[#725F52]">
            This helps us recommend the right scent quality, packaging direction, and production route
            without needing exact pricing yet.
          </p>
          <div className="space-y-3">
            {COMMERCIAL_TIER_OPTIONS.map((opt) => (
              <OptionCard
                key={opt.value}
                label={opt.label}
                selected={answers.commercialTier === opt.value}
                onClick={() => updateAnswers({ commercialTier: opt.value })}
              />
            ))}
          </div>
        </fieldset>
        <fieldset>
          <legend className="mb-4 type-h5">
            Are there any scent styles or notes you definitely want to{' '}
            <strong className="font-bold">AVOID</strong>?
          </legend>
          <p className="mb-3 type-caption text-[#725F52]">
            Choose up to 4. Selecting none/unsure clears the others.
          </p>
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
          label={
            <>
              Are there fragrances you already <strong className="font-bold">LIKE</strong>?
            </>
          }
          value={answers.likedFragrances ?? ''}
          onChange={(v) => updateAnswers({ likedFragrances: v })}
          optional
          placeholder="Example: Dior Sauvage, Yves Saint Laurent Black Opium, or Le Labo Santal 33"
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
          disabled={answers.exclusions.length === 0 || !answers.commercialTier}
          onClick={() => completeStep('preferences', STEP_REVIEW)}
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
          ]}
        />
        <ReviewSection
          title="Preferences"
          onEdit={() => goToStep(STEP_PREFERENCES)}
          items={[
            ...(answers.commercialTier
              ? [{ label: 'Product type', value: getLabel(answers.commercialTier) }]
              : []),
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
        Kit curated from your brief — complete checkout to lock these five.
      </p>

      <div className="results-cart mt-8">
        <div className="results-cart-header">
          <span>Your curated sample kit</span>
          <span className="results-cart-total">{resultsPriceLabel}</span>
        </div>
        <div className="divide-y divide-[#e8e0d8]">
          {loadingFragrances && recommendations.length > 0 && (
            <p className="p-5 text-sm text-[#725F52]">Loading your fragrance selections…</p>
          )}
          {!loadingFragrances && recommendedFragrances.length === 0 && recommendations.length === 0 && (
            <p className="p-5 text-sm text-[#725F52]">No recommendations available yet.</p>
          )}
          {recommendations.map((rec) => {
            const fragrance = recommendedFragrances.find((f) => f.slug === rec.fragranceId);
            if (!fragrance) {
              if (loadingFragrances) return null;
              return (
                <div key={rec.fragranceId} className="p-5 text-sm text-[#725F52]">
                  {rec.fragranceId.replace(/-/g, ' ')}
                </div>
              );
            }
            return (
              <div key={rec.fragranceId} className="flex gap-4 p-5">
                <div
                  className="flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-[2px] border border-[#e8e0d8] bg-[#faf7f2] text-[#2b1809]"
                  aria-label={`Fragrance number ${fragrance.number}`}
                >
                  <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#725F52]">
                    No.
                  </span>
                  <span className="font-serif text-phi-xl leading-none tabular-nums font-semibold">
                    {fragrance.number}
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-[#2b1809]">{fragrance.name}</p>
                  <p className="mt-1 text-sm text-[#725f52]">{fragrance.descriptionShort}</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {fragrance.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-[#f3efe3] px-2.5 py-0.5 text-xs font-medium text-[#2b1809]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <p className="mt-2 text-sm italic text-[#725f52]">{rec.reason}</p>
                </div>
                <span className="hidden shrink-0 self-start rounded-full bg-[#faf7f2] px-3 py-1 text-xs font-semibold capitalize text-[#2b1809] sm:inline">
                  {rec.role.replace('-', ' ')}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <section className="mt-6 rounded-[2px] border border-[#EADFD3] bg-[#FFFDFC] p-5">
        <h2 className="text-sm font-semibold uppercase tracking-[0.08em] text-[#2B1809]">
          What&apos;s included
        </h2>
        <ul className="mt-3 space-y-2 text-sm leading-relaxed text-[#725F52]">
          <li>Five fragrance samples matched to your brief</li>
          <li>Tester strips and a short evaluation guide</li>
          <li>Standard shipping included</li>
          <li>
            Your {resultsPriceLabel} sample-kit payment can be redeemed toward your first bulk /
            production order with Brandsamor
          </li>
        </ul>
      </section>

      <section className="mt-4 rounded-[2px] border border-[#EADFD3] bg-[#faf7f2] p-5">
        <h2 className="text-sm font-semibold uppercase tracking-[0.08em] text-[#2B1809]">
          What happens after the kit
        </h2>
        <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-relaxed text-[#725F52]">
          <li>We ship your five directions so you can compare them on skin.</li>
          <li>You tell us which direction wins (or what to tweak).</li>
          <li>We move into packaging and production when you&apos;re ready.</li>
        </ol>
        <p className="mt-3 text-sm leading-relaxed text-[#725F52]">
          Founders use this kit to validate scent before committing to a batch — not as a
          catalogue browse.
        </p>
      </section>

      <div className="mt-8">
        <StickyActionBar>
          <PrimaryButton onClick={() => goToStep(STEP_CHECKOUT)}>
            Lock in these five — continue to checkout
          </PrimaryButton>
        </StickyActionBar>
        <p className="mt-3 text-center text-xs text-[#725F52]">
          Shipping included · {resultsPriceLabel} redeemable on your first bulk order
        </p>
      </div>

      <button
        type="button"
        onClick={() => setShowLogic(!showLogic)}
        className="mt-6 text-sm text-[#725F52] underline-offset-2 hover:text-[#2B1809] hover:underline"
      >
        {showLogic ? 'Hide selection logic' : 'View selection logic'}
      </button>
      {showLogic && selectionSummary && (
        <p className="mt-2 rounded-[2px] bg-[#f3efe3] p-4 text-sm leading-relaxed text-[#725F52]">
          {selectionSummary}
        </p>
      )}
    </ScreenTransition>
  );

  const ensurePaymentIntent = async (checkout: CheckoutFormData) => {
    setCheckoutError(null);
    if (!sessionId) {
      setCheckoutError('Missing sampling session. Please restart checkout.');
      return;
    }
    if (!getStripePublishableKey()) {
      setCheckoutError('Stripe publishable key is not configured (VITE_STRIPE_PUBLISHABLE_KEY).');
      return;
    }

    setInitializingPayment(true);
    try {
      const res = await fetch('/api/checkout/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId,
          checkout,
          reusePaymentIntentId: paymentIntentIdRef.current || undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error ?? 'Could not initialize payment');
      if (!data?.clientSecret || !data?.paymentIntentId) {
        throw new Error('Payment could not be initialized');
      }
      setPaymentClientSecret(data.clientSecret);
      setPaymentIntentId(data.paymentIntentId);
      if (typeof data.amount === 'number' && data.currency) {
        setKitCharge({
          amount: data.amount,
          currency: String(data.currency).toLowerCase(),
        });
      } else {
        setKitCharge(getSampleKitPrice(checkout.shipping?.country || lead.country));
      }
    } catch (e) {
      setCheckoutError(e instanceof Error ? e.message : 'Could not initialize payment');
    } finally {
      setInitializingPayment(false);
    }
  };

  const handlePaymentPaid = (result: PaidCheckoutResult) => {
    setPaymentRecord(result.payment);
    setOrderRecord(result.order);
    setPaymentClientSecret(null);
    persist({ ...state, completed: true, currentStep: STEP_DONE });
    goToStep(STEP_DONE);
    trackSamplingEvent('payment_succeeded', {
      paymentIntentId: String(result.payment.paymentIntentId ?? paymentIntentId ?? ''),
      sampleOrderNumber: result.order?.sampleOrderNumber,
      transactionId: result.order?.transactionId,
    });
  };

  const handleRestartFromCheckout = () => {
    setShowResetConfirm(true);
  };

  const renderCheckout = () => (
    <ScreenTransition>
      {!sessionId ? (
        <p className="type-body text-[#725F52]">Missing session. Please restart the sampling brief.</p>
      ) : (
        <ShopifyCheckout
          lead={lead}
          fragrances={recommendedFragrances}
          sessionId={sessionId}
          clientSecret={paymentClientSecret}
          paymentIntentId={paymentIntentId}
          kitPrice={kitCharge}
          priceLabel={formatSampleKitMoney(kitCharge.amount, kitCharge.currency)}
          initializingPayment={initializingPayment}
          onEnsurePaymentIntent={ensurePaymentIntent}
          onPaid={handlePaymentPaid}
          onRestart={handleRestartFromCheckout}
          error={checkoutError}
        />
      )}
    </ScreenTransition>
  );

  const renderDone = () => {
    if (finalizingReturn) {
      return (
        <ScreenTransition>
          <h1 ref={headingRef} tabIndex={-1} className="type-h1">
            Confirming your payment…
          </h1>
          <p className="mt-3 type-body text-[#725F52]">Please wait a moment.</p>
        </ScreenTransition>
      );
    }

    if (paymentRecord || orderRecord) {
      return (
        <ScreenTransition>
          <div ref={headingRef} tabIndex={-1}>
            <OrderThankYou
              order={orderRecord}
              payment={paymentRecord}
              onDone={() => {
                persist({ ...state, completed: true });
                goToStep(STEP_WELCOME);
              }}
            />
          </div>
        </ScreenTransition>
      );
    }

    return (
      <ScreenTransition>
        <h1 ref={headingRef} tabIndex={-1} className="type-h1">
          Payment unavailable
        </h1>
        <p className="mt-3 type-body text-[#725F52]">
          We could not load your confirmation. Return to checkout and try again.
        </p>
        <div className="mt-8">
          <StickyActionBar>
            <PrimaryButton onClick={() => goToStep(STEP_CHECKOUT)}>Back to checkout</PrimaryButton>
          </StickyActionBar>
        </div>
      </ScreenTransition>
    );
  };

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
      case STEP_CHECKOUT:
        return renderCheckout();
      case STEP_DONE:
        return renderDone();
      default:
        return renderWelcome();
    }
  };

  const isQuestionnaireStep = currentStep >= STEP_CONTACT && currentStep <= STEP_REVIEW;
  const canPersistExit = Boolean(sessionId) || currentStep > STEP_CONTACT;
  const contentClassName =
    currentStep === STEP_WELCOME
      ? 'max-w-2xl'
      : currentStep === STEP_CHECKOUT
        ? 'checkout-page w-full max-w-[72rem]'
      : currentStep === STEP_RESULTS
        ? 'max-w-3xl'
        : isQuestionnaireStep
          ? 'max-w-lg sm:max-w-xl'
          : 'max-w-3xl';

  return (
    <div className="sampling-experience">
      <SamplingPageShell
        currentStep={currentStep}
        onSaveExit={handleSaveExit}
        saved={saveFlash}
        exitOnly={
          !canPersistExit ||
          currentStep === STEP_COMPLETE ||
          currentStep === STEP_CHECKOUT ||
          currentStep === STEP_RESULTS ||
          currentStep === STEP_DONE
        }
        contentClassName={contentClassName}
      >
        <AnimatePresence mode="wait">{renderStep()}</AnimatePresence>
      </SamplingPageShell>
      <ConfirmDialog
        open={showResetConfirm}
        title={currentStep === STEP_CHECKOUT ? 'Restart curated sampling?' : 'Start a new brief?'}
        message={
          currentStep === STEP_CHECKOUT
            ? 'This clears your current sample kit selections and brief from this device so you can start over.'
            : 'Start a new brief? Your saved answers will be cleared from this device.'
        }
        confirmLabel={currentStep === STEP_CHECKOUT ? 'Restart sampling' : 'Start over'}
        onConfirm={() => {
          resetState();
          setPaymentClientSecret(null);
          setPaymentIntentId(null);
          setPaymentRecord(null);
          setOrderRecord(null);
          setRecommendedFragrances([]);
          setShowResetConfirm(false);
          if (currentStep === STEP_CHECKOUT || hasCheckoutReady) {
            startNew();
          } else {
            goToStep(STEP_WELCOME);
          }
        }}
        onCancel={() => setShowResetConfirm(false)}
      />
    </div>
  );
};
