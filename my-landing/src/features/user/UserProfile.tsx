import '../../styles/style-user/UserProfile.scss';
import defaultAvatar from '/svg/avatar.png';

type UserProfileProps = {
  onEditClick: () => void;
};

const UserProfile = ({ onEditClick }: UserProfileProps) => {
  const data = JSON.parse(localStorage.getItem('userProfile') || '{}');

  return (
    <div className="user-profile-container">
      <button className="edit-button" onClick={onEditClick}>Edit</button>

      <div className="profile-glass">
        <div className="avatar-section">
          <img src={defaultAvatar} alt="User avatar" className="avatar-img" />
          <button className="upload-btn">Upload</button>
        </div>

        <div className="info-section">
          <p><strong>Name:</strong> {data.name || 'any info'}</p>
          <p><strong>Email:</strong> {data.email || 'any info'}</p>
          <p><strong>Country:</strong> {data.country || 'any info'}</p>
          <p><strong>City:</strong> {data.city || 'any info'}</p>
        </div>
      </div>

      <div className="extra-section">
        <textarea className="slogan" value={data.slogan || ''} placeholder="Your personal slogan..." readOnly />
        <textarea className="bio" value={data.bio || ''} placeholder="A few words about yourself..." readOnly />
      </div>
    </div>
  );
};

export default UserProfile;
