import { Node, Edge } from 'reactflow';

export const wakeUpFlow = {
  nodes: [
    {
      id: '1',
      type: 'message',
      position: { x: 0, y: 0 },
      data: {
        message: "Bonjour, je peux vous aider à programmer un réveil téléphonique. À quelle heure souhaitez-vous être réveillé(e) ?"
      }
    },
    {
      id: '2',
      type: 'hotelAction',
      position: { x: 0, y: 100 },
      data: {
        actionType: 'wake_up_call',
        parameters: JSON.stringify({
          type: 'capture_time'
        })
      }
    },
    {
      id: '3',
      type: 'message',
      position: { x: 0, y: 200 },
      data: {
        message: "Je confirme votre demande de réveil téléphonique pour {time}. Est-ce correct ?"
      }
    },
    {
      id: '4',
      type: 'decision',
      position: { x: 0, y: 300 },
      data: {
        question: "Le client confirme-t-il l'heure ?",
        options: ["Oui", "Non"]
      }
    },
    {
      id: '5',
      type: 'hotelAction',
      position: { x: -100, y: 400 },
      data: {
        actionType: 'wake_up_call',
        parameters: JSON.stringify({
          type: 'schedule_call'
        })
      }
    },
    {
      id: '6',
      type: 'message',
      position: { x: -100, y: 500 },
      data: {
        message: "Parfait, votre réveil téléphonique est programmé pour {time}."
      }
    }
  ],
  edges: [
    { id: 'e1-2', source: '1', target: '2' },
    { id: 'e2-3', source: '2', target: '3' },
    { id: 'e3-4', source: '3', target: '4' },
    { id: 'e4-5', source: '4', target: '5', label: 'Oui' },
    { id: 'e5-6', source: '5', target: '6' },
    { id: 'e4-1', source: '4', target: '1', label: 'Non' }
  ]
};
