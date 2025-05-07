import { useState } from 'react';
import axios from 'axios';

// Reusable profile editor for common fields and avatar upload
export default function ProfileEditor({ user, onSave, children }) {
  const [editedUser, setEditedUser] = useState({ ...user });
  const [avatarPreview, setAvatarPreview] = useState(user.profilePic);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  // Handle avatar upload to Cloudinary
  const handleAvatarUpload = async (file) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'campusconnect_avatars');

      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/upload`,
        formData
      );
      
      setEditedUser(prev => ({ ...prev, profilePic: res.data.secure_url }));
      setAvatarPreview(URL.createObjectURL(file));
    } catch (err) {
      setError('Avatar upload failed');
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.put('/api/users/me', editedUser, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      onSave(editedUser);
      setSuccess('Profile updated successfully!');
    } catch (err) {
      setError('Failed to update profile');
    }
    setLoading(false);
  };

  return (
    <div className="profile-editor">
      <div className="avatar-section">
        <img 
          src={avatarPreview} 
          alt="Profile" 
          className="avatar" 
          width={150}
          height={150}
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleAvatarUpload(e.target.files[0])}
          id="avatar-upload"
        />
        <label htmlFor="avatar-upload" className="upload-button">
          Change Photo
        </label>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Common Fields */}
        <div className="form-group">
          <label>Name</label>
          <input
            value={editedUser.name}
            onChange={e => setEditedUser({...editedUser, name: e.target.value})}
            required
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            value={editedUser.email}
            disabled
          />
        </div>

        {/* Role-Specific Fields */}
        {children(editedUser, setEditedUser)}

        {/* Error/Success Messages */}
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}

        <button type="submit" disabled={loading}>
          {loading ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </div>
  );
}

