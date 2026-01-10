import React, { useState } from 'react';

interface PasswordInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  className?: string;
}

const PasswordInput: React.FC<PasswordInputProps> = ({ className = '', ...props }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={`password-input-container ${className}`}>
      <input
        {...props}
        type={showPassword ? 'text' : 'password'}
        className="password-input"
      />
      <button
        type="button"
        onClick={togglePasswordVisibility}
        className="password-toggle-btn"
        aria-label={showPassword ? 'Hide password' : 'Show password'}
      >
        {showPassword ? '🙈' : '👁️'}
      </button>
      <style jsx>{`
        .password-input-container {
          position: relative;
          display: flex;
          align-items: center;
        }
        .password-input {
          flex: 1;
          padding-right: 40px; /* Space for the button */
        }
        .password-toggle-btn {
          position: absolute;
          right: 10px;
          background: none;
          border: none;
          cursor: pointer;
          font-size: 16px;
          color: #666;
          padding: 0;
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .password-toggle-btn:hover {
          color: #333;
        }
        .password-toggle-btn:focus {
          outline: 2px solid #007bff;
          outline-offset: 2px;
        }
      `}</style>
    </div>
  );
};

export default PasswordInput;