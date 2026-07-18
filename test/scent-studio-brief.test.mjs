import test from 'node:test';
import assert from 'node:assert/strict';
import { buildSamplingBriefDocument } from '../server/scentStudio/samplingBriefEmail.mjs';
import { deriveConsultationTitle, createEmptyScentState } from '../server/scentStudio/state.mjs';

test('deriveConsultationTitle prefers working name then notes', () => {
  const named = createEmptyScentState('t1');
  named.scentDirection.workingNames = ['Resort Air'];
  named.scentDirection.topNotes = ['Bergamot'];
  assert.equal(deriveConsultationTitle(named), 'Resort Air');

  const untitled = createEmptyScentState('t2');
  untitled.scentDirection.workingNames = ['Untitled scent'];
  untitled.scentDirection.topNotes = ['Bergamot', 'Black tea'];
  untitled.scentDirection.baseNotes = ['Cedar'];
  assert.equal(deriveConsultationTitle(untitled), 'Bergamot · Black tea · Cedar');
});

test('sampling brief includes contact and pyramid for perfumer', () => {
  const state = createEmptyScentState('brief-1');
  state.contact = {
    fullName: 'Ada Lovelace',
    email: 'ada@example.com',
    phone: '+1 555',
    brandName: 'Analytical Scents',
    country: 'USA',
  };
  state.scentDirection.workingNames = ['Lobby Light'];
  state.scentDirection.oneSentenceConcept = 'A polished hotel-lobby citrus tea.';
  state.scentDirection.primaryFamily = 'fresh-aromatic';
  state.scentDirection.topNotes = ['Bergamot', 'Black tea'];
  state.scentDirection.heartNotes = ['Neroli'];
  state.scentDirection.baseNotes = ['Cedar', 'Musk'];
  state.restrictions.avoidedNotes = ['Coconut'];

  const doc = {
    consultationId: 'brief-1',
    submittedAt: new Date('2026-07-18T12:00:00.000Z'),
    state,
    samplingProject: {
      approvalText: 'I approve this as the starting direction.',
    },
  };

  const { subject, text, html } = buildSamplingBriefDocument(doc);
  assert.match(subject, /Lobby Light/);
  assert.match(text, /Ada Lovelace/);
  assert.match(text, /ada@example.com/);
  assert.match(text, /Bergamot/);
  assert.match(text, /SCENT DEVELOPMENT BRIEF/);
  assert.match(html, /Scent Development Brief/);
  assert.match(html, /Analytical Scents/);
});
