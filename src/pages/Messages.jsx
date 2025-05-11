import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Title, Button, Group, Stack, ScrollArea, Text, LoadingOverlay } from '@mantine/core';
import MessageThread from '../components/MessageThread';
import { showNotification } from '@mantine/notifications';

const API_URL = import.meta.env.VITE_API_URL;

export default function Messages() {
  const [threads, setThreads] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${API_URL}/messages`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
    .then(res => {
      setThreads(res.data.threads);
      setLoading(false);
    })
    .catch(() => {
      showNotification({ color: 'red', message: 'Failed to load messages' });
      setLoading(false);
    });
  }, []);

  return (
    <Container size="lg" py="xl">
      <Title order={2} mb="lg">Messages</Title>
      <LoadingOverlay visible={loading} />
      
      <Group align="start" spacing="xl">
        <ScrollArea style={{ width: 300, height: '70vh' }}>
          <Stack spacing="xs">
            {threads.map(thread => (
              <Button
                key={thread.user.id}
                variant={selectedUser?.id === thread.user.id ? 'filled' : 'light'}
                onClick={() => setSelectedUser(thread.user)}
                fullWidth
                style={{ textAlign: 'left' }}
              >
                <Group>
                  <Avatar src={thread.user.profilePic} radius="xl" size="sm" />
                  {thread.user.name}
                </Group>
              </Button>
            ))}
          </Stack>
        </ScrollArea>

        <div style={{ flex: 1 }}>
          {selectedUser ? (
            <MessageThread user={selectedUser} />
          ) : (
            <Text color="dimmed" mt="xl" style={{ textAlign: 'center' }}>
              Select a conversation to start chatting
            </Text>
          )}
        </div>
      </Group>
    </Container>
  );
}

