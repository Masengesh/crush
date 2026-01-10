import React from 'react';

interface TypingIndicatorProps {
  isTyping: boolean;
  userName?: string;
}

const TypingIndicator: React.FC<TypingIndicatorProps> = ({ isTyping, userName }) => {
  if (!isTyping) return null;

  return (
    <div className="typing-indicator">
      <div className="typing-dots">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <span className="typing-text">
        {userName ? `${userName} is typing...` : 'Someone is typing...'}
      </span>
    </div>
  );
};

export default TypingIndicator;