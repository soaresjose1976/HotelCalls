import { Node, Edge } from 'reactflow';

export const petFlow = {
  nodes: [
    {
      id: '1',
      type: 'message',
      position: { x: 0, y: 0 },
      data: {
        message: "Bonjour, je suis votre assistant service animalier. Comment puis-je vous aider ?"
      }
    },
    {
      id: '2',
      type: 'decision',
      position: { x: 0, y: 100 },
      data: {
        question: "Service souhaité ?",
        options: ["Promenade", "Toilettage", "Vétérinaire", "Équipements"]
      }
    },
    {
      id: '3',
      type: 'hotelAction',
      position: { x: -200, y: 200 },
      data: {
        actionType: 'pet',
        parameters: JSON.stringify({
          type: 'pet_walking'
        })
      }
    },
    {
      id: '4',
      type: 'message',
      position: { x: -200, y: 300 },
      data: {
        message: "À quelle heure souhaitez-vous que nous promenions votre animal ? Quelle est sa race ?"
      }
    }
  ],
  edges: [
    { id: 'e1-2', source: '1', target: '2' },
    { id: 'e2-3', source: '2', target: '3', label: 'Promenade' },
    { id: 'e3-4', source: '3', target: '4' }
  ]
};
