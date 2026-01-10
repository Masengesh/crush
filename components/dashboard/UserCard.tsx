import React from 'react';

interface User {
  id: string;
  name: string;
  age: number;
  photos: string[];
  bio: string;
  interests: string[];
}

interface UserCardProps {
  user: User;
  onLike: () => void;
  onPass: () => void;
  onSuperLike: () => void;
}

const UserCard: React.FC<UserCardProps> = ({ user, onLike, onPass, onSuperLike }) => {
  return (
    <div className="user-card">
      <div className="user-card-image">
        <img src={user.photos[0] || '/default-avatar.png'} alt={user.name} />
      </div>
      <div className="user-card-info">
        <h3>{user.name}, {user.age}</h3>
        <p>{user.bio}</p>
        <div className="user-card-interests">
          {user.interests.map((interest, index) => (
            <span key={index} className="interest-tag">{interest}</span>
          ))}
        </div>
      </div>
      <div className="user-card-actions">
        <button onClick={onPass} className="pass-btn">Pass</button>
        <button onClick={onLike} className="like-btn">Like</button>
        <button onClick={onSuperLike} className="super-like-btn">Super Like</button>
      </div>
    </div>
  );
};

export default UserCard;