// src/components/Notifications.jsx
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { io } from 'socket.io-client';

// Use Vite env variable for client URL
const socket = io(import.meta.env.VITE_CLIENT_URL);

export default function Notifications() {
  useEffect(() => {
    // Listen for booking notifications
    socket.on('booking_notification', (data) => {
      toast.info(data.message || 'You have a new booking request!');
    });

    // Clean up on unmount
    return () => {
      socket.off('booking_notification');
      socket.disconnect();
    };
  }, []);

  return null; // This component only handles notifications
}
