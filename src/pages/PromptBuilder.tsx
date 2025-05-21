import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { workflowCategories, actionParameters, generateWorkflowVariations } from '../lib/workflowOptions';

// ... (code précédent)

export default function PromptBuilder() {
  // ... (état précédent)
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedAction, setSelectedAction] = useState('');
  const [workflowVariations, setWorkflowVariations] = useState([]);

  const handleWorkflowSelection = (category: string, option: string, action: string) => {
    const variations = generateWorkflowVariations(category, option, action);
    setWorkflowVariations(variations);
  };

  return (
    <div className="p-6">
      {/* ... (code précédent) */}
      
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-4">Intégration Workflow</h2>
        
        {/* Sélection de catégorie */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          {Object.entries(workflowCategories).map(([key, category]) => (
            <div
              key={key}
              className={`p-4 rounded cursor-pointer ${
                selectedCategory === key ? 'bg-blue-100' : 'bg-white'
              }`}
              onClick={() => setSelectedCategory(key)}
            >
              <h3 className="font-semibold">{category.name}</h3>
              <p className="text-sm text-gray-600">
                {Object.keys(category.options).length} options disponibles
              </p>
            </div>
          ))}
        </div>

        {/* Options de la catégorie sélectionnée */}
        {selectedCategory && (
          <div className="grid grid-cols-4 gap-4 mb-4">
            {Object.entries(workflowCategories[selectedCategory].options).map(([key, option]) => (
              <div
                key={key}
                className={`p-4 rounded cursor-pointer ${
                  selectedOption === key ? 'bg-blue-100' : 'bg-white'
                }`}
                onClick={() => setSelectedOption(key)}
              >
                <h4 className="font-semibold">{option.name}</h4>
                <p className="text-sm text-gray-600">
                  {option.actions.length} actions disponibles
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Actions disponibles */}
        {selectedCategory && selectedOption && (
          <div className="grid grid-cols-5 gap-4 mb-4">
            {workflowCategories[selectedCategory].options[selectedOption].actions.map((action) => (
              <div
                key={action}
                className={`p-4 rounded cursor-pointer ${
                  selectedAction === action ? 'bg-blue-100' : 'bg-white'
                }`}
                onClick={() => {
                  setSelectedAction(action);
                  handleWorkflowSelection(selectedCategory, selectedOption, action);
                }}
              >
                <p className="font-semibold">{action.replace(/_/g, ' ')}</p>
              </div>
            ))}
          </div>
        )}

        {/* Paramètres de personnalisation */}
        {selectedAction && (
          <div className="bg-white p-4 rounded">
            <h3 className="font-semibold mb-4">Paramètres de personnalisation</h3>
            <div className="grid grid-cols-4 gap-4">
              {Object.entries(actionParameters).map(([key, values]) => (
                <div key={key} className="mb-4">
                  <label className="block text-sm font-medium mb-2">
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </label>
                  <select className="w-full p-2 border rounded">
                    {values.map((value) => (
                      <option key={value} value={value}>
                        {value.replace(/_/g, ' ')}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
