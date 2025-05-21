export interface SubscriptionPlan {
  id: string;
  name: string;
  description: string;
  price_monthly: number;
  price_yearly: number;
  features: Record<string, boolean>;
  limits: Record<string, number>;
  is_active: boolean;
}

export interface Subscription {
  id: string;
  organization_id: string;
  plan_id: string;
  status: 'active' | 'canceled' | 'past_due' | 'incomplete';
  current_period_start: string;
  current_period_end: string;
  cancel_at_period_end: boolean;
  payment_method_id?: string;
  billing_cycle: 'monthly' | 'yearly';
  usage_this_period: Record<string, number>;
  metadata: Record<string, any>;
}

export interface BillingHistory {
  id: string;
  organization_id: string;
  subscription_id: string;
  amount: number;
  status: 'paid' | 'pending' | 'failed';
  billing_date: string;
  payment_method: string;
  invoice_url?: string;
  metadata: Record<string, any>;
}
