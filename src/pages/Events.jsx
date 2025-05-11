import React, { useEffect, useState } from 'react';
import { Container, Card, Grid, Text, Title, Badge, Group } from '@mantine/core';
import { IconCalendar } from '@tabler/icons-react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export default function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${API_URL}/events`, { headers })
      .then(res => {
        setEvents(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <Container size="lg" py="xl">
      <Title order={2} mb="xl">Upcoming Events</Title>
      <Grid>
        {events.map(event => (
          <Grid.Col key={event.id} span={4}>
            <Card shadow="sm" p="lg">
              <Group mb="md">
                <IconCalendar size={24} />
                <Text weight={600}>{event.title}</Text>
              </Group>
              <Text size="sm" color="dimmed">{event.description}</Text>
              <Badge color="blue" mt="md">
                {new Date(event.date).toLocaleDateString()}
              </Badge>
            </Card>
          </Grid.Col>
        ))}
      </Grid>
    </Container>
  );
}
