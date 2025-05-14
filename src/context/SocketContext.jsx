// src/context/SocketContext.jsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';

// Create and export the context
export const SocketContext = createContext(null);

// Export the hook properly
export const useSocket = () => {
  return useContext(SocketContext);
};

// Socket provider component
const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socketInstance = io(import.meta.env.VITE_SOCKET_URL, {
      transports: ['websocket'],
      auth: {
        token: localStorage.getItem('token'),
      },
    });
    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider; // Default export
