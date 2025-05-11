import React, { useEffect } from 'react';
import { Container, Center, Loader, Text } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { showNotification } from '@mantine/notifications';
import axios from 'axios';

export default function LinkedInCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const verifyLinkedIn = async () => {
      try {
        const code = new URLSearchParams(window.location.search).get('code');
        await axios.post('/api/auth/linkedin/callback', { code });
        showNotification({ color: 'green', message: 'LinkedIn verification successful!' });
      } catch {
        showNotification({ color: 'red', message: 'Verification failed' });
      }
      navigate('/profile');
    };

    verifyLinkedIn();
  }, []);

  return (
    <Container size="sm">
      <Center style={{ height: '100vh', flexDirection: 'column' }}>
        <Loader size="xl" />
        <Text mt="xl" size="lg">Verifying LinkedIn profile...</Text>
      </Center>
    </Container>
  );
}
