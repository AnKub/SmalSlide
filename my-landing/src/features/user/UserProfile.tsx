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

          {data.phone && <p><strong>Phone:</strong> {data.phone}</p>}
          {data.github && <p><strong>GitHub:</strong> {data.github}</p>}
          {data.pronouns && <p><strong>Pronouns:</strong> {data.pronouns}</p>}
          {data.dob && <p><strong>Date of Birth:</strong> {data.dob}</p>}
        </div>
      </div>

      <div className="extra-columns-wrapper">
        <div className="extra-section">
          <textarea className="slogan" value={data.slogan || ''} placeholder="Your personal slogan..." readOnly />
          <textarea className="bio" value={data.bio || ''} placeholder="A few words about yourself..." readOnly />
        </div>

        <div className="info-section">
          {data.phone && <input value={data.phone} readOnly />}
          {data.github && <input value={data.github} readOnly />}
          {data.pronouns && <input value={data.pronouns} readOnly />}
          {data.dob && <input value={data.dob} readOnly />}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
