import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import Button from '../Button';
import PasswordInput from '../PasswordInput';

interface SettingsPanelProps {
  onSave: (data: any) => void;
  loading: boolean;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({ onSave, loading }) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    isOnline: user?.isOnline || false,
    notifications: {
      email: user?.notifications?.email ?? true,
      push: user?.notifications?.push ?? true,
    },
    isPaused: user?.isPaused || false,
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (formData.newPassword && formData.newPassword.length < 6) {
      newErrors.newPassword = 'Password must be at least 6 characters';
    }

    if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      const { currentPassword, confirmPassword, ...dataToSave } = formData;
      onSave(dataToSave);
    }
  };

  const handleNotificationChange = (type: 'email' | 'push', value: boolean) => {
    setFormData(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [type]: value,
      },
    }));
  };

  return (
    <div className="settings-panel">
      <h3>Settings</h3>
      <form onSubmit={handleSubmit}>
        <div className="setting-group">
          <h4>Visibility</h4>
          <div className="setting-item">
            <label>
              <input
                type="checkbox"
                checked={formData.isOnline}
                onChange={(e) => setFormData(prev => ({ ...prev, isOnline: e.target.checked }))}
              />
              Show online status
            </label>
          </div>
          <div className="setting-item">
            <label>
              <input
                type="checkbox"
                checked={formData.isPaused}
                onChange={(e) => setFormData(prev => ({ ...prev, isPaused: e.target.checked }))}
              />
              Pause account (hide from matches)
            </label>
          </div>
        </div>

        <div className="setting-group">
          <h4>Notifications</h4>
          <div className="setting-item">
            <label>
              <input
                type="checkbox"
                checked={formData.notifications.email}
                onChange={(e) => handleNotificationChange('email', e.target.checked)}
              />
              Email notifications
            </label>
          </div>
          <div className="setting-item">
            <label>
              <input
                type="checkbox"
                checked={formData.notifications.push}
                onChange={(e) => handleNotificationChange('push', e.target.checked)}
              />
              Push notifications
            </label>
          </div>
        </div>

        <div className="setting-group">
          <h4>Change Password</h4>
          <div className="form-group">
            <label htmlFor="currentPassword">Current Password</label>
            <PasswordInput
              id="currentPassword"
              value={formData.currentPassword}
              onChange={(e) => setFormData(prev => ({ ...prev, currentPassword: e.target.value }))}
            />
          </div>
          <div className="form-group">
            <label htmlFor="newPassword">New Password</label>
            <PasswordInput
              id="newPassword"
              value={formData.newPassword}
              onChange={(e) => setFormData(prev => ({ ...prev, newPassword: e.target.value }))}
            />
            {errors.newPassword && <span className="error">{errors.newPassword}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm New Password</label>
            <PasswordInput
              id="confirmPassword"
              value={formData.confirmPassword}
              onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
            />
            {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
          </div>
        </div>

        <div className="setting-group">
          <h4>Account Actions</h4>
          <Button type="button" variant="secondary" onClick={() => alert('Delete account functionality not implemented')}>
            Delete Account
          </Button>
        </div>

        <Button type="submit" loading={loading} disabled={loading}>
          {loading ? 'Saving...' : 'Save Settings'}
        </Button>
      </form>
    </div>
  );
};

export default SettingsPanel;