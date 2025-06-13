import '../../styles/UserProfile.scss';
import { useState } from 'react';

type EditProfileFormProps = {
  onSave: () => void;
  onCancel: () => void;
};

const EditProfileForm = ({ onSave, onCancel }: EditProfileFormProps) => {
  const [formData, setFormData] = useState({
    name: 'Andriy',
    email: 'andriy@example.com',
    country: 'Ukraine',
    city: 'Khmelnytskyi',
    slogan: '',
    bio: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="user-profile-container">
      <button className="edit-button" onClick={onCancel}>X</button>

      <div className="profile-glass">
        <div className="avatar-section">
          <img src="/svg/avatar.png" alt="User avatar" className="avatar-img" />
          <button className="upload-btn">Upload</button>
        </div>

        <div className="info-section">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
          />
          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleChange}
            placeholder="Country"
          />
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="City"
          />
        </div>
      </div>

      <div className="extra-section">
        <textarea
          name="slogan"
          className="slogan"
          placeholder="Your personal slogan..."
          value={formData.slogan}
          onChange={handleChange}
        ></textarea>
        <textarea
          name="bio"
          className="bio"
          placeholder="A few words about yourself..."
          value={formData.bio}
          onChange={handleChange}
        ></textarea>
        <button className="upload-btn" onClick={onSave}>Save</button>
      </div>
    </div>
  );
};

export default EditProfileForm;