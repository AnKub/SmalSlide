// import { useEffect, useState } from 'react';
// import ProfileCardFlip from '../ProfileCardFlip';
// import UserProfile from '../userprofil/UserProfile';
// import EditProfileForm from '../EditProfileForm';
// import { User } from '../../../types';
// import './UserDashboard.scss';

// const UserDashboard = () => {
//   const [user, setUser] = useState<User | null>(null);
//   const [isEditing, setIsEditing] = useState(false);

//   const fetchUser = async () => {
//     const token = localStorage.getItem('token');
//     if (!token) return;
//     const res = await fetch('http://localhost:3000/api/user/profile', {
//       headers: { Authorization: `Bearer ${token}` }
//     });
//     const data = await res.json();
//     setUser(data.user);
//   };

//   useEffect(() => {
//     fetchUser();
//   }, []);

//   const handleEditClick = () => setIsEditing(true);

//   const handleSave = async () => {
//     await fetchUser(); 
//     setIsEditing(false);
//   };

//   const handleCancel = () => setIsEditing(false);

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     window.location.href = '/login';
//   };

//   return (
//     <div className="user-dashboard">
//       <div className="welcome-card">
//         <h1 className="title">Welcome back, {user?.name || 'User'}!</h1>
//         <p className="description">This is your personal space. More features coming soon.</p>
//         <div className="actions">
//           <button className="button" onClick={handleEditClick}>Edit Profile</button>
//           <button className="button" onClick={handleLogout}>Logout</button>
//         </div>
//       </div>

//       <div className="profile-page-wrapper">
//         <ProfileCardFlip
//           flipped={isEditing}
//           front={<UserProfile user={user} onEditClick={handleEditClick} />}
//           back={<EditProfileForm user={user} onSave={handleSave} onCancel={handleCancel} />}
//         />
//       </div>
//     </div>
//   );
// };

// export default UserDashboard;
