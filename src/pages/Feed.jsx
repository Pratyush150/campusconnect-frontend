
import React from 'react';
import { Card, Textarea, Button, Group, Loader, Text, Avatar, Divider, Stack, ActionIcon } from '@mantine/core';
import { useState, useEffect } from 'react';
import { showNotification } from '@mantine/notifications';
import { IconHeart, IconMessageCircle, IconShare } from '@tabler/icons-react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const API_URL = import.meta.env.VITE_API_URL;

const PostCard = ({ post }) => (
  <Card withBorder shadow="sm" radius="md" mb="md">
    <Group align="start" noWrap>
      <Avatar src={post.author?.profilePic} radius="xl" />
      <Stack spacing={4} style={{ flex: 1 }}>
        <Group position="apart">
          <Text weight={600}>{post.author?.name}</Text>
          <Text size="sm" color="dimmed">
            {new Date(post.createdAt).toLocaleDateString()}
          </Text>
        </Group>
        <Text size="sm">{post.content}</Text>
        <Group mt="sm" spacing="xl">
          <ActionIcon>
            <IconHeart size={18} />
            <Text ml={4}>{post.likesCount}</Text>
          </ActionIcon>
          <ActionIcon>
            <IconMessageCircle size={18} />
            <Text ml={4}>{post.commentsCount}</Text>
          </ActionIcon>
          <ActionIcon>
            <IconShare size={18} />
          </ActionIcon>
        </Group>
      </Stack>
    </Group>
  </Card>
);

export default function Feed() {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios.get(`${API_URL}/posts`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
      .then(res => setPosts(res.data.posts))
      .finally(() => setLoading(false));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) {
      showNotification({ color: 'red', message: 'Post cannot be empty' });
      return;
    }
    const res = await axios.post(`${API_URL}/posts`, { content }, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    setPosts([res.data.post, ...posts]);
    setContent('');
    showNotification({ color: 'green', message: 'Posted!' });
  };

  return (
    <Container size="md" py="xl">
      <Card withBorder shadow="sm" mb="xl">
        <Group align="start" noWrap>
          <Avatar src={user?.profilePic} radius="xl" />
          <Textarea
            placeholder="Share your thoughts..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            autosize
            minRows={2}
            style={{ flex: 1 }}
          />
        </Group>
        <Group position="right" mt="md">
          <Button onClick={handleSubmit} loading={loading}>
            Post
          </Button>
        </Group>
      </Card>

      {loading ? (
        <Loader />
      ) : (
        <Stack>
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </Stack>
      )}
    </Container>
  );
}