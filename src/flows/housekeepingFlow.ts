import { Node, Edge } from 'reactflow';

export const housekeepingFlow = {
  nodes: [
    {
      id: '1',
      type: 'message',
      position: { x: 0, y: 0 },
      data: {
        message: "Bonjour, je suis votre assistant du service d'entretien. Comment puis-je vous aider ?"
      }
    },
    {
      id: '2',
      type: 'decision',
      position: { x: 0, y: 100 },
      data: {
        question: "Quel service souhaitez-vous ?",
        options: ["Nettoyage chambre", "Linge", "Produits supplémentaires", "Autre"]
      }
    },
    {
      id: '3',
      type: 'hotelAction',
      position: { x: -300, y: 200 },
      data: {
        actionType: 'housekeeping',
        parameters: JSON.stringify({
          type: 'room_cleaning',
          schedule: true
        })
      }
    },
    {
      id: '4',
      type: 'message',
      position: { x: -300, y: 300 },
      data: {
        message: "Je peux programmer le service d'entretien pour {time}. Cela vous convient-il ?"
      }
    },
    {
      id: '5',
      type: 'message',
      position: { x: -100, y: 200 },
      data: {
        message: "Quel type de linge souhaitez-vous ? (serviettes, draps, oreillers)"
      }
    },
    {
      id: '6',
      type: 'message',
      position: { x: 100, y: 200 },
      data: {
        message: "Quels produits vous manquent-il ? (shampooing, savon, papier)"
      }
    }
  ],
  edges: [
    { id: 'e1-2', source: '1', target: '2' },
    { id: 'e2-3', source: '2', target: '3', label: 'Nettoyage chambre' },
    { id: 'e2-5', source: '2', target: '5', label: 'Linge' },
    { id: 'e2-6', source: '2', target: '6', label: 'Produits supplémentaires' }
  ]
};
