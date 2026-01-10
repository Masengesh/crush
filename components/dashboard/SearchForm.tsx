import React, { useState } from 'react';

interface SearchCriteria {
  country: string;
  city: string;
  ageMin: number;
  ageMax: number;
  onlineStatus: boolean;
}

interface SearchFormProps {
  onSearch: (criteria: SearchCriteria) => void;
  onSavePreferences: (criteria: SearchCriteria) => void;
}

const SearchForm: React.FC<SearchFormProps> = ({ onSearch, onSavePreferences }) => {
  const [criteria, setCriteria] = useState<SearchCriteria>({
    country: '',
    city: '',
    ageMin: 18,
    ageMax: 50,
    onlineStatus: false,
  });

  const handleChange = (key: keyof SearchCriteria, value: any) => {
    setCriteria({ ...criteria, [key]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(criteria);
  };

  const handleSave = () => {
    onSavePreferences(criteria);
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <h3>Advanced Search</h3>
      <div className="form-group">
        <label>Country:</label>
        <input
          type="text"
          value={criteria.country}
          onChange={(e) => handleChange('country', e.target.value)}
          placeholder="Enter country"
        />
      </div>
      <div className="form-group">
        <label>City:</label>
        <input
          type="text"
          value={criteria.city}
          onChange={(e) => handleChange('city', e.target.value)}
          placeholder="Enter city"
        />
      </div>
      <div className="form-group">
        <label>Age Range:</label>
        <input
          type="number"
          value={criteria.ageMin}
          onChange={(e) => handleChange('ageMin', parseInt(e.target.value))}
          min="18"
          max="100"
        />
        <span>to</span>
        <input
          type="number"
          value={criteria.ageMax}
          onChange={(e) => handleChange('ageMax', parseInt(e.target.value))}
          min="18"
          max="100"
        />
      </div>
      <div className="form-group">
        <label>
          <input
            type="checkbox"
            checked={criteria.onlineStatus}
            onChange={(e) => handleChange('onlineStatus', e.target.checked)}
          />
          Online now
        </label>
      </div>
      <div className="form-actions">
        <button type="submit">Search</button>
        <button type="button" onClick={handleSave}>Save Preferences</button>
      </div>
    </form>
  );
};

export default SearchForm;