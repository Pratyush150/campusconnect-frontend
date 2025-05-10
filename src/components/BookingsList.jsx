// src/components/BookingsList.jsx
import React from 'react';
import { useEffect, useState } from 'react';
import { Table, Text } from '@mantine/core';
import axios from 'axios';

export default function BookingsList() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    axios.get('/api/bookings')
      .then(res => setBookings(res.data))
      .catch(() => showNotification({ color: 'red', message: 'Failed to load bookings' }));
  }, []);

  return (
    <Table striped>
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
              <Badge color={booking.status === 'confirmed' ? 'green' : 'yellow'}>
                {booking.status}
              </Badge>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
