export interface HotelPlatform {
  id: string;
  name: string;
  platform_type: 'booking' | 'expedia' | 'airbnb' | 'hotels';
  api_endpoint: string;
  config: Record<string, any>;
}

export interface PlatformAccount {
  id: string;
  user_id: string;
  platform_id: string;
  account_name: string;
  api_key?: string;
  api_secret?: string;
  access_token?: string;
  refresh_token?: string;
  token_expires_at?: Date;
  settings: Record<string, any>;
}

export interface PlatformListing {
  id: string;
  account_id: string;
  room_id: string;
  external_listing_id: string;
  platform_url?: string;
  status: 'active' | 'inactive' | 'pending' | 'error';
  price_settings: {
    base_price: number;
    currency: string;
    dynamic_pricing?: boolean;
    price_rules?: Array<{
      condition: string;
      adjustment: number;
      adjustment_type: 'fixed' | 'percentage';
    }>;
  };
  availability_settings: {
    sync_availability: boolean;
    min_stay?: number;
    max_stay?: number;
    advance_booking?: number;
    closed_dates?: string[];
  };
}

export interface PlatformBooking {
  id: string;
  listing_id: string;
  booking_id?: string;
  external_booking_id: string;
  guest_info: {
    name: string;
    email: string;
    phone?: string;
    nationality?: string;
    preferences?: Record<string, any>;
  };
  check_in: Date;
  check_out: Date;
  total_price: number;
  commission_amount?: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  payment_status: 'pending' | 'paid' | 'refunded';
  special_requests?: string;
  platform_data: Record<string, any>;
}

export interface SyncLog {
  id: string;
  account_id: string;
  sync_type: string;
  listings_processed: number;
  bookings_processed: number;
  errors_count: number;
  error_details: Array<{
    type: string;
    message: string;
    data?: any;
  }>;
  started_at: Date;
  completed_at?: Date;
  success: boolean;
}
