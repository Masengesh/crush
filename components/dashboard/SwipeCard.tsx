import React, { useState, useRef } from 'react';

interface User {
  id: string;
  name: string;
  age: number;
  photos: string[];
  bio: string;
  interests: string[];
}

interface SwipeCardProps {
  user: User;
  onSwipe: (direction: 'left' | 'right' | 'up') => void;
}

const SwipeCard: React.FC<SwipeCardProps> = ({ user, onSwipe }) => {
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    setStartX(e.touches[0].clientX);
    setStartY(e.touches[0].clientY);
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const currentX = e.touches[0].clientX;
    const currentY = e.touches[0].clientY;
    setOffsetX(currentX - startX);
    setOffsetY(currentY - startY);
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);

    const threshold = 100;
    if (Math.abs(offsetX) > threshold) {
      if (offsetX > 0) {
        onSwipe('right'); // Like
      } else {
        onSwipe('left'); // Pass
      }
    } else if (offsetY < -threshold) {
      onSwipe('up'); // Super Like
    }

    setOffsetX(0);
    setOffsetY(0);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setStartX(e.clientX);
    setStartY(e.clientY);
    setIsDragging(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setOffsetX(e.clientX - startX);
    setOffsetY(e.clientY - startY);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);

    const threshold = 100;
    if (Math.abs(offsetX) > threshold) {
      if (offsetX > 0) {
        onSwipe('right'); // Like
      } else {
        onSwipe('left'); // Pass
      }
    } else if (offsetY < -threshold) {
      onSwipe('up'); // Super Like
    }

    setOffsetX(0);
    setOffsetY(0);
  };

  return (
    <div
      ref={cardRef}
      className="swipe-card"
      style={{
        transform: `translate(${offsetX}px, ${offsetY}px) rotate(${offsetX * 0.1}deg)`,
        transition: isDragging ? 'none' : 'transform 0.3s ease',
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      role="button"
      tabIndex={0}
      aria-label={`Swipe card for ${user.name}, ${user.age} years old`}
      onKeyDown={(e) => {
        if (e.key === 'ArrowLeft') {
          onSwipe('left');
        } else if (e.key === 'ArrowRight') {
          onSwipe('right');
        } else if (e.key === 'ArrowUp') {
          onSwipe('up');
        }
      }}
    >
      <div className="swipe-card-image">
        <img src={user.photos[0] || '/default-avatar.png'} alt={user.name} />
      </div>
      <div className="swipe-card-info">
        <h3>{user.name}, {user.age}</h3>
        <p>{user.bio}</p>
        <div className="swipe-card-interests">
          {user.interests.map((interest, index) => (
            <span key={index} className="interest-tag">{interest}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SwipeCard;