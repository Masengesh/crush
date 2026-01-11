import React from 'react';

interface InterestSelectorProps {
  hobbies: string[];
  onHobbiesChange: (hobbies: string[]) => void;
  availableInterests: string[];
}

const InterestSelector: React.FC<InterestSelectorProps> = ({
  hobbies,
  onHobbiesChange,
  availableInterests,
}) => {
  const handleInterestChange = (interest: string, checked: boolean) => {
    if (checked) {
      onHobbiesChange([...hobbies, interest]);
    } else {
      onHobbiesChange(hobbies.filter(h => h !== interest));
    }
  };

  return (
    <div className="interest-selector">
      <label>Hobbies</label>
      <div className="interests-grid">
        {availableInterests.map(interest => (
          <label key={interest} className="interest-item">
            <input
              type="checkbox"
              checked={hobbies.includes(interest)}
              onChange={(e) => handleInterestChange(interest, e.target.checked)}
            />
            {interest}
          </label>
        ))}
      </div>
    </div>
  );
};

export default InterestSelector;