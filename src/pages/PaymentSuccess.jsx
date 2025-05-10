// src/pages/PaymentSuccess.jsx
import { Container, Title, Text, Button } from '@mantine/core';
import { IconCircleCheck } from '@tabler/icons-react';
import { Link } from 'react-router-dom';

export default function PaymentSuccess() {
  return (
    <Container size="sm" py="xl">
      <IconCircleCheck size={64} color="green" />
      <Title order={1} mt="md">Payment Successful!</Title>
      <Text mt="sm" size="lg">
        Your mentorship session has been booked. Check your email for confirmation.
      </Text>
      <Button component={Link} to="/bookings" mt="xl">
        View Bookings
      </Button>
    </Container>
  );
}




