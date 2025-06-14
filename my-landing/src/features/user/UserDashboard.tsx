import '../../styles/style-user/UserDashboard.scss';
import { useEffect, useState } from 'react';
import ProfileCardFlip from './ProfileCardFlip';
import UserProfile from './UserProfile';
import EditProfileForm from './EditProfileForm';

const UserDashboard = () => {
  const [userName, setUserName] = useState('User');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const name = localStorage.getItem('userName') || 'User';
    setUserName(name);
  }, []);

  const handleEditClick = () => setIsEditing(true);
  const handleSave = () => setIsEditing(false);
  const handleCancel = () => setIsEditing(false);

  return (
    <div className="user-dashboard">
      <div className="welcome-card">
        <h1 className="title">Welcome back, {userName}!</h1>
        <p className="description">This is your personal space. More features coming soon.</p>
        <div className="actions">
          <button className="button" onClick={handleEditClick}>Edit Profile</button>
          <button className="button">Logout</button>
        </div>
      </div>

     <div className="profile-page-wrapper">
  <ProfileCardFlip
    flipped={isEditing}
    front={<UserProfile onEditClick={handleEditClick} />}
    back={<EditProfileForm onSave={handleSave} onCancel={handleCancel} />}
  />
</div>
    </div>
  );
};

export default UserDashboard;
