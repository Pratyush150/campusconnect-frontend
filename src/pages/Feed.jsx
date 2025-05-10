import React from 'react';
// ...rest of your imports and code
import { Card, Textarea, Button, Group, Loader, Text, Avatar, Divider } from '@mantine/core';
import { useState, useEffect } from 'react';
import { showNotification } from '@mantine/notifications';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const API_URL = import.meta.env.VITE_API_URL;

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
    <div style={{ maxWidth: 600, margin: 'auto' }}>
      <Card shadow="sm" p="lg" mb="lg" withBorder>
        <form onSubmit={handleSubmit}>
          <Textarea
            placeholder="What's on your mind?"
            value={content}
            onChange={e => setContent(e.target.value)}
            autosize
            minRows={2}
            mb="sm"
          />
          <Group position="right">
            <Button type="submit">Post</Button>
          </Group>
        </form>
      </Card>
      {loading ? (
        <Loader />
      ) : (
        posts.map(post => <PostCard key={post.id} post={post} />)
      )}
    </div>
  );
}
