// src/pages/NotFound.jsx
import React from 'react';
// ...rest of your imports and code
import { Container, Title, Text, Button } from '@mantine/core';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <Container size="sm" py="xl" style={{ textAlign: 'center' }}>
      <Title order={1}>404</Title>
      <Text size="lg" mt="md">Page not found</Text>
      <Button component={Link} to="/" mt="xl">Go Home</Button>
    </Container>
  );
}
