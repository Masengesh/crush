import React from 'react';

interface BenefitsListProps {
  benefits: string[];
  className?: string;
}

const BenefitsList: React.FC<BenefitsListProps> = ({ benefits, className = '' }) => {
  return (
    <div className={`space-y-3 ${className}`}>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Premium Benefits</h3>
      {benefits.map((benefit, index) => (
        <div key={index} className="flex items-start">
          <svg className="w-5 h-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <span className="text-gray-700">{benefit}</span>
        </div>
      ))}
    </div>
  );
};

export default BenefitsList;