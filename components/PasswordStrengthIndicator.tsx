import React from 'react';
import { checkPasswordStrength } from '../utils/security';

interface PasswordStrengthIndicatorProps {
  password: string;
}

const PasswordStrengthIndicator: React.FC<PasswordStrengthIndicatorProps> = ({ password }) => {
  const { score, feedback } = checkPasswordStrength(password);

  const getStrengthColor = (score: number) => {
    if (score <= 2) return 'red';
    if (score <= 3) return 'orange';
    if (score <= 4) return 'yellow';
    return 'green';
  };

  const getStrengthText = (score: number) => {
    if (score <= 2) return 'Weak';
    if (score <= 3) return 'Fair';
    if (score <= 4) return 'Good';
    return 'Strong';
  };

  if (!password) return null;

  return (
    <div className="password-strength">
      <div className="strength-bar">
        <div
          className="strength-fill"
          style={{
            width: `${(score / 5) * 100}%`,
            backgroundColor: getStrengthColor(score),
          }}
        />
      </div>
      <div className="strength-text" style={{ color: getStrengthColor(score) }}>
        {getStrengthText(score)}
      </div>
      {feedback.length > 0 && (
        <ul className="strength-feedback">
          {feedback.map((item, index) => (
            <li key={index} className="feedback-item">
              {item}
            </li>
          ))}
        </ul>
      )}
      <style jsx>{`
        .password-strength {
          margin-top: 0.5rem;
        }
        .strength-bar {
          height: 4px;
          background-color: #e9ecef;
          border-radius: 2px;
          overflow: hidden;
          margin-bottom: 0.5rem;
        }
        .strength-fill {
          height: 100%;
          transition: width 0.3s ease, background-color 0.3s ease;
        }
        .strength-text {
          font-size: 0.875rem;
          font-weight: 500;
          margin-bottom: 0.25rem;
        }
        .strength-feedback {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .feedback-item {
          font-size: 0.75rem;
          color: #6c757d;
          margin-bottom: 0.125rem;
        }
      `}</style>
    </div>
  );
};

export default PasswordStrengthIndicator;