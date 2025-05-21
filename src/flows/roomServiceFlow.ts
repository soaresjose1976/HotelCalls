import { Node, Edge } from 'reactflow';

export const roomServiceFlow = {
  nodes: [
    {
      id: '1',
      type: 'message',
      position: { x: 0, y: 0 },
      data: {
        message: "Bonjour, je suis votre assistant du service d'étage. Que puis-je faire pour vous ?"
      }
    },
    {
      id: '2',
      type: 'decision',
      position: { x: 0, y: 100 },
      data: {
        question: "Le client souhaite-t-il commander ?",
        options: ["Oui", "Non", "Menu"]
      }
    },
    {
      id: '3',
      type: 'message',
      position: { x: -200, y: 200 },
      data: {
        message: "Je vous écoute pour votre commande."
      }
    },
    {
      id: '4',
      type: 'message',
      position: { x: 0, y: 200 },
      data: {
        message: "Voici notre menu du jour : \n- Plat 1 \n- Plat 2 \n- Plat 3"
      }
    },
    {
      id: '5',
      type: 'message',
      position: { x: 200, y: 200 },
      data: {
        message: "Je vous souhaite une excellente journée. N'hésitez pas à nous recontacter si vous avez besoin de quoi que ce soit."
      }
    },
    {
      id: '6',
      type: 'hotelAction',
      position: { x: -200, y: 300 },
      data: {
        actionType: 'room_service',
        parameters: JSON.stringify({
          type: 'order_capture',
          save_order: true
        })
      }
    },
    {
      id: '7',
      type: 'message',
      position: { x: -200, y: 400 },
      data: {
        message: "Je confirme votre commande de {order}. Elle sera livrée dans votre chambre {roomNumber} dans environ {estimatedTime} minutes. Est-ce correct ?"
      }
    },
    {
      id: '8',
      type: 'decision',
      position: { x: -200, y: 500 },
      data: {
        question: "Le client confirme-t-il la commande ?",
        options: ["Oui", "Non"]
      }
    },
    {
      id: '9',
      type: 'hotelAction',
      position: { x: -300, y: 600 },
      data: {
        actionType: 'room_service',
        parameters: JSON.stringify({
          type: 'confirm_order',
          notify_kitchen: true
        })
      }
    },
    {
      id: '10',
      type: 'message',
      position: { x: -300, y: 700 },
      data: {
        message: "Parfait ! Votre commande a été transmise à la cuisine. Avez-vous des demandes particulières ?"
      }
    }
  ],
  edges: [
    { id: 'e1-2', source: '1', target: '2' },
    { id: 'e2-3', source: '2', target: '3', label: 'Oui' },
    { id: 'e2-4', source: '2', target: '4', label: 'Menu' },
    { id: 'e2-5', source: '2', target: '5', label: 'Non' },
    { id: 'e3-6', source: '3', target: '6' },
    { id: 'e6-7', source: '6', target: '7' },
    { id: 'e7-8', source: '7', target: '8' },
    { id: 'e8-9', source: '8', target: '9', label: 'Oui' },
    { id: 'e8-3', source: '8', target: '3', label: 'Non' },
    { id: 'e9-10', source: '9', target: '10' }
  ]
};
