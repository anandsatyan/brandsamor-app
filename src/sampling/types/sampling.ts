export interface LeadDetails {
  fullName: string;
  email: string;
  phone: string;
  brandName?: string;
  country: string;
  consent: boolean;
}

export interface SamplingAnswers {
  brandStage?: string;
  businessType?: string;
  businessTypeOther?: string;
  scentExpression?: string;
  brandPersonalities: string[];
  scentFamilies: string[];
  intensity?: string;
  useCase?: string;
  exclusions: string[];
  commercialTier?: string;
  likedFragrances?: string;
  additionalNotes?: string;
  packagingDirection?: string;
  bottleSize?: string;
}

export interface FragranceProfile {
  id: string;
  fragranceNumber: string;
  customerName: string;
  description: string;
  longDescription: string;
  primaryFamily: string;
  tags: string[];
  scentExpression: string[];
  sweetness: number;
  freshness: number;
  intensity: number;
  commerciality: number;
  adventure: number;
  useCases: string[];
  businessTypes: string[];
  exclusions: string[];
}

export type RecommendationRole =
  | 'best-match'
  | 'close-match'
  | 'safe-option'
  | 'adjacent'
  | 'wildcard';

export interface Recommendation {
  fragranceId: string;
  role: RecommendationRole;
  reason: string;
}

export interface SamplingState {
  version: number;
  currentStep: number;
  lead: LeadDetails;
  answers: SamplingAnswers;
  recommendations: Recommendation[];
  selectionSummary?: string;
  sessionId?: string;
  completed: boolean;
  updatedAt: string;
}

export const SAMPLING_STATE_VERSION = 4;
export const SAMPLING_STORAGE_KEY = 'brandsamor_sampling_state_v1';

export const QUESTIONNAIRE_STEPS = [
  { id: 1, shortLabel: 'CONTACT', label: 'Contact' },
  { id: 2, shortLabel: 'YOUR BRAND', label: 'Your brand' },
  { id: 3, shortLabel: 'SCENT', label: 'Scent direction' },
  { id: 4, shortLabel: 'EXPERIENCE', label: 'Experience' },
  { id: 5, shortLabel: 'PREFERENCES', label: 'Preferences' },
  { id: 6, shortLabel: 'REVIEW', label: 'Review' },
] as const;

export const STEP_WELCOME = 0;
export const STEP_CONTACT = 1;
export const STEP_BRAND = 2;
export const STEP_SCENT = 3;
export const STEP_EXPERIENCE = 4;
export const STEP_PREFERENCES = 5;
export const STEP_REVIEW = 6;
export const STEP_CURATION = 7;
export const STEP_RESULTS = 8;
export const STEP_COMPLETE = 9;
export const STEP_CHECKOUT = 10;
export const STEP_DONE = 11;

export const createEmptyLead = (): LeadDetails => ({
  fullName: '',
  email: '',
  phone: '',
  brandName: '',
  country: 'US',
  consent: true,
});

export const createEmptyAnswers = (): SamplingAnswers => ({
  brandPersonalities: [],
  scentFamilies: [],
  exclusions: [],
});

export const createInitialState = (): SamplingState => ({
  version: SAMPLING_STATE_VERSION,
  currentStep: STEP_WELCOME,
  lead: createEmptyLead(),
  answers: createEmptyAnswers(),
  recommendations: [],
  completed: false,
  updatedAt: new Date().toISOString(),
});
