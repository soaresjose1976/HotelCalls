import { supabase } from './supabase';
import type { Organization, OrganizationUser, OrganizationInvite } from '../types/organization';

export class OrganizationService {
  async getCurrentUserOrganizations(): Promise<Organization[]> {
    const { data: organizations, error } = await supabase
      .from('organizations')
      .select(`
        *,
        organization_users!inner(
          user_id,
          role_id,
          user_roles(name, permissions)
        )
      `)
      .eq('organization_users.user_id', supabase.auth.user()?.id);

    if (error) throw error;
    return organizations;
  }

  async createOrganization(organization: Partial<Organization>): Promise<Organization> {
    const { data, error } = await supabase
      .from('organizations')
      .insert([organization])
      .single();

    if (error) throw error;

    // Ajouter le créateur comme propriétaire
    const { data: ownerRole } = await supabase
      .from('user_roles')
      .select('id')
      .eq('name', 'owner')
      .single();

    await supabase.from('organization_users').insert({
      organization_id: data.id,
      user_id: supabase.auth.user()?.id,
      role_id: ownerRole.id
    });

    return data;
  }

  async getOrganizationUsers(organizationId: string): Promise<OrganizationUser[]> {
    const { data, error } = await supabase
      .from('organization_users')
      .select(`
        *,
        user_roles (
          name,
          permissions
        ),
        users:auth.users (
          email,
          user_metadata
        )
      `)
      .eq('organization_id', organizationId);

    if (error) throw error;
    return data;
  }

  async inviteUser(invite: OrganizationInvite): Promise<void> {
    // Vérifier si l'utilisateur existe déjà
    const { data: existingUser } = await supabase
      .from('auth.users')
      .select('id')
      .eq('email', invite.email)
      .single();

    if (existingUser) {
      // Ajouter directement à l'organisation
      await supabase.from('organization_users').insert({
        organization_id: invite.organization_id,
        user_id: existingUser.id,
        role_id: invite.role_id
      });
    } else {
      // Créer une invitation en attente
      await supabase.from('pending_invites').insert({
        email: invite.email,
        organization_id: invite.organization_id,
        role_id: invite.role_id,
        expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 jours
      });

      // Envoyer l'email d'invitation (à implémenter selon votre système d'emails)
    }
  }

  async updateUserRole(organizationId: string, userId: string, roleId: string): Promise<void> {
    const { error } = await supabase
      .from('organization_users')
      .update({ role_id: roleId })
      .match({ organization_id: organizationId, user_id: userId });

    if (error) throw error;
  }

  async removeUser(organizationId: string, userId: string): Promise<void> {
    const { error } = await supabase
      .from('organization_users')
      .delete()
      .match({ organization_id: organizationId, user_id: userId });

    if (error) throw error;
  }

  async updateOrganization(organizationId: string, updates: Partial<Organization>): Promise<void> {
    const { error } = await supabase
      .from('organizations')
      .update({ ...updates, updated_at: new Date() })
      .eq('id', organizationId);

    if (error) throw error;
  }

  async getUserPermissions(organizationId: string): Promise<Record<string, boolean>> {
    const { data, error } = await supabase
      .from('organization_users')
      .select(`
        user_roles (
          permissions
        )
      `)
      .match({ 
        organization_id: organizationId,
        user_id: supabase.auth.user()?.id
      })
      .single();

    if (error) throw error;
    return data?.user_roles?.permissions || {};
  }
}
