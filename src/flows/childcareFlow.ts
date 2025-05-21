import { Node, Edge } from 'reactflow';

export const childcareFlow = {
  nodes: [
    {
      id: '1',
      type: 'message',
      position: { x: 0, y: 0 },
      data: {
        message: "Bonjour, je suis votre assistant service enfants. Comment puis-je vous aider ?"
      }
    },
    {
      id: '2',
      type: 'decision',
      position: { x: 0, y: 100 },
      data: {
        question: "Service souhaité ?",
        options: ["Baby-sitting", "Club enfants", "Activités", "Équipements"]
      }
    },
    {
      id: '3',
      type: 'hotelAction',
      position: { x: -200, y: 200 },
      data: {
        actionType: 'childcare',
        parameters: JSON.stringify({
          type: 'babysitting_request'
        })
      }
    },
    {
      id: '4',
      type: 'message',
      position: { x: -200, y: 300 },
      data: {
        message: "Pour quelle date et durée souhaitez-vous un(e) baby-sitter ? Quel âge a votre enfant ?"
      }
    }
  ],
  edges: [
    { id: 'e1-2', source: '1', target: '2' },
    { id: 'e2-3', source: '2', target: '3', label: 'Baby-sitting' },
    { id: 'e3-4', source: '3', target: '4' }
  ]
};
