import React, { createContext, useContext, useState, useEffect } from 'react';
import { notifications as mantineNotifications } from '@mantine/notifications';
import { useSocket } from './SocketContext';

const NotificationContext = createContext();

export function useNotifications() {
  return useContext(NotificationContext);
}

export default function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([]);
  const socket = useSocket();

  // Add notification to list + show toast
  const addNotification = (notification) => {
    setNotifications(prev => [
      { ...notification, id: Date.now() },
      ...prev.slice(0, 49) // Keep last 50
    ]);
    mantineNotifications.show({
      title: notification.type,
      message: notification.message,
      color: 'blue'
    });
  };

  // Remove notification
  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  // Socket.io listeners
  useEffect(() => {
    if (!socket) return;

    socket.on('newNotification', addNotification);
    return () => socket.off('newNotification');
  }, [socket]);

  return (
    <NotificationContext.Provider value={{ notifications, removeNotification }}>
      {children}
    </NotificationContext.Provider>
  );
}
