import { type FormEvent, type ReactNode, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Building2,
  CheckCircle2,
  Loader2,
  Mail,
  Package,
  Phone,
  Sparkles,
  User,
} from 'lucide-react';
import { homeBreadcrumbs } from './Breadcrumbs';
import { HeroPanel } from './HeroPanel';
import { PageBreadcrumbBar } from './PageBreadcrumbBar';
import { SeoHead } from './SeoHead';
import { SiteFooter } from './SiteFooter';
import { SiteHeader } from './SiteHeader';
import { buildStructuredDataForPath } from '../seo/buildPageStructuredData';
import { PAGE_METADATA } from '../seo/pageMetadata';
import {
  BUSINESS_TYPES,
  LAUNCH_TIMELINES,
  ORDER_QUANTITIES,
  PRODUCT_INTERESTS,
  type LeadFormPayload,
} from '../routes/leadForm';
import { useLeadFormAnalytics } from '../analytics/leadFormAnalytics';

const SELECT_FIELDS = new Set(['businessType', 'launchTimeline', 'orderQuantity']);

const inputClassName =
  'w-full rounded-lg border border-border bg-surface px-4 py-3 text-heading placeholder:text-body/50 focus:outline-none focus:ring-2 focus:ring-accent/35 focus:border-accent';

const selectClassName =
  'w-full rounded-lg border border-border bg-surface px-4 py-3 text-heading focus:outline-none focus:ring-2 focus:ring-accent/35 focus:border-accent';

const labelClassName = 'block type-body-sm font-medium text-heading mb-2';

const sectionClassName =
  'rounded-2xl border border-border bg-secondary/60 p-6 sm:p-8 shadow-sm space-y-6';

const initialForm: LeadFormPayload = {
  fullName: '',
  email: '',
  phone: '',
  brandName: '',
  website: '',
  country: '',
  businessType: '',
  productInterests: [],
  launchTimeline: '',
  orderQuantity: '',
};

const FormSection = ({
  icon: Icon,
  title,
  description,
  children,
}: {
  icon: typeof User;
  title: string;
  description: string;
  children: ReactNode;
}) => (
  <section className={sectionClassName}>
    <div className="flex items-start gap-4">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
        <Icon size={22} aria-hidden="true" />
      </div>
      <div className="min-w-0 flex-1">
        <h2 className="type-h2-sm mb-2">{title}</h2>
        <p className="type-body-sm mb-6">{description}</p>
        <div className="space-y-5">{children}</div>
      </div>
    </div>
  </section>
);

