import { Node, Edge } from 'reactflow';

export const restaurantFlow = {
  nodes: [
    {
      id: '1',
      type: 'message',
      position: { x: 0, y: 0 },
      data: {
        message: "Bonjour, je suis votre assistant de restauration. Souhaitez-vous réserver une table dans notre restaurant ?"
      }
    },
    {
      id: '2',
      type: 'decision',
      position: { x: 0, y: 100 },
      data: {
        question: "Type de demande ?",
        options: ["Réservation", "Menu", "Horaires", "Spécialités"]
      }
    },
    {
      id: '3',
      type: 'hotelAction',
      position: { x: -200, y: 200 },
      data: {
        actionType: 'restaurant',
        parameters: JSON.stringify({
          type: 'table_booking'
        })
      }
    },
    {
      id: '4',
      type: 'message',
      position: { x: -200, y: 300 },
      data: {
        message: "Pour combien de personnes et à quelle heure souhaitez-vous dîner ?"
      }
    }
  ],
  edges: [
    { id: 'e1-2', source: '1', target: '2' },
    { id: 'e2-3', source: '2', target: '3', label: 'Réservation' },
    { id: 'e3-4', source: '3', target: '4' }
  ]
};
