import { useState } from 'react';
import UserProfile from './UserProfile';
import EditProfileForm from './EditProfileForm';
import '../styles/ProfileCardFlip.scss';

const ProfileCardFlip = () => {
  const [flipped, setFlipped] = useState(false);

  const toggle = () => setFlipped(!flipped);

  return (
    <div className={`form-wrapper flip-container ${flipped ? 'flipped' : ''}`}>
      <div className="flipper">
        <div className="form-content front">
          <UserProfile onEditClick={toggle} />
        </div>
        <div className="form-content back">
          <EditProfileForm onSave={toggle} onCancel={toggle} />
        </div>
      </div>
    </div>
  );
};

export default ProfileCardFlip;
