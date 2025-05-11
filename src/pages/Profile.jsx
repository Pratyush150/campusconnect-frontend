import React from 'react';
import { useAuth } from '../context/AuthContext';
import StudentProfile from '../components/StudentProfile';
import MentorProfile from '../components/MentorProfile';
import { Container, LoadingOverlay, Center, Loader } from '@mantine/core';

export default function Profile() {
  const { user, login } = useAuth();

  const handleProfileUpdate = (updatedUser) => {
    login(updatedUser, localStorage.getItem('token'));
  };

  if (!user) {
    return (
      <Center style={{ height: '100vh' }}>
        <Loader size="xl" />
      </Center>
    );
  }

  return (
    <Container size="lg" py="xl">
      <LoadingOverlay visible={!user} />
      {user.role === 'STUDENT' ? (
        <StudentProfile user={user} onProfileUpdate={handleProfileUpdate} />
      ) : (
        <MentorProfile user={user} onProfileUpdate={handleProfileUpdate} />
      )}
    </Container>
  );
}
