import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export default function CRMSettings() {
  const [configs, setConfigs] = useState([]);
  const [selectedConfig, setSelectedConfig] = useState(null);
  const [mappings, setMappings] = useState([]);

  const crmTypes = [
    { id: 'salesforce', name: 'Salesforce' },
    { id: 'hubspot', name: 'HubSpot' },
    { id: 'zoho', name: 'Zoho CRM' },
    { id: 'pipedrive', name: 'Pipedrive' },
    { id: 'custom', name: 'Custom CRM' }
  ];

  const loadConfigs = async () => {
    const { data } = await supabase
      .from('crm_configs')
      .select('*')
      .order('created_at', { ascending: false });
    
    setConfigs(data || []);
  };

  const loadMappings = async (configId: string) => {
    const { data } = await supabase
      .from('crm_mappings')
      .select('*')
      .eq('config_id', configId);
    
    setMappings(data || []);
  };

  useEffect(() => {
    loadConfigs();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Configuration CRM</h1>

      {/* Liste des configurations */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {configs.map(config => (
          <div
            key={config.id}
            className={`p-4 rounded cursor-pointer ${
              selectedConfig?.id === config.id ? 'bg-blue-100' : 'bg-white'
            }`}
            onClick={() => {
              setSelectedConfig(config);
              loadMappings(config.id);
            }}
          >
            <h3 className="font-semibold">{config.crm_type}</h3>
            <p className="text-sm text-gray-600">
              {config.is_active ? 'Actif' : 'Inactif'}
            </p>
          </div>
        ))}
      </div>

      {/* Formulaire de configuration */}
      {selectedConfig && (
        <div className="bg-white p-6 rounded">
          <h2 className="text-xl font-semibold mb-4">
            Configuration {selectedConfig.crm_type}
          </h2>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                URL API
              </label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                value={selectedConfig.api_url}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">
                Clé API
              </label>
              <input
                type="password"
                className="w-full p-2 border rounded"
                value={selectedConfig.api_key}
              />
            </div>
          </div>

          {/* Mappages des champs */}
          <div className="mt-6">
            <h3 className="font-semibold mb-4">Mappages des champs</h3>
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-left">Champ local</th>
                  <th className="text-left">Champ CRM</th>
                  <th className="text-left">Type</th>
                  <th className="text-left">Transformation</th>
                </tr>
              </thead>
              <tbody>
                {mappings.map(mapping => (
                  <tr key={mapping.id}>
                    <td className="py-2">{mapping.local_field}</td>
                    <td className="py-2">{mapping.crm_field}</td>
                    <td className="py-2">{mapping.field_type}</td>
                    <td className="py-2">{mapping.transformation || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
