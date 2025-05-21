/*
  # Intégration CRM
  
  1. Tables créées:
    - crm_configs (configurations CRM)
    - crm_mappings (mappages des champs)
    - crm_events (événements et synchronisation)
  
  2. Sécurité:
    - RLS activé sur toutes les tables
*/

-- Configuration CRM
CREATE TABLE crm_configs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  crm_type TEXT NOT NULL CHECK (crm_type IN ('salesforce', 'hubspot', 'zoho', 'pipedrive', 'custom')),
  api_key TEXT,
  api_url TEXT,
  webhook_url TEXT,
  settings JSONB DEFAULT '{}',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE crm_configs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Accès utilisateur aux configs CRM"
  ON crm_configs FOR ALL
  USING (auth.uid() = user_id);

-- Mappages des champs CRM
CREATE TABLE crm_mappings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  config_id UUID REFERENCES crm_configs(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  local_field TEXT NOT NULL,
  crm_field TEXT NOT NULL,
  field_type TEXT NOT NULL,
  transformation TEXT,
  is_required BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE crm_mappings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Accès utilisateur aux mappages"
  ON crm_mappings FOR ALL
  USING (auth.uid() = user_id);

-- Événements CRM
CREATE TABLE crm_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  config_id UUID REFERENCES crm_configs(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  event_type TEXT NOT NULL,
  workflow_id TEXT NOT NULL,
  crm_object_type TEXT NOT NULL,
  crm_action TEXT NOT NULL,
  trigger_conditions JSONB DEFAULT '{}',
  data_mapping JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE crm_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Accès utilisateur aux événements"
  ON crm_events FOR ALL
  USING (auth.uid() = user_id);

-- Index pour améliorer les performances
CREATE INDEX idx_crm_events_workflow ON crm_events(workflow_id);
CREATE INDEX idx_crm_mappings_config ON crm_mappings(config_id);
