/*
  # Constructeur d'invites pour les agents vocaux
  
  1. Tables créées:
    - prompt_templates (modèles d'invites)
    - prompt_steps (étapes de conversation)
    - prompt_variables (variables personnalisables)
  
  2. Sécurité:
    - RLS activé sur toutes les tables
*/

-- Table des modèles d'invites
CREATE TABLE prompt_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  initial_prompt TEXT NOT NULL,
  fallback_prompt TEXT,
  language_code TEXT NOT NULL DEFAULT 'fr',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE
);

ALTER TABLE prompt_templates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Accès utilisateur aux modèles"
  ON prompt_templates FOR ALL
  USING (auth.uid() = user_id);

-- Table des étapes de conversation
CREATE TABLE prompt_steps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  template_id UUID REFERENCES prompt_templates(id) ON DELETE CASCADE,
  step_order INTEGER NOT NULL,
  trigger_type TEXT NOT NULL CHECK (trigger_type IN ('intention', 'mot-clé', 'condition')),
  trigger_value TEXT NOT NULL,
  response_text TEXT NOT NULL,
  next_actions JSONB DEFAULT '[]',
  conditions JSONB DEFAULT '{}',
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE
);

ALTER TABLE prompt_steps ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Accès utilisateur aux étapes"
  ON prompt_steps FOR ALL
  USING (auth.uid() = user_id);

-- Table des variables personnalisables
CREATE TABLE prompt_variables (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  template_id UUID REFERENCES prompt_templates(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  default_value TEXT,
  required BOOLEAN DEFAULT false,
  validation_rules JSONB DEFAULT '{}',
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE
);

ALTER TABLE prompt_variables ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Accès utilisateur aux variables"
  ON prompt_variables FOR ALL
  USING (auth.uid() = user_id);

-- Index pour améliorer les performances
CREATE INDEX idx_prompt_steps_order ON prompt_steps(template_id, step_order);
CREATE INDEX idx_prompt_templates_language ON prompt_templates(language_code);