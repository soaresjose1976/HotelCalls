import { supabase } from './supabase';
import crypto from 'crypto';

interface Webhook {
  id: string;
  url: string;
  event_types: string[];
  headers: Record<string, string>;
  retry_count: number;
  secret_key?: string;
}

export class WebhookService {
  private static instance: WebhookService;
  private webhooks: Map<string, Webhook[]> = new Map();

  private constructor() {}

  static getInstance(): WebhookService {
    if (!WebhookService.instance) {
      WebhookService.instance = new WebhookService();
    }
    return WebhookService.instance;
  }

  async initialize() {
    const { data: webhooks } = await supabase
      .from('webhooks')
      .select('*')
      .eq('is_active', true);

    if (webhooks) {
      webhooks.forEach(webhook => {
        webhook.event_types.forEach(eventType => {
          if (!this.webhooks.has(eventType)) {
            this.webhooks.set(eventType, []);
          }
          this.webhooks.get(eventType)?.push(webhook);
        });
      });
    }
  }

  async trigger(eventType: string, payload: any) {
    const webhooks = this.webhooks.get(eventType) || [];
    
    const promises = webhooks.map(webhook => 
      this.sendWebhook(webhook, eventType, payload)
    );

    return Promise.allSettled(promises);
  }

  private async sendWebhook(
    webhook: Webhook,
    eventType: string,
    payload: any,
    attempt: number = 1
  ) {
    const timestamp = new Date().toISOString();
    const signature = this.generateSignature(webhook.secret_key, payload);
    
    const headers = {
      'Content-Type': 'application/json',
      'X-Webhook-Timestamp': timestamp,
      'X-Webhook-Signature': signature,
      ...webhook.headers
    };

    try {
      const response = await fetch(webhook.url, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          event_type: eventType,
          timestamp,
          payload
        })
      });

      await this.logWebhookAttempt(webhook.id, eventType, payload, {
        status: response.status,
        success: response.ok,
        attempt
      });

      if (!response.ok && attempt < webhook.retry_count) {
        const backoff = Math.min(1000 * Math.pow(2, attempt - 1), 30000);
        await new Promise(resolve => setTimeout(resolve, backoff));
        return this.sendWebhook(webhook, eventType, payload, attempt + 1);
      }

      return response;
    } catch (error) {
      await this.logWebhookAttempt(webhook.id, eventType, payload, {
        status: 0,
        success: false,
        error: error.message,
        attempt
      });

      if (attempt < webhook.retry_count) {
        const backoff = Math.min(1000 * Math.pow(2, attempt - 1), 30000);
        await new Promise(resolve => setTimeout(resolve, backoff));
        return this.sendWebhook(webhook, eventType, payload, attempt + 1);
      }

      throw error;
    }
  }

  private generateSignature(secret: string | undefined, payload: any): string {
    if (!secret) return '';
    
    return crypto
      .createHmac('sha256', secret)
      .update(JSON.stringify(payload))
      .digest('hex');
  }

  private async logWebhookAttempt(
    webhookId: string,
    eventType: string,
    payload: any,
    result: {
      status: number;
      success: boolean;
      error?: string;
      attempt: number;
    }
  ) {
    await supabase.from('webhook_logs').insert({
      webhook_id: webhookId,
      event_type: eventType,
      payload,
      response_status: result.status,
      success: result.success,
      error_message: result.error,
      attempt_count: result.attempt
    });
  }
}

export const webhookService = WebhookService.getInstance();
