// components/BookingModal.jsx
import React from 'react';
import { Modal, Text, Group, Button } from '@mantine/core';
import { Calendar } from '@mantine/dates';
import { useState } from 'react';

export default function BookingModal({ mentor, opened, onClose }) {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);

  const timeSlots = [
    '09:00 - 10:00', '10:30 - 11:30', '14:00 - 15:00', '15:30 - 16:30'
  ];

  return (
    <Modal opened={opened} onClose={onClose} title={`Book ${mentor.name}`}>
      <Text weight={600} mb="md">{mentor.hourlyRate} per hour</Text>
      <Calendar
        value={selectedDate}
        onChange={setSelectedDate}
        excludeDate={date => !mentor.availability?.days?.includes(date.getDay())}
      />
      {selectedDate && (
        <Group mt="md" direction="column">
          <Text weight={500}>Available Slots:</Text>
          {timeSlots.map(slot => (
            <Button
              key={slot}
              variant={selectedSlot === slot ? 'filled' : 'outline'}
              onClick={() => setSelectedSlot(slot)}
            >
              {slot}
            </Button>
          ))}
        </Group>
      )}
      <Group position="apart" mt="xl">
        <Text>Total: {mentor.hourlyRate * 1} (1 hour)</Text>
        <Button color="green" disabled={!selectedDate || !selectedSlot}>Confirm Booking</Button>
      </Group>
    </Modal>
  );
}
