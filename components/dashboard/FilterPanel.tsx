import React, { useState } from 'react';

interface FilterOptions {
  city: string;
  country: string;
  services: string[];
  minRate: number;
  maxRate: number;
}

interface FilterPanelProps {
  onFilterChange: (filters: FilterOptions) => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({ onFilterChange }) => {
  const [filters, setFilters] = useState<FilterOptions>({
    city: '',
    country: '',
    services: [],
    minRate: 0,
    maxRate: 1000,
  });

  const handleChange = (key: keyof FilterOptions, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const toggleService = (service: string) => {
    const newServices = filters.services.includes(service)
      ? filters.services.filter(s => s !== service)
      : [...filters.services, service];
    handleChange('services', newServices);
  };

  const availableServices = ['Companionship', 'Dinner Dates', 'Travel Companion', 'Events', 'Overnight', 'Massage'];

  return (
    <div className="filter-panel">
      <h3>Filters</h3>
      <div className="filter-group">
        <label>City:</label>
        <input
          type="text"
          value={filters.city}
          onChange={(e) => handleChange('city', e.target.value)}
          placeholder="Enter city"
        />
      </div>
      <div className="filter-group">
        <label>Country:</label>
        <input
          type="text"
          value={filters.country}
          onChange={(e) => handleChange('country', e.target.value)}
          placeholder="Enter country"
        />
      </div>
      <div className="filter-group">
        <label>Rate Range (€):</label>
        <input
          type="number"
          value={filters.minRate}
          onChange={(e) => handleChange('minRate', parseInt(e.target.value))}
          min="0"
          placeholder="Min"
        />
        <span>to</span>
        <input
          type="number"
          value={filters.maxRate}
          onChange={(e) => handleChange('maxRate', parseInt(e.target.value))}
          min="0"
          placeholder="Max"
        />
      </div>
      <div className="filter-group">
        <label>Services:</label>
        <div className="services-grid">
          {availableServices.map((service) => (
            <button
              key={service}
              className={`service-btn ${filters.services.includes(service) ? 'active' : ''}`}
              onClick={() => toggleService(service)}
            >
              {service}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;