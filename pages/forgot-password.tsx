import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import PasswordReset from '../components/PasswordReset';
import { useAuth } from '../context/AuthContext';

const ForgotPassword: React.FC = () => {
  const { forgotPassword, resetPassword, loading, error } = useAuth();
  const router = useRouter();

  const handleForgotPassword = async (email: string) => {
    await forgotPassword(email);
  };

  const handleResetPassword = async (token: string, password: string) => {
    await resetPassword(token, password);
    router.push('/login'); // Redirect to login after successful reset
  };

  return (
    <div className="container">
      <div className="auth-page">
        <PasswordReset
          onForgotPassword={handleForgotPassword}
          onResetPassword={handleResetPassword}
          loading={loading}
          error={error}
        />
        <div className="text-center mt-4">
          <Link href="/login" className="link-button">
            Back to Login
          </Link>
        </div>
      </div>
      <style jsx>{`
        .auth-page {
          max-width: 400px;
          margin: 2rem auto;
          padding: 0 1rem;
        }
        .link-button {
          color: #dc3545;
          text-decoration: none;
        }
        .link-button:hover {
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
};

export default ForgotPassword;