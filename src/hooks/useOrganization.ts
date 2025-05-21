import { create } from 'zustand';
import { Organization } from '../types/organization';
import { OrganizationService } from '../lib/organizationService';

interface OrganizationStore {
  organizations: Organization[];
  currentOrganization: Organization | null;
  loading: boolean;
  error: string | null;
  fetchOrganizations: () => Promise<void>;
  setCurrentOrganization: (org: Organization) => void;
}

const organizationService = new OrganizationService();

export const useOrganization = create<OrganizationStore>((set, get) => ({
  organizations: [],
  currentOrganization: null,
  loading: false,
  error: null,

  fetchOrganizations: async () => {
    set({ loading: true, error: null });
    try {
      const orgs = await organizationService.getCurrentUserOrganizations();
      set({ 
        organizations: orgs,
        currentOrganization: orgs[0] || null,
        loading: false 
      });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Une erreur est survenue',
        loading: false 
      });
    }
  },

  setCurrentOrganization: (org: Organization) => {
    set({ currentOrganization: org });
  }
}));
