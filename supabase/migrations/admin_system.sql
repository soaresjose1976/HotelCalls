/*
  # Système d'administration
  
  1. Nouvelles Tables:
    - admin_settings (configuration globale)
    - admin_audit_logs (journal d'audit)
    
  2. Sécurité:
    - RLS pour accès admin uniquement
*/

-- Table des paramètres admin
CREATE TABLE admin_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT NOT NULL UNIQUE,
  value JSONB NOT NULL,
  description TEXT,
  updated_at TIMESTAMPTZ DEFAULT now(),
  updated_by UUID REFERENCES auth.users(id)
);

-- Table des logs d'audit
CREATE TABLE admin_audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  action TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id UUID,
  changes JSONB,
  performed_by UUID REFERENCES auth.users(id),
  performed_at TIMESTAMPTZ DEFAULT now()
);

-- Ajout du rôle super_admin
INSERT INTO user_roles (name, permissions)
VALUES ('super_admin', '{"all": true, "admin_panel": true}'::jsonb);

-- Sécurité RLS
ALTER TABLE admin_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_audit_logs ENABLE ROW LEVEL SECURITY;

-- Politiques d'accès admin
CREATE POLICY "Accès admin_settings pour super_admin"
  ON admin_settings
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM organization_users ou
      JOIN user_roles ur ON ou.role_id = ur.id
      WHERE ou.user_id = auth.uid()
      AND ur.name = 'super_admin'
    )
  );

CREATE POLICY "Accès admin_audit_logs pour super_admin"
  ON admin_audit_logs
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM organization_users ou
      JOIN user_roles ur ON ou.role_id = ur.id
      WHERE ou.user_id = auth.uid()
      AND ur.name = 'super_admin'
    )
  );

-- Index pour les performances
CREATE INDEX idx_audit_logs_action ON admin_audit_logs(action);
CREATE INDEX idx_audit_logs_entity ON admin_audit_logs(entity_type, entity_id);
CREATE INDEX idx_audit_logs_performed_at ON admin_audit_logs(performed_at);
