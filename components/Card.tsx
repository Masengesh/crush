import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  role?: string;
  tabIndex?: number;
  ariaLabel?: string;
}

const Card: React.FC<CardProps> = ({
  children,
  className = '',
  onClick,
  role,
  tabIndex,
  ariaLabel
}) => {
  return (
    <div
      className={`card ${className}`}
      onClick={onClick}
      role={role || (onClick ? 'button' : undefined)}
      tabIndex={tabIndex || (onClick ? 0 : undefined)}
      aria-label={ariaLabel}
      onKeyDown={onClick ? (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      } : undefined}
    >
      {children}
    </div>
  );
};

export default Card;