import React from 'react';
import { useTranslationStore } from '../stores/translationStore';

export default function Presentation() {
  const { t } = useTranslationStore();
  
  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Plateforme IA Vocale
        </h1>
        
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h2 className="text-xl font-semibold">Fonctionnalités de la Plateforme</h2>
          </div>
          
          <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
            <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
              <div>
                <dt className="text-lg font-medium text-gray-900">Agents Vocaux</dt>
                <dd className="mt-1 text-gray-600">
                  Agents vocaux IA personnalisables pour les services hôteliers
                </dd>
              </div>
              
              <div>
                <dt className="text-lg font-medium text-gray-900">Conversations</dt>
                <dd className="mt-1 text-gray-600">
                  Éditeur visuel de flux de conversation pour les réponses des agents
                </dd>
              </div>
              
              <div>
                <dt className="text-lg font-medium text-gray-900">Intégrations</dt>
                <dd className="mt-1 text-gray-600">
                  Intégration transparente avec les systèmes hôteliers et les calendriers
                </dd>
              </div>
              
              <div>
                <dt className="text-lg font-medium text-gray-900">Analytique</dt>
                <dd className="mt-1 text-gray-600">
                  Aperçu détaillé des performances et de l'utilisation des agents
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