export const LeadFormPage = () => {
  const meta = PAGE_METADATA['/get-started'];
  const [form, setForm] = useState<LeadFormPayload>(initialForm);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const {
    trackFieldFocus,
    trackFieldComplete,
    trackSelectChange,
    trackProductInterestChange,
    trackSubmitStart,
    trackSubmitSuccess,
    trackSubmitError,
    trackSuccessView,
    trackSuccessHomeClick,
  } = useLeadFormAnalytics();

  useEffect(() => {
    if (status === 'success') {
      trackSuccessView();
    }
  }, [status, trackSuccessView]);

  const updateField = <K extends keyof LeadFormPayload>(key: K, value: LeadFormPayload[K]) => {
    setForm((current) => ({ ...current, [key]: value }));

    if (typeof value === 'string' && SELECT_FIELDS.has(key)) {
      trackSelectChange(key, value);
    }
  };

  const toggleProductInterest = (interest: string) => {
    setForm((current) => {
      const selected = current.productInterests.includes(interest);
      trackProductInterestChange(interest, selected ? 'remove' : 'add');
      return {
        ...current,
        productInterests: selected
          ? current.productInterests.filter((item) => item !== interest)
          : [...current.productInterests, interest],
      };
    });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    trackSubmitStart();
    setStatus('submitting');
    setErrorMessage('');

    const productInterestCount = form.productInterests.length;

    try {
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        const data = (await response.json().catch(() => null)) as { error?: string } | null;
        throw new Error(data?.error || 'Something went wrong. Please try again.');
      }

      trackSubmitSuccess(productInterestCount);
      setStatus('success');
      setForm(initialForm);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Something went wrong. Please try again.';
      trackSubmitError(message);
      setStatus('error');
      setErrorMessage(message);
    }
  };

  return (
    <div className="min-h-screen bg-surface font-sans overflow-x-hidden">
      <SeoHead
        title={meta.title}
        description={meta.description}
        url={meta.canonical}
        robots={meta.robots}
        structuredData={buildStructuredDataForPath(meta)}
      />
      <SiteHeader />

      <PageBreadcrumbBar items={homeBreadcrumbs(meta.pageName)} width="narrow" />

      <HeroPanel className="py-10 sm:py-14 mb-10 sm:mb-12 rounded-none sm:rounded-2xl text-center">
        <div className="mx-auto flex max-w-3xl flex-col items-center space-y-5">
          <span className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 text-white type-caption font-semibold uppercase tracking-wider rounded-full border border-white/30">
            <Sparkles size={14} aria-hidden="true" />
            Start your project
          </span>
          <h1 className="type-h1 text-white">{meta.h1}</h1>
          <p className="type-body-lg max-w-2xl">
            Tell us about your brand and launch goals. We will review your project and follow up
            with the right next steps for your private label fragrance line.
          </p>
        </div>
      </HeroPanel>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 md:px-12 pb-16 sm:pb-24">
        {status === 'success' ? (
          <div className="rounded-2xl border border-border bg-secondary p-8 sm:p-10 text-center shadow-sm">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-accent/10 text-accent">
              <CheckCircle2 size={36} aria-hidden="true" />
            </div>
            <h2 className="type-h2-sm mb-4">Thank you — we received your project details</h2>
            <p className="type-body max-w-lg mx-auto mb-8">
              Our team will review your brief and reach out shortly to discuss your curated sample kit, packaging options, and
              a realistic path to your first ready-to-sell batch.
            </p>
            <Link
              to="/"
              className="btn-primary"
              onClick={trackSuccessHomeClick}
            >
              Back to home
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-8" noValidate>
            <FormSection
              icon={User}
              title="Contact details"
              description="Who should we reach about this fragrance project?"
            >
              <div className="grid sm:grid-cols-2 gap-5">
                <div className="sm:col-span-2">
                  <label htmlFor="fullName" className={labelClassName}>
                    Full name <span className="text-accent">*</span>
                  </label>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    required
                    autoComplete="name"
                    value={form.fullName}
                    onChange={(event) => updateField('fullName', event.target.value)}
                    onFocus={() => trackFieldFocus('fullName')}
                    onBlur={(event) => {
                      if (event.target.value.trim()) trackFieldComplete('fullName');
                    }}
                    placeholder="Alex Rivera"
                    className={inputClassName}
                  />
                </div>
                <div>
                  <label htmlFor="email" className={labelClassName}>
                    Email <span className="text-accent">*</span>
                  </label>
                  <div className="relative">
                    <Mail
                      size={18}
                      className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-body"
                      aria-hidden="true"
                    />
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      value={form.email}
                      onChange={(event) => updateField('email', event.target.value)}
                      onFocus={() => trackFieldFocus('email')}
                      onBlur={(event) => {
                        if (event.target.value.trim()) trackFieldComplete('email');
                      }}
                      placeholder="you@yourbrand.com"
                      className={`${inputClassName} pl-11`}
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="phone" className={labelClassName}>
                    Phone
                  </label>
                  <div className="relative">
                    <Phone
                      size={18}
                      className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-body"
                      aria-hidden="true"
                    />
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      value={form.phone}
                      onChange={(event) => updateField('phone', event.target.value)}
                      onFocus={() => trackFieldFocus('phone')}
                      onBlur={(event) => {
                        if (event.target.value.trim()) trackFieldComplete('phone');
                      }}
                      placeholder="+1 (555) 000-0000"
                      className={`${inputClassName} pl-11`}
                    />
                  </div>
                </div>
              </div>
            </FormSection>

            <FormSection
              icon={Building2}
              title="Brand & business"
              description="Help us understand who you are and where you sell."
            >
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="brandName" className={labelClassName}>
                    Brand or company name <span className="text-accent">*</span>
                  </label>
                  <input
                    id="brandName"
                    name="brandName"
                    type="text"
                    required
                    value={form.brandName}
                    onChange={(event) => updateField('brandName', event.target.value)}
                    onFocus={() => trackFieldFocus('brandName')}
                    onBlur={(event) => {
                      if (event.target.value.trim()) trackFieldComplete('brandName');
                    }}
                    placeholder="Your brand name"
                    className={inputClassName}
                  />
                </div>
                <div>
                  <label htmlFor="website" className={labelClassName}>
                    Website or social profile
                  </label>
                  <input
                    id="website"
                    name="website"
                    type="url"
                    value={form.website}
                    onChange={(event) => updateField('website', event.target.value)}
                    onFocus={() => trackFieldFocus('website')}
                    onBlur={(event) => {
                      if (event.target.value.trim()) trackFieldComplete('website');
                    }}
                    placeholder="https://yourbrand.com"
                    className={inputClassName}
                  />
                </div>
                <div>
                  <label htmlFor="country" className={labelClassName}>
                    Country <span className="text-accent">*</span>
                  </label>
                  <input
                    id="country"
                    name="country"
                    type="text"
                    required
                    value={form.country}
                    onChange={(event) => updateField('country', event.target.value)}
                    onFocus={() => trackFieldFocus('country')}
                    onBlur={(event) => {
                      if (event.target.value.trim()) trackFieldComplete('country');
                    }}
                    placeholder="United States"
                    className={inputClassName}
                  />
                </div>
                <div>
                  <label htmlFor="businessType" className={labelClassName}>
                    Business type <span className="text-accent">*</span>
                  </label>
                  <select
                    id="businessType"
                    name="businessType"
                    required
                    value={form.businessType}
                    onChange={(event) => updateField('businessType', event.target.value)}
                    onFocus={() => trackFieldFocus('businessType')}
                    className={selectClassName}
                  >
                    <option value="">Select one</option>
                    {BUSINESS_TYPES.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </FormSection>

            <FormSection
              icon={Package}
              title="Product & launch plan"
              description="Share what you want to launch and when you are aiming to go live."
            >
              <div>
                <p className={labelClassName}>Product formats you are interested in</p>
                <div className="grid sm:grid-cols-2 gap-3">
                  {PRODUCT_INTERESTS.map((interest) => {
                    const checked = form.productInterests.includes(interest);
                    return (
                      <label
                        key={interest}
                        className={`flex items-center gap-3 rounded-lg border px-4 py-3 cursor-pointer transition-colors ${
                          checked
                            ? 'border-accent bg-accent/5 text-heading'
                            : 'border-border bg-surface text-body hover:border-accent/40'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => toggleProductInterest(interest)}
                          onFocus={() => trackFieldFocus('productInterests')}
                          className="h-4 w-4 rounded border-border text-accent focus:ring-accent/40"
                        />
                        <span className="text-sm font-medium">{interest}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="launchTimeline" className={labelClassName}>
                    Target launch timeline <span className="text-accent">*</span>
                  </label>
                  <select
                    id="launchTimeline"
                    name="launchTimeline"
                    required
                    value={form.launchTimeline}
                    onChange={(event) => updateField('launchTimeline', event.target.value)}
                    onFocus={() => trackFieldFocus('launchTimeline')}
                    className={selectClassName}
                  >
                    <option value="">Select one</option>
                    {LAUNCH_TIMELINES.map((timeline) => (
                      <option key={timeline} value={timeline}>
                        {timeline}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="orderQuantity" className={labelClassName}>
                    Estimated first order quantity <span className="text-accent">*</span>
                  </label>
                  <select
                    id="orderQuantity"
                    name="orderQuantity"
                    required
                    value={form.orderQuantity}
                    onChange={(event) => updateField('orderQuantity', event.target.value)}
                    onFocus={() => trackFieldFocus('orderQuantity')}
                    className={selectClassName}
                  >
                    <option value="">Select one</option>
                    {ORDER_QUANTITIES.map((quantity) => (
                      <option key={quantity} value={quantity}>
                        {quantity}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </FormSection>

            {status === 'error' && (
              <p
                className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
                role="alert"
              >
                {errorMessage}
              </p>
            )}

            <div className="rounded-2xl border border-border bg-heading p-6 sm:p-8 text-white">
              <p className="text-sm text-white/75 mb-6 leading-relaxed">
                By submitting this form, you agree that Brandsamor may contact you about your private label fragrance
                project. See our{' '}
                <Link to="/privacy-policy" className="text-accent underline underline-offset-4 hover:opacity-80">
                  Privacy Policy
                </Link>
                .
              </p>
              <button
                type="submit"
                disabled={status === 'submitting'}
                className="btn-primary w-full sm:w-auto justify-center disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {status === 'submitting' ? (
                  <>
                    <Loader2 size={18} className="mr-2 animate-spin" aria-hidden="true" />
                    Sending your project...
                  </>
                ) : (
                  'Submit project details'
                )}
              </button>
            </div>
          </form>
        )}
      </main>

      <SiteFooter />
    </div>
  );
};
