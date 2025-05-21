import React from 'react';
import { useEffect, useState } from 'react';
import { useVoiceAgentStore } from '../stores/voiceAgentStore';
import { VoiceAgent } from '../types';

export default function Agents() {
  const { 
    agents, 
    loading, 
    error, 
    fetchAgents, 
    createAgent, 
    updateAgent, 
    deleteAgent,
    selectedLanguage,
    setLanguage,
    getAvailableLanguages 
  } = useVoiceAgentStore();
  
  const [isCreating, setIsCreating] = useState(false);
  const [newAgent, setNewAgent] = useState({
    name: '',
    description: '',
    voice_id: '',
    personality: '',
    language: selectedLanguage
  });

  const languages = getAvailableLanguages();

  useEffect(() => {
    fetchAgents();
  }, [fetchAgents]);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    const agent = await createAgent(newAgent);
    if (agent) {
      setIsCreating(false);
      setNewAgent({ 
        name: '', 
        description: '', 
        voice_id: '', 
        personality: '',
        language: selectedLanguage
      });
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Agents Vocaux</h1>
        <div className="flex space-x-4">
          <select
            value={selectedLanguage}
            onChange={(e) => setLanguage(e.target.value)}
            className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            {languages.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.nativeName} ({lang.name})
              </option>
            ))}
          </select>
          <button
            onClick={() => setIsCreating(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Créer un Agent
          </button>
        </div>
      </div>

      {isCreating && (
        <form onSubmit={handleCreate} className="bg-white p-6 rounded-lg shadow">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Nom</label>
              <input
                type="text"
                value={newAgent.name}
                onChange={(e) => setNewAgent({ ...newAgent, name: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                value={newAgent.description}
                onChange={(e) => setNewAgent({ ...newAgent, description: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Voice ID</label>
              <input
                type="text"
                value={newAgent.voice_id}
                onChange={(e) => setNewAgent({ ...newAgent, voice_id: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Langue</label>
              <select
                value={newAgent.language}
                onChange={(e) => setNewAgent({ ...newAgent, language: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              >
                {languages.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.nativeName} ({lang.name})
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Personnalité</label>
              <textarea
                value={newAgent.personality}
                onChange={(e) => setNewAgent({ ...newAgent, personality: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setIsCreating(false)}
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300"
              >
                Annuler
              </button>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                Créer
              </button>
            </div>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {agents
          .filter(agent => !selectedLanguage || agent.language === selectedLanguage)
          .map((agent) => (
            <div key={agent.id} className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-medium">{agent.name}</h3>
              <p className="text-gray-500 mt-2">{agent.description}</p>
              <div className="mt-4">
                <p className="text-sm text-gray-500">Voice ID: {agent.voice_id}</p>
                <p className="text-sm text-gray-500">
                  Langue: {languages.find(l => l.code === agent.language)?.nativeName}
                </p>
                <p className="text-sm text-gray-500 mt-2">Personnalité:</p>
                <p className="text-sm mt-1">{agent.personality}</p>
              </div>
              <div className="mt-4 flex justify-end space-x-2">
                <button
                  onClick={() => deleteAgent(agent.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  Supprimer
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
