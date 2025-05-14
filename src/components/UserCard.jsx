import React, { useState } from 'react';
import { Card, Text, Group, Avatar, Button } from '@mantine/core';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export default function UserCard({ user }) {
  const [isFollowing, setIsFollowing] = useState(user.isFollowing);

  const handleFollow = async () => {
    try {
      const res = await axios.post(
        `${API_URL}/users/${user.id}/follow`,
        {},
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      setIsFollowing(res.data.isFollowing);
    } catch (err) {
      console.error('Follow error:', err);
    }
  };

  return (
    <Card withBorder shadow="sm" p="md">
      <Group position="apart">
        <Group>
          <Avatar src={user.profilePic} radius="xl" />
          <div>
            <Text weight={500}>{user.name}</Text>
            <Text size="sm" color="dimmed">
              {user.followersCount} followers
            </Text>
          </div>
        </Group>
        <Button 
          variant={isFollowing ? 'outline' : 'filled'}
          onClick={handleFollow}
        >
          {isFollowing ? 'Following' : 'Follow'}
        </Button>
      </Group>
    </Card>
  );
}
