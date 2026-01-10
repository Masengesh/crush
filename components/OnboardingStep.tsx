import React from 'react';
import Button from './Button';

interface OnboardingStepProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  onNext: () => void;
  onSkip?: () => void;
  nextLabel?: string;
  skipLabel?: string;
  canProceed?: boolean;
}

const OnboardingStep: React.FC<OnboardingStepProps> = ({
  title,
  description,
  children,
  onNext,
  onSkip,
  nextLabel = 'Next',
  skipLabel = 'Skip',
  canProceed = true,
}) => {
  return (
    <div className="onboarding-step">
      <div className="step-header">
        <h2>{title}</h2>
        {description && <p className="step-description">{description}</p>}
      </div>
      <div className="step-content">
        {children}
      </div>
      <div className="step-actions">
        {onSkip && (
          <Button variant="secondary" onClick={onSkip}>
            {skipLabel}
          </Button>
        )}
        <Button variant="primary" onClick={onNext} disabled={!canProceed}>
          {nextLabel}
        </Button>
      </div>
    </div>
  );
};

export default OnboardingStep;