import { Node, Edge } from 'reactflow';

export const businessFlow = {
  nodes: [
    {
      id: '1',
      type: 'message',
      position: { x: 0, y: 0 },
      data: {
        message: "Bonjour, je suis votre assistant business. Comment puis-je vous aider ?"
      }
    },
    {
      id: '2',
      type: 'decision',
      position: { x: 0, y: 100 },
      data: {
        question: "Service souhaité ?",
        options: ["Salle de réunion", "Impression/Scan", "Traduction", "Secrétariat"]
      }
    },
    {
      id: '3',
      type: 'hotelAction',
      position: { x: -200, y: 200 },
      data: {
        actionType: 'business',
        parameters: JSON.stringify({
          type: 'meeting_room_booking'
        })
      }
    },
    {
      id: '4',
      type: 'message',
      position: { x: -200, y: 300 },
      data: {
        message: "Pour combien de personnes et quelle durée souhaitez-vous réserver la salle ?"
      }
    }
  ],
  edges: [
    { id: 'e1-2', source: '1', target: '2' },
    { id: 'e2-3', source: '2', target: '3', label: 'Salle de réunion' },
    { id: 'e3-4', source: '3', target: '4' }
  ]
};
