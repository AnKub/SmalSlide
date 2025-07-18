import defaultAvatar from '/svg/avatar.svg';
import { User } from '../../../types';
import './UserProfile.scss';

type UserProfileProps = {
  user: User | null;
  onEditClick: () => void;
};

const UserProfile = ({ user, onEditClick }: UserProfileProps) => {
  if (!user) return <div>Loading...</div>;

  const hasExtraInfo =
    user.slogan ||
    user.bio ||
    user.phone ||
    user.github ||
    user.linkedin ||
    user.email ||
    user.dob;

  return (
    <div className="user-profile-container">
      <button className="edit-button" onClick={onEditClick}>Edit</button>
      <div className="profile-glass">
        <div className="avatar-section">
          <img src={user.avatar || defaultAvatar} alt="User avatar" className="avatar-img" />
          <button className="upload-btn">Upload</button>
        </div>
        <div className="info-section">
          <p className="label-name"><strong>{user.name || 'No info'}</strong></p>
          {user.dob && <p><strong>{user.dob}</strong></p>}
          <p><strong>{user.country || 'No info'}</strong></p>
          <p><strong>{user.city || 'No info'}</strong></p>
        </div>
      </div>
      {hasExtraInfo && (
        <div className="extra-columns-wrapper">
          <div className="extra-section">
            {user.slogan && (
              <textarea className="slogan" value={user.slogan} placeholder="Your personal slogan..." readOnly />
            )}
            {user.bio && (
              <textarea className="bio" value={user.bio} placeholder="A few words about yourself..." readOnly />
            )}
          </div>
          <div className="info-section readonly-fields">
            {user.phone && <a href={`tel:${user.phone}`}>{user.phone}</a>}
            {user.github && (
              <a href={user.github} target="_blank" rel="noopener noreferrer"><strong>GitHub</strong></a>
            )}
            {user.linkedin && (
              <a href={user.linkedin} target="_blank" rel="noopener noreferrer"><strong>Linkedin</strong></a>
            )}
            {user.email && (
              <a href={`mailto:${user.email}`} target="_blank" rel="noopener noreferrer"><strong>Mail</strong></a>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;