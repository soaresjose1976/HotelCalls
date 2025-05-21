import { Node, Edge } from 'reactflow';

export const conciergeFlow = {
  nodes: [
    {
      id: '1',
      type: 'message',
      position: { x: 0, y: 0 },
      data: {
        message: "Bonjour, je suis votre concierge virtuel. Que puis-je faire pour vous ?"
      }
    },
    {
      id: '2',
      type: 'decision',
      position: { x: 0, y: 100 },
      data: {
        question: "Quel service souhaitez-vous ?",
        options: ["Restaurant", "Activités", "Transport", "Information"]
      }
    },
    {
      id: '3',
      type: 'hotelAction',
      position: { x: -300, y: 200 },
      data: {
        actionType: 'concierge',
        parameters: JSON.stringify({
          type: 'restaurant_booking'
        })
      }
    },
    {
      id: '4',
      type: 'message',
      position: { x: -300, y: 300 },
      data: {
        message: "Pour combien de personnes et à quelle heure souhaitez-vous réserver ?"
      }
    },
    {
      id: '5',
      type: 'hotelAction',
      position: { x: -100, y: 200 },
      data: {
        actionType: 'concierge',
        parameters: JSON.stringify({
          type: 'activity_booking'
        })
      }
    },
    {
      id: '6',
      type: 'hotelAction',
      position: { x: 100, y: 200 },
      data: {
        actionType: 'concierge',
        parameters: JSON.stringify({
          type: 'transport_arrangement'
        })
      }
    }
  ],
  edges: [
    { id: 'e1-2', source: '1', target: '2' },
    { id: 'e2-3', source: '2', target: '3', label: 'Restaurant' },
    { id: 'e2-5', source: '2', target: '5', label: 'Activités' },
    { id: 'e2-6', source: '2', target: '6', label: 'Transport' }
  ]
};
