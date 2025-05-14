import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Container, LoadingOverlay, Center, Loader, Text } from '@mantine/core';
import ProfileEditor from '../components/ProfileEditor';
import axios from 'axios';

export default function Profile() {
  const { id } = useParams();
  const { user: currentUser, updateUser } = useAuth();
  const [profileUser, setProfileUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const targetUserId = id || currentUser?.id;
        if (!targetUserId) return;
        
        const res = await axios.get(`/api/users/${targetUserId}`);
        setProfileUser(res.data.user);
      } catch (error) {
        console.error('Profile load error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [id, currentUser]);

  const handleProfileUpdate = (updatedUser) => {
    if (!id) { // Only update current user
      updateUser(updatedUser);
    }
  };

  return (
    <Container size="lg" py="xl">
      {loading ? (
        <Center style={{ height: '80vh' }}>
          <Loader size="xl" />
        </Center>
      ) : profileUser ? (
        <ProfileEditor 
          user={profileUser} 
          onSave={handleProfileUpdate}
          mode={id ? 'view' : 'edit'}
        />
      ) : (
        <Text color="dimmed" align="center" mt="xl">
          Profile not found
        </Text>
      )}
    </Container>
  );
}

