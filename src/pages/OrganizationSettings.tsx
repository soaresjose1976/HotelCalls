import React from 'react';
import { useOrganization } from '../hooks/useOrganization';
import { OrganizationService } from '../lib/organizationService';
import type { OrganizationUser, OrganizationInvite } from '../types/organization';

const organizationService = new OrganizationService();

export const OrganizationSettings: React.FC = () => {
  const { currentOrganization } = useOrganization();
  const [users, setUsers] = React.useState<OrganizationUser[]>([]);
  const [inviteEmail, setInviteEmail] = React.useState('');
  const [selectedRole, setSelectedRole] = React.useState('');

  React.useEffect(() => {
    if (currentOrganization) {
      loadUsers();
    }
  }, [currentOrganization]);

  const loadUsers = async () => {
    if (!currentOrganization) return;
    const orgUsers = await organizationService.getOrganizationUsers(currentOrganization.id);
    setUsers(orgUsers);
  };

  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentOrganization) return;

    try {
      await organizationService.inviteUser({
        email: inviteEmail,
        role_id: selectedRole,
        organization_id: currentOrganization.id
      });
      setInviteEmail('');
      setSelectedRole('');
      loadUsers();
    } catch (error) {
      console.error('Erreur lors de l\'invitation:', error);
    }
  };

  const handleRemoveUser = async (userId: string) => {
    if (!currentOrganization) return;
    
    try {
      await organizationService.removeUser(currentOrganization.id, userId);
      loadUsers();
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
    }
  };

  if (!currentOrganization) return null;

  return (
    <div className="max-w-4xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-semibold text-gray-900">
        Paramètres de l'organisation
      </h1>

      <div className="mt-6">
        <h2 className="text-lg font-medium text-gray-900">Membres</h2>
        <div className="mt-4">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rôle
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {user.user?.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.role?.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleRemoveUser(user.user_id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-medium text-gray-900">Inviter un membre</h3>
          <form onSubmit={handleInvite} className="mt-4 space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Adresse email
              </label>
              <input
                type="email"
                id="email"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                Rôle
              </label>
              <select
                id="role"
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="">Sélectionner un rôle</option>
                <option value="admin">Administrateur</option>
                <option value="manager">Manager</option>
                <option value="staff">Staff</option>
              </select>
            </div>
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Inviter
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
