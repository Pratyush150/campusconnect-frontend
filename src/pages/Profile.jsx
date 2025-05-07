import { useAuth } from '../context/AuthContext';
import StudentProfile from '../components/StudentProfile';
import MentorProfile from '../components/MentorProfile';

export default function Profile() {
  const { user, login } = useAuth();

  // Handle profile updates globally
  const handleProfileUpdate = (updatedUser) => {
    login(updatedUser, localStorage.getItem('token'));
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className="profile-page">
      <h1>{user.name}'s Profile</h1>
      {user.role === 'STUDENT' ? (
        <StudentProfile user={user} onProfileUpdate={handleProfileUpdate} />
      ) : (
        <MentorProfile user={user} onProfileUpdate={handleProfileUpdate} />
      )}
    </div>
  );
}
