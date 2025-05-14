import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Container, LoadingOverlay, Center, Loader } from '@mantine/core';
import ProfileEditor from '../components/ProfileEditor';

export default function Profile() {
  const { user, updateUser } = useAuth();

  const handleProfileUpdate = (updatedUser) => {
    updateUser(updatedUser);
  };

  return (
    <Container size="lg" py="xl">
      {user ? (
        <ProfileEditor 
          user={user} 
          onSave={handleProfileUpdate}
        />
      ) : (
        <Center style={{ height: '80vh' }}>
          <Loader size="xl" />
        </Center>
      )}
    </Container>
  );
}
