import { sendBrandsamorMail } from '../mail/smtp.mjs';
import { toPublicScentCard } from './state.mjs';

function line(label, value) {
  const text = value == null || value === '' ? '—' : String(value);
  return `${label}: ${text}`;
}

function listBlock(title, items) {
  const values = Array.isArray(items) ? items.filter(Boolean) : [];
  if (!values.length) return `${title}: —`;
  return `${title}:\n${values.map((v) => `  - ${v}`).join('\n')}`;
}

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function htmlList(items) {
  const values = Array.isArray(items) ? items.filter(Boolean) : [];
  if (!values.length) return '<p>—</p>';
  return `<ul>${values.map((v) => `<li>${escapeHtml(v)}</li>`).join('')}</ul>`;
}

export function buildSamplingBriefDocument(doc) {
  const state = doc.state || {};
  const contact = state.contact || {};
  const card = toPublicScentCard(state);
  const direction = state.scentDirection || {};
  const performance = state.performance || {};
  const references = Array.isArray(state.references) ? state.references : [];
  const restrictions = state.restrictions || {};
  const useContext = state.useContext || {};
  const workingName =
    card?.workingName && card.workingName !== 'Untitled scent'
      ? card.workingName
      : direction.workingNames?.[0] || 'Untitled scent direction';

  const recentQuotes = (state.customerLanguage?.importantQuotes || []).slice(-8);

  const text = [
    'BRANDSAMOR — SCENT DEVELOPMENT BRIEF',
    '====================================',
    '',
    '1. CUSTOMER / PROJECT CONTACT',
    line('Name', contact.fullName),
    line('Email', contact.email),
    line('Phone / WhatsApp', contact.phone),
    line('Brand / company', contact.brandName),
    line('Country', contact.country),
    line('Consultation ID', doc.consultationId),
    line('Submitted at', doc.submittedAt ? new Date(doc.submittedAt).toISOString() : new Date().toISOString()),
    '',
    '2. WORKING TITLE & CONCEPT',
    line('Working name', workingName),
    line('One-sentence concept', direction.oneSentenceConcept || card?.oneSentenceConcept),
    line('Primary family', direction.primaryFamily || card?.primaryFamily),
    listBlock('Supporting families', direction.supportingFamilies),
    listBlock('Descriptors', direction.descriptors || card?.descriptors),
    listBlock('Desired mood', direction.desiredMood),
    listBlock('Avoided effects', direction.avoidedEffects),
    '',
    '3. SCENT PYRAMID (CUSTOMER-FACING DIRECTION)',
    listBlock('Top notes', direction.topNotes || card?.topNotes),
    listBlock('Heart notes', direction.heartNotes || card?.heartNotes),
    listBlock('Base notes', direction.baseNotes || card?.baseNotes),
    '',
    '4. PERFORMANCE DIRECTION',
    line('Opening', performance.opening),
    line('Projection', performance.projection),
    line('Sillage', performance.sillage),
    line('Longevity target (hours)', performance.longevityTargetHours),
    line('Concentration direction', performance.concentrationDirection),
    line('Summary', card?.performanceDirection),
    '',
    '5. USE CONTEXT',
    listBlock('Occasions', useContext.occasions),
    listBlock('Climates', useContext.climates),
    listBlock('Seasons', useContext.seasons),
    listBlock('Time of day', useContext.timeOfDay),
    '',
    '6. REFERENCE FRAGRANCES & REQUESTED CHANGES',
    references.length
      ? references
          .map((ref, i) =>
            [
              `Reference ${i + 1}: ${[ref.brand, ref.name].filter(Boolean).join(' ')}`,
              `  Match status: ${ref.matchStatus || '—'}`,
              `  Liked: ${(ref.likedElements || []).join(', ') || '—'}`,
              `  Disliked: ${(ref.dislikedElements || []).join(', ') || '—'}`,
              `  Requested changes: ${(ref.requestedChanges || []).join(', ') || '—'}`,
            ].join('\n'),
          )
          .join('\n\n')
      : 'No reference fragrance on file.',
    '',
    '7. RESTRICTIONS & LOCKED ELEMENTS',
    listBlock('Requested notes', restrictions.requestedNotes),
    listBlock('Avoided notes', restrictions.avoidedNotes),
    listBlock('Allergen concerns', restrictions.allergenConcerns),
    listBlock('Additional requirements', restrictions.additionalRequirements),
    line('Vegan', restrictions.vegan == null ? '—' : restrictions.vegan ? 'Yes' : 'No'),
    line('Alcohol-free', restrictions.alcoholFree == null ? '—' : restrictions.alcoholFree ? 'Yes' : 'No'),
    listBlock('Locked elements', state.lockedElements),
    '',
    '8. CUSTOMER LANGUAGE (RECENT QUOTES)',
    recentQuotes.length ? recentQuotes.map((q) => `  - "${q}"`).join('\n') : '  —',
    '',
    '9. APPROVAL',
    doc.samplingProject?.approvalText ||
      'Customer approved this as the starting direction for physical fragrance development.',
    '',
    'NOTE FOR PERFUMER',
    'This is an experimental development brief from AI Scent Studio. Treat the pyramid as a creative direction, not a finished formula. Do not assume IFRA compliance, stability, or exact performance until reviewed and compounded.',
  ].join('\n');

  const html = `
    <div style="font-family: Georgia, 'Times New Roman', serif; color: #2b1809; line-height: 1.5; max-width: 720px;">
      <h1 style="font-size: 22px; font-weight: 400;">Brandsamor — Scent Development Brief</h1>
      <p style="color:#725f52;">AI Scent Studio sampling handoff · Consultation ${escapeHtml(doc.consultationId)}</p>

      <h2 style="font-size: 18px; margin-top: 28px;">1. Customer / project contact</h2>
      <table style="border-collapse: collapse; width: 100%; font-family: Arial, sans-serif; font-size: 14px;">
        <tr><td style="padding:6px 0;color:#725f52;width:180px;">Name</td><td>${escapeHtml(contact.fullName)}</td></tr>
        <tr><td style="padding:6px 0;color:#725f52;">Email</td><td>${escapeHtml(contact.email)}</td></tr>
        <tr><td style="padding:6px 0;color:#725f52;">Phone / WhatsApp</td><td>${escapeHtml(contact.phone || '—')}</td></tr>
        <tr><td style="padding:6px 0;color:#725f52;">Brand / company</td><td>${escapeHtml(contact.brandName || '—')}</td></tr>
        <tr><td style="padding:6px 0;color:#725f52;">Country</td><td>${escapeHtml(contact.country)}</td></tr>
      </table>

      <h2 style="font-size: 18px; margin-top: 28px;">2. Working title &amp; concept</h2>
      <p><strong>${escapeHtml(workingName)}</strong></p>
      <p>${escapeHtml(direction.oneSentenceConcept || card?.oneSentenceConcept || '—')}</p>
      <p>Primary family: ${escapeHtml(direction.primaryFamily || card?.primaryFamily || '—')}</p>
      ${htmlList(direction.descriptors || card?.descriptors)}

      <h2 style="font-size: 18px; margin-top: 28px;">3. Scent pyramid</h2>
      <p><strong>Top</strong></p>${htmlList(direction.topNotes || card?.topNotes)}
      <p><strong>Heart</strong></p>${htmlList(direction.heartNotes || card?.heartNotes)}
      <p><strong>Base</strong></p>${htmlList(direction.baseNotes || card?.baseNotes)}

      <h2 style="font-size: 18px; margin-top: 28px;">4. Performance</h2>
      <p>${escapeHtml(card?.performanceDirection || '—')}</p>
      <p style="font-family: Arial, sans-serif; font-size: 14px; color:#725f52;">
        Opening: ${escapeHtml(performance.opening || '—')} ·
        Projection: ${escapeHtml(performance.projection || '—')} ·
        Sillage: ${escapeHtml(performance.sillage || '—')}
      </p>

      <h2 style="font-size: 18px; margin-top: 28px;">5. References &amp; changes</h2>
      ${
        references.length
          ? references
              .map(
                (ref) => `<p><strong>${escapeHtml([ref.brand, ref.name].filter(Boolean).join(' '))}</strong>
                (${escapeHtml(ref.matchStatus || 'unknown')})<br/>
                Liked: ${escapeHtml((ref.likedElements || []).join(', ') || '—')}<br/>
                Disliked: ${escapeHtml((ref.dislikedElements || []).join(', ') || '—')}<br/>
                Changes: ${escapeHtml((ref.requestedChanges || []).join(', ') || '—')}</p>`,
              )
              .join('')
          : '<p>No reference fragrance on file.</p>'
      }

      <h2 style="font-size: 18px; margin-top: 28px;">6. Restrictions &amp; locks</h2>
      <p><strong>Avoided notes</strong></p>${htmlList(restrictions.avoidedNotes)}
      <p><strong>Requested notes</strong></p>${htmlList(restrictions.requestedNotes)}
      <p><strong>Locked elements</strong></p>${htmlList(state.lockedElements)}

      <h2 style="font-size: 18px; margin-top: 28px;">7. Customer quotes</h2>
      ${htmlList(recentQuotes.map((q) => `"${q}"`))}

      <h2 style="font-size: 18px; margin-top: 28px;">8. Approval</h2>
      <p>${escapeHtml(
        doc.samplingProject?.approvalText ||
          'Customer approved this as the starting direction for physical fragrance development.',
      )}</p>

      <p style="margin-top: 28px; padding: 12px; background: #f3efe3; font-family: Arial, sans-serif; font-size: 13px; color: #725f52;">
        Experimental development brief from AI Scent Studio. Treat the pyramid as a creative direction, not a finished formula.
      </p>
    </div>
  `;

  const subject = `[Scent Studio] Sampling brief — ${workingName} — ${contact.fullName || contact.email || 'customer'}`;

  return { subject, text, html, workingName };
}

export async function sendSamplingBriefEmail(doc) {
  const recipient =
    process.env.SCENT_STUDIO_BRIEF_RECIPIENT ||
    process.env.LEAD_FORM_RECIPIENT ||
    'info@brandsamor.com';

  const { subject, text, html } = buildSamplingBriefDocument(doc);
  const replyTo = doc.state?.contact?.email || undefined;

  const result = await sendBrandsamorMail({
    to: recipient,
    subject,
    text,
    html,
    replyTo,
  });

  return { ...result, recipient, subject };
}
