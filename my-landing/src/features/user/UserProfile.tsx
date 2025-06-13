import '../../styles/UserProfile.scss';
import defaultAvatar from '/svg/avatar.png';

type UserProfileProps = {
  onEditClick: () => void;
};

const UserProfile = ({ onEditClick }: UserProfileProps) => {
  return (
    <div className="user-profile-container">
      <button className="edit-button" onClick={onEditClick}>Edit</button>

      <div className="profile-glass">
        <div className="avatar-section">
          <img src={defaultAvatar} alt="User avatar" className="avatar-img" />
          <button className="upload-btn">Upload</button>
        </div>

        <div className="info-section">
          <p><strong>Name:</strong> Andriy</p>
          <p><strong>Email:</strong> andriy@example.com</p>
          <p><strong>Country:</strong> Ukraine</p>
          <p><strong>City:</strong> Khmelnytskyi</p>
        </div>
      </div>

      <div className="extra-section">
        <textarea className="slogan" placeholder="Your personal slogan..." readOnly />
        <textarea className="bio" placeholder="A few words about yourself..." readOnly />
      </div>
    </div>
  );
};

export default UserProfile;
