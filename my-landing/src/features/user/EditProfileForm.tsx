import '../../styles/style-user/UserProfile.scss';
import defaultAvatar from '/svg/avatar.png';
import { useState } from 'react';

type EditProfileFormProps = {
  onSave: () => void;
  onCancel: () => void;
};

type UserProfileData = {
  name: string;
  email: string;
  country: string;
  city: string;
  slogan: string;
  bio: string;
  phone: string;
  github: string;
  linkedin: string;
  dob: string;
};

const EditProfileForm = ({ onSave }: EditProfileFormProps) => {
  const initialData: UserProfileData = JSON.parse(localStorage.getItem('userProfile') || '{}');

  const [formData, setFormData] = useState<UserProfileData>({
    name: initialData.name || '',
    email: initialData.email || '',
    country: initialData.country || '',
    city: initialData.city || '',
    slogan: initialData.slogan || '',
    bio: initialData.bio || '',
    phone: initialData.phone || '',
    github: initialData.github || '',
    linkedin: initialData.linkedin || '',
    dob: initialData.dob || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('userProfile', JSON.stringify(formData));
    onSave();
  };

  return (
    <form className="user-profile-container" onSubmit={handleSubmit}>
      <button type="submit" className="edit-button">Save</button>

      <div className="profile-glass">
        <div className="avatar-section">
          <img src={defaultAvatar} alt="User avatar" className="avatar-img" />
          <button className="upload-btn">Upload</button>
        </div>

        <div className="info-section">
          <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" />
          <input type="text" name="country" value={formData.country} onChange={handleChange} placeholder="Country" />
          <input type="text" name="city" value={formData.city} onChange={handleChange} placeholder="City" />
        </div>
      </div>

      <div className="extra-columns-wrapper">
        <div className="extra-section">
          <textarea
            name="slogan"
            className="slogan"
            value={formData.slogan}
            onChange={handleChange}
            placeholder="Your personal slogan..."
          />
          <textarea
            name="bio"
            className="bio"
            value={formData.bio}
            onChange={handleChange}
            placeholder="A few words about yourself..."
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
          />
        </div>

        <div className="info-section">
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone number"
          />
          <input
            type="url"
            name="github"
            value={formData.github}
            onChange={handleChange}
            placeholder="GitHub profile link"
          />
          <input
            type="url"
            name="linkedin"
            value={formData.linkedin}
            onChange={handleChange}
            placeholder="LinkedIn profile link"
          />
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
          />
        </div>
      </div>
    </form>
  );
};

export default EditProfileForm;
