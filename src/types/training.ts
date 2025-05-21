export type VoiceAgentTrainingFeatureKey = 
  | 'voice_recognition'
  | 'accent_adaptation'
  | 'language_proficiency'
  | 'response_time'
  | 'conversation_flow'
  | 'error_handling';

export interface VoiceAgentTrainingFeature {
  id: string;
  organization_id: string;
  feature_key: VoiceAgentTrainingFeatureKey;
  is_enabled: boolean;
  config: Record<string, any>;
  created_at: string;
  updated_at: string;
}
