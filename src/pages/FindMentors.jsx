import React, { useState } from 'react';
import { Grid, Card, Avatar, Text, Badge, Group, Button, Container, TextInput, Select, LoadingOverlay } from '@mantine/core';
import { useQuery } from 'react-query';
import axios from 'axios';
import { showNotification } from '@mantine/notifications';

const API_URL = import.meta.env.VITE_API_URL;

const fetchMentors = async () => {
  try {
    const { data } = await axios.get(`${API_URL}/mentors`);
    return data;
  } catch (error) {
    showNotification({
      color: 'red',
      title: 'Error',
      message: 'Failed to fetch mentors'
    });
    return [];
  }
};

export default function FindMentors() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedExpertise, setSelectedExpertise] = useState('');
  const { data: mentors = [], isLoading } = useQuery('mentors', fetchMentors);

  const filteredMentors = mentors.filter(mentor => {
    const matchesSearch = mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mentor.expertise.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesExpertise = selectedExpertise ? mentor.expertise === selectedExpertise : true;
    return matchesSearch && matchesExpertise;
  });

  const expertiseOptions = Array.from(
    new Set(mentors.map(mentor => mentor.expertise))
  ).sort();

  return (
    <Container size="lg" py="xl">
      <Group mb="xl" spacing="md">
        <TextInput
          placeholder="Search mentors..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ flex: 1 }}
        />
        <Select
          placeholder="Filter by expertise"
          data={expertiseOptions}
          value={selectedExpertise}
          onChange={setSelectedExpertise}
          clearable
          style={{ width: 250 }}
        />
      </Group>

      <LoadingOverlay visible={isLoading} />
      <Grid gutter="xl">
        {filteredMentors.map(mentor => (
          <Grid.Col key={mentor.id} xs={12} sm={6} md={4}>
            <Card withBorder p="lg" radius="md">
              <Group>
                <Avatar src={mentor.profilePic} size="xl" radius="xl" />
                <div>
                  <Text weight={600} size="lg">{mentor.name}</Text>
                  <Text color="dimmed" size="sm">{mentor.expertise}</Text>
                </div>
              </Group>
              <Group mt="md" spacing="xs">
                <Badge color={mentor.isVerified ? 'blue' : 'gray'}>
                  {mentor.isVerified ? 'Verified' : 'Pending Verification'}
                </Badge>
                <Text weight={500}>${mentor.hourlyRate}/hour</Text>
              </Group>
              <Button 
                fullWidth 
                mt="md" 
                variant="light"
                component="a" 
                href={`/mentors/${mentor.id}`}
              >
                View Profile
              </Button>
            </Card>
          </Grid.Col>
        ))}
      </Grid>
      
      {!isLoading && filteredMentors.length === 0 && (
        <Text color="dimmed" mt="xl" align="center">
          No mentors found matching your criteria
        </Text>
      )}
    </Container>
  );
}
