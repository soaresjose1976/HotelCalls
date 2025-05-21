/*
  # Gestion des appels entrants et sortants
  
  1. Tables créées:
    - incoming_calls (appels entrants)
    - outgoing_calls (appels sortants)
    - call_routing (routage des appels)
  
  2. Sécurité:
    - Politiques RLS pour chaque table
    - Contrôle d'accès basé sur l'utilisateur
*/

-- Table des appels entrants
CREATE TABLE incoming_calls (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  phone_number TEXT NOT NULL,
  start_time TIMESTAMPTZ DEFAULT now(),
  end_time TIMESTAMPTZ,
  status TEXT NOT NULL CHECK (status IN ('en-cours', 'terminé', 'manqué')),
  agent_id UUID REFERENCES voice_agents(id),
  recording_url TEXT,
  transcript TEXT,
  metadata JSONB DEFAULT '{}',
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE
);

ALTER TABLE incoming_calls ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Accès utilisateur aux appels entrants"
  ON incoming_calls FOR ALL
  USING (auth.uid() = user_id);

-- Table des appels sortants
CREATE TABLE outgoing_calls (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  phone_number TEXT NOT NULL,
  scheduled_time TIMESTAMPTZ,
  start_time TIMESTAMPTZ,
  end_time TIMESTAMPTZ,
  status TEXT NOT NULL CHECK (status IN ('planifié', 'en-cours', 'terminé', 'échoué')),
  agent_id UUID REFERENCES voice_agents(id),
  conversation_id UUID REFERENCES conversations(id),
  recording_url TEXT,
  transcript TEXT,
  retry_count INTEGER DEFAULT 0,
  metadata JSONB DEFAULT '{}',
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE
);

ALTER TABLE outgoing_calls ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Accès utilisateur aux appels sortants"
  ON outgoing_calls FOR ALL
  USING (auth.uid() = user_id);

-- Table de routage des appels
CREATE TABLE call_routing (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  phone_pattern TEXT NOT NULL,
  agent_id UUID REFERENCES voice_agents(id),
  priority INTEGER DEFAULT 0,
  active BOOLEAN DEFAULT true,
  schedule JSONB DEFAULT '{}',
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE
);

ALTER TABLE call_routing ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Accès utilisateur au routage"
  ON call_routing FOR ALL
  USING (auth.uid() = user_id);

-- Index pour améliorer les performances
CREATE INDEX idx_incoming_calls_status ON incoming_calls(status);
CREATE INDEX idx_outgoing_calls_status ON outgoing_calls(status);
CREATE INDEX idx_call_routing_pattern ON call_routing(phone_pattern);