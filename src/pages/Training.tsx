import React, { useState, useEffect } from 'react';
import { useVoiceAgentStore } from '../stores/voiceAgentStore';
import { trainingService } from '../lib/trainingService';
import { TrainingMaterial, TrainingCategory, TrainingProgress } from '../types/training';

export default function Training() {
  const { agents, selectedLanguage } = useVoiceAgentStore();
  const [categories, setCategories] = useState<TrainingCategory[]>([]);
  const [materials, setMaterials] = useState<TrainingMaterial[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>();
  const [selectedAgent, setSelectedAgent] = useState<string>();
  const [progress, setProgress] = useState<TrainingProgress[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    loadCategories();
    loadMaterials();
  }, [selectedCategory]);

  useEffect(() => {
    if (selectedAgent) {
      loadProgress();
    }
  }, [selectedAgent]);

  const loadCategories = async () => {
    const data = await trainingService.getCategories();
    setCategories(data);
  };

  const loadMaterials = async () => {
    const data = await trainingService.getMaterials(selectedCategory);
    setMaterials(data);
  };

  const loadProgress = async () => {
    if (!selectedAgent) return;
    const data = await trainingService.getProgress(selectedAgent);
    setProgress(data);
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const url = await trainingService.uploadDocument(file);
      await trainingService.createMaterial({
        title: file.name,
        content_type: 'pdf',
        content: { url },
        language: selectedLanguage,
        metadata: {
          fileSize: file.size,
          lastModified: new Date(file.lastModified).toISOString()
        }
      });
      loadMaterials();
    } catch (error) {
      console.error('Erreur lors du téléchargement:', error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Formation des Agents</h1>
        <div className="flex space-x-4">
          <select
            value={selectedAgent}
            onChange={(e) => setSelectedAgent(e.target.value)}
            className="rounded-md border-gray-300"
          >
            <option value="">Sélectionner un agent</option>
            {agents.map((agent) => (
              <option key={agent.id} value={agent.id}>
                {agent.name}
              </option>
            ))}
          </select>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="rounded-md border-gray-300"
          >
            <option value="">Toutes les catégories</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium">Documents de formation</h2>
          <label className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 cursor-pointer">
            {isUploading ? 'Téléchargement...' : 'Ajouter un document'}
            <input
              type="file"
              className="hidden"
              accept=".pdf,.doc,.docx,.txt"
              onChange={handleFileUpload}
              disabled={isUploading}
            />
          </label>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {materials.map((material) => (
            <div key={material.id} className="border rounded-lg p-4">
              <h3 className="font-medium">{material.title}</h3>
              <p className="text-sm text-gray-500">{material.description}</p>
              <div className="mt-2 flex justify-between items-center">
                <span className="text-sm">
                  {new Date(material.created_at).toLocaleDateString()}
                </span>
                {selectedAgent && (
                  <button
                    onClick={() => trainingService.updateProgress(selectedAgent, material.id, 0)}
                    className="text-blue-500 hover:text-blue-600"
                  >
                    Commencer
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedAgent && progress.length > 0 && (
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-medium mb-4">Progrès de formation</h2>
          <div className="space-y-4">
            {progress.map((p) => (
              <div key={p.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{p.material_id}</span>
                  <span className="text-sm">{p.progress}%</span>
                </div>
                <div className="mt-2 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-500 rounded-full h-2"
                    style={{ width: `${p.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
