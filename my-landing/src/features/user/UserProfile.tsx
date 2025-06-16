import '../../styles/style-user/UserProfile.scss';
import defaultAvatar from '/svg/avatar.svg';

type UserProfileProps = {
  onEditClick: () => void;
};

type UserProfileData = {
  name?: string;
  email?: string;
  country?: string;
  city?: string;
  slogan?: string;
  bio?: string;
  phone?: string;
  github?: string;
  linkedin?: string;
  dob?: string;
};

const UserProfile = ({ onEditClick }: UserProfileProps) => {
  const rawData = localStorage.getItem('userProfile');
  const data: UserProfileData = rawData ? JSON.parse(rawData) : {};

  const hasExtraInfo =
    data.slogan ||
    data.bio ||
    data.phone ||
    data.github ||
    data.linkedin ||
    data.email ||
    data.dob;

  return (
    <div className="user-profile-container">
      <button className="edit-button" onClick={onEditClick}>Edit</button>

      <div className="profile-glass">
        <div className="avatar-section">
          <img src={defaultAvatar} alt="User avatar" className="avatar-img" />
          <button className="upload-btn">Upload</button>
        </div>

      <div className="info-section">
          <p className="label-name">Who you gonna call?</p><br />
          <p className="label-name"><strong>{data.name || 'No info'}</strong></p>
           {data.dob && (
           <p><strong>{data.dob}</strong> </p>)}
           <p><strong>{data.country || 'No info'}</strong></p>
           <p><strong>{data.city || 'No info'}</strong></p>
      </div>
      </div>

      {hasExtraInfo && (
        <div className="extra-columns-wrapper">
          <div className="extra-section">
            {data.slogan && (
              <textarea
                className="slogan"
                value={data.slogan}
                placeholder="Your personal slogan..."
                readOnly
              />
            )}
            {data.bio && (
              <textarea
                className="bio"
                value={data.bio}
                placeholder="A few words about yourself..."
                readOnly
              />
            )}
          </div>

          <div className="info-section readonly-fields">
            {data.phone && (
              <a href={`tel:${data.phone}`}>{data.phone}</a>
            )}
            {data.github && (
              <a href={data.github} target="_blank" rel="noopener noreferrer">
                <strong>GitHub</strong>
              </a>
            )}
            {data.linkedin && (
              <a href={data.linkedin} target="_blank" rel="noopener noreferrer">
                <strong>Linkedin</strong>
              </a>
            )}
            {data.email && (
              <a href={`mailto:${data.email}`} target="_blank" rel="noopener noreferrer">
               <strong>Mail</strong>
              </a>
            )}
           </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
