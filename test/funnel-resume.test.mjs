import test from 'node:test';
import assert from 'node:assert/strict';
import { computeFunnelDropoff } from '../server/admin/funnelStats.mjs';
import { buildResumeBriefEmail, RESUME_EMAIL_DELAY_MS } from '../server/sampling/resumeBriefEmail.mjs';
import {
  buildExploratoryCallInviteEmail,
  EXPLORATORY_CALL_INVITE_DELAY_MS,
} from '../server/sampling/exploratoryCallInviteEmail.mjs';

test('resume brief email is plain text with resume link', () => {
  const mail = buildResumeBriefEmail({
    fullName: 'Alex Founder',
    email: 'alex@example.com',
    atStepLabel: 'Preferences',
  });
  assert.match(mail.subject, /Alex/);
  assert.match(mail.text, /curated-sampling/);
  assert.match(mail.text, /Preferences/);
  assert.equal(RESUME_EMAIL_DELAY_MS, 2 * 60 * 60 * 1000);
});

test('exploratory call invite is delayed ten minutes after lead capture', () => {
  assert.equal(EXPLORATORY_CALL_INVITE_DELAY_MS, 10 * 60 * 1000);
  const mail = buildExploratoryCallInviteEmail({
    fullName: 'Alex Founder',
    email: 'alex@example.com',
  });
  assert.match(mail.subject, /Alex/);
  assert.match(mail.text, /schedule-a-call/);
});

test('funnel dropoff highlights stuck checkout vs contact', () => {
  const docs = [
    {
      status: 'in_progress',
      currentStep: 2,
      lead: { fullName: 'A', email: 'a@example.com', phone: '1234567890', country: 'US', consent: true },
      answers: {},
      stepHistory: [{ step: 'contact', completedAt: new Date() }],
    },
    {
      status: 'checkout_started',
      currentStep: 10,
      lead: { fullName: 'B', email: 'b@example.com', phone: '1234567890', country: 'US', consent: true },
      answers: {
        brandStage: 'first-launch',
        businessType: 'beauty',
        scentExpression: 'warm',
        brandPersonalities: ['modern'],
        scentFamilies: ['woody'],
        intensity: 'moderate',
        useCase: 'daily',
        exclusions: ['none'],
      },
      stepHistory: [
        { step: 'contact' },
        { step: 'brand' },
        { step: 'scent' },
        { step: 'experience' },
        { step: 'preferences' },
        { step: 'review' },
        { step: 'curation' },
      ],
    },
    {
      status: 'paid',
      currentStep: 11,
      lead: { fullName: 'C', email: 'c@example.com', phone: '1234567890', country: 'US', consent: true },
      answers: {
        brandStage: 'reworking',
        businessType: 'fashion',
        scentExpression: 'fresh',
        brandPersonalities: ['classic'],
        scentFamilies: ['floral'],
        intensity: 'soft',
        useCase: 'evening',
        exclusions: ['gourmand'],
      },
      order: { sampleOrderNumber: 1 },
      stepHistory: [{ step: 'curation' }, { step: 'paid' }],
    },
  ];

  const funnel = computeFunnelDropoff(docs);
  assert.equal(funnel.totalSessions, 3);
  const checkout = funnel.steps.find((s) => s.key === 'checkout');
  assert.ok(checkout);
  assert.equal(checkout.reached, 2);
  assert.equal(checkout.completed, 1);
  assert.ok(funnel.questions.some((q) => q.key === 'brand.brandStage'));

  const brandStage = funnel.questions.find((q) => q.key === 'brand.brandStage');
  assert.ok(brandStage?.topOption);
  assert.equal(brandStage.topOption.value, 'first-launch');
  assert.equal(brandStage.topOption.count, 1);
  assert.equal(brandStage.options.find((o) => o.value === 'reworking')?.count, 1);
  assert.equal(brandStage.options.find((o) => o.value === 'exploring')?.count, 0);

  const families = funnel.questions.find((q) => q.key === 'scent.scentFamilies');
  assert.ok(families?.topOption);
  assert.equal(families.options.find((o) => o.value === 'woody')?.count, 1);
  assert.equal(families.options.find((o) => o.value === 'floral')?.count, 1);
});
