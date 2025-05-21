/*
  # Système de Calendriers
  
  1. Tables:
    - calendar_providers (types de calendriers supportés)
    - calendar_accounts (comptes calendrier des utilisateurs)
    - calendar_events (événements synchronisés)
    - calendar_sync_logs (logs de synchronisation)
  
  2. Sécurité:
    - RLS activé sur toutes les tables
*/

-- Types de calendriers supportés
CREATE TABLE calendar_providers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  provider_type TEXT NOT NULL,
  is_active BOOLEAN DEFAULT true,
  config JSONB DEFAULT '{}'
);

-- Comptes calendrier des utilisateurs
CREATE TABLE calendar_accounts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  provider_id UUID REFERENCES calendar_providers(id),
  account_email TEXT NOT NULL,
  access_token TEXT,
  refresh_token TEXT,
  token_expires_at TIMESTAMPTZ,
  calendar_id TEXT,
  settings JSONB DEFAULT '{}',
  is_active BOOLEAN DEFAULT true,
  last_sync TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Événements synchronisés
CREATE TABLE calendar_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  account_id UUID REFERENCES calendar_accounts(id) ON DELETE CASCADE,
  external_event_id TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  start_time TIMESTAMPTZ NOT NULL,
  end_time TIMESTAMPTZ NOT NULL,
  timezone TEXT,
  location TEXT,
  attendees JSONB DEFAULT '[]',
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(account_id, external_event_id)
);

-- Logs de synchronisation
CREATE TABLE calendar_sync_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  account_id UUID REFERENCES calendar_accounts(id) ON DELETE CASCADE,
  sync_type TEXT NOT NULL,
  events_processed INT DEFAULT 0,
  events_created INT DEFAULT 0,
  events_updated INT DEFAULT 0,
  events_deleted INT DEFAULT 0,
  error_message TEXT,
  started_at TIMESTAMPTZ DEFAULT now(),
  completed_at TIMESTAMPTZ,
  success BOOLEAN
);

-- Sécurité
ALTER TABLE calendar_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE calendar_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE calendar_sync_logs ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Accès utilisateur aux comptes calendrier"
  ON calendar_accounts FOR ALL
  USING (auth.uid() = user_id);

CREATE POLICY "Accès utilisateur aux événements"
  ON calendar_events FOR ALL
  USING (
    account_id IN (
      SELECT id FROM calendar_accounts WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Accès utilisateur aux logs"
  ON calendar_sync_logs FOR ALL
  USING (
    account_id IN (
      SELECT id FROM calendar_accounts WHERE user_id = auth.uid()
    )
  );

-- Index pour les performances
CREATE INDEX idx_calendar_events_account ON calendar_events(account_id);
CREATE INDEX idx_calendar_events_time ON calendar_events(start_time, end_time);
CREATE INDEX idx_calendar_sync_logs_account ON calendar_sync_logs(account_id);

-- Insertion des providers par défaut
INSERT INTO calendar_providers (name, provider_type, config) VALUES
  ('Google Calendar', 'google', '{"auth_url": "https://accounts.google.com/o/oauth2/v2/auth", "scope": "https://www.googleapis.com/auth/calendar"}'),
  ('Microsoft 365', 'microsoft', '{"auth_url": "https://login.microsoftonline.com/common/oauth2/v2.0/authorize", "scope": "Calendars.ReadWrite"}'),
  ('iCloud', 'icloud', '{"auth_type": "app_specific_password"}'),
  ('Caldav', 'caldav', '{"supports_custom_url": true}');
