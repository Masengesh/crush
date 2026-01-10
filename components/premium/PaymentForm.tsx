import React, { useState } from 'react';
import Button from '../Button';

interface PaymentFormProps {
  onSubmit: (plan: string, priceId: string) => Promise<void>;
  isLoading: boolean;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ onSubmit, isLoading }) => {
  const [selectedPlan, setSelectedPlan] = useState<string>('');

  const plans = [
    {
      id: 'free',
      name: 'Free',
      price: '$0',
      period: 'forever',
      features: ['Basic matching', 'Limited swipes', 'Basic filters'],
      priceId: null,
    },
    {
      id: 'premium',
      name: 'Premium',
      price: '$9.99',
      period: 'month',
      features: ['Unlimited likes/swipes', 'See who liked you', 'Advanced filters', 'Read receipts', 'Priority matching'],
      priceId: 'price_premium_monthly', // Replace with actual Stripe price ID
      popular: true,
    },
    {
      id: 'boost',
      name: 'Boost',
      price: '$4.99',
      period: 'one-time',
      features: ['Profile boost for 30 minutes', 'Increased visibility', 'Travel mode access'],
      priceId: 'price_boost_onetime', // Replace with actual Stripe price ID
    },
  ];

  const handleSubmit = async (planId: string) => {
    const plan = plans.find(p => p.id === planId);
    if (plan && plan.priceId) {
      setSelectedPlan(planId);
      await onSubmit(planId, plan.priceId);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Plan</h2>
        <p className="text-gray-600">Unlock premium features to enhance your dating experience</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div key={plan.id} className="relative">
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  Most Popular
                </span>
              </div>
            )}

            <div className={`bg-white rounded-lg shadow-md p-6 border-2 ${plan.popular ? 'border-blue-500' : 'border-gray-200'}`}>
              <div className="text-center">
                <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
                <div className="mt-4">
                  <span className="text-3xl font-bold text-gray-900">{plan.price}</span>
                  {plan.period !== 'forever' && <span className="text-gray-600">/{plan.period}</span>}
                </div>

                <ul className="mt-6 space-y-2 text-left">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-gray-700">
                      <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className="mt-8">
                  {plan.id === 'free' ? (
                    <Button
                      onClick={() => {/* Handle free plan */}}
                      className="w-full bg-gray-500 hover:bg-gray-600"
                      disabled
                    >
                      Current Plan
                    </Button>
                  ) : (
                    <Button
                      onClick={() => handleSubmit(plan.id)}
                      disabled={isLoading || selectedPlan === plan.id}
                      className={`w-full ${plan.popular ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-800 hover:bg-gray-900'}`}
                    >
                      {isLoading && selectedPlan === plan.id ? 'Processing...' : `Choose ${plan.name}`}
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaymentForm;