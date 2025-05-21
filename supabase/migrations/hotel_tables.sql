/*
  # Hotel Industry Schema Extension
  
  1. New Tables:
    - hotel_rooms (room inventory)
    - hotel_bookings (reservations)
    - hotel_services (available services)
    - service_requests (guest service requests)
    
  2. Security:
    - RLS policies for each table
    - Staff access control
*/

-- Hotel Rooms Table
CREATE TABLE hotel_rooms (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  room_number TEXT NOT NULL,
  type TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('available', 'occupied', 'maintenance', 'cleaning')),
  price_per_night DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE
);

ALTER TABLE hotel_rooms ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Staff can manage rooms"
  ON hotel_rooms
  USING (auth.uid() = user_id);

-- Hotel Bookings Table
CREATE TABLE hotel_bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  guest_name TEXT NOT NULL,
  guest_phone TEXT NOT NULL,
  room_id UUID NOT NULL REFERENCES hotel_rooms(id),
  check_in TIMESTAMPTZ NOT NULL,
  check_out TIMESTAMPTZ NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('confirmed', 'pending', 'cancelled', 'checked_in', 'checked_out')),
  special_requests TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE
);

ALTER TABLE hotel_bookings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Staff can manage bookings"
  ON hotel_bookings
  USING (auth.uid() = user_id);

-- Hotel Services Table
CREATE TABLE hotel_services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  availability TEXT NOT NULL CHECK (availability IN ('always', 'on_request', 'scheduled')),
  created_at TIMESTAMPTZ DEFAULT now(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE
);

ALTER TABLE hotel_services ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Staff can manage services"
  ON hotel_services
  USING (auth.uid() = user_id);

-- Service Requests Table
CREATE TABLE service_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id UUID NOT NULL REFERENCES hotel_bookings(id),
  service_id UUID NOT NULL REFERENCES hotel_services(id),
  requested_time TIMESTAMPTZ NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE
);

ALTER TABLE service_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Staff can manage service requests"
  ON service_requests
  USING (auth.uid() = user_id);
