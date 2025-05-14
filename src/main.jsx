import '@mantine/core/styles.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { MantineProvider, ColorSchemeScript } from '@mantine/core';
import NotificationProvider from './context/NotificationProvider';
import NotificationBell from './components/NotificationBell';
import SocketProvider from './context/SocketContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ColorSchemeScript defaultColorScheme="light" />
    <MantineProvider
      defaultColorScheme="light"
      withGlobalStyles
      withNormalizeCSS
    > 
      <SocketProvider>
        <NotificationProvider>
        <NotificationBell />
          <App />
        </NotificationProvider>
      </SocketProvider>
    </MantineProvider>
  </React.StrictMode>
);
