import { useState, useEffect } from 'react';
import { User, Contacts } from '../../types';

type EditProfileFormProps = {
  user: User | null;
  onSave: (updatedUser: User) => void;
  onCancel: () => void;
};

const EditProfileForm = ({ user, onSave, onCancel }: EditProfileFormProps) => {
  const [formData, setFormData] = useState<User>({
    id: '',
    name: '',
    avatar: '',
    bio: '',
    slogan: '',
    contacts: {
      dob: '',
      country: '',
      city: '',
      phone: '',
      github: '',
      linkedin: ''
    },
    email: ''
  });

  useEffect(() => {
    if (user) setFormData(user);
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    if (['dob', 'country', 'city', 'phone', 'github', 'linkedin'].includes(name)) {
      setFormData(prev => ({
        ...prev,
        contacts: { ...prev.contacts, [name]: value }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const token = localStorage.getItem('token');
    const form = new FormData();
    form.append('avatar', file);

    const res = await fetch('http://localhost:3000/api/user/avatar', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: form
    });

    const data = await res.json();
    setFormData(prev => ({ ...prev, avatar: data.url }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    const { name, avatar, bio, slogan, contacts } = formData;

    const res = await fetch('http://localhost:3000/api/user/profile', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ name, avatar, bio, slogan, contacts })
    });

    const data = await res.json();
    onSave(data.user);
  };

  return (
    <form className="user-profile-container" onSubmit={handleSubmit}>
      <button type="submit" className="edit-button">Save</button>
      <div className="profile-glass">
        <div className="avatar-section">
          <img src={formData.avatar || '/svg/avatar.svg'} alt="User avatar" className="avatar-img" />
          <label className="upload-btn">
            Upload
            <input
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              style={{ display: 'none' }}
            />
          </label>
        </div>
        <div className="info-sectionEd">
          <input type="text" name="name" value={formData.name || ''} onChange={handleChange} placeholder="Name" />
          <input type="date" name="dob" value={formData.contacts?.dob || ''} onChange={handleChange} placeholder="Date of Birth" />
          <input type="text" name="country" value={formData.contacts?.country || ''} onChange={handleChange} placeholder="Country" />
          <input type="text" name="city" value={formData.contacts?.city || ''} onChange={handleChange} placeholder="City" />
        </div>
      </div>

      <div className="extra-columns-wrapper">
        <div className="extra-section">
          <textarea name="slogan" className="slogan" value={formData.slogan || ''} onChange={handleChange} placeholder="Your personal slogan..." />
          <textarea name="bio" className="bio" value={formData.bio || ''} onChange={handleChange} placeholder="A few words about yourself..." />
        </div>
        <div className="info-sectionEd">
          <button type="button" className="edit-button cancel" onClick={onCancel}>Cancel</button>
          <input type="text" name="phone" value={formData.contacts?.phone || ''} onChange={handleChange} placeholder="Phone number" />
          <input type="url" name="github" value={formData.contacts?.github || ''} onChange={handleChange} placeholder="GitHub profile link" />
          <input type="url" name="linkedin" value={formData.contacts?.linkedin || ''} onChange={handleChange} placeholder="LinkedIn profile link" />
        </div>
      </div>

      <button type="submit" className="edit-button">Save</button>
    </form>
  );
};

export default EditProfileForm;
