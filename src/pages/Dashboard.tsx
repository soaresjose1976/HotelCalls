import React from 'react';
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { VoiceAgent, CallSession } from '../types';

export default function Dashboard() {
  const [agents, setAgents] = useState<VoiceAgent[]>([]);
  const [recentCalls, setRecentCalls] = useState<CallSession[]>([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  async function fetchDashboardData() {
    const { data: agentsData } = await supabase
      .from('voice_agents')
      .select('*')
      .limit(5);

    const { data: callsData } = await supabase
      .from('call_sessions')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(10);

    if (agentsData) setAgents(agentsData);
    if (callsData) setRecentCalls(callsData);
  }

  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-medium mb-4">Recent Agents</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {agents.map((agent) => (
            <div
              key={agent.id}
              className="border rounded-lg p-4 hover:bg-gray-50"
            >
              <h3 className="font-medium">{agent.name}</h3>
              <p className="text-sm text-gray-500">{agent.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-medium mb-4">Recent Calls</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Phone Number
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Duration
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentCalls.map((call) => (
                <tr key={call.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {call.phone_number}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {call.status}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {call.end_time
                      ? new Date(call.end_time).getTime() -
                        new Date(call.start_time).getTime()
                      : 'In progress'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
