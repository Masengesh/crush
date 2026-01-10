import React, { useState } from 'react';
import Button from './Button';
import Card from './Card';
import PasswordInput from './PasswordInput';
import { sanitizeText, loginSchema, registerSchema } from '../utils/security';

interface FormField {
  name: string;
  label: string;
  type: string;
  required?: boolean;
  placeholder?: string;
  options?: { value: string; label: string }[];
}

interface AuthFormProps {
  title: string;
  fields: FormField[];
  onSubmit: (data: Record<string, any>) => Promise<void>;
  submitButtonText: string;
  loading: boolean;
  error: string | null;
  footer?: React.ReactNode;
}

const AuthForm: React.FC<AuthFormProps> = ({
  title,
  fields,
  onSubmit,
  submitButtonText,
  loading,
  error,
  footer,
}) => {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    // Sanitize input to prevent XSS
    const sanitizedValue = sanitizeText(value);
    setFormData(prev => ({ ...prev, [name]: sanitizedValue }));
    if (validationErrors[name]) {
      setValidationErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = async () => {
    const errors: Record<string, string> = {};

    // Use yup schemas for validation
    const schema = title.toLowerCase().includes('login') ? loginSchema : registerSchema;

    try {
      await schema.validate(formData, { abortEarly: false });
    } catch (validationError: any) {
      validationError.inner.forEach((err: any) => {
        errors[err.path] = err.message;
      });
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!(await validateForm())) return;
    try {
      await onSubmit(formData);
    } catch (err) {
      // Error handled by parent component
    }
  };

  return (
    <Card className="auth-form">
      <h2 className="text-center mb-4">{title}</h2>
      {error && <div className="error-message mb-3" style={{ color: 'red' }}>{error}</div>}
      <form onSubmit={handleSubmit}>
        {fields.map(field => (
          <div key={field.name} className="form-group">
            <label htmlFor={field.name}>{field.label}</label>
            {field.type === 'select' ? (
              <select
                id={field.name}
                name={field.name}
                value={formData[field.name] || ''}
                onChange={handleChange}
                required={field.required}
              >
                <option value="">Select {field.label.toLowerCase()}</option>
                {field.options?.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            ) : field.type === 'password' ? (
              <PasswordInput
                id={field.name}
                name={field.name}
                value={formData[field.name] || ''}
                onChange={handleChange}
                placeholder={field.placeholder}
                required={field.required}
              />
            ) : (
              <input
                id={field.name}
                name={field.name}
                type={field.type}
                value={formData[field.name] || ''}
                onChange={handleChange}
                placeholder={field.placeholder}
                required={field.required}
              />
            )}
            {validationErrors[field.name] && (
              <div className="error-message" style={{ color: 'red', fontSize: '0.875rem' }}>
                {validationErrors[field.name]}
              </div>
            )}
          </div>
        ))}
        <Button type="submit" variant="primary" disabled={loading} className="w-full">
          {loading ? 'Loading...' : submitButtonText}
        </Button>
      </form>
      {footer && <div className="mt-4 text-center">{footer}</div>}
    </Card>
  );
};

export default AuthForm;