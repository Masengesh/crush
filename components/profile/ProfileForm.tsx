import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import Button from '../Button';
import InterestSelector from '../InterestSelector';

interface ProfileFormProps {
  onSave: (data: any) => void;
  loading: boolean;
}

const ProfileForm: React.FC<ProfileFormProps> = ({ onSave, loading }) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    bio: user?.bio || '',
    hobbies: user?.hobbies || [],
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (formData.bio.length > 500) {
      newErrors.bio = 'Bio must be less than 500 characters';
    }

    if (formData.hobbies.length > 10) {
      newErrors.hobbies = 'Maximum 10 hobbies allowed';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSave(formData);
    }
  };

  const handleHobbiesChange = (hobbies: string[]) => {
    setFormData(prev => ({ ...prev, hobbies }));
  };

  return (
    <div className="profile-form">
      <h3>Edit Profile</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="bio">Bio</label>
          <textarea
            id="bio"
            value={formData.bio}
            onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
            placeholder="Tell others about yourself..."
            rows={4}
            maxLength={500}
          />
          <div className="char-count">
            {formData.bio.length}/500
          </div>
          {errors.bio && <span className="error">{errors.bio}</span>}
        </div>

        <InterestSelector
          hobbies={formData.hobbies}
          onHobbiesChange={handleHobbiesChange}
          availableInterests={['Reading', 'Sports', 'Music', 'Travel', 'Cooking', 'Art', 'Technology', 'Fitness', 'Movies', 'Gaming']}
        />
        {errors.hobbies && <span className="error">{errors.hobbies}</span>}

        <Button type="submit" disabled={loading}>
          {loading ? 'Saving...' : 'Save Profile'}
        </Button>
      </form>
    </div>
  );
};

export default ProfileForm;