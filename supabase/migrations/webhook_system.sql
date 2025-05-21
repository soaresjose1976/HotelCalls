/*
  # Système de Webhooks
  
  1. Tables créées:
    - webhooks (configurations des webhooks)
    - webhook_logs (historique des appels)
  
  2. Sécurité:
    - RLS activé sur toutes les tables
*/

-- Configuration des webhooks
CREATE TABLE webhooks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  url TEXT NOT NULL,
  event_types TEXT[] NOT NULL,
  headers JSONB DEFAULT '{}',
  is_active BOOLEAN DEFAULT true,
  retry_count INT DEFAULT 3,
  secret_key TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE webhooks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Accès utilisateur aux webhooks"
  ON webhooks FOR ALL
  USING (auth.uid() = user_id);

-- Logs des webhooks
CREATE TABLE webhook_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  webhook_id UUID REFERENCES webhooks(id) ON DELETE CASCADE,
  event_type TEXT NOT NULL,
  payload JSONB NOT NULL,
  response_status INT,
  response_body TEXT,
  attempt_count INT DEFAULT 0,
  success BOOLEAN,
  error_message TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE webhook_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Accès utilisateur aux logs"
  ON webhook_logs FOR ALL
  USING (
    webhook_id IN (
      SELECT id FROM webhooks WHERE user_id = auth.uid()
    )
  );

-- Index pour améliorer les performances
CREATE INDEX idx_webhook_logs_webhook ON webhook_logs(webhook_id);
CREATE INDEX idx_webhook_logs_created ON webhook_logs(created_at);
