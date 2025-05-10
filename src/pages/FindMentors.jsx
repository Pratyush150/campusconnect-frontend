import React from 'react';
// ...rest of your imports and code
import { Grid, Card, Avatar, Text, Badge, Group } from '@mantine/core';
import { useQuery } from 'react-query';

const fetchMentors = async () => {
  const res = await axios.get('/api/mentor/list');
  return res.data;
};

export default function FindMentors() {
  const { data: mentors, isLoading } = useQuery('mentors', fetchMentors);

  return (
    <Grid>
      {mentors?.map(mentor => (
        <Grid.Col key={mentor.id} span={4}>
          <Card shadow="sm" p="lg">
            <Group>
              <Avatar src={mentor.profilePic} radius="xl" />
              <div>
                <Text weight={700}>{mentor.name}</Text>
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
  );
}
