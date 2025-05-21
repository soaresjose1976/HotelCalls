export interface Organization {
  id: string;
  name: string;
  type: string;
  address?: string;
  phone?: string;
  email?: string;
  settings: Record<string, any>;
  subscription_tier: 'basic' | 'premium' | 'enterprise';
  subscription_status: 'active' | 'inactive' | 'suspended';
  created_at: string;
  updated_at: string;
}

export interface UserRole {
  id: string;
  name: 'owner' | 'admin' | 'manager' | 'staff';
  permissions: Record<string, boolean>;
}

export interface OrganizationUser {
  id: string;
  organization_id: string;
  user_id: string;
  role_id: string;
  is_active: boolean;
  created_at: string;
  role?: UserRole;
  user?: {
    email: string;
    user_metadata?: Record<string, any>;
  };
}

export interface OrganizationInvite {
  email: string;
  role_id: string;
  organization_id: string;
}
