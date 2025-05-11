import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Group, Button, Container, Text, ActionIcon, useMantineColorScheme } from '@mantine/core';
import { IconSun, IconMoon } from '@tabler/icons-react';

function DarkModeToggle() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';

  return (
    <ActionIcon
      variant="outline"
      color={dark ? 'yellow' : 'blue'}
      onClick={toggleColorScheme}
      title="Toggle color scheme"
      size="lg"
    >
      {dark ? <IconSun size={20} /> : <IconMoon size={20} />}
    </ActionIcon>
  );
}

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav style={{
      background: 'var(--mantine-color-body)',
      borderBottom: '1px solid #eee',
      padding: '0.5rem 0',
      boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
    }}>
      <Container size="lg">
        <Group position="apart">
          <Group>
            <Text weight={700} size="lg" color="blue">CampusConnect</Text>
            {user && (
              <>
                <Button component={Link} to="/" variant="subtle">Feed</Button>
                <Button component={Link} to="/resources" variant="subtle">Resources</Button>
              </>
            )}
          </Group>
          <Group>
            <DarkModeToggle />
            {user ? (
              <>
                <Text>Welcome, <b>{user.name}</b>!</Text>
                <Button color="red" variant="outline" onClick={logout}>Logout</Button>
              </>
            ) : (
              <>
                <Button component={Link} to="/login" variant="light">Login</Button>
                <Button component={Link} to="/register" variant="filled">Register</Button>
              </>
            )}
          </Group>
        </Group>
      </Container>
    </nav>
  );
}

