import type { LeadDetails } from '../types/sampling';

export interface ContactErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  country?: string;
  consent?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const validateEmail = (email: string) => EMAIL_RE.test(email.trim());

export const validatePhone = (phone: string) => {
  const digits = phone.replace(/\D/g, '');
  return digits.length >= 8;
};

export const validateContact = (lead: LeadDetails): ContactErrors => {
  const errors: ContactErrors = {};
  if (!lead.fullName.trim()) errors.fullName = 'Please enter your full name.';
  if (!lead.email.trim()) errors.email = 'Please enter your work email.';
  else if (!validateEmail(lead.email)) errors.email = 'Please enter a valid email address.';
  if (!lead.phone.trim()) errors.phone = 'Please enter a phone or WhatsApp number.';
  else if (!validatePhone(lead.phone)) errors.phone = 'Please enter a valid phone number.';
  if (!lead.country.trim()) errors.country = 'Please select your country.';
  if (!lead.consent) errors.consent = 'Please agree to be contacted about your sample brief.';
  return errors;
};

export const hasContactErrors = (errors: ContactErrors) => Object.keys(errors).length > 0;

export const isStepComplete = (step: number, answers: import('../types/sampling').SamplingAnswers, lead: LeadDetails): boolean => {
  switch (step) {
    case 1:
      return hasContactErrors(validateContact(lead)) === false;
    case 2:
      return Boolean(answers.brandStage && answers.businessType);
    case 3:
      return Boolean(answers.audienceDefinition && answers.scentExpression);
    case 4:
      return answers.brandPersonalities.length > 0;
    case 5:
      return answers.scentFamilies.length > 0;
    case 6:
      return Boolean(answers.intensity && answers.useCase && answers.adventureLevel);
    case 7:
      return answers.exclusions.length > 0;
    case 8:
      return Boolean(answers.packagingDirection);
    default:
      return true;
  }
};
