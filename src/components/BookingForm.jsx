import React, { useState } from 'react';
import { Card, Text, Button, LoadingOverlay } from '@mantine/core';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import { showNotification } from '@mantine/notifications';

const API_URL = import.meta.env.VITE_API_URL;
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);

export function BookingForm({ mentor, studentId, bookingData }) {
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    try {
      setLoading(true);
      
      // Create booking record first
      const { data } = await axios.post(
        `${API_URL}/bookings`,
        {
          ...bookingData,
          studentId,
          mentorId: mentor.id,
          status: 'pending_payment'
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );

      // Process payment
      const stripe = await stripePromise;
      const { error } = await stripe.redirectToCheckout({
        sessionId: data.stripeSessionId
      });

      if (error) {
        showNotification({
          color: 'red',
          title: 'Payment Failed',
          message: error.message
        });
      }
    } catch (err) {
      showNotification({
        color: 'red',
        title: 'Error',
        message: 'Failed to initiate booking'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card withBorder p="lg" radius="md">
      <LoadingOverlay visible={loading} />
      <Text size="xl" weight={500} mb="sm">
        ${mentor.hourlyRate}/hour
      </Text>
      <Button 
        fullWidth 
        onClick={handlePayment}
        disabled={!mentor.stripePriceId}
      >
        {mentor.stripePriceId ? 'Book Session' : 'Booking Unavailable'}
      </Button>
    </Card>
  );
}
