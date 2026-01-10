import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProfileForm from '../components/profile/ProfileForm';
import PhotoGallery from '../components/profile/PhotoGallery';
import SettingsPanel from '../components/profile/SettingsPanel';
import Button from '../components/Button';

const Profile: React.FC = () => {
  const { user, token } = useAuth();
  const [activeTab, setActiveTab] = useState<'profile' | 'photos' | 'settings'>('profile');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleProfileSave = async (data: any) => {
    setLoading(true);
    setMessage('');
    try {
      const response = await fetch('/api/auth/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message);
      setMessage('Profile updated successfully!');
    } catch (error: any) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePhotosSave = async (photos: string[]) => {
    setLoading(true);
    setMessage('');
    try {
      const response = await fetch('/api/auth/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ photos }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message);
      setMessage('Photos updated successfully!');
    } catch (error: any) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSettingsSave = async (data: any) => {
    setLoading(true);
    setMessage('');
    try {
      const response = await fetch('/api/auth/settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message);
      setMessage('Settings updated successfully!');
    } catch (error: any) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return <div>Please log in to view your profile.</div>;
  }

  return (
    <div className="profile-page">
      <Header />
      <main className="container">
        <div className="profile-container">
          <div className="profile-header">
            <h1>My Profile</h1>
            <div className="profile-tabs">
              <Button
                variant={activeTab === 'profile' ? 'primary' : 'secondary'}
                onClick={() => setActiveTab('profile')}
              >
                Profile
              </Button>
              <Button
                variant={activeTab === 'photos' ? 'primary' : 'secondary'}
                onClick={() => setActiveTab('photos')}
              >
                Photos
              </Button>
              <Button
                variant={activeTab === 'settings' ? 'primary' : 'secondary'}
                onClick={() => setActiveTab('settings')}
              >
                Settings
              </Button>
            </div>
          </div>

          {message && (
            <div className={`message ${message.includes('success') ? 'success' : 'error'}`}>
              {message}
            </div>
          )}

          <div className="profile-content">
            {activeTab === 'profile' && (
              <ProfileForm onSave={handleProfileSave} loading={loading} />
            )}
            {activeTab === 'photos' && (
              <PhotoGallery
                photos={user.photos || []}
                onPhotosChange={handlePhotosSave}
              />
            )}
            {activeTab === 'settings' && (
              <SettingsPanel onSave={handleSettingsSave} loading={loading} />
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Profile;