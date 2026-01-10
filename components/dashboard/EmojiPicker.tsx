import React, { useState } from 'react';

interface EmojiPickerProps {
  onEmojiSelect: (emoji: string) => void;
}

const EmojiPicker: React.FC<EmojiPickerProps> = ({ onEmojiSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  const emojis = ['😀', '😂', '❤️', '👍', '😊', '😍', '🤔', '😎', '🙌', '💯'];

  const handleEmojiClick = (emoji: string) => {
    onEmojiSelect(emoji);
    setIsOpen(false);
  };

  return (
    <div className="emoji-picker">
      <button
        className="emoji-btn"
        onClick={() => setIsOpen(!isOpen)}
        type="button"
      >
        😀
      </button>
      {isOpen && (
        <div className="emoji-list">
          {emojis.map((emoji) => (
            <button
              key={emoji}
              className="emoji-item"
              onClick={() => handleEmojiClick(emoji)}
              type="button"
            >
              {emoji}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default EmojiPicker;