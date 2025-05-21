import { Node, Edge } from 'reactflow';

export const parkingFlow = {
  nodes: [
    {
      id: '1',
      type: 'message',
      position: { x: 0, y: 0 },
      data: {
        message: "Bonjour, je suis votre assistant parking. Comment puis-je vous aider ?"
      }
    },
    {
      id: '2',
      type: 'decision',
      position: { x: 0, y: 100 },
      data: {
        question: "Service souhaité ?",
        options: ["Voiturier", "Place", "Tarifs", "Directions"]
      }
    },
    {
      id: '3',
      type: 'hotelAction',
      position: { x: -200, y: 200 },
      data: {
        actionType: 'parking',
        parameters: JSON.stringify({
          type: 'valet_request'
        })
      }
    },
    {
      id: '4',
      type: 'message',
      position: { x: -200, y: 300 },
      data: {
        message: "Un voiturier va venir chercher votre véhicule. Pouvez-vous me donner le numéro de votre chambre ?"
      }
    }
  ],
  edges: [
    { id: 'e1-2', source: '1', target: '2' },
    { id: 'e2-3', source: '2', target: '3', label: 'Voiturier' },
    { id: 'e3-4', source: '3', target: '4' }
  ]
};
