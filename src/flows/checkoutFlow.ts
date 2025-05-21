import { Node, Edge } from 'reactflow';

export const checkoutFlow = {
  nodes: [
    {
      id: '1',
      type: 'message',
      position: { x: 0, y: 0 },
      data: {
        message: "Bonjour, je comprends que vous souhaitez procéder au check-out. Puis-je confirmer votre départ aujourd'hui ?"
      }
    },
    {
      id: '2',
      type: 'decision',
      position: { x: 0, y: 100 },
      data: {
        question: "Le client confirme-t-il son départ ?",
        options: ["Oui", "Non", "Plus tard"]
      }
    },
    {
      id: '3',
      type: 'hotelAction',
      position: { x: -200, y: 200 },
      data: {
        actionType: 'checkout',
        parameters: JSON.stringify({
          type: 'process_checkout'
        })
      }
    },
    {
      id: '4',
      type: 'message',
      position: { x: -200, y: 300 },
      data: {
        message: "Je confirme votre check-out de la chambre {roomNumber}. Souhaitez-vous que je vous envoie la facture par email ?"
      }
    },
    {
      id: '5',
      type: 'message',
      position: { x: -200, y: 400 },
      data: {
        message: "Comment s'est passé votre séjour avec nous ?"
      }
    }
  ],
  edges: [
    { id: 'e1-2', source: '1', target: '2' },
    { id: 'e2-3', source: '2', target: '3', label: 'Oui' },
    { id: 'e3-4', source: '3', target: '4' },
    { id: 'e4-5', source: '4', target: '5' }
  ]
};
