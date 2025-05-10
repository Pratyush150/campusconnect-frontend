// src/pages/LinkedInCallback.jsx
import React from 'react';
// ...rest of your imports and code
import { useEffect } from 'react';
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
        navigate('/profile');
      } catch (err) {
        showNotification({ color: 'red', message: 'Verification failed' });
        navigate('/profile');
      }
    };

    verifyLinkedIn();
  }, []);

  return <div>Verifying LinkedIn profile...</div>;
}
