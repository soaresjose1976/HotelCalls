import { supabase } from '../supabase';
import { CalendarProvider, CalendarAccount, CalendarEvent } from './types';
import { GoogleCalendarAdapter } from './adapters/GoogleCalendarAdapter';
import { MicrosoftCalendarAdapter } from './adapters/MicrosoftCalendarAdapter';
import { ICloudCalendarAdapter } from './adapters/ICloudCalendarAdapter';
import { CaldavCalendarAdapter } from './adapters/CaldavCalendarAdapter';

export interface CalendarAdapter {
  authorize(): Promise<void>;
  listEvents(start: Date, end: Date): Promise<CalendarEvent[]>;
  createEvent(event: Partial<CalendarEvent>): Promise<CalendarEvent>;
  updateEvent(event: CalendarEvent): Promise<CalendarEvent>;
  deleteEvent(eventId: string): Promise<void>;
  sync(): Promise<void>;
}

export class CalendarService {
  private static instance: CalendarService;
  private adapters: Map<string, CalendarAdapter> = new Map();

  private constructor() {}

  static getInstance(): CalendarService {
    if (!CalendarService.instance) {
      CalendarService.instance = new CalendarService();
    }
    return CalendarService.instance;
  }

  private getAdapter(account: CalendarAccount): CalendarAdapter {
    if (this.adapters.has(account.id)) {
      return this.adapters.get(account.id)!;
    }

    let adapter: CalendarAdapter;
    
    switch (account.provider_id) {
      case 'google':
        adapter = new GoogleCalendarAdapter(account);
        break;
      case 'microsoft':
        adapter = new MicrosoftCalendarAdapter(account);
        break;
      case 'icloud':
        adapter = new ICloudCalendarAdapter(account);
        break;
      case 'caldav':
        adapter = new CaldavCalendarAdapter(account);
        break;
      default:
        throw new Error(`Provider non supporté: ${account.provider_id}`);
    }

    this.adapters.set(account.id, adapter);
    return adapter;
  }

  async listAccounts(userId: string): Promise<CalendarAccount[]> {
    const { data } = await supabase
      .from('calendar_accounts')
      .select('*')
      .eq('user_id', userId)
      .eq('is_active', true);
    
    return data || [];
  }

  async getEvents(
    accountId: string,
    start: Date,
    end: Date
  ): Promise<CalendarEvent[]> {
    const { data: account } = await supabase
      .from('calendar_accounts')
      .select('*')
      .eq('id', accountId)
      .single();

    if (!account) {
      throw new Error('Compte calendrier non trouvé');
    }

    const adapter = this.getAdapter(account);
    return adapter.listEvents(start, end);
  }

  async createEvent(
    accountId: string,
    event: Partial<CalendarEvent>
  ): Promise<CalendarEvent> {
    const { data: account } = await supabase
      .from('calendar_accounts')
      .select('*')
      .eq('id', accountId)
      .single();

    if (!account) {
      throw new Error('Compte calendrier non trouvé');
    }

    const adapter = this.getAdapter(account);
    return adapter.createEvent(event);
  }

  async syncAccount(accountId: string): Promise<void> {
    const { data: account } = await supabase
      .from('calendar_accounts')
      .select('*')
      .eq('id', accountId)
      .single();

    if (!account) {
      throw new Error('Compte calendrier non trouvé');
    }

    const adapter = this.getAdapter(account);
    await adapter.sync();

    await supabase
      .from('calendar_accounts')
      .update({ last_sync: new Date().toISOString() })
      .eq('id', accountId);
  }

  async refreshToken(accountId: string): Promise<void> {
    const { data: account } = await supabase
      .from('calendar_accounts')
      .select('*')
      .eq('id', accountId)
      .single();

    if (!account) {
      throw new Error('Compte calendrier non trouvé');
    }

    const adapter = this.getAdapter(account);
    await adapter.authorize();
  }
}

export const calendarService = CalendarService.getInstance();
