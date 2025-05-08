// src/pages/Clubs.jsx
import { Card, Button, Group, Text, Timeline } from '@mantine/core';
import { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export default function Clubs() {
  const [clubs, setClubs] = useState([]);

  useEffect(() => {
    axios.get(`${API_URL}/clubs`).then(res => setClubs(res.data));
  }, []);

  return (
    <div>
      <Text size="xl" weight={700}>Clubs</Text>
      <Group>
        {clubs.map(club => (
          <Card key={club.id} shadow="sm" p="lg" withBorder>
            <Text weight={500}>{club.name}</Text>
            <Text size="sm" color="dimmed">{club.description}</Text>
            <Button mt="md" variant="light">Join</Button>
            <Timeline active={0} bulletSize={24} lineWidth={2} mt="md">
              {club.events.map(ev => (
                <Timeline.Item key={ev.id} title={ev.title} bullet={<span>📅</span>}>
                  <Text color="dimmed" size="sm">{ev.date}</Text>
                  <Text size="xs">{ev.description}</Text>
                </Timeline.Item>
              ))}
            </Timeline>
          </Card>
        ))}
      </Group>
    </div>
  );
}
