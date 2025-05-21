/*
  # Améliorations du système de formation
  
  1. Nouvelles tables:
    - training_quizzes (quiz d'évaluation)
    - training_quiz_questions (questions des quiz)
    - training_quiz_responses (réponses des agents)
    - training_certifications (certifications des agents)
*/

-- Table des quiz
CREATE TABLE training_quizzes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  material_id UUID REFERENCES training_materials(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  passing_score INTEGER NOT NULL DEFAULT 70,
  created_at TIMESTAMPTZ DEFAULT now(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE
);

ALTER TABLE training_quizzes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Accès utilisateur aux quiz" ON training_quizzes FOR ALL USING (auth.uid() = user_id);

-- Table des questions
CREATE TABLE training_quiz_questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  quiz_id UUID REFERENCES training_quizzes(id) ON DELETE CASCADE,
  question TEXT NOT NULL,
  options JSONB NOT NULL,
  correct_answer TEXT NOT NULL,
  points INTEGER NOT NULL DEFAULT 1,
  explanation TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE training_quiz_questions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Accès utilisateur aux questions" ON training_quiz_questions 
  FOR ALL USING (EXISTS (
    SELECT 1 FROM training_quizzes
    WHERE id = quiz_id AND user_id = auth.uid()
  ));

-- Table des réponses aux quiz
CREATE TABLE training_quiz_responses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_id UUID REFERENCES voice_agents(id) ON DELETE CASCADE,
  quiz_id UUID REFERENCES training_quizzes(id) ON DELETE CASCADE,
  answers JSONB NOT NULL,
  score INTEGER NOT NULL,
  passed BOOLEAN NOT NULL,
  completed_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE training_quiz_responses ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Accès utilisateur aux réponses" ON training_quiz_responses 
  FOR ALL USING (EXISTS (
    SELECT 1 FROM training_quizzes
    WHERE id = quiz_id AND user_id = auth.uid()
  ));

-- Table des certifications
CREATE TABLE training_certifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_id UUID REFERENCES voice_agents(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  issued_at TIMESTAMPTZ DEFAULT now(),
  expires_at TIMESTAMPTZ,
  metadata JSONB DEFAULT '{}'
);

ALTER TABLE training_certifications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Accès utilisateur aux certifications" ON training_certifications 
  FOR ALL USING (EXISTS (
    SELECT 1 FROM voice_agents
    WHERE id = agent_id AND user_id = auth.uid()
  ));

-- Ajout de champs pour le suivi avancé
ALTER TABLE training_materials ADD COLUMN required_time_minutes INTEGER;
ALTER TABLE training_materials ADD COLUMN prerequisites JSONB DEFAULT '[]';
ALTER TABLE training_materials ADD COLUMN tags TEXT[] DEFAULT '{}';

-- Ajout de champs pour le suivi de progression
ALTER TABLE agent_training_progress ADD COLUMN time_spent_minutes INTEGER DEFAULT 0;
ALTER TABLE agent_training_progress ADD COLUMN last_position JSONB DEFAULT '{}';
ALTER TABLE agent_training_progress ADD COLUMN notes TEXT;
