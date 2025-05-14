import React, { useState, useEffect } from 'react';
import {
  Card,
  Avatar,
  Text,
  Button,
  TextInput,
  Select,
  JsonInput,
  Group,
  Grid,
  LoadingOverlay,
  Alert,
  FileInput,
  SegmentedControl
} from '@mantine/core';
import { IconCloudUpload, IconCheck, IconAlertCircle, IconBrandLinkedin } from '@tabler/icons-react';
import axios from 'axios';
import { showNotification } from '@mantine/notifications';

const LinkedInVerification = ({ user }) => (
  <Group position="center" my="md">
    {user?.linkedinVerified ? (
      <Button 
        leftIcon={<IconBrandLinkedin size={16} />}
        variant="light"
        component="a"
        href={user.linkedinUrl}
        target="_blank"
      >
        Verified LinkedIn Profile
      </Button>
    ) : (
      <Button 
        leftIcon={<IconBrandLinkedin />}
        onClick={() => window.location.href = '/api/auth/linkedin'}
        variant="outline"
      >
        Connect LinkedIn
      </Button>
    )}
  </Group>
);

export default function ProfileEditor({ user, onSave }) {
  const [editedUser, setEditedUser] = useState({ ...user });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [avatarFile, setAvatarFile] = useState(null);
  const [activeTab, setActiveTab] = useState('basic');

  useEffect(() => setEditedUser({ ...user }), [user]);

  const handleAvatarUpload = async (file) => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);

      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/upload`,
        formData
      );
      
      const updatedUser = { ...editedUser, profilePic: res.data.secure_url };
      setEditedUser(updatedUser);
      setAvatarFile(null);
      showNotification({
        title: 'Success!',
        message: 'Avatar updated successfully',
        icon: <IconCheck />,
        color: 'teal'
      });
    } catch (err) {
      setError('Avatar upload failed - maximum size 2MB');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.put('/api/users/me', editedUser, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      onSave(res.data.user);
      showNotification({
        title: 'Success!',
        message: 'Profile updated successfully',
        icon: <IconCheck />,
        color: 'teal'
      });
    } catch (err) {
      setError(err.response?.data?.message || 'Profile update failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card padding="xl" shadow="sm" radius="md">
      <LoadingOverlay visible={loading} />
      
      <SegmentedControl
        value={activeTab}
        onChange={setActiveTab}
        data={[
          { label: 'Basic Info', value: 'basic' },
          { label: 'Professional Info', value: 'professional' },
        ]}
        fullWidth
        mb="xl"
      />

      <form onSubmit={handleSubmit}>
        <Grid gutter="xl">
          <Grid.Col span={12} style={{ textAlign: 'center' }}>
            <Avatar 
              src={editedUser.profilePic} 
              size={120} 
              radius={60} 
              mx="auto"
            />
            <FileInput
              label="Change Avatar"
              accept="image/*"
              onChange={setAvatarFile}
              value={avatarFile}
              icon={<IconCloudUpload size={14} />}
              mt="md"
              style={{ maxWidth: 200, margin: '0 auto' }}
              disabled={loading}
            />
            {avatarFile && (
              <Button 
                onClick={() => handleAvatarUpload(avatarFile)}
                mt="sm"
                compact
                variant="light"
                loading={loading}
              >
                Upload New Avatar
              </Button>
            )}
          </Grid.Col>

          {activeTab === 'basic' && (
            <>
              <Grid.Col md={6}>
                <TextInput
                  label="Full Name"
                  value={editedUser.name || ''}
                  onChange={e => setEditedUser({...editedUser, name: e.target.value})}
                  required
                />
              </Grid.Col>

              <Grid.Col md={6}>
                <TextInput
                  label="Email"
                  value={editedUser.email || ''}
                  disabled
                />
              </Grid.Col>

              <Grid.Col md={6}>
                <TextInput
                  label="College/University"
                  value={editedUser.college || ''}
                  onChange={e => setEditedUser({...editedUser, college: e.target.value})}
                />
              </Grid.Col>

              <Grid.Col md={6}>
                <Select
                  label="Current Semester"
                  value={editedUser.semester?.toString() || ''}
                  onChange={value => setEditedUser({...editedUser, semester: parseInt(value)})}
                  data={Array.from({length: 8}, (_, i) => ({ value: (i+1).toString(), label: `Semester ${i+1}` }))}
                />
              </Grid.Col>
            </>
          )}

          {activeTab === 'professional' && (
            <>
              {user.role === 'MENTOR' && <LinkedInVerification user={editedUser} />}

              <Grid.Col md={6}>
                <TextInput
                  label="Hourly Rate ($)"
                  type="number"
                  value={editedUser.hourlyRate || 0}
                  onChange={e => setEditedUser({
                    ...editedUser, 
                    hourlyRate: parseFloat(e.target.value)
                  })}
                />
              </Grid.Col>

              <Grid.Col md={6}>
                <Select
                  label="Expertise Area"
                  value={editedUser.expertise || ''}
                  onChange={value => setEditedUser({...editedUser, expertise: value})}
                  data={['Computer Science', 'Business', 'Engineering', 'Design']}
                />
              </Grid.Col>

              <Grid.Col span={12}>
                <JsonInput
                  label="Availability Schedule"
                  value={JSON.stringify(editedUser.availability || {}, null, 2)}
                  onChange={value => setEditedUser({
                    ...editedUser, 
                    availability: JSON.parse(value)
                  })}
                  minRows={4}
                  formatOnBlur
                  validationError="Invalid JSON format"
                />
              </Grid.Col>
            </>
          )}

          {error && (
            <Grid.Col span={12}>
              <Alert 
                icon={<IconAlertCircle size={16} />} 
                title="Error" 
                color="red"
                withCloseButton
                onClose={() => setError(null)}
              >
                {error}
              </Alert>
            </Grid.Col>
          )}

          <Grid.Col span={12}>
            <Button 
              fullWidth 
              size="md" 
              type="submit"
              loading={loading}
              disabled={loading}
            >
              Save Changes
            </Button>
          </Grid.Col>
        </Grid>
      </form>
    </Card>
  );
}

