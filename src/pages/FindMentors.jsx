import React from 'react';
import { Grid, Card, Avatar, Text, Badge, Group, Button, LoadingOverlay, Container } from '@mantine/core';
import { useQuery } from 'react-query';
import axios from 'axios';
import { showNotification } from '@mantine/notifications';

const fetchMentors = async () => {
  try {
    const res = await axios.get('/api/mentor/list');
    return res.data;
  } catch (error) {
    showNotification({ color: 'red', message: 'Failed to fetch mentors' });
    return [];
  }
};

export default function FindMentors() {
  const { data: mentors = [], isLoading } = useQuery('mentors', fetchMentors);

  return (
    <Container size="lg" py="xl">
      <LoadingOverlay visible={isLoading} />
      <Grid gutter="xl">
        {mentors.length === 0 && !isLoading && (
          <Grid.Col span={12}>
            <Text align="center" color="dimmed">No mentors found</Text>
          </Grid.Col>
        )}
        {mentors.map(mentor => (
          <Grid.Col key={mentor.id} span={4}>
            <Card shadow="sm" p="lg" radius="md">
              <Group>
                <Avatar src={mentor.profilePic} radius="xl" size="lg" />
                <div>
                  <Text weight={600}>{mentor.name}</Text>
                  <Text size="sm" color="dimmed">{mentor.expertise}</Text>
                </div>
              </Group>
              <Group mt="md" spacing="xs">
                <Badge color={mentor.isVerified ? 'blue' : 'gray'}>
                  {mentor.isVerified ? 'Verified' : 'Unverified'}
                </Badge>
                <Text>${mentor.hourlyRate}/hour</Text>
              </Group>
              <Button fullWidth mt="md" variant="light">
                View Availability
              </Button>
            </Card>
          </Grid.Col>
        ))}
      </Grid>
    </Container>
  );
}
