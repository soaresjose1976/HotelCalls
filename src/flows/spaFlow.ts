import { Node, Edge } from 'reactflow';

export const spaFlow = {
  nodes: [
    {
      id: '1',
      type: 'message',
      position: { x: 0, y: 0 },
      data: {
        message: "Bonjour, je suis votre assistant spa & bien-être. Que puis-je faire pour vous ?"
      }
    },
    {
      id: '2',
      type: 'decision',
      position: { x: 0, y: 100 },
      data: {
        question: "Service souhaité ?",
        options: ["Massage", "Soins", "Piscine", "Horaires"]
      }
    },
    {
      id: '3',
      type: 'hotelAction',
      position: { x: -200, y: 200 },
      data: {
        actionType: 'spa',
        parameters: JSON.stringify({
          type: 'treatment_booking'
        })
      }
    },
    {
      id: '4',
      type: 'message',
      position: { x: -200, y: 300 },
      data: {
        message: "Quel type de massage souhaitez-vous ? Nous proposons des massages relaxants, sportifs, ou aux pierres chaudes."
      }
    }
  ],
  edges: [
    { id: 'e1-2', source: '1', target: '2' },
    { id: 'e2-3', source: '2', target: '3', label: 'Massage' },
    { id: 'e3-4', source: '3', target: '4' }
  ]
};
