import React, { useEffect, useState } from 'react';
import { Table, Text, Badge, LoadingOverlay } from '@mantine/core';
import axios from 'axios';
import { showNotification } from '@mantine/notifications';

const API_URL = import.meta.env.VITE_API_URL;

export default function BookingsList() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/bookings`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setBookings(data);
      } catch (error) {
        showNotification({
          color: 'red',
          title: 'Error',
          message: 'Failed to load bookings'
        });
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  const statusColors = {
    pending_payment: 'yellow',
    confirmed: 'green',
    completed: 'blue',
    cancelled: 'red'
  };

  return (
    <>
      <LoadingOverlay visible={loading} />
      <Table striped fontSize="md">
        <thead>
          <tr>
            <th>Mentor</th>
            <th>Date</th>
            <th>Time</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map(booking => (
            <tr key={booking.id}>
              <td>{booking.mentor.name}</td>
              <td>{new Date(booking.date).toLocaleDateString()}</td>
              <td>{booking.timeSlot}</td>
              <td>
                <Badge color={statusColors[booking.status]}>
                  {booking.status.replace('_', ' ')}
                </Badge>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {!loading && bookings.length === 0 && (
        <Text color="dimmed" mt="md" align="center">
          No bookings found
        </Text>
      )}
    </>
  );
}
