import { CalendarAdapter } from '../CalendarService';
import { CalendarAccount, CalendarEvent } from '../types';
import { Client } from '@microsoft/microsoft-graph-client';

export class MicrosoftCalendarAdapter implements CalendarAdapter {
  private client: Client;
  private account: CalendarAccount;

  constructor(account: CalendarAccount) {
    this.account = account;
    this.initializeClient();
  }

  private initializeClient() {
    this.client = Client.init({
      authProvider: async (done) => {
        done(null, this.account.access_token);
      }
    });
  }

  async authorize(): Promise<void> {
    // Implémentation de l'autorisation Microsoft 365
  }

  async listEvents(start: Date, end: Date): Promise<CalendarEvent[]> {
    const response = await this.client
      .api('/me/calendar/events')
      .filter(`start/dateTime ge '${start.toISOString()}' and end/dateTime le '${end.toISOString()}'`)
      .get();

    return response.value.map(this.mapMicrosoftEvent);
  }

  async createEvent(event: Partial<CalendarEvent>): Promise<CalendarEvent> {
    const microsoftEvent = this.mapToMicrosoftEvent(event);
    const response = await this.client
      .api('/me/calendar/events')
      .post(microsoftEvent);

    return this.mapMicrosoftEvent(response);
  }

  async updateEvent(event: CalendarEvent): Promise<CalendarEvent> {
    const microsoftEvent = this.mapToMicrosoftEvent(event);
    const response = await this.client
      .api(`/me/calendar/events/${event.external_event_id}`)
      .update(microsoftEvent);

    return this.mapMicrosoftEvent(response);
  }

  async deleteEvent(eventId: string): Promise<void> {
    await this.client
      .api(`/me/calendar/events/${eventId}`)
      .delete();
  }

  async sync(): Promise<void> {
    // Implémentation de la synchronisation complète
  }

  private mapMicrosoftEvent(msEvent: any): CalendarEvent {
    return {
      id: msEvent.id,
      account_id: this.account.id,
      external_event_id: msEvent.id,
      title: msEvent.subject,
      description: msEvent.body.content,
      start_time: new Date(msEvent.start.dateTime + 'Z'),
      end_time: new Date(msEvent.end.dateTime + 'Z'),
      timezone: msEvent.start.timeZone,
      location: msEvent.location.displayName,
      attendees: (msEvent.attendees || []).map((a: any) => ({
        email: a.emailAddress.address,
        name: a.emailAddress.name,
        response: a.status.response
      })),
      metadata: {
        webLink: msEvent.webLink,
        createdDateTime: msEvent.createdDateTime,
        lastModifiedDateTime: msEvent.lastModifiedDateTime
      }
    };
  }

  private mapToMicrosoftEvent(event: Partial<CalendarEvent>): any {
    return {
      subject: event.title,
      body: {
        contentType: 'text',
        content: event.description
      },
      start: {
        dateTime: event.start_time?.toISOString().split('Z')[0],
        timeZone: event.timezone
      },
      end: {
        dateTime: event.end_time?.toISOString().split('Z')[0],
        timeZone: event.timezone
      },
      location: {
        displayName: event.location
      },
      attendees: event.attendees?.map(a => ({
        emailAddress: {
          address: a.email,
          name: a.name
        }
      }))
    };
  }
}
