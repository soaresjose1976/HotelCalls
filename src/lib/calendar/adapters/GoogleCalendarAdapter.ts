import { CalendarAdapter } from '../CalendarService';
import { CalendarAccount, CalendarEvent } from '../types';
import { google } from 'googleapis';

export class GoogleCalendarAdapter implements CalendarAdapter {
  private calendar: any;
  private account: CalendarAccount;

  constructor(account: CalendarAccount) {
    this.account = account;
    this.initializeClient();
  }

  private initializeClient() {
    const auth = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET
    );

    auth.setCredentials({
      access_token: this.account.access_token,
      refresh_token: this.account.refresh_token,
      expiry_date: this.account.token_expires_at?.getTime()
    });

    this.calendar = google.calendar({ version: 'v3', auth });
  }

  async authorize(): Promise<void> {
    // Implémentation de l'autorisation Google Calendar
  }

  async listEvents(start: Date, end: Date): Promise<CalendarEvent[]> {
    const response = await this.calendar.events.list({
      calendarId: this.account.calendar_id,
      timeMin: start.toISOString(),
      timeMax: end.toISOString(),
      singleEvents: true,
      orderBy: 'startTime'
    });

    return response.data.items.map(this.mapGoogleEvent);
  }

  async createEvent(event: Partial<CalendarEvent>): Promise<CalendarEvent> {
    const googleEvent = this.mapToGoogleEvent(event);
    const response = await this.calendar.events.insert({
      calendarId: this.account.calendar_id,
      resource: googleEvent
    });

    return this.mapGoogleEvent(response.data);
  }

  async updateEvent(event: CalendarEvent): Promise<CalendarEvent> {
    const googleEvent = this.mapToGoogleEvent(event);
    const response = await this.calendar.events.update({
      calendarId: this.account.calendar_id,
      eventId: event.external_event_id,
      resource: googleEvent
    });

    return this.mapGoogleEvent(response.data);
  }

  async deleteEvent(eventId: string): Promise<void> {
    await this.calendar.events.delete({
      calendarId: this.account.calendar_id,
      eventId
    });
  }

  async sync(): Promise<void> {
    // Implémentation de la synchronisation complète
  }

  private mapGoogleEvent(googleEvent: any): CalendarEvent {
    return {
      id: googleEvent.id,
      account_id: this.account.id,
      external_event_id: googleEvent.id,
      title: googleEvent.summary,
      description: googleEvent.description,
      start_time: new Date(googleEvent.start.dateTime || googleEvent.start.date),
      end_time: new Date(googleEvent.end.dateTime || googleEvent.end.date),
      timezone: googleEvent.start.timeZone,
      location: googleEvent.location,
      attendees: (googleEvent.attendees || []).map((a: any) => ({
        email: a.email,
        name: a.displayName,
        response: a.responseStatus
      })),
      metadata: {
        htmlLink: googleEvent.htmlLink,
        creator: googleEvent.creator,
        created: googleEvent.created,
        updated: googleEvent.updated
      }
    };
  }

  private mapToGoogleEvent(event: Partial<CalendarEvent>): any {
    return {
      summary: event.title,
      description: event.description,
      start: {
        dateTime: event.start_time?.toISOString(),
        timeZone: event.timezone
      },
      end: {
        dateTime: event.end_time?.toISOString(),
        timeZone: event.timezone
      },
      location: event.location,
      attendees: event.attendees?.map(a => ({
        email: a.email,
        displayName: a.name
      }))
    };
  }
}
