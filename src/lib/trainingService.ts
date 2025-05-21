import { supabase } from './supabase';
import { VoiceAgentTrainingFeature, VoiceAgentTrainingFeatureKey } from '../types/training';

export const voiceAgentTrainingService = {
  async getFeatures(organizationId: string): Promise<VoiceAgentTrainingFeature[]> {
    const { data, error } = await supabase
      .from('voice_agent_training_features')
      .select('*')
      .eq('organization_id', organizationId);
    
    if (error) throw error;
    return data;
  },

  async toggleFeature(
    organizationId: string,
    featureKey: VoiceAgentTrainingFeatureKey,
    isEnabled: boolean,
    config: Record<string, any> = {}
  ): Promise<VoiceAgentTrainingFeature> {
    const { data, error } = await supabase
      .from('voice_agent_training_features')
      .upsert({
        organization_id: organizationId,
        feature_key: featureKey,
        is_enabled: isEnabled,
        config,
        updated_at: new Date().toISOString()
      })
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async isFeatureEnabled(
    organizationId: string,
    featureKey: VoiceAgentTrainingFeatureKey
  ): Promise<boolean> {
    const { data, error } = await supabase
      .from('voice_agent_training_features')
      .select('is_enabled')
      .eq('organization_id', organizationId)
      .eq('feature_key', featureKey)
      .single();
    
    if (error) return false;
    return data?.is_enabled ?? false;
  }
};
