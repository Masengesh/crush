import React, { useState, useEffect } from 'react';
import { generateCSRFToken } from '../utils/security';

interface SecureFormProps {
  onSubmit: (data: any, csrfToken: string) => Promise<void>;
  children: (props: {
    csrfToken: string;
    handleSubmit: (e: React.FormEvent) => Promise<void>;
  }) => React.ReactNode;
}

const SecureForm: React.FC<SecureFormProps> = ({ onSubmit, children }) => {
  const [csrfToken, setCsrfToken] = useState<string>('');

  useEffect(() => {
    // Generate CSRF token on component mount
    const token = generateCSRFToken();
    setCsrfToken(token);
    // Store in localStorage for persistence
    localStorage.setItem('csrfToken', token);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await onSubmit(new FormData(e.target as HTMLFormElement), csrfToken);
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  return (
    <>
      {children({ csrfToken, handleSubmit })}
    </>
  );
};

export default SecureForm;