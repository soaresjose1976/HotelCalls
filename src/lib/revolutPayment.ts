import axios from 'axios';
import type { Subscription, BillingHistory } from '../types/subscription';

const REVOLUT_API_URL = process.env.VITE_REVOLUT_API_URL;
const REVOLUT_API_KEY = process.env.VITE_REVOLUT_API_KEY;

export class RevolutPaymentService {
  private readonly client = axios.create({
    baseURL: REVOLUT_API_URL,
    headers: {
      'Authorization': `Bearer ${REVOLUT_API_KEY}`,
      'Content-Type': 'application/json'
    }
  });

  async createPaymentOrder(
    amount: number,
    currency: string,
    customerId: string,
    metadata: Record<string, any>
  ) {
    try {
      const response = await this.client.post('/orders', {
        amount: Math.round(amount * 100), // Revolut utilise les centimes
        currency,
        customer_id: customerId,
        metadata
      });

      return response.data;
    } catch (error) {
      console.error('Erreur création ordre de paiement Revolut:', error);
      throw new Error('Échec de création du paiement');
    }
  }

  async createCustomer(
    email: string,
    name: string,
    organizationId: string
  ) {
    try {
      const response = await this.client.post('/customers', {
        email,
        name,
        metadata: {
          organization_id: organizationId
        }
      });

      return response.data;
    } catch (error) {
      console.error('Erreur création client Revolut:', error);
      throw new Error('Échec de création du client');
    }
  }

  async setupPaymentMethod(
    customerId: string,
    returnUrl: string
  ) {
    try {
      const response = await this.client.post('/payment-methods/setup', {
        customer_id: customerId,
        return_url: returnUrl,
        payment_method_types: ['card']
      });

      return response.data;
    } catch (error) {
      console.error('Erreur configuration méthode de paiement:', error);
      throw new Error('Échec de configuration du paiement');
    }
  }

  async processSubscriptionPayment(
    subscription: Subscription,
    amount: number
  ) {
    try {
      const order = await this.createPaymentOrder(
        amount,
        'EUR',
        subscription.payment_method_id!,
        {
          subscription_id: subscription.id,
          organization_id: subscription.organization_id
        }
      );

      return order;
    } catch (error) {
      console.error('Erreur traitement paiement abonnement:', error);
      throw new Error('Échec du paiement');
    }
  }

  async getPaymentStatus(orderId: string) {
    try {
      const response = await this.client.get(`/orders/${orderId}`);
      return response.data.status;
    } catch (error) {
      console.error('Erreur vérification statut paiement:', error);
      throw new Error('Échec de vérification du paiement');
    }
  }

  async refundPayment(
    orderId: string,
    amount: number,
    reason: string
  ) {
    try {
      const response = await this.client.post(`/orders/${orderId}/refund`, {
        amount: Math.round(amount * 100),
        reason
      });

      return response.data;
    } catch (error) {
      console.error('Erreur remboursement:', error);
      throw new Error('Échec du remboursement');
    }
  }
}
