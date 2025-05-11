import React from 'react';
import { Container, Title, Text, Button, Center } from '@mantine/core';
import { IconCircleX } from '@tabler/icons-react';
import { Link } from 'react-router-dom';

export default function PaymentCancel() {
  return (
    <Container size="sm">
      <Center style={{ height: '100vh', flexDirection: 'column' }}>
        <IconCircleX size={80} color="#fa5252" />
        <Title order={1} mt="xl">Payment Cancelled</Title>
        <Text size="lg" mt="sm" color="dimmed" align="center">
          Your booking was not completed.
        </Text>
        <Button component={Link} to="/mentors" size="lg" mt="xl">
          Try Again
        </Button>
      </Center>
    </Container>
  );
}
