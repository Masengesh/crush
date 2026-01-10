import React, { useState } from 'react';

interface ServiceSelectorProps {
  services: string[];
  onServicesChange: (services: string[]) => void;
  availableServices: string[];
}

const ServiceSelector: React.FC<ServiceSelectorProps> = ({
  services,
  onServicesChange,
  availableServices,
}) => {
  const [customService, setCustomService] = useState('');

  const toggleService = (service: string) => {
    if (services.includes(service)) {
      onServicesChange(services.filter(s => s !== service));
    } else {
      onServicesChange([...services, service]);
    }
  };

  const addCustomService = () => {
    if (customService.trim() && !services.includes(customService.trim())) {
      onServicesChange([...services, customService.trim()]);
      setCustomService('');
    }
  };

  const removeService = (service: string) => {
    onServicesChange(services.filter(s => s !== service));
  };

  return (
    <div className="service-selector">
      <div className="available-services">
        <h3>Select your services</h3>
        <div className="service-grid">
          {availableServices.map(service => (
            <button
              key={service}
              type="button"
              className={`service-button ${services.includes(service) ? 'selected' : ''}`}
              onClick={() => toggleService(service)}
            >
              {service}
            </button>
          ))}
        </div>
      </div>
      <div className="custom-service">
        <input
          type="text"
          placeholder="Add custom service"
          value={customService}
          onChange={(e) => setCustomService(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addCustomService()}
        />
        <button type="button" onClick={addCustomService}>Add</button>
      </div>
      <div className="selected-services">
        <h4>Selected services:</h4>
        <div className="service-tags">
          {services.map(service => (
            <span key={service} className="service-tag">
              {service}
              <button type="button" onClick={() => removeService(service)}>×</button>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServiceSelector;