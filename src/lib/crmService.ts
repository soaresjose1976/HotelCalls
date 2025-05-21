import { supabase } from './supabase';

interface CRMConfig {
  id: string;
  crm_type: 'salesforce' | 'hubspot' | 'zoho' | 'pipedrive' | 'custom';
  api_key: string;
  api_url: string;
  settings: any;
}

interface CRMMapping {
  local_field: string;
  crm_field: string;
  field_type: string;
  transformation?: string;
}

interface CRMEvent {
  workflow_id: string;
  crm_object_type: string;
  crm_action: string;
  trigger_conditions: any;
  data_mapping: any;
}

export class CRMService {
  private config: CRMConfig | null = null;
  private mappings: CRMMapping[] = [];

  async initialize(userId: string) {
    const { data: config } = await supabase
      .from('crm_configs')
      .select('*')
      .eq('user_id', userId)
      .eq('is_active', true)
      .single();

    if (config) {
      this.config = config;
      const { data: mappings } = await supabase
        .from('crm_mappings')
        .select('*')
        .eq('config_id', config.id);
      
      this.mappings = mappings || [];
    }
  }

  async syncWorkflowEvent(workflowData: any) {
    if (!this.config) return null;

    const { data: event } = await supabase
      .from('crm_events')
      .select('*')
      .eq('workflow_id', workflowData.id)
      .single();

    if (!event) return null;

    const mappedData = this.mapDataToCRM(workflowData, event.data_mapping);
    return this.sendToCRM(event.crm_action, mappedData);
  }

  private mapDataToCRM(data: any, mapping: any) {
    const result: any = {};
    
    for (const [key, value] of Object.entries(mapping)) {
      const fieldMapping = this.mappings.find(m => m.local_field === key);
      if (fieldMapping) {
        result[fieldMapping.crm_field] = this.transformValue(
          data[key],
          fieldMapping.transformation
        );
      }
    }

    return result;
  }

  private async sendToCRM(action: string, data: any) {
    if (!this.config) return null;

    const headers = {
      'Authorization': `Bearer ${this.config.api_key}`,
      'Content-Type': 'application/json'
    };

    try {
      const response = await fetch(`${this.config.api_url}/${action}`, {
        method: 'POST',
        headers,
        body: JSON.stringify(data)
      });

      return await response.json();
    } catch (error) {
      console.error('CRM Sync Error:', error);
      return null;
    }
  }

  private transformValue(value: any, transformation?: string) {
    if (!transformation) return value;

    switch (transformation) {
      case 'uppercase':
        return String(value).toUpperCase();
      case 'lowercase':
        return String(value).toLowerCase();
      case 'boolean':
        return Boolean(value);
      case 'number':
        return Number(value);
      case 'date':
        return new Date(value).toISOString();
      default:
        return value;
    }
  }
}

export const crmService = new CRMService();
