/*
  # Système d'abonnement
  
  1. Nouvelles Tables:
    - subscription_plans (plans disponibles)
    - subscriptions (abonnements actifs)
    - subscription_features (fonctionnalités par plan)
    - billing_history (historique de facturation)
    
  2. Sécurité:
    - RLS pour toutes les tables
    - Politiques de visibilité par organisation
*/

-- Plans d'abonnement disponibles
CREATE TABLE subscription_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  price_monthly DECIMAL(10,2) NOT NULL,
  price_yearly DECIMAL(10,2) NOT NULL,
  features JSONB NOT NULL DEFAULT '{}',
  limits JSONB NOT NULL DEFAULT '{}',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Insertion des plans par défaut
INSERT INTO subscription_plans (name, description, price_monthly, price_yearly, features, limits) VALUES
  ('Basic', 'Pour les petits hôtels', 49.99, 499.99, 
    '{
      "voice_agents": true,
      "basic_analytics": true,
      "email_support": true
    }'::jsonb,
    '{
      "max_agents": 3,
      "max_calls_monthly": 1000,
      "max_users": 5
    }'::jsonb
  ),
  ('Premium', 'Pour les hôtels moyens', 99.99, 999.99,
    '{
      "voice_agents": true,
      "advanced_analytics": true,
      "priority_support": true,
      "custom_voices": true
    }'::jsonb,
    '{
      "max_agents": 10,
      "max_calls_monthly": 5000,
      "max_users": 15
    }'::jsonb
  ),
  ('Enterprise', 'Pour les grands hôtels', 199.99, 1999.99,
    '{
      "voice_agents": true,
      "advanced_analytics": true,
      "24_7_support": true,
      "custom_voices": true,
      "api_access": true,
      "white_label": true
    }'::jsonb,
    '{
      "max_agents": 50,
      "max_calls_monthly": 25000,
      "max_users": 50
    }'::jsonb
  );

-- Abonnements actifs
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  plan_id UUID REFERENCES subscription_plans(id),
  status TEXT NOT NULL DEFAULT 'active',
  current_period_start TIMESTAMPTZ NOT NULL,
  current_period_end TIMESTAMPTZ NOT NULL,
  cancel_at_period_end BOOLEAN DEFAULT false,
  payment_method_id TEXT,
  billing_cycle TEXT NOT NULL DEFAULT 'monthly',
  usage_this_period JSONB DEFAULT '{}',
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Historique de facturation
CREATE TABLE billing_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  subscription_id UUID REFERENCES subscriptions(id),
  amount DECIMAL(10,2) NOT NULL,
  status TEXT NOT NULL,
  billing_date TIMESTAMPTZ NOT NULL,
  payment_method TEXT,
  invoice_url TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Politiques RLS

ALTER TABLE subscription_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE billing_history ENABLE ROW LEVEL SECURITY;

-- Plans visibles par tous
CREATE POLICY "Plans visibles par tous"
  ON subscription_plans
  FOR SELECT
  USING (true);

-- Abonnements visibles par les membres de l'organisation
CREATE POLICY "Abonnements visibles par les membres"
  ON subscriptions
  FOR SELECT
  USING (
    organization_id IN (
      SELECT organization_id 
      FROM organization_users 
      WHERE user_id = auth.uid()
    )
  );

-- Historique visible par les admins
CREATE POLICY "Historique visible par les admins"
  ON billing_history
  FOR SELECT
  USING (
    organization_id IN (
      SELECT organization_id 
      FROM organization_users ou
      JOIN user_roles ur ON ou.role_id = ur.id
      WHERE ou.user_id = auth.uid()
      AND (ur.name = 'owner' OR ur.name = 'admin')
    )
  );

-- Indexes
CREATE INDEX idx_subscriptions_org ON subscriptions(organization_id);
CREATE INDEX idx_billing_history_org ON billing_history(organization_id);
CREATE INDEX idx_billing_history_sub ON billing_history(subscription_id);

-- Fonction pour vérifier les limites d'utilisation
CREATE OR REPLACE FUNCTION check_subscription_limits(
  org_id UUID,
  limit_name TEXT
) RETURNS BOOLEAN AS $$
DECLARE
  current_limit INTEGER;
  current_usage INTEGER;
BEGIN
  -- Récupérer la limite du plan
  SELECT (limits->>limit_name)::INTEGER INTO current_limit
  FROM subscription_plans sp
  JOIN subscriptions s ON s.plan_id = sp.id
  WHERE s.organization_id = org_id
  AND s.status = 'active';

  -- Récupérer l'utilisation actuelle
  SELECT (usage_this_period->>limit_name)::INTEGER INTO current_usage
  FROM subscriptions
  WHERE organization_id = org_id
  AND status = 'active';

  RETURN COALESCE(current_usage, 0) < COALESCE(current_limit, 0);
END;
$$ LANGUAGE plpgsql;
