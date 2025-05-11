import React, { useEffect, useState } from 'react';
import { Container, Card, Grid, Text, Title, Button, Timeline } from '@mantine/core';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export default function Clubs() {
  const [clubs, setClubs] = useState([]);

  useEffect(() => {
    axios.get(`${API_URL}/clubs`)
      .then(res => setClubs(res.data));
  }, []);

  return (
    <Container size="lg" py="xl">
      <Title order={2} mb="xl">Student Clubs</Title>
      <Grid>
        {clubs.map(club => (
          <Grid.Col key={club.id} span={4}>
            <Card shadow="sm" p="lg">
              <Title order={4} mb="sm">{club.name}</Title>
              <Text size="sm" color="dimmed" mb="md">{club.description}</Text>
              
              <Timeline active={club.events.length} bulletSize={24} lineWidth={2}>
                {club.events.map(event => (
                  <Timeline.Item key={event.id} title={event.title}>
                    <Text size="sm" color="dimmed">{event.date}</Text>
                    <Text size="xs">{event.description}</Text>
                  </Timeline.Item>
                ))}
              </Timeline>
              
              <Button fullWidth mt="md" variant="light">Join Club</Button>
            </Card>
          </Grid.Col>
        ))}
      </Grid>
    </Container>
  );
}

