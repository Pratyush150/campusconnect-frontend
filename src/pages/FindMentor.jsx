import React, { useState, useEffect } from 'react';
import { Card, TextInput, Select, Group, Avatar, Button, Badge, Container, Grid, LoadingOverlay } from '@mantine/core';
import axios from 'axios';
import { showNotification } from '@mantine/notifications';

export default function FindMentor() {
  const [mentors, setMentors] = useState([]);
  const [search, setSearch] = useState('');
  const [expertise, setExpertise] = useState('');
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/api/mentor/list')
      .then(res => {
        setMentors(res.data);
        setLoading(false);
      })
      .catch(() => {
        showNotification({ color: 'red', message: 'Failed to fetch mentors' });
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    setFiltered(
      mentors.filter(m =>
        (m.name.toLowerCase().includes(search.toLowerCase()) || 
        m.expertise?.toLowerCase().includes(search.toLowerCase())) &&
        (expertise ? m.expertise === expertise : true)
      )
    );
  }, [search, expertise, mentors]);

  return (
    <Container size="lg" py="xl">
      <LoadingOverlay visible={loading} />
      <Group mb="xl" spacing="md">
        <TextInput
          placeholder="Search mentor..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ flex: 1 }}
        />
        <Select
          placeholder="Filter by expertise"
          data={[...new Set(mentors.map(m => m.expertise))]}
          value={expertise}
          onChange={setExpertise}
          clearable
          style={{ width: 250 }}
        />
      </Group>

      <Grid gutter="xl">
        {filtered.length === 0 && !loading && (
          <Grid.Col span={12}>
            <Text align="center" color="dimmed">No mentors match your search</Text>
          </Grid.Col>
        )}
        {filtered.map(m => (
          <Grid.Col key={m.id} span={4}>
            <Card shadow="sm" p="lg" radius="md">
              <Group>
                <Avatar src={m.profilePic} radius="xl" size="lg" />
                <div>
                  <Text weight={600}>{m.name}</Text>
                  <Text size="sm" color="dimmed">{m.expertise}</Text>
                </div>
              </Group>
              <Group mt="md" spacing="xs">
                <Badge color={m.isVerified ? 'blue' : 'gray'}>
                  {m.isVerified ? 'Verified' : 'Unverified'}
                </Badge>
                <Text>${m.hourlyRate}/hour</Text>
              </Group>
              <Button fullWidth mt="md" variant="light">
                Book Session
              </Button>
            </Card>
          </Grid.Col>
        ))}
      </Grid>
    </Container>
  );
}
