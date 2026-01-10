import React, { useState } from 'react';
import { useRouter } from 'next/router';
import OnboardingStep from '../components/OnboardingStep';
import PhotoUpload from '../components/PhotoUpload';
import InterestSelector from '../components/InterestSelector';
import QuizQuestion from '../components/QuizQuestion';

interface OnboardingData {
  photos: string[];
  bio: string;
  hobbies: string[];
  preferences: {
    gender: string;
    ageRange: { min: number; max: number };
    distance: number;
    location: { lat: number; lng: number };
  };
  quizAnswers: Record<string, string>;
}

const availableInterests = [
  'Reading', 'Travel', 'Cooking', 'Sports', 'Music', 'Art', 'Photography',
  'Hiking', 'Dancing', 'Gaming', 'Movies', 'Fitness', 'Yoga', 'Meditation',
  'Writing', 'Gardening', 'Pets', 'Volunteering', 'Technology', 'Fashion'
];

const quizQuestions = [
  {
    question: 'What are you looking for?',
    options: ['Long-term relationship', 'Short-term fun', 'Friendship', 'Not sure yet']
  },
  {
    question: 'How important is physical attraction to you?',
    options: ['Very important', 'Somewhat important', 'Not very important', 'Not important at all']
  },
  {
    question: 'Do you prefer staying in or going out?',
    options: ['Staying in', 'Going out', 'Mix of both', 'Depends on the mood']
  },
  {
    question: 'What\'s your ideal weekend activity?',
    options: ['Adventure sports', 'Relaxing at home', 'Social events', 'Cultural experiences']
  },
  {
    question: 'How do you handle conflicts?',
    options: ['Discuss openly', 'Give space', 'Compromise quickly', 'Avoid confrontation']
  },
  {
    question: 'What\'s your communication style?',
    options: ['Direct and honest', 'Thoughtful and considerate', 'Humorous and light', 'Reserved and private']
  },
  {
    question: 'How important are shared values to you?',
    options: ['Very important', 'Somewhat important', 'Not very important', 'Not important at all']
  }
];

const Onboarding: React.FC = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [onboardingData, setOnboardingData] = useState<OnboardingData>({
    photos: [],
    bio: '',
    hobbies: [],
    preferences: {
      gender: 'any',
      ageRange: { min: 18, max: 99 },
      distance: 50,
      location: { lat: 0, lng: 0 }
    },
    quizAnswers: {}
  });

  const steps = [
    {
      title: 'Profile Creation',
      description: 'Upload photos and tell us about yourself',
      component: (
        <div>
          <PhotoUpload
            photos={onboardingData.photos}
            onPhotosChange={(photos) => setOnboardingData(prev => ({ ...prev, photos }))}
          />
          <div className="bio-section">
            <label htmlFor="bio">Bio (max 500 characters)</label>
            <textarea
              id="bio"
              value={onboardingData.bio}
              onChange={(e) => setOnboardingData(prev => ({ ...prev, bio: e.target.value }))}
              maxLength={500}
              placeholder="Tell us about yourself..."
            />
            <span>{onboardingData.bio.length}/500</span>
          </div>
          <InterestSelector
            hobbies={onboardingData.hobbies}
            onHobbiesChange={(hobbies) => setOnboardingData(prev => ({ ...prev, hobbies }))}
            availableInterests={availableInterests}
          />
        </div>
      ),
      canProceed: onboardingData.photos.length > 0 && onboardingData.bio.trim().length > 0
    },
    {
      title: 'Preference Setup',
      description: 'Set your matching preferences',
      component: (
        <div className="preferences-section">
          <div className="preference-item">
            <label>Gender preference</label>
            <select
              value={onboardingData.preferences.gender}
              onChange={(e) => setOnboardingData(prev => ({
                ...prev,
                preferences: { ...prev.preferences, gender: e.target.value }
              }))}
            >
              <option value="any">Everyone</option>
              <option value="male">Men</option>
              <option value="female">Women</option>
            </select>
          </div>
          <div className="preference-item">
            <label>Age range</label>
            <div className="age-range">
              <input
                type="number"
                min="18"
                max="90"
                value={onboardingData.preferences.ageRange.min}
                onChange={(e) => setOnboardingData(prev => ({
                  ...prev,
                  preferences: {
                    ...prev.preferences,
                    ageRange: { ...prev.preferences.ageRange, min: parseInt(e.target.value) }
                  }
                }))}
              />
              <span>to</span>
              <input
                type="number"
                min="18"
                max="90"
                value={onboardingData.preferences.ageRange.max}
                onChange={(e) => setOnboardingData(prev => ({
                  ...prev,
                  preferences: {
                    ...prev.preferences,
                    ageRange: { ...prev.preferences.ageRange, max: parseInt(e.target.value) }
                  }
                }))}
              />
            </div>
          </div>
          <div className="preference-item">
            <label>Maximum distance (km)</label>
            <input
              type="range"
              min="1"
              max="100"
              value={onboardingData.preferences.distance}
              onChange={(e) => setOnboardingData(prev => ({
                ...prev,
                preferences: { ...prev.preferences, distance: parseInt(e.target.value) }
              }))}
            />
            <span>{onboardingData.preferences.distance} km</span>
          </div>
          <div className="preference-item">
            <label>Location</label>
            <input
              type="text"
              placeholder="Enter your location"
              // In a real app, you'd integrate with a maps API
            />
          </div>
        </div>
      ),
      canProceed: true
    },
    {
      title: 'Personality Quiz',
      description: 'Help us find better matches for you',
      component: (
        <div className="quiz-section">
          {quizQuestions.map((q, index) => (
            <QuizQuestion
              key={index}
              question={q.question}
              options={q.options}
              selectedAnswer={onboardingData.quizAnswers[`q${index}`] || null}
              onAnswerSelect={(answer) => setOnboardingData(prev => ({
                ...prev,
                quizAnswers: { ...prev.quizAnswers, [`q${index}`]: answer }
              }))}
            />
          ))}
        </div>
      ),
      canProceed: Object.keys(onboardingData.quizAnswers).length === quizQuestions.length,
      skippable: true
    }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Complete onboarding
      completeOnboarding();
    }
  };

  const handleSkip = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      completeOnboarding();
    }
  };

  const completeOnboarding = async () => {
    try {
      // Update user profile with onboarding data
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/auth/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(onboardingData),
      });
      if (!response.ok) throw new Error('Failed to update profile');
      // Redirect to dashboard
      router.push('/dashboard');
    } catch (error) {
      console.error('Error completing onboarding:', error);
    }
  };

  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="onboarding-container">
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${progress}%` }}></div>
      </div>
      <div className="step-counter">
        Step {currentStep + 1} of {steps.length}
      </div>
      <OnboardingStep
        title={steps[currentStep].title}
        description={steps[currentStep].description}
        onNext={handleNext}
        onSkip={steps[currentStep].skippable ? handleSkip : undefined}
        canProceed={steps[currentStep].canProceed}
        nextLabel={currentStep === steps.length - 1 ? 'Complete' : 'Next'}
        skipLabel={currentStep === steps.length - 1 ? 'Skip & Complete' : 'Skip'}
      >
        {steps[currentStep].component}
      </OnboardingStep>
    </div>
  );
};

export default Onboarding;