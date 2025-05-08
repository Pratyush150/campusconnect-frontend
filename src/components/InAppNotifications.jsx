// src/components/InAppNotifications.jsx
import { useEffect, useState } from 'react';
import { Notification, Group } from '@mantine/core';
import { io } from 'socket.io-client';

export default function InAppNotifications({ userId }) {
  const [notifications, setNotifications] = useState([]);
  useEffect(() => {
    const socket = io(import.meta.env.VITE_CLIENT_URL);
    socket.emit('join', userId);
    socket.on('notification', (msg) => {
      setNotifications(prev => [...prev, msg]);
    });
    return () => socket.disconnect();
  }, [userId]);
  return (
    <Group direction="column" position="right">
      {notifications.map((n, i) => (
        <Notification key={i} title={n.title} color={n.type === 'success' ? 'green' : 'blue'}>
          {n.message}
        </Notification>
      ))}
    </Group>
  );
}
