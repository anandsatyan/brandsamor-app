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
};

export type ScentMessage = {
  id: string;
  role: 'user' | 'assistant' | string;
  content: string;
  quickReplies?: string[];
  createdAt?: string | Date | null;
};

export type ScentConsultation = {
  consultationId: string;
  recoveryToken: string;
  stage: string;
  messages: ScentMessage[];
  scentCard: ScentCard | null;
  title?: string;
  saveStatus?: string;
  submittedAt?: string | Date | null;
  providerMode?: string | null;
};

/** @deprecated use library + active keys */
export const SCENT_STUDIO_STORAGE_KEY = 'brandsamor_scent_studio_v1';
export const SCENT_STUDIO_LIBRARY_KEY = 'brandsamor_scent_studio_library_v1';
export const SCENT_STUDIO_ACTIVE_KEY = 'brandsamor_scent_studio_active_v1';
