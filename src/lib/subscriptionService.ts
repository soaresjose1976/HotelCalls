import { supabase } from './supabase';
import { RevolutPaymentService } from './revolutPayment';
import type { SubscriptionPlan, Subscription, BillingHistory } from '../types/subscription';

export class SubscriptionService {
  private revolutPayment = new RevolutPaymentService();

  async trackUsageTime(
    organizationId: string,
    seconds: number
  ): Promise<void> {
    try {
      // Récupérer l'abonnement actif
      const { data: subscription } = await supabase
        .from('subscriptions')
        .select('*, subscription_plans!inner(*)')
        .eq('organization_id', organizationId)
        .eq('status', 'active')
        .single();

      if (!subscription) throw new Error('Aucun abonnement actif trouvé');

      // Calculer le coût
      const cost = seconds * subscription.subscription_plans.price_per_second;

      // Enregistrer l'utilisation
      await supabase.from('billing_history').insert({
        organization_id: organizationId,
        subscription_id: subscription.id,
        amount: cost,
        status: 'pending',
        billing_date: new Date(),
        seconds_used: seconds,
        payment_method: 'revolut',
        metadata: {
          billing_type: 'per_second',
          rate: subscription.subscription_plans.price_per_second
        }
      });

      // Traiter le paiement
      const order = await this.revolutPayment.processSubscriptionPayment(
        subscription,
        cost
      );

      // Mettre à jour le statut
      await supabase
        .from('billing_history')
        .update({
          status: 'paid',
          metadata: {
            order_id: order.id
          }
        })
        .eq('organization_id', organizationId)
        .eq('status', 'pending');

    } catch (error) {
      console.error('Erreur suivi temps utilisation:', error);
      throw new Error('Échec du suivi du temps d\'utilisation');
    }
  }

  // Méthode pour obtenir le coût estimé
  async getEstimatedCost(
    organizationId: string,
    seconds: number
  ): Promise<number> {
    const { data: subscription } = await supabase
      .from('subscriptions')
      .select('*, subscription_plans!inner(*)')
      .eq('organization_id', organizationId)
      .eq('status', 'active')
      .single();

    if (!subscription) return 0;

    return seconds * subscription.subscription_plans.price_per_second;
  }

  // ... autres méthodes existantes ...
}
