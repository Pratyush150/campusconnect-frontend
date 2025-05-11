import React, { useState, useEffect } from 'react';
import {
  Container, Card, Textarea, Button, Group, Text, Avatar,
  Stack, ActionIcon, Divider, Title, Loader
} from '@mantine/core';
import { IconMessageCircle, IconThumbUp, IconShare } from '@tabler/icons-react';
import axios from 'axios';
import { showNotification } from '@mantine/notifications';

export default function Forum() {
  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios.get('/api/forum/posts')
      .then(res => setPosts(res.data))
      .catch(() => showNotification({ color: 'red', message: 'Failed to fetch posts' }))
      .finally(() => setLoading(false));
  }, []);

  const handleSubmit = async () => {
    if (!content.trim()) {
      showNotification({ color: 'red', message: 'Post cannot be empty' });
      return;
    }
    try {
      setLoading(true);
      const res = await axios.post('/api/forum/posts', { content });
      setPosts([res.data, ...posts]);
      setContent('');
      showNotification({ color: 'green', message: 'Posted!' });
    } catch {
      showNotification({ color: 'red', message: 'Failed to post' });
    }
    setLoading(false);
  };

  return (
    <Container size="md" py="xl">
      <Title order={2} mb="xl">Discussion Forum</Title>

      {/* New Post */}
      <Card withBorder shadow="sm" mb="xl">
        <Stack>
          <Textarea
            placeholder="Start a discussion..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            autosize
            minRows={3}
          />
          <Group position="right">
            <Button onClick={handleSubmit} loading={loading}>Post Question</Button>
          </Group>
        </Stack>
      </Card>

      {/* Posts List */}
      <Stack>
        {loading ? (
          <Loader />
        ) : posts.length === 0 ? (
          <Text align="center" color="dimmed">No posts yet. Be the first to start a discussion!</Text>
        ) : (
          posts.map((post) => (
            <Card key={post.id} withBorder shadow="sm" mb="md">
              <Group align="start" noWrap>
                <Avatar src={post.author?.profilePic} radius="xl" />
                <Stack spacing={4} style={{ flex: 1 }}>
                  <Group position="apart">
                    <Text weight={600}>{post.authorName}</Text>
                    <Text size="sm" color="dimmed">
                      {new Date(post.createdAt).toLocaleDateString()}
                    </Text>
                  </Group>
                  <Text>{post.content}</Text>
                  <Divider my="sm" />
                  <Group>
                    <ActionIcon>
                      <IconThumbUp size={18} />
                      <Text ml={4}>{post.likesCount || 0}</Text>
                    </ActionIcon>
                    <ActionIcon>
                      <IconMessageCircle size={18} />
                      <Text ml={4}>{post.commentsCount || 0}</Text>
                    </ActionIcon>
                    <ActionIcon>
                      <IconShare size={18} />
                    </ActionIcon>
                  </Group>
                </Stack>
              </Group>
            </Card>
          ))
        )}
      </Stack>
    </Container>
  );
}

