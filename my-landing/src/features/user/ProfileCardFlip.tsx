import React from 'react';
import '../../styles/ProfileCardFlip.scss';

interface ProfileCardFlipProps {
  flipped: boolean;
  front: React.ReactNode;
  back: React.ReactNode;
}

const ProfileCardFlip: React.FC<ProfileCardFlipProps> = ({ flipped, front, back }) => {
  return (
    <div className={`flip-container ${flipped ? 'flipped' : ''}`}>
      <div className="flipper">
        <div className="front">{front}</div>
        <div className="back">{back}</div>
      </div>
    </div>
  );
};

export default ProfileCardFlip;
