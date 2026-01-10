import React from 'react';

interface Message {
  _id: string;
  sender: {
    _id: string;
    name: string;
    photos: string[];
  };
  content: string;
  timestamp: Date;
  type: 'text' | 'image';
  read: boolean;
}

interface ChatBubbleProps {
  message: Message;
  isOwn: boolean;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ message, isOwn }) => {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className={`chat-bubble ${isOwn ? 'own' : 'other'}`}>
      {message.type === 'text' ? (
        <p>{message.content}</p>
      ) : (
        <img src={message.content} alt="Shared image" className="chat-image" />
      )}
      <span className="timestamp">{formatTime(new Date(message.timestamp))}</span>
      {isOwn && message.read && <span className="read-receipt">✓✓</span>}
    </div>
  );
};

export default ChatBubble;