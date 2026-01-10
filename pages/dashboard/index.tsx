import React, { useState } from 'react';
import Link from 'next/link';
import { apiClient } from '../../utils/api';

const Dashboard: React.FC = () => {
  const [isEscort, setIsEscort] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    tribe: '',
    skinColor: '',
    image: '',
    languages: '',
    location: '',
    phoneNumber: '',
    orientation: '',
    pricePerHour: '',
    height: '',
    weight: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await apiClient.createEscortProfile(formData);
      alert('Profile created successfully!');
    } catch (error) {
      console.error('Error creating profile:', error);
      alert('Error creating profile');
    }
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Escort Dashboard</h1>
      </header>
      <nav className="dashboard-nav">
        {/* Links removed as features require authentication */}
      </nav>
      <main className="dashboard-main">
        <div className="profile-section">
          <h2>Create Your Escort Profile</h2>
          <form onSubmit={handleSubmit} className="profile-form">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="age">Age</label>
              <input type="number" id="age" name="age" value={formData.age} onChange={handleInputChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="tribe">Tribe</label>
              <input type="text" id="tribe" name="tribe" value={formData.tribe} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label htmlFor="skinColor">Skin Color</label>
              <select id="skinColor" name="skinColor" value={formData.skinColor} onChange={handleInputChange}>
                <option value="">Select</option>
                <option value="light">Light</option>
                <option value="medium">Medium</option>
                <option value="dark">Dark</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="image">Image URL</label>
              <input type="url" id="image" name="image" value={formData.image} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label htmlFor="languages">Languages (comma separated)</label>
              <input type="text" id="languages" name="languages" value={formData.languages} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label htmlFor="location">Location</label>
              <input type="text" id="location" name="location" value={formData.location} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label htmlFor="phoneNumber">Phone Number</label>
              <input type="tel" id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label htmlFor="orientation">Orientation</label>
              <select id="orientation" name="orientation" value={formData.orientation} onChange={handleInputChange}>
                <option value="">Select</option>
                <option value="straight">Straight</option>
                <option value="gay">Gay</option>
                <option value="bisexual">Bisexual</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="pricePerHour">Price per Hour (UGX)</label>
              <input type="number" id="pricePerHour" name="pricePerHour" value={formData.pricePerHour} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label htmlFor="height">Height (cm)</label>
              <input type="number" id="height" name="height" value={formData.height} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label htmlFor="weight">Weight (kg)</label>
              <input type="number" id="weight" name="weight" value={formData.weight} onChange={handleInputChange} />
            </div>
            <button type="submit" className="btn btn-primary">Save Profile</button>
          </form>
        </div>
      </main>
      <style jsx>{`
        .profile-form {
          max-width: 600px;
          margin: 0 auto;
        }
        .form-group {
          margin-bottom: 1rem;
        }
        .form-group label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: bold;
        }
        .form-group input, .form-group select {
          width: 100%;
          padding: 0.5rem;
          border: 1px solid #ccc;
          border-radius: 4px;
        }
        .btn {
          padding: 0.75rem 1.5rem;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 1rem;
        }
        .btn-primary {
          background: #007bff;
          color: white;
        }
        .btn-primary:hover {
          background: #0056b3;
        }
      `}</style>
    </div>
  );
};

export default Dashboard;