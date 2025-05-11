import React from 'react';
import { Container, Title, Text, Button, Center } from '@mantine/core';
import { IconCircleCheck } from '@tabler/icons-react';
import { Link } from 'react-router-dom';

export default function PaymentSuccess() {
  return (
    <Container size="sm">
      <Center style={{ height: '100vh', flexDirection: 'column' }}>
        <IconCircleCheck size={80} color="#40c057" />
        <Title order={1} mt="xl">Payment Successful!</Title>
        <Text size="lg" mt="sm" color="dimmed" align="center">
          Your mentorship session has been booked successfully.
        </Text>
        <Button component={Link} to="/bookings" size="lg" mt="xl">
          View Bookings
        </Button>
      </Center>
    </Container>
  );
}




