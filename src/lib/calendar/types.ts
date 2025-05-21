export interface CalendarProvider {
  id: string;
  name: string;
  provider_type: 'google' | 'microsoft' | 'icloud' | 'caldav';
  config: Record<string, any>;
}

export interface CalendarAccount {
  id: string;
  user_id: string;
  provider_id: string;
  account_email: string;
  access_token?: string;
  refresh_token?: string;
  token_expires_at?: Date;
  calendar_id: string;
  settings: Record<string, any>;
  is_active: boolean;
  last_sync?: Date;
}

export interface CalendarEvent {
  id: string;
  account_id: string;
  external_event_id: string;
  title: string;
  description?: string;
  start_time: Date;
  end_time: Date;
  timezone?: string;
  location?: string;
  attendees: Array<{
    email: string;
    name?: string;
    response?: 'accepted' | 'declined' | 'tentative';
  }>;
  metadata: Record<string, any>;
}

export interface SyncLog {
  id: string;
  account_id: string;
  sync_type: string;
  events_processed: number;
  events_created: number;
  events_updated: number;
  events_deleted: number;
  error_message?: string;
  started_at: Date;
  completed_at?: Date;
  success: boolean;
}
