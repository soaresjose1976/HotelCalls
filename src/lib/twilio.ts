import { supabase } from './supabase';

const TWILIO_ACCOUNT_SID = import.meta.env.VITE_TWILIO_ACCOUNT_SID;
const TWILIO_AUTH_TOKEN = import.meta.env.VITE_TWILIO_AUTH_TOKEN;

export const twilioService = {
  async initiateOutgoingCall(phoneNumber: string, conversationId: string, agentId: string) {
    try {
      const { data: call, error } = await supabase
        .from('outgoing_calls')
        .insert({
          phone_number: phoneNumber,
          status: 'planifié',
          agent_id: agentId,
          conversation_id: conversationId,
          user_id: (await supabase.auth.getUser()).data.user?.id
        })
        .select()
        .single();

      if (error) throw error;

      const response = await fetch('/api/initiate-call', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phoneNumber,
          conversationId,
          callId: call.id
        }),
      });

      if (!response.ok) {
        throw new Error('Échec de l\'initiation de l\'appel');
      }

      return call;
    } catch (error) {
      console.error('Erreur lors de l\'initiation de l\'appel:', error);
      throw error;
    }
  },

  async handleIncomingCall(phoneNumber: string) {
    try {
      const { data: routing } = await supabase
        .from('call_routing')
        .select('*')
        .eq('active', true)
        .order('priority', { ascending: false })
        .limit(1)
        .single();

      const { data: call, error } = await supabase
        .from('incoming_calls')
        .insert({
          phone_number: phoneNumber,
          status: 'en-cours',
          agent_id: routing?.agent_id,
          user_id: (await supabase.auth.getUser()).data.user?.id
        })
        .select()
        .single();

      if (error) throw error;
      return call;
    } catch (error) {
      console.error('Erreur lors de la gestion de l\'appel entrant:', error);
      throw error;
    }
  },

  async updateCallStatus(callId: string, status: string, type: 'incoming' | 'outgoing') {
    try {
      const table = type === 'incoming' ? 'incoming_calls' : 'outgoing_calls';
      const { error } = await supabase
        .from(table)
        .update({ 
          status,
          ...(status === 'terminé' ? { end_time: new Date().toISOString() } : {})
        })
        .eq('id', callId);

      if (error) throw error;
    } catch (error) {
      console.error('Erreur lors de la mise à jour du statut de l\'appel:', error);
      throw error;
    }
  },

  async saveCallRecording(callId: string, recordingUrl: string, type: 'incoming' | 'outgoing') {
    try {
      const table = type === 'incoming' ? 'incoming_calls' : 'outgoing_calls';
      const { error } = await supabase
        .from(table)
        .update({ recording_url: recordingUrl })
        .eq('id', callId);

      if (error) throw error;
    } catch (error) {
      console.error('Erreur lors de l\'enregistrement de l\'appel:', error);
      throw error;
    }
  }
};
