/*
  # Intégration Plateformes Hôtelières
  
  1. Tables:
    - hotel_platforms (plateformes supportées)
    - platform_accounts (comptes des plateformes)
    - platform_listings (annonces synchronisées)
    - platform_bookings (réservations)
    - platform_sync_logs (logs de synchronisation)
  
  2. Sécurité:
    - RLS activé sur toutes les tables
*/

-- Plateformes supportées
CREATE TABLE hotel_platforms (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  platform_type TEXT NOT NULL,
  api_endpoint TEXT,
  is_active BOOLEAN DEFAULT true,
  config JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Comptes des plateformes
CREATE TABLE platform_accounts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  platform_id UUID REFERENCES hotel_platforms(id),
  account_name TEXT NOT NULL,
  api_key TEXT,
  api_secret TEXT,
  access_token TEXT,
  refresh_token TEXT,
  token_expires_at TIMESTAMPTZ,
  settings JSONB DEFAULT '{}',
  is_active BOOLEAN DEFAULT true,
  last_sync TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Annonces synchronisées
CREATE TABLE platform_listings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  account_id UUID REFERENCES platform_accounts(id) ON DELETE CASCADE,
  room_id UUID REFERENCES hotel_rooms(id),
  external_listing_id TEXT NOT NULL,
  platform_url TEXT,
  status TEXT NOT NULL,
  price_settings JSONB DEFAULT '{}',
  availability_settings JSONB DEFAULT '{}',
  sync_enabled BOOLEAN DEFAULT true,
  last_sync TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(account_id, external_listing_id)
);

-- Réservations des plateformes
CREATE TABLE platform_bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  listing_id UUID REFERENCES platform_listings(id) ON DELETE CASCADE,
  booking_id UUID REFERENCES hotel_bookings(id),
  external_booking_id TEXT NOT NULL,
  guest_info JSONB NOT NULL,
  check_in TIMESTAMPTZ NOT NULL,
  check_out TIMESTAMPTZ NOT NULL,
  total_price DECIMAL(10,2) NOT NULL,
  commission_amount DECIMAL(10,2),
  status TEXT NOT NULL,
  payment_status TEXT,
  special_requests TEXT,
  platform_data JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(listing_id, external_booking_id)
);

-- Logs de synchronisation
CREATE TABLE platform_sync_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  account_id UUID REFERENCES platform_accounts(id) ON DELETE CASCADE,
  sync_type TEXT NOT NULL,
  listings_processed INT DEFAULT 0,
  bookings_processed INT DEFAULT 0,
  errors_count INT DEFAULT 0,
  error_details JSONB DEFAULT '[]',
  started_at TIMESTAMPTZ DEFAULT now(),
  completed_at TIMESTAMPTZ,
  success BOOLEAN
);

-- Sécurité
ALTER TABLE platform_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE platform_listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE platform_bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE platform_sync_logs ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Accès utilisateur aux comptes plateforme"
  ON platform_accounts FOR ALL
  USING (auth.uid() = user_id);

CREATE POLICY "Accès utilisateur aux annonces"
  ON platform_listings FOR ALL
  USING (
    account_id IN (
      SELECT id FROM platform_accounts WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Accès utilisateur aux réservations"
  ON platform_bookings FOR ALL
  USING (
    listing_id IN (
      SELECT id FROM platform_listings WHERE account_id IN (
        SELECT id FROM platform_accounts WHERE user_id = auth.uid()
      )
    )
  );

CREATE POLICY "Accès utilisateur aux logs"
  ON platform_sync_logs FOR ALL
  USING (
    account_id IN (
      SELECT id FROM platform_accounts WHERE user_id = auth.uid()
    )
  );

-- Index pour les performances
CREATE INDEX idx_platform_listings_account ON platform_listings(account_id);
CREATE INDEX idx_platform_bookings_listing ON platform_bookings(listing_id);
CREATE INDEX idx_platform_bookings_dates ON platform_bookings(check_in, check_out);

-- Insertion des plateformes par défaut
INSERT INTO hotel_platforms (name, platform_type, api_endpoint, config) VALUES
  ('Booking.com', 'booking', 'https://distribution-xml.booking.com/2.0', '{"connection_type": "xml_api"}'),
  ('Expedia', 'expedia', 'https://api.expediapartnersolutions.com/v1', '{"connection_type": "rest_api"}'),
  ('Airbnb', 'airbnb', 'https://api.airbnb.com/v2', '{"connection_type": "rest_api"}'),
  ('Hotels.com', 'hotels', 'https://api.hotels.com/v3', '{"connection_type": "rest_api"}');
