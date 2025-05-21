import { Node, Edge } from 'reactflow';

export const maintenanceFlow = {
  nodes: [
    {
      id: '1',
      type: 'message',
      position: { x: 0, y: 0 },
      data: {
        message: "Bonjour, je suis votre assistant technique. Quel problème rencontrez-vous dans votre chambre ?"
      }
    },
    {
      id: '2',
      type: 'decision',
      position: { x: 0, y: 100 },
      data: {
        question: "Type de problème ?",
        options: ["Climatisation", "Électricité", "Plomberie", "TV/Internet", "Autre"]
      }
    },
    {
      id: '3',
      type: 'hotelAction',
      position: { x: -200, y: 200 },
      data: {
        actionType: 'maintenance',
        parameters: JSON.stringify({
          type: 'urgent_repair',
          priority: 'high'
        })
      }
    },
    {
      id: '4',
      type: 'message',
      position: { x: -200, y: 300 },
      data: {
        message: "Un technicien sera envoyé dans votre chambre dans les plus brefs délais. Pouvez-vous préciser le problème ?"
      }
    }
  ],
  edges: [
    { id: 'e1-2', source: '1', target: '2' },
    { id: 'e2-3', source: '2', target: '3' },
    { id: 'e3-4', source: '3', target: '4' }
  ]
};
