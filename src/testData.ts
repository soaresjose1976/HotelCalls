export const TEST_SUBSCRIPTION_PLANS = [
  {
    id: 'basic',
    name: 'Basic',
    description: 'Pour démarrer',
    price_monthly: 29.99,
    price_yearly: 299.99,
    features: {
      voice_minutes: true,
      custom_flows: true,
      analytics: false
    },
    limits: {
      agents: 2,
      calls_per_month: 100
    },
    is_active: true
  },
  {
    id: 'pro',
    name: 'Professional',
    description: 'Pour les équipes',
    price_monthly: 99.99,
    price_yearly: 999.99,
    features: {
      voice_minutes: true,
      custom_flows: true,
      analytics: true
    },
    limits: {
      agents: 10,
      calls_per_month: 1000
    },
    is_active: true
  }
];
