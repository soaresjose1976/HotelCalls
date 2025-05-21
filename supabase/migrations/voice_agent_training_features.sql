/*
  # Configuration des fonctionnalités de formation pour les agents vocaux AI
  
  1. Nouvelle table:
    - voice_agent_training_features (configuration spécifique aux agents vocaux)
*/

CREATE TABLE voice_agent_training_features (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  feature_key TEXT NOT NULL,
  is_enabled BOOLEAN DEFAULT true,
  config JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Index pour une recherche rapide
CREATE INDEX idx_voice_training_features_org_key ON voice_agent_training_features(organization_id, feature_key);

-- Contrainte d'unicité pour éviter les doublons
ALTER TABLE voice_agent_training_features 
  ADD CONSTRAINT unique_org_voice_feature 
  UNIQUE (organization_id, feature_key);

-- RLS
ALTER TABLE voice_agent_training_features ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Accès utilisateur aux features vocales" ON voice_agent_training_features
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM organizations
      WHERE id = organization_id 
      AND id IN (
        SELECT organization_id FROM organization_users
        WHERE user_id = auth.uid()
      )
    )
  );
