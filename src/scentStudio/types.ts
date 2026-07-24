export type ScentCard = {
  workingName: string;
  primaryFamily: string;
  descriptors: string[];
  topNotes: string[];
  heartNotes: string[];
  baseNotes: string[];
  performanceDirection: string;
  status: string;
  oneSentenceConcept?: string | null;
  version?: number;
  intendedAudience?: string | null;
  intendedUse?: string[];
  productFormat?: string | null;
  genderPositioning?: string | null;
  recentChanges?: string[];
  developmentStatus?: string;
  currentStage?: string;
  attributes?: {
    freshness?: number | null;
    sweetness?: number | null;
    warmth?: number | null;
    woodiness?: number | null;
    floral?: number | null;
    projection?: number | null;
    longevity?: number | null;
    distinctiveness?: number | null;
  };
  referenceSummary?: {
    name?: string;
    brand?: string;
    transformationSummary?: string | null;
  } | null;
};

export type ScentMessage = {
  id: string;
  role: 'user' | 'assistant' | string;
  content: string;
  quickReplies?: string[];
  createdAt?: string | Date | null;
  /** Snackable visual fields (assistant turns) */
  headline?: string;
  insight?: string;
  question?: string;
  noteChips?: string[];
  changes?: string[];
};

export type ScentConsultation = {
  consultationId: string;
  recoveryToken: string;
  stage: string;
  currentStage?: string;
  startMode?: 'scratch' | 'inspiration' | 'guided' | null;
  messages: ScentMessage[];
  scentCard: ScentCard | null;
  title?: string;
  conceptReady?: boolean;
  reviewDismissed?: boolean;
  developmentStatus?: string;
  contactCaptured?: boolean;
  saveStatus?: string;
  submittedAt?: string | Date | null;
  providerMode?: string | null;
};

/** @deprecated use library + active keys */
export const SCENT_STUDIO_STORAGE_KEY = 'brandsamor_scent_studio_v1';
export const SCENT_STUDIO_LIBRARY_KEY = 'brandsamor_scent_studio_library_v1';
export const SCENT_STUDIO_ACTIVE_KEY = 'brandsamor_scent_studio_active_v1';
