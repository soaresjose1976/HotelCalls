export interface AdminSettings {
  id: string;
  key: string;
  value: any;
  description?: string;
  updated_at: string;
  updated_by: string;
}

export interface AuditLog {
  id: string;
  action: string;
  entity_type: string;
  entity_id: string;
  changes: Record<string, any>;
  performed_by: string;
  performed_at: string;
}

export interface AdminStats {
  organizations: number;
  users: number;
  activeAgents: number;
  totalCalls: number;
  revenue: number;
}
