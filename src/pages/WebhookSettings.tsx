import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export default function WebhookSettings() {
  const [webhooks, setWebhooks] = useState([]);
  const [selectedWebhook, setSelectedWebhook] = useState(null);
  const [logs, setLogs] = useState([]);

  const loadWebhooks = async () => {
    const { data } = await supabase
      .from('webhooks')
      .select('*')
      .order('created_at', { ascending: false });
    
    setWebhooks(data || []);
  };

  const loadLogs = async (webhookId: string) => {
    const { data } = await supabase
      .from('webhook_logs')
      .select('*')
      .eq('webhook_id', webhookId)
      .order('created_at', { ascending: false })
      .limit(50);
    
    setLogs(data || []);
  };

  useEffect(() => {
    loadWebhooks();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Configuration Webhooks</h1>

      {/* Liste des webhooks */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {webhooks.map(webhook => (
          <div
            key={webhook.id}
            className={`p-4 rounded cursor-pointer ${
              selectedWebhook?.id === webhook.id ? 'bg-blue-100' : 'bg-white'
            }`}
            onClick={() => {
              setSelectedWebhook(webhook);
              loadLogs(webhook.id);
            }}
          >
            <h3 className="font-semibold">{webhook.name}</h3>
            <p className="text-sm text-gray-600">
              {webhook.is_active ? 'Actif' : 'Inactif'}
            </p>
            <p className="text-xs text-gray-500 truncate">
              {webhook.url}
            </p>
          </div>
        ))}
      </div>

      {/* Configuration du webhook */}
      {selectedWebhook && (
        <div className="bg-white p-6 rounded">
          <h2 className="text-xl font-semibold mb-4">
            Configuration {selectedWebhook.name}
          </h2>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                URL du Webhook
              </label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                value={selectedWebhook.url}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">
                Clé Secrète
              </label>
              <input
                type="password"
                className="w-full p-2 border rounded"
                value={selectedWebhook.secret_key}
              />
            </div>
          </div>

          {/* Types d'événements */}
          <div className="mt-4">
            <h3 className="font-semibold mb-2">Types d'événements</h3>
            <div className="flex flex-wrap gap-2">
              {selectedWebhook.event_types.map(type => (
                <span
                  key={type}
                  className="px-3 py-1 bg-blue-100 rounded-full text-sm"
                >
                  {type}
                </span>
              ))}
            </div>
          </div>

          {/* Logs */}
          <div className="mt-6">
            <h3 className="font-semibold mb-4">Historique des appels</h3>
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-left">Date</th>
                  <th className="text-left">Événement</th>
                  <th className="text-left">Statut</th>
                  <th className="text-left">Tentatives</th>
                </tr>
              </thead>
              <tbody>
                {logs.map(log => (
                  <tr key={log.id}>
                    <td className="py-2">
                      {new Date(log.created_at).toLocaleString()}
                    </td>
                    <td className="py-2">{log.event_type}</td>
                    <td className="py-2">
                      <span
                        className={`px-2 py-1 rounded ${
                          log.success
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {log.response_status}
                      </span>
                    </td>
                    <td className="py-2">{log.attempt_count}</td>
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
