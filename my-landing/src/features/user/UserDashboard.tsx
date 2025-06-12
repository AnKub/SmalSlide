import '../../styles/UserDashboard.scss';
import UserProfile from './UserProfile';
import { useEffect, useState } from 'react';

const UserDashboard = () => {
  const [userName, setUserName] = useState('User');

  useEffect(() => {
    const name = localStorage.getItem('userName') || 'User';
    setUserName(name);
  }, []);

  return (
    <div className="user-dashboard">
      <div className="welcome-card">
        <h1 className="title">Welcome back, {userName}!</h1>
        <p className="description">This is your personal space. More features coming soon.</p>
        <div className="actions">
          <button className="button">Edit Profile</button>
          <button className="button">Logout</button>
        </div>
      </div>

      <UserProfile />
    </div>
  );
};

export default UserDashboard;
