/*
  # Système de gestion des organisations et utilisateurs
  
  1. Nouvelles Tables:
    - organizations (hôtels)
    - organization_users (membres)
    - user_roles (rôles et permissions)
    
  2. Sécurité:
    - RLS pour chaque table
    - Politiques par rôle
*/

-- Table des organisations (hôtels)
CREATE TABLE organizations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'hotel',
  address TEXT,
  phone TEXT,
  email TEXT,
  settings JSONB DEFAULT '{}',
  subscription_tier TEXT DEFAULT 'basic',
  subscription_status TEXT DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;

-- Table des rôles utilisateurs
CREATE TABLE user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  permissions JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now()
);

INSERT INTO user_roles (name, permissions) VALUES
  ('owner', '{"all": true}'::jsonb),
  ('admin', '{"manage_users": true, "manage_settings": true, "manage_services": true}'::jsonb),
  ('manager', '{"manage_services": true, "view_analytics": true}'::jsonb),
  ('staff', '{"use_services": true}'::jsonb);

-- Table de liaison organisation-utilisateurs
CREATE TABLE organization_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  role_id UUID REFERENCES user_roles(id),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(organization_id, user_id)
);

ALTER TABLE organization_users ENABLE ROW LEVEL SECURITY;

-- Politiques RLS

-- Organizations: visible par les membres
CREATE POLICY "Visible par les membres de l'organisation"
  ON organizations
  FOR SELECT
  USING (
    id IN (
      SELECT organization_id 
      FROM organization_users 
      WHERE user_id = auth.uid()
    )
  );

-- Organization Users: gérable par les admins
CREATE POLICY "Gérable par les administrateurs"
  ON organization_users
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM organization_users ou
      JOIN user_roles ur ON ou.role_id = ur.id
      WHERE ou.user_id = auth.uid()
      AND ou.organization_id = organization_id
      AND (ur.name = 'owner' OR ur.name = 'admin')
    )
  );

-- Indexes pour les performances
CREATE INDEX idx_org_users_user ON organization_users(user_id);
CREATE INDEX idx_org_users_org ON organization_users(organization_id);

-- Mise à jour des tables existantes pour lier aux organisations
ALTER TABLE voice_agents ADD COLUMN IF NOT EXISTS organization_id UUID REFERENCES organizations(id);
ALTER TABLE service_requests ADD COLUMN IF NOT EXISTS organization_id UUID REFERENCES organizations(id);
ALTER TABLE hotel_rooms ADD COLUMN IF NOT EXISTS organization_id UUID REFERENCES organizations(id);
ALTER TABLE hotel_services ADD COLUMN IF NOT EXISTS organization_id UUID REFERENCES organizations(id);
