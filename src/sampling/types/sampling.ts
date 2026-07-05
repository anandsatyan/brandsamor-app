export interface LeadDetails {
  fullName: string;
  email: string;
  phone: string;
  brandName?: string;
  country: string;
  websiteOrSocial?: string;
  consent: boolean;
}

export interface SamplingAnswers {
  brandStage?: string;
  businessType?: string;
  businessTypeOther?: string;
  audienceDefinition?: string;
  audienceDescription?: string;
  scentExpression?: string;
  brandPersonalities: string[];
  scentFamilies: string[];
  intensity?: string;
  useCase?: string;
  adventureLevel?: string;
  exclusions: string[];
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
  completed: boolean;
  updatedAt: string;
}

export const SAMPLING_STATE_VERSION = 1;
export const SAMPLING_STORAGE_KEY = 'brandsamor_sampling_state_v1';

export const QUESTIONNAIRE_STEPS = [
  { id: 1, label: 'Contact details' },
  { id: 2, label: 'Brand brief' },
  { id: 3, label: 'Audience' },
  { id: 4, label: 'Brand personality' },
  { id: 5, label: 'Scent directions' },
  { id: 6, label: 'Experience' },
  { id: 7, label: 'Exclusions' },
  { id: 8, label: 'Packaging' },
  { id: 9, label: 'Review' },
] as const;

export const STEP_WELCOME = 0;
export const STEP_CONTACT = 1;
export const STEP_BRAND = 2;
export const STEP_AUDIENCE = 3;
export const STEP_PERSONALITY = 4;
export const STEP_SCENT = 5;
export const STEP_EXPERIENCE = 6;
export const STEP_EXCLUSIONS = 7;
export const STEP_PACKAGING = 8;
export const STEP_REVIEW = 9;
export const STEP_CURATION = 10;
export const STEP_RESULTS = 11;
export const STEP_COMPLETE = 12;

export const createEmptyLead = (): LeadDetails => ({
  fullName: '',
  email: '',
  phone: '',
  brandName: '',
  country: '',
  websiteOrSocial: '',
  consent: false,
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
