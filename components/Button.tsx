import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  ariaLabel?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  type = 'button',
  disabled = false,
  loading = false,
  className = '',
  ariaLabel,
}) => {
  return (
    <button
      className={`btn btn-${variant} ${className}`}
      onClick={onClick}
      type={type}
      disabled={disabled || loading}
      aria-label={ariaLabel}
    >
      {loading ? (
        <>
          <span className="sr-only">Loading...</span>
          <span className="loading" aria-hidden="true"></span>
        </>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;