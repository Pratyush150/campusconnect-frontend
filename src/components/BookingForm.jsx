// src/components/BookingForm.jsx
import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Card, Text, Button } from '@mantine/core';
import { io } from 'socket.io-client';

// Use Vite env variable for client URL and Stripe key
const socket = io(import.meta.env.VITE_CLIENT_URL);
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);

export function BookingForm({ mentor, studentId, bookingData }) {
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);

    // Emit real-time booking event to mentor
    socket.emit('new_booking', mentor.id, {
      ...bookingData,
      studentId,
      mentorId: mentor.id,
    });

    // Stripe payment logic
    const stripe = await stripePromise;
    const { error } = await stripe.redirectToCheckout({
      lineItems: [{ price: mentor.stripePriceId, quantity: 1 }], // Use mentor's Stripe price ID
      mode: 'payment',
      successUrl: `${window.location.origin}/success`,
      cancelUrl: `${window.location.origin}/cancel`,
    });

    if (error) {
      // Handle error (optional: show toast or notification)
      setLoading(false);
    }
  };

  return (
    <Card>
      <Text size="xl">${mentor.hourlyRate}/hour</Text>
      <Button onClick={handlePayment} fullWidth loading={loading}>
        Book Session
      </Button>
    </Card>
  );
}
