import '../../styles/UserProfile.scss';
import defaultAvatar from '/svg/avatar.png';

const UserProfile = () => {
  return (
    <div className="user-profile-container">
      <button className="edit-button">Edit</button>

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
        <textarea className="slogan" placeholder="Your personal slogan..."></textarea>
        <textarea className="bio" placeholder="A few words about yourself..."></textarea>
      </div>
    </div>
  );
};

export default UserProfile;
