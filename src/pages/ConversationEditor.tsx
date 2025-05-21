import React from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useConversationStore } from '../stores/conversationStore';
import FlowEditor from '../components/FlowEditor';
import { roomServiceFlow } from '../flows/roomServiceFlow';
import { housekeepingFlow } from '../flows/housekeepingFlow';
import { conciergeFlow } from '../flows/conciergeFlow';
import { checkoutFlow } from '../flows/checkoutFlow';
import { wakeUpFlow } from '../flows/wakeUpFlow';
import { maintenanceFlow } from '../flows/maintenanceFlow';
import { restaurantFlow } from '../flows/restaurantFlow';
import { spaFlow } from '../flows/spaFlow';
import { parkingFlow } from '../flows/parkingFlow';
import { luggageFlow } from '../flows/luggageFlow';
import { taxiFlow } from '../flows/taxiFlow';
import { businessFlow } from '../flows/businessFlow';
import { eventFlow } from '../flows/eventFlow';
import { childcareFlow } from '../flows/childcareFlow';
import { petFlow } from '../flows/petFlow';

export default function ConversationEditor() {
  const { id } = useParams();
  const { conversations, fetchConversations, setCurrentConversation, loadFlow } = useConversationStore();

  useEffect(() => {
    fetchConversations();
  }, [fetchConversations]);

  useEffect(() => {
    if (id && conversations.length > 0) {
      const conversation = conversations.find(c => c.id === id);
      setCurrentConversation(conversation || null);
    }
  }, [id, conversations, setCurrentConversation]);

  const templates = {
    roomService: {
      name: "Service d'Étage",
      flow: roomServiceFlow
    },
    housekeeping: {
      name: "Service d'Entretien",
      flow: housekeepingFlow
    },
    concierge: {
      name: "Conciergerie",
      flow: conciergeFlow
    },
    checkout: {
      name: "Check-out",
      flow: checkoutFlow
    },
    wakeUp: {
      name: "Réveil",
      flow: wakeUpFlow
    },
    maintenance: {
      name: "Maintenance",
      flow: maintenanceFlow
    },
    restaurant: {
      name: "Restaurant",
      flow: restaurantFlow
    },
    spa: {
      name: "Spa",
      flow: spaFlow
    },
    parking: {
      name: "Parking",
      flow: parkingFlow
    },
    luggage: {
      name: "Bagagerie",
      flow: luggageFlow
    },
    taxi: {
      name: "Transport",
      flow: taxiFlow
    },
    business: {
      name: "Business",
      flow: businessFlow
    },
    event: {
      name: "Événements",
      flow: eventFlow
    },
    childcare: {
      name: "Enfants",
      flow: childcareFlow
    },
    pet: {
      name: "Animaux",
      flow: petFlow
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Éditeur de Conversation</h1>
        <div className="grid grid-cols-5 gap-2">
          {Object.entries(templates).map(([key, { name, flow }]) => (
            <button
              key={key}
              onClick={() => loadFlow(flow)}
              className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
            >
              {name}
            </button>
          ))}
        </div>
      </div>
      <FlowEditor />
    </div>
  );
}
