import create from 'zustand';
import { supabase } from '../lib/supabase';
import { VoiceAgent } from '../types';
import { languages, Language, getEuropeanLanguages } from '../lib/languages';

interface VoiceAgentStore {
  agents: VoiceAgent[];
  selectedLanguage: string;
  loading: boolean;
  error: string | null;
  fetchAgents: () => Promise<void>;
  createAgent: (agent: Omit<VoiceAgent, 'id' | 'created_at' | 'user_id'>) => Promise<VoiceAgent | null>;
  updateAgent: (id: string, updates: Partial<VoiceAgent>) => Promise<VoiceAgent | null>;
  deleteAgent: (id: string) => Promise<boolean>;
  setLanguage: (languageCode: string) => void;
  getAvailableLanguages: () => Language[];
  getEuropeanLanguages: () => Language[];
  formatDate: (date: Date) => string;
  formatCurrency: (amount: number) => string;
  formatTime: (date: Date) => string;
}

export const useVoiceAgentStore = create<VoiceAgentStore>((set, get) => ({
  agents: [],
  selectedLanguage: 'fr',
  loading: false,
  error: null,

  setLanguage: (languageCode: string) => {
    if (languages[languageCode]) {
      set({ selectedLanguage: languageCode });
    }
  },

  getAvailableLanguages: () => {
    return Object.values(languages);
  },

  getEuropeanLanguages: () => {
    return getEuropeanLanguages();
  },

  formatDate: (date: Date) => {
    const { selectedLanguage } = get();
    return new Intl.DateTimeFormat(selectedLanguage, {
      dateStyle: 'short'
    }).format(date);
  },

  formatCurrency: (amount: number) => {
    const { selectedLanguage } = get();
    const lang = languages[selectedLanguage];
    return new Intl.NumberFormat(selectedLanguage, {
      style: 'currency',
      currency: lang.currencyCode
    }).format(amount);
  },

  formatTime: (date: Date) => {
    const { selectedLanguage } = get();
    return new Intl.DateTimeFormat(selectedLanguage, {
      timeStyle: 'short'
    }).format(date);
  },

  fetchAgents: async () => {
    set({ loading: true, error: null });
    try {
      const { data, error } = await supabase
        .from('voice_agents')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      set({ agents: data, loading: false });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  createAgent: async (agent) => {
    try {
      const { data, error } = await supabase
        .from('voice_agents')
        .insert([agent])
        .select()
        .single();

      if (error) throw error;
      set(state => ({ agents: [data, ...state.agents] }));
      return data;
    } catch (error) {
      set({ error: (error as Error).message });
      return null;
    }
  },

  updateAgent: async (id, updates) => {
    try {
      const { data, error } = await supabase
        .from('voice_agents')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      set(state => ({
        agents: state.agents.map(agent => 
          agent.id === id ? { ...agent, ...data } : agent
        )
      }));
      return data;
    } catch (error) {
      set({ error: (error as Error).message });
      return null;
    }
  },

  deleteAgent: async (id) => {
    try {
      const { error } = await supabase
        .from('voice_agents')
        .delete()
        .eq('id', id);

      if (error) throw error;
      set(state => ({
        agents: state.agents.filter(agent => agent.id !== id)
      }));
      return true;
    } catch (error) {
      set({ error: (error as Error).message });
      return false;
    }
  }
}));
