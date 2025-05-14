import React, { useState } from 'react';
import { Modal, Text, Group, Button, Calendar, Badge } from '@mantine/core';
import { IconClock } from '@tabler/icons-react';

export default function BookingModal({ mentor, opened, onClose }) {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);

  const getTimeSlots = () => {
    if (!mentor.availability?.timeSlots) return [];
    return mentor.availability.timeSlots[selectedDate?.getDay()] || [];
  };

  return (
    <Modal 
      opened={opened} 
      onClose={onClose} 
      title={`Book ${mentor.name}`}
      size="lg"
    >
      <Text weight={600} mb="md">Hourly Rate: ${mentor.hourlyRate}</Text>
      
      <Calendar
        value={selectedDate}
        onChange={setSelectedDate}
        excludeDate={(date) => 
          !mentor.availability?.days?.includes(date.getDay())
        }
        renderDay={(date) => {
          const day = date.getDay();
          return mentor.availability?.days?.includes(day) ? 
            date.getDate() : 
            <Text color="red" strikethrough>{date.getDate()}</Text>;
        }}
      />

      {selectedDate && (
        <Group mt="md" direction="column">
          <Text weight={500}>
            <IconClock size={16} /> Available Slots
          </Text>
          <Group spacing="xs">
            {getTimeSlots().map(slot => (
              <Badge 
                key={slot}
                variant={selectedSlot === slot ? 'filled' : 'outline'}
                onClick={() => setSelectedSlot(slot)}
                sx={{ cursor: 'pointer' }}
              >
                {slot}
              </Badge>
            ))}
          </Group>
        </Group>
      )}

      <Group position="apart" mt="xl">
        <Text weight={500}>
          Total: ${mentor.hourlyRate} (1 hour session)
        </Text>
        <Button 
          color="green" 
          disabled={!selectedDate || !selectedSlot}
          onClick={onClose}
        >
          Confirm Booking
        </Button>
      </Group>
    </Modal>
  );
}

