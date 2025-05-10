// src/pages/Profile.jsx
import React from 'react';
// ...rest of your imports and code
import { useAuth } from '../context/AuthContext';
import StudentProfile from '../components/StudentProfile';
import MentorProfile from '../components/MentorProfile';

export default function Profile() {
  const { user, login } = useAuth();

  const handleProfileUpdate = (updatedUser) => {
    login(updatedUser, localStorage.getItem('token'));
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div style={{ padding: '2rem 0' }}>
      {user.role === 'STUDENT' ? (
        <StudentProfile user={user} onProfileUpdate={handleProfileUpdate} />
      ) : (
        <MentorProfile user={user} onProfileUpdate={handleProfileUpdate} />
      )}
    </div>
  );
}
