/*
  # Ajout de la facturation à la seconde
  
  1. Modifications:
    - Ajout du prix par seconde aux plans
    - Ajout du suivi du temps d'utilisation
    - Mise à jour de l'historique de facturation
*/

ALTER TABLE subscription_plans
ADD COLUMN price_per_second DECIMAL(10,6) NOT NULL DEFAULT 0.001;

ALTER TABLE billing_history
ADD COLUMN seconds_used INTEGER DEFAULT 0;

-- Mise à jour des plans existants avec le prix par seconde
UPDATE subscription_plans
SET price_per_second = 
  CASE 
    WHEN name = 'Basic' THEN 0.001
    WHEN name = 'Premium' THEN 0.0008
    WHEN name = 'Enterprise' THEN 0.0005
  END;
