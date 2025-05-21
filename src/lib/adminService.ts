import { supabase } from './supabase';
import type { AdminSettings, AuditLog, AdminStats } from '../types/admin';

export class AdminService {
  async isSuperAdmin(): Promise<boolean> {
    const { data } = await supabase
      .from('organization_users')
      .select('user_roles(name)')
      .eq('user_id', supabase.auth.user()?.id)
      .single();

    return data?.user_roles?.name === 'super_admin';
  }

  async getSettings(): Promise<AdminSettings[]> {
    const { data, error } = await supabase
      .from('admin_settings')
      .select('*')
      .order('key');

    if (error) throw error;
    return data;
  }

  async updateSetting(key: string, value: any): Promise<void> {
    const { error } = await supabase
      .from('admin_settings')
      .upsert({
        key,
        value,
        updated_by: supabase.auth.user()?.id
      });

    if (error) throw error;

    await this.logAudit('update', 'admin_settings', null, { key, value });
  }

  async getAuditLogs(limit = 50): Promise<AuditLog[]> {
    const { data, error } = await supabase
      .from('admin_audit_logs')
      .select(`
        *,
        performed_by:auth.users(email)
      `)
      .order('performed_at', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data;
  }

  async logAudit(
    action: string,
    entityType: string,
    entityId?: string,
    changes?: Record<string, any>
  ): Promise<void> {
    const { error } = await supabase
      .from('admin_audit_logs')
      .insert({
        action,
        entity_type: entityType,
        entity_id: entityId,
        changes,
        performed_by: supabase.auth.user()?.id
      });

    if (error) throw error;
  }

  async getAdminStats(): Promise<AdminStats> {
    const stats = {
      organizations: 0,
      users: 0,
      activeAgents: 0,
      totalCalls: 0,
      revenue: 0
    };

    // Organisations
    const { count: orgCount } = await supabase
      .from('organizations')
      .select('*', { count: 'exact', head: true });
    stats.organizations = orgCount || 0;

    // Utilisateurs
    const { count: userCount } = await supabase
      .from('organization_users')
      .select('*', { count: 'exact', head: true });
    stats.users = userCount || 0;

    // Agents actifs
    const { count: agentCount } = await supabase
      .from('voice_agents')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'active');
    stats.activeAgents = agentCount || 0;

    // Appels totaux et revenus
    const { data: callStats } = await supabase
      .from('service_requests')
      .select('duration, cost');
    
    if (callStats) {
      stats.totalCalls = callStats.length;
      stats.revenue = callStats.reduce((sum, call) => sum + (call.cost || 0), 0);
    }

    return stats;
  }
}
