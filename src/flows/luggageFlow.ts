import { Node, Edge } from 'reactflow';

export const luggageFlow = {
  nodes: [
    {
      id: '1',
      type: 'message',
      position: { x: 0, y: 0 },
      data: {
        message: "Bonjour, je suis votre assistant bagagerie. Que puis-je faire pour vous ?"
      }
    },
    {
      id: '2',
      type: 'decision',
      position: { x: 0, y: 100 },
      data: {
        question: "Service souhaité ?",
        options: ["Monter bagages", "Descendre bagages", "Stockage", "Autre"]
      }
    },
    {
      id: '3',
      type: 'hotelAction',
      position: { x: -200, y: 200 },
      data: {
        actionType: 'luggage',
        parameters: JSON.stringify({
          type: 'luggage_delivery'
        })
      }
    },
    {
      id: '4',
      type: 'message',
      position: { x: -200, y: 300 },
      data: {
        message: "Un bagagiste va venir chercher vos bagages. Combien de bagages avez-vous ?"
      }
    }
  ],
  edges: [
    { id: 'e1-2', source: '1', target: '2' },
    { id: 'e2-3', source: '2', target: '3', label: 'Monter bagages' },
    { id: 'e3-4', source: '3', target: '4' }
  ]
};
