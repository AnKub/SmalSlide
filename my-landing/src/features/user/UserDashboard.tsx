import { useEffect, useState } from 'react';
import ProfileCardFlip from './ProfileCardFlip';
import UserProfile from './UserProfile';
import EditProfileForm from './EditProfileForm';
import { User } from '../../types';
import '../../style/style-user/UserDashboard.scss';


const UserDashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;
    fetch('http://localhost:3000/api/user/profile', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setUser(data.user));
  }, []);

  const handleEditClick = () => setIsEditing(true);
  const handleSave = (updatedUser: User) => {
    setUser(updatedUser);
    setIsEditing(false);
  };
  const handleLogout = () => {
  localStorage.removeItem('token');
  window.location.href = '/login'; 
};
  const handleCancel = () => setIsEditing(false);
  
  return (
    <div className="user-dashboard">
      <div className="welcome-card">
        <h1 className="title">Welcome back, {user?.name || 'User'}!</h1>
        <p className="description">This is your personal space. More features coming soon.</p>
        <div className="actions">
          <button className="button" onClick={handleEditClick}>Edit Profile</button>
          <button className="button" onClick={handleLogout}>Logout</button>
        </div>
      </div>

      <div className="profile-page-wrapper">
        <ProfileCardFlip
          flipped={isEditing}
          front={<UserProfile user={user} onEditClick={handleEditClick} />}
          back={<EditProfileForm user={user} onSave={handleSave} onCancel={handleCancel} />}
        />
      </div>
    </div>
  );
};

export default UserDashboard;