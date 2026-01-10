import React from 'react';
import Button from '../Button';
import Card from '../Card';

interface PlanCardProps {
  plan: {
    id: string;
    name: string;
    price: string;
    period: string;
    features: string[];
    popular?: boolean;
    priceId?: string;
  };
  onSelect: (plan: any) => void;
  isLoading?: boolean;
}

const PlanCard: React.FC<PlanCardProps> = ({ plan, onSelect, isLoading }) => {
  return (
    <Card className={`relative ${plan.popular ? 'border-2 border-blue-500' : ''}`}>
      {plan.popular && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
            Most Popular
          </span>
        </div>
      )}

      <div className="text-center">
        <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
        <div className="mt-4">
          <span className="text-3xl font-bold text-gray-900">{plan.price}</span>
          <span className="text-gray-600">/{plan.period}</span>
        </div>

        <ul className="mt-6 space-y-2">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-center text-gray-700">
              <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              {feature}
            </li>
          ))}
        </ul>

        <div className="mt-8">
          <Button
            onClick={() => onSelect(plan)}
            disabled={isLoading}
            className={`w-full ${plan.popular ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-800 hover:bg-gray-900'}`}
          >
            {isLoading ? 'Processing...' : `Choose ${plan.name}`}
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default PlanCard;