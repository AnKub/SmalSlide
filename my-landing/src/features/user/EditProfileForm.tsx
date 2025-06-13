import '../../styles/UserProfile.scss';
import defaultAvatar from '/svg/avatar.png';
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
    bio: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: зберегти в localStorage або бек
    onSave();
  };

  return (
    <form className="user-profile-container" onSubmit={handleSubmit}>
      <button type="button" className="edit-button" onClick={onCancel}>←</button>

      <div className="profile-glass">
        <div className="avatar-section">
          <img src={defaultAvatar} alt="User avatar" className="avatar-img" />
          <button className="upload-btn">Upload</button>
        </div>

        <div className="info-section">
          <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" />
          <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
          <input type="text" name="country" value={formData.country} onChange={handleChange} placeholder="Country" />
          <input type="text" name="city" value={formData.city} onChange={handleChange} placeholder="City" />
        </div>
      </div>

      <div className="extra-section">
        <textarea name="slogan" className="slogan" value={formData.slogan} onChange={handleChange} placeholder="Your personal slogan..." />
        <textarea name="bio" className="bio" value={formData.bio} onChange={handleChange} placeholder="A few words about yourself..." />
      </div>

      <button type="submit" className="upload-btn">Save</button>
    </form>
  );
};

export default EditProfileForm;
