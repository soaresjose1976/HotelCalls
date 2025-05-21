import React from 'react';
import { TrainingFeatureKey } from '../types/training';
import { trainingService } from '../lib/trainingService';
import { useOrganization } from '../hooks/useOrganization';

interface Props {
  featureKey: TrainingFeatureKey;
  label: string;
  description?: string;
  onChange?: (isEnabled: boolean) => void;
}

export default function TrainingFeatureToggle({ 
  featureKey, 
  label, 
  description,
  onChange 
}: Props) {
  const { organization } = useOrganization();
  const [isEnabled, setIsEnabled] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    loadFeatureState();
  }, [featureKey, organization?.id]);

  const loadFeatureState = async () => {
    if (!organization?.id) return;
    
    try {
      const enabled = await trainingService.isFeatureEnabled(
        organization.id,
        featureKey
      );
      setIsEnabled(enabled);
    } catch (error) {
      console.error('Erreur lors du chargement de l\'état:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggle = async () => {
    if (!organization?.id || isLoading) return;

    setIsLoading(true);
    try {
      await trainingService.toggleFeature(
        organization.id,
        featureKey,
        !isEnabled
      );
      setIsEnabled(!isEnabled);
      onChange?.(!isEnabled);
    } catch (error) {
      console.error('Erreur lors du changement d\'état:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-between py-4 border-b">
      <div>
        <h3 className="text-lg font-medium text-gray-900">{label}</h3>
        {description && (
          <p className="text-sm text-gray-500">{description}</p>
        )}
      </div>
      <button
        type="button"
        className={`
          relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full 
          border-2 border-transparent transition-colors duration-200 ease-in-out 
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
          ${isEnabled ? 'bg-blue-600' : 'bg-gray-200'}
          ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}
        `}
        disabled={isLoading}
        onClick={handleToggle}
      >
        <span
          className={`
            pointer-events-none inline-block h-5 w-5 transform rounded-full 
            bg-white shadow ring-0 transition duration-200 ease-in-out
            ${isEnabled ? 'translate-x-5' : 'translate-x-0'}
          `}
        />
      </button>
    </div>
  );
}
