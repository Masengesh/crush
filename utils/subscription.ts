import { useAuth } from '../context/AuthContext';

export const useSubscription = () => {
  const { user } = useAuth();

  const isPremium = () => {
    if (!user?.subscription) return false;
    const { plan, expiry } = user.subscription;
    if (plan === 'free') return false;
    if (plan === 'boost') return true; // Boost is one-time
    if (expiry) {
      return new Date(expiry) > new Date();
    }
    return true;
  };

  const hasFeature = (feature: string) => {
    if (!isPremium()) return false;

    const premiumFeatures = [
      'boost_profile',
      'see_likes',
      'unlimited_likes',
      'read_receipts',
      'advanced_filters',
      'travel_mode',
      'hide_ads'
    ];

    return premiumFeatures.includes(feature);
  };

  const getPlanName = () => {
    return user?.subscription?.plan || 'free';
  };

  const getExpiryDate = () => {
    return user?.subscription?.expiry;
  };

  return {
    isPremium,
    hasFeature,
    getPlanName,
    getExpiryDate,
  };
};

// Utility function to check subscription status
export const checkSubscriptionStatus = async (): Promise<any> => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch('/api/payments/subscription', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (response.ok) {
      return await response.json();
    }
    return null;
  } catch (error) {
    console.error('Error checking subscription:', error);
    return null;
  }
};