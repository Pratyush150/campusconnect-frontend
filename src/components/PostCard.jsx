import React from 'react';
// ...rest of your imports and code
import { Card, Text, Group, Avatar, Textarea, Button } from '@mantine/core';
import { useState } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export default function PostCard({ post }) {
  const [comments, setComments] = useState(post.comments || []);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);

  const handleComment = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await axios.post(`${API_URL}/posts/${post.id}/comments`, { content: comment }, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    setComments([...comments, res.data.comment]);
    setComment('');
    setLoading(false);
  };

  return (
    <Card shadow="sm" p="md" mb="md" withBorder>
      <Group>
        <Avatar src={post.author?.profilePic} radius="xl">{post.author?.name?.[0]}</Avatar>
        <Text weight={500}>{post.author?.name || 'User'}</Text>
      </Group>
      <Text mt="sm">{post.content}</Text>
      <Divider my="sm" />
      <form onSubmit={handleComment}>
        <Group>
          <Textarea
            placeholder="Comment..."
            value={comment}
            onChange={e => setComment(e.target.value)}
            autosize
            minRows={1}
            style={{ flex: 1 }}
          />
          <Button type="submit" loading={loading}>Add</Button>
        </Group>
      </form>
      <div>
        {comments.map(c => (
          <Text key={c.id} size="sm" mt="xs">💬 {c.content}</Text>
        ))}
      </div>
    </Card>
  );
}