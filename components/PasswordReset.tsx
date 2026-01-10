import React, { useState } from 'react';
import AuthForm from './AuthForm';
import Button from './Button';
import Card from './Card';
import PasswordInput from './PasswordInput';

interface PasswordResetProps {
  onForgotPassword: (email: string) => Promise<void>;
  onResetPassword: (token: string, password: string) => Promise<void>;
  loading: boolean;
  error: string | null;
}

const PasswordReset: React.FC<PasswordResetProps> = ({
  onForgotPassword,
  onResetPassword,
  loading,
  error,
}) => {
  const [mode, setMode] = useState<'forgot' | 'reset'>('forgot');
  const [emailSent, setEmailSent] = useState(false);
  const [formData, setFormData] = useState({ password: '', confirmPassword: '' });

  // Check if token is present in URL to automatically switch to reset mode
  React.useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    if (token) {
      setMode('reset');
    }
  }, []);

  const handleForgotPassword = async (data: { email: string }) => {
    await onForgotPassword(data.email);
    setEmailSent(true);
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      throw new Error('Passwords do not match');
    }
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    if (!token) {
      throw new Error('Reset token is missing');
    }
    await onResetPassword(token, formData.password);
  };

  if (emailSent) {
    return (
      <Card className="password-reset">
        <h2 className="text-center mb-4">Check Your Email</h2>
        <p className="text-center mb-4">
          We've sent a password reset link to your email address. Please check your inbox and follow the instructions.
        </p>
        <Button onClick={() => setEmailSent(false)} variant="secondary" className="w-full">
          Back to Forgot Password
        </Button>
      </Card>
    );
  }

  if (mode === 'reset') {
    return (
      <Card className="password-reset">
        <h2 className="text-center mb-4">Reset Your Password</h2>
        {error && <div className="error-message mb-3" style={{ color: 'red' }}>{error}</div>}
        <form onSubmit={handleResetPassword}>
          <div className="form-group">
            <label htmlFor="password">New Password</label>
            <PasswordInput
              id="password"
              name="password"
              value={formData.password}
              required
              placeholder="Enter your new password"
              onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm New Password</label>
            <PasswordInput
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              required
              placeholder="Confirm your new password"
              onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
            />
          </div>
          <Button type="submit" variant="primary" disabled={loading} className="w-full">
            {loading ? 'Loading...' : 'Reset Password'}
          </Button>
        </form>
        <div className="mt-4 text-center">
          <button
            type="button"
            onClick={() => setMode('forgot')}
            className="link-button"
          >
            Back to Forgot Password
          </button>
        </div>
      </Card>
    );
  }

  return (
    <AuthForm
      title="Forgot Password"
      fields={[
        {
          name: 'email',
          label: 'Email Address',
          type: 'email',
          required: true,
          placeholder: 'Enter your email address',
        },
      ]}
      onSubmit={handleForgotPassword}
      submitButtonText="Send Reset Link"
      loading={loading}
      error={error}
      footer={
        <div>
          <button
            type="button"
            onClick={() => setMode('reset')}
            className="link-button"
          >
            I have a reset token
          </button>
        </div>
      }
    />
  );
};

export default PasswordReset;