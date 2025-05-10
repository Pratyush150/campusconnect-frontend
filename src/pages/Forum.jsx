// src/pages/Forum.jsx
import React from 'react';
// ...rest of your imports and code
import { useState, useEffect } from 'react';
import { Card, Textarea, Button, Group, Text } from '@mantine/core';
import axios from 'axios';

export default function Forum() {
  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState('');

  useEffect(() => {
    axios.get('/api/forum/posts').then(res => setPosts(res.data));
  }, []);

  const handleSubmit = async () => {
    const res = await axios.post('/api/forum/posts', { content });
    setPosts([res.data, ...posts]);
    setContent('');
  };

  return (
    <div>
      <Card>
        <Textarea value={content} onChange={e => setContent(e.target.value)} placeholder="Ask a question or share..." />
        <Button onClick={handleSubmit} mt="sm">Post</Button>
      </Card>
      {posts.map(p => (
        <Card key={p.id} mt="md">
          <Text>{p.content}</Text>
          <Text size="xs" color="dimmed">{p.authorName} • {new Date(p.createdAt).toLocaleString()}</Text>
        </Card>
      ))}
    </div>
  );
}
