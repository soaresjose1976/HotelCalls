import React from 'react';
import { RevolutPaymentService } from '../lib/revolutPayment';

interface PaymentMethodFormProps {
  customerId: string;
  onSuccess: (paymentMethodId: string) => void;
}

export const PaymentMethodForm: React.FC<PaymentMethodFormProps> = ({
  customerId,
  onSuccess
}) => {
  const [loading, setLoading] = React.useState(false);
  const revolutPayment = new RevolutPaymentService();

  const handleSetupPayment = async () => {
    try {
      setLoading(true);
      const { redirect_url } = await revolutPayment.setupPaymentMethod(
        customerId,
        `${window.location.origin}/payment-return`
      );

      window.location.href = redirect_url;
    } catch (error) {
      console.error('Erreur configuration paiement:', error);
      setLoading(false);
    }
  };

  return (
    <div className="mt-4">
      <button
        onClick={handleSetupPayment}
        disabled={loading}
        className="w-full bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 disabled:opacity-50"
      >
        {loading ? 'Configuration...' : 'Configurer le paiement'}
      </button>
    </div>
  );
};
