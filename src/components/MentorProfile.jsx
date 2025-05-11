import React, { useState, useEffect } from 'react';
import { Card, Avatar, Text, Button, TextInput, Select, JsonInput, Group, Badge, Grid, LoadingOverlay } from '@mantine/core';
import { IconBrandLinkedin } from '@tabler/icons-react';
import axios from 'axios';
import { showNotification } from '@mantine/notifications';

const LinkedInVerification = ({ user }) => (
  <Group>
    {user?.linkedinVerified ? (
      <Badge 
        color="blue" 
        leftSection={<IconBrandLinkedin size={16} />}
        component="a"
        href={user.linkedinUrl}
        target="_blank"
      >
        Verified Profile
      </Badge>
    ) : (
      <Button 
        leftIcon={<IconBrandLinkedin />}
        onClick={() => window.location.href = '/api/auth/linkedin'}
        variant="outline"
      >
        Verify with LinkedIn
      </Button>
    )}
  </Group>
);

export default function MentorProfile({ user, onProfileUpdate }) {
  const [profile, setProfile] = useState(user);
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    try {
      setLoading(true);
      await axios.put('/api/mentor/profile', profile);
      onProfileUpdate(profile);
      showNotification({ color: 'green', message: 'Profile updated successfully' });
    } catch {
      showNotification({ color: 'red', message: 'Failed to update profile' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card padding="xl" shadow="sm" radius="md">
      <LoadingOverlay visible={loading} />
      <Grid>
        <Grid.Col span={12} style={{ textAlign: 'center' }}>
          <Avatar src={profile.profilePic} size={120} radius={60} mx="auto" />
          <LinkedInVerification user={profile} />
        </Grid.Col>

        <Grid.Col span={6}>
          <TextInput
            label="Hourly Rate ($)"
            type="number"
            value={profile.hourlyRate || 0}
            onChange={e => setProfile({...profile, hourlyRate: parseFloat(e.target.value)})}
            required
          />
        </Grid.Col>

        <Grid.Col span={6}>
          <Select
            label="Expertise Area"
            data={['Computer Science', 'Business', 'Engineering', 'Design']}
            value={profile.expertise}
            onChange={value => setProfile({...profile, expertise: value})}
            required
          />
        </Grid.Col>

        <Grid.Col span={12}>
          <JsonInput
            label="Availability"
            value={JSON.stringify(profile.availability || {}, null, 2)}
            onChange={value => setProfile({...profile, availability: JSON.parse(value)})}
            minRows={4}
            formatOnBlur
          />
        </Grid.Col>

        <Grid.Col span={12}>
          <Button fullWidth size="lg" mt="xl" onClick={handleSave}>
            Save Profile
          </Button>
        </Grid.Col>
      </Grid>
    </Card>
  );
}

