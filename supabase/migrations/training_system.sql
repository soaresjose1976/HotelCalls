/*
  # Système de formation des agents
  
  1. Tables créées:
    - training_materials (documents de formation)
    - agent_training_progress (suivi de formation)
    - training_categories (catégories de formation)
  
  2. Sécurité:
    - RLS activé sur toutes les tables
*/

-- Table des catégories de formation
CREATE TABLE training_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE
);

ALTER TABLE training_categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Accès utilisateur aux catégories"
  ON training_categories FOR ALL
  USING (auth.uid() = user_id);

-- Table des documents de formation
CREATE TABLE training_materials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  category_id UUID REFERENCES training_categories(id) ON DELETE SET NULL,
  content_type TEXT NOT NULL,
  content JSONB NOT NULL,
  metadata JSONB DEFAULT '{}',
  language TEXT NOT NULL DEFAULT 'fr',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE
);

ALTER TABLE training_materials ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Accès utilisateur aux documents"
  ON training_materials FOR ALL
  USING (auth.uid() = user_id);

-- Table de suivi de formation des agents
CREATE TABLE agent_training_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_id UUID REFERENCES voice_agents(id) ON DELETE CASCADE,
  material_id UUID REFERENCES training_materials(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'pending',
  progress INTEGER DEFAULT 0,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  CONSTRAINT valid_status CHECK (status IN ('pending', 'in_progress', 'completed', 'failed'))
);

ALTER TABLE agent_training_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Accès utilisateur au suivi"
  ON agent_training_progress FOR ALL
  USING (auth.uid() = user_id);

-- Index pour améliorer les performances
CREATE INDEX idx_training_materials_category ON training_materials(category_id);
CREATE INDEX idx_training_materials_language ON training_materials(language);
CREATE INDEX idx_agent_training_status ON agent_training_progress(agent_id, status);
