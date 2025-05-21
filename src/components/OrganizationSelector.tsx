import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Organization } from '../types/organization';
import { useOrganization } from '../hooks/useOrganization';

export const OrganizationSelector: React.FC = () => {
  const { organizations, currentOrganization, setCurrentOrganization } = useOrganization();
  const navigate = useNavigate();

  const handleChange = (orgId: string) => {
    const org = organizations.find(o => o.id === orgId);
    if (org) {
      setCurrentOrganization(org);
      navigate('/dashboard');
    }
  };

  if (!organizations.length) return null;

  return (
    <div className="relative">
      <select
        value={currentOrganization?.id || ''}
        onChange={(e) => handleChange(e.target.value)}
        className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
      >
        {organizations.map((org) => (
          <option key={org.id} value={org.id}>
            {org.name}
          </option>
        ))}
      </select>
    </div>
  );
}
