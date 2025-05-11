import React from 'react';
import { Container, Title, Text, Button, Center } from '@mantine/core';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <Container size="sm">
      <Center style={{ height: '100vh', flexDirection: 'column' }}>
        <Title order={1} style={{ fontSize: '6rem' }}>404</Title>
        <Text size="xl" mt="md" color="dimmed">Page not found</Text>
        <Button component={Link} to="/" size="lg" mt="xl">
          Return Home
        </Button>
      </Center>
    </Container>
  );
}
