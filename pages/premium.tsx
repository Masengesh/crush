import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from '../components/premium/PaymentForm';
import BenefitsList from '../components/premium/BenefitsList';
import { useRouter } from 'next/router';

// Initialize Stripe
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '');

const PremiumPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [subscription, setSubscription] = useState<any>(null);
  const router = useRouter();

  const premiumBenefits = [
    'Boost profile visibility',
    'See who liked you',
    'Unlimited likes and swipes',
    'Read receipts on messages',
    'Advanced search filters',
    'Travel mode for location flexibility',
    'Ad-free experience',
    'Priority customer support',
  ];

  useEffect(() => {
    // Check current subscription status
    fetchSubscriptionStatus();
  }, []);

  const fetchSubscriptionStatus = async () => {
    try {
      const response = await fetch('/api/payments/subscription', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setSubscription(data);
      }
    } catch (error) {
      console.error('Error fetching subscription:', error);
    }
  };

  const handlePayment = async (plan: string, priceId: string) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/payments/create-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ plan, priceId }),
      });

      if (!response.ok) {
        throw new Error('Failed to create checkout session');
      }

      const { sessionId, url } = await response.json();

      // Redirect to Stripe Checkout
      if (url) {
        window.location.href = url;
      } else {
        // Fallback if no URL provided - redirect directly
        window.location.href = `https://checkout.stripe.com/pay/${sessionId}`;
      }
    } catch (error) {
      console.error('Payment error:', error);
      alert('Payment failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Check for success/cancel query parameters
  useEffect(() => {
    const { success, canceled } = router.query;
    if (success) {
      alert('Payment successful! Your premium features are now active.');
      fetchSubscriptionStatus();
    } else if (canceled) {
      alert('Payment was canceled.');
    }
  }, [router.query]);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Upgrade to Premium
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Unlock the full potential of your dating experience with premium features designed to help you find meaningful connections faster.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Benefits Section */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <BenefitsList benefits={premiumBenefits} />
          </div>

          {/* Payment Section */}
          <div className="bg-white rounded-lg shadow-md p-8">
            {subscription && subscription.plan !== 'free' ? (
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Current Plan: {subscription.plan.charAt(0).toUpperCase() + subscription.plan.slice(1)}
                </h2>
                <p className="text-gray-600 mb-4">
                  Status: {subscription.status}
                </p>
                {subscription.endDate && (
                  <p className="text-gray-600">
                    Expires: {new Date(subscription.endDate).toLocaleDateString()}
                  </p>
                )}
                <button
                  onClick={() => router.push('/dashboard')}
                  className="mt-6 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium"
                >
                  Go to Dashboard
                </button>
              </div>
            ) : (
              <PaymentForm onSubmit={handlePayment} isLoading={isLoading} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PremiumPage;