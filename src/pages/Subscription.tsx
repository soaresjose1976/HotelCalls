import React from 'react';
import { useOrganization } from '../hooks/useOrganization';
import { SubscriptionService } from '../lib/subscriptionService';
import { PaymentMethodForm } from '../components/PaymentMethodForm';
import { TEST_SUBSCRIPTION_PLANS } from '../testData';

export const Subscription: React.FC = () => {
  const { currentOrganization } = useOrganization();
  const [selectedPlan, setSelectedPlan] = React.useState<string | null>(null);
  const [billingCycle, setBillingCycle] = React.useState<'monthly' | 'yearly'>('monthly');
  const [showPayment, setShowPayment] = React.useState(false);

  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold">Plans d'abonnement</h1>
        <div className="mt-4">
          <button
            onClick={() => setBillingCycle('monthly')}
            className={`px-4 py-2 rounded-l ${
              billingCycle === 'monthly' ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
          >
            Mensuel
          </button>
          <button
            onClick={() => setBillingCycle('yearly')}
            className={`px-4 py-2 rounded-r ${
              billingCycle === 'yearly' ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
          >
            Annuel
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {TEST_SUBSCRIPTION_PLANS.map((plan) => (
          <div key={plan.id} className="border rounded-lg p-6 shadow-sm">
            <h2 className="text-2xl font-bold">{plan.name}</h2>
            <p className="text-gray-600 mt-2">{plan.description}</p>
            
            <div className="mt-4">
              <div className="text-3xl font-bold">
                {billingCycle === 'monthly' 
                  ? `${plan.price_monthly}€/mois`
                  : `${plan.price_yearly}€/an`}
              </div>
              <div className="text-sm text-gray-600 mt-1">
                + {(plan.price_per_second * 3600).toFixed(2)}€/heure d'utilisation
              </div>
            </div>

            <div className="mt-6">
              <h3 className="font-semibold mb-2">Fonctionnalités:</h3>
              <ul className="space-y-2">
                {Object.entries(plan.features).map(([feature, included]) => (
                  <li key={feature} className="flex items-center">
                    {included ? '✅' : '❌'} {feature.replace('_', ' ')}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6">
              <h3 className="font-semibold mb-2">Limites:</h3>
              <ul className="space-y-2">
                {Object.entries(plan.limits).map(([limit, value]) => (
                  <li key={limit}>
                    {limit.replace('_', ' ')}: {value}
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={() => handleSubscribe(plan.id)}
              className="mt-8 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
            >
              Sélectionner
            </button>
          </div>
        ))}
      </div>

      {showPayment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Configurer le paiement</h2>
            <PaymentMethodForm
              customerId={currentOrganization?.id || ''}
              onSuccess={() => setShowPayment(false)}
            />
            <button
              onClick={() => setShowPayment(false)}
              className="mt-4 w-full border border-gray-300 py-2 rounded"
            >
              Annuler
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
