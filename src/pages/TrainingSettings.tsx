import React from 'react';
import { VoiceAgentTrainingFeatureKey } from '../types/training';
import TrainingFeatureToggle from '../components/TrainingFeatureToggle';

const VOICE_AGENT_FEATURES: Array<{
  key: VoiceAgentTrainingFeatureKey;
  label: string;
  description: string;
}> = [
  {
    key: 'voice_recognition',
    label: 'Reconnaissance vocale avancée',
    description: 'Améliorer la précision de reconnaissance de la voix de l\'agent'
  },
  {
    key: 'accent_adaptation',
    label: 'Adaptation aux accents',
    description: 'Permettre à l\'agent de s\'adapter à différents accents'
  },
  {
    key: 'language_proficiency',
    label: 'Niveau de langue',
    description: 'Évaluer et améliorer la maîtrise des langues de l\'agent'
  },
  {
    key: 'response_time',
    label: 'Temps de réponse',
    description: 'Optimiser le temps de réponse de l\'agent'
  },
  {
    key: 'conversation_flow',
    label: 'Flux de conversation',
    description: 'Améliorer la fluidité des conversations de l\'agent'
  },
  {
    key: 'error_handling',
    label: 'Gestion des erreurs',
    description: 'Former l\'agent à mieux gérer les situations d\'erreur'
  }
];

export default function TrainingSettings() {
  return (
    <div className="max-w-3xl mx-auto py-6 px-4">
      <h1 className="text-2xl font-bold mb-6">
        Formation des Agents Vocaux AI
      </h1>
      
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-medium mb-4">
          Paramètres d'apprentissage
        </h2>
        
        <div className="space-y-4">
          {VOICE_AGENT_FEATURES.map(feature => (
            <TrainingFeatureToggle
              key={feature.key}
              featureKey={feature.key}
              label={feature.label}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
