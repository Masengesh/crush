import React from 'react';

interface Escort {
  _id: string;
  name: string;
  age: number;
  gender: string;
  photos: string[];
  bio: string;
  services: string[];
  rates: {
    currency: string;
    amounts: { [key: string]: number };
  };
  availability: string;
  city: string;
  country: string;
  type: 'individual' | 'agency';
  agencyName?: string;
  agencyDescription?: string;
}

interface EscortListingCardProps {
  escort: Escort;
  onViewDetails: (id: string) => void;
}

const EscortListingCard: React.FC<EscortListingCardProps> = ({ escort, onViewDetails }) => {
  const displayName = escort.type === 'agency' ? escort.agencyName || escort.name : escort.name;

  return (
    <div className="escort-card" onClick={() => onViewDetails(escort._id)}>
      <div className="escort-card-image">
        <img src={escort.photos[0] || '/default-avatar.png'} alt={displayName} />
        {escort.type === 'agency' && <span className="agency-badge">Agency</span>}
      </div>
      <div className="escort-card-info">
        <h3>{displayName}, {escort.age}</h3>
        <p className="location">{escort.city}, {escort.country}</p>
        <p className="bio">{escort.bio}</p>
        <div className="services">
          {escort.services.slice(0, 3).map((service, index) => (
            <span key={index} className="service-tag">{service}</span>
          ))}
          {escort.services.length > 3 && <span className="more-services">+{escort.services.length - 3} more</span>}
        </div>
        <div className="rates">
          {Object.entries(escort.rates.amounts).slice(0, 2).map(([key, value]) => (
            <span key={key} className="rate">{key}: {escort.rates.currency} {value}</span>
          ))}
        </div>
        <p className="availability">Available: {escort.availability}</p>
      </div>
    </div>
  );
};

export default EscortListingCard;