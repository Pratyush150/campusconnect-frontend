import { useState, useEffect } from 'react';
import { Card, Avatar, Text, Button, TextInput, Select, JsonInput, Group, Badge } from '@mantine/core';
import { IconBrandLinkedin } from '@tabler/icons-react';
import axios from 'axios';

const availabilityPresets = [
  { value: 'morning', label: 'Morning (9 AM - 12 PM)' },
  { value: 'afternoon', label: 'Afternoon (1 PM - 4 PM)' },
  { value: 'evening', label: 'Evening (6 PM - 9 PM)' }
];

// LinkedIn Verification Component
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

export default function MentorProfile() {
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/api/mentor/profile')
      .then(res => setProfile(res.data))
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    await axios.put('/api/mentor/profile', profile);
    // Show success toast
  };

  return (
    <Card padding="xl" shadow="sm">
      <Avatar src={profile.profilePic} size={120} radius={60} mx="auto" />
      
      {/* LinkedIn Verification Component */}
      <LinkedInVerification user={profile} />

      <TextInput
        label="Hourly Rate ($)"
        type="number"
        value={profile.hourlyRate || 0}
        onChange={e => setProfile({...profile, hourlyRate: parseFloat(e.target.value)})}
        mt="md"
      />

      <Select
        label="Expertise Area"
        data={['Computer Science', 'Business', 'Engineering', 'Design']}
        value={profile.expertise}
        onChange={value => setProfile({...profile, expertise: value})}
        mt="md"
      />

      <JsonInput
        label="Availability"
        value={JSON.stringify(profile.availability || {}, null, 2)}
        onChange={value => setProfile({...profile, availability: JSON.parse(value)})}
        mt="md"
        minRows={4}
      />

      <Button mt="xl" loading={loading} onClick={handleSave}>
        Save Profile
      </Button>
    </Card>
  );
}
