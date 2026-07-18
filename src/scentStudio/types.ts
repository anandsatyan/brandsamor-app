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
  saveStatus?: string;
  submittedAt?: string | Date | null;
  providerMode?: string | null;
};

export const SCENT_STUDIO_STORAGE_KEY = 'brandsamor_scent_studio_v1';
