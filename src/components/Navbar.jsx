import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Group, Button, Container, Text } from '@mantine/core';

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav style={{ background: '#fff', borderBottom: '1px solid #eee', padding: '0.5rem 0' }}>
      <Container size="lg">
        <Group position="apart">
          <Group>
            <Text weight={700} size="lg" color="blue">CampusConnect</Text>
            <Button component={Link} to="/" variant="subtle">Feed</Button>
            <Button component={Link} to="/resources" variant="subtle">Resources</Button>
          </Group>
          <Group>
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
