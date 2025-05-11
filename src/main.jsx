import '@mantine/core/styles.css';
import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { MantineProvider, ColorSchemeProvider } from '@mantine/core';

function Main() {
  const [colorScheme, setColorScheme] = useState('light');

  const toggleColorScheme = (value) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{ colorScheme }}
      >
        <App />
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>
);

