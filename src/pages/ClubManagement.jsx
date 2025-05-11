import React, { useState } from 'react';
import { Container, Card, Grid, TextInput, Button, Title } from '@mantine/core';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

export default function ClubManagement() {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({
    title: '',
    start: new Date(),
    end: new Date(),
    club: ''
  });

  const handleCreateEvent = async () => {
    try {
      const res = await axios.post('/api/events', newEvent);
      setEvents([...events, res.data]);
      setNewEvent({ title: '', start: new Date(), end: new Date(), club: '' });
      showNotification({ color: 'green', message: 'Event created' });
    } catch {
      showNotification({ color: 'red', message: 'Creation failed' });
    }
  };

  return (
    <Container size="lg" py="xl">
      <Title order={2} mb="xl">Club Management</Title>
      
      <Grid>
        <Grid.Col span={4}>
          <Card shadow="sm" p="lg">
            <Title order={4} mb="md">Create New Event</Title>
            <TextInput
              label="Event Title"
              value={newEvent.title}
              onChange={e => setNewEvent({...newEvent, title: e.target.value})}
              mb="md"
            />
            <input
              type="datetime-local"
              onChange={e => setNewEvent({...newEvent, start: new Date(e.target.value)})}
              style={{ width: '100%', marginBottom: '1rem' }}
            />
            <Button fullWidth onClick={handleCreateEvent}>
              Create Event
            </Button>
          </Card>
        </Grid.Col>

        <Grid.Col span={8}>
          <Card shadow="sm" p="lg">
            <Calendar
              localizer={localizer}
              events={events}
              startAccessor="start"
              endAccessor="end"
              style={{ height: 500 }}
            />
          </Card>
        </Grid.Col>
      </Grid>
    </Container>
  );
}
