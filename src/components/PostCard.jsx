import React, { useState, useRef } from 'react';
import { 
  Card, 
  Text, 
  Group, 
  Avatar, 
  Textarea, 
  Button, 
  ActionIcon, 
  Stack, 
  Image,
  FileInput,
  Divider
} from '@mantine/core';
import { IconHeart, IconMessageCircle, IconPhoto } from '@tabler/icons-react';
import axios from 'axios';
import ShareButton from './ShareButton';

const API_URL = import.meta.env.VITE_API_URL;

export default function PostCard({ post, onLike, onComment, onImageUpload }) {
  const [localPost, setLocalPost] = useState(post);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef();

  const handleLike = async () => {
    try {
      const res = await axios.post(
        `${API_URL}/posts/${post.id}/like`,
        {},
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      setLocalPost(prev => ({
        ...prev,
        isLiked: res.data.isLiked,
        likesCount: res.data.isLiked ? prev.likesCount + 1 : prev.likesCount - 1
      }));
      onLike?.(post.id, res.data.isLiked);
    } catch (err) {
      console.error('Like error:', err);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;
    setLoading(true);
    try {
      const res = await axios.post(
        `${API_URL}/posts/${post.id}/comments`,
        { content: comment },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      setLocalPost(prev => ({
        ...prev,
        comments: [...prev.comments, res.data.comment]
      }));
      setComment('');
      onComment?.(post.id, res.data.comment);
    } catch (err) {
      console.error('Comment error:', err);
    }
    setLoading(false);
  };

  const handleImageUpload = async (file) => {
    const formData = new FormData();
    formData.append('image', file);
    try {
      const res = await axios.post(
        `${API_URL}/posts/${post.id}/images`,
        formData,
        {
          headers: { 
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      setLocalPost(prev => ({
        ...prev,
        images: [...prev.images, res.data.post.images.slice(-1)[0]]
      }));
      onImageUpload?.(post.id, res.data.post);
    } catch (err) {
      console.error('Upload failed:', err);
    }
  };

  return (
    <Card withBorder shadow="sm" radius="md" mb="md">
      <Group align="start" noWrap>
        <Avatar src={localPost.author.profilePic} radius="xl">
          {localPost.author.name?.[0]}
        </Avatar>
        <Stack spacing={4} style={{ flex: 1 }}>
          <Group position="apart">
            <Text weight={600}>{localPost.author.name}</Text>
            <Text size="sm" color="dimmed">
              {new Date(localPost.createdAt).toLocaleDateString()}
            </Text>
          </Group>
          
          <Text size="sm">{localPost.content}</Text>

          {localPost.images?.length > 0 && (
            <Group spacing="sm" mt="md">
              {localPost.images.map((img, index) => (
                <Image 
                  key={index} 
                  src={img} 
                  alt="Post image" 
                  radius="md"
                  style={{ maxWidth: 300 }}
                />
              ))}
            </Group>
          )}

          <Group mt="sm" spacing="xl">
            <ActionIcon onClick={handleLike}>
              <IconHeart 
                size={18} 
                fill={localPost.isLiked ? 'red' : 'none'} 
                color={localPost.isLiked ? 'red' : undefined} 
              />
              <Text ml={4}>{localPost.likesCount}</Text>
            </ActionIcon>
            <ActionIcon>
              <IconMessageCircle size={18} />
              <Text ml={4}>{localPost.comments.length}</Text>
            </ActionIcon>
            <ShareButton postId={post.id} />
          </Group>

          <Divider my="xs" />

          <FileInput
            accept="image/*"
            onChange={handleImageUpload}
            ref={fileInputRef}
            style={{ display: 'none' }}
          />
          <Group position="right">
            <ActionIcon 
              onClick={() => fileInputRef.current.click()}
              title="Add image"
            >
              <IconPhoto size={18} />
            </ActionIcon>
          </Group>

          <form onSubmit={handleCommentSubmit}>
            <Group>
              <Textarea
                placeholder="Write a comment..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                autosize
                minRows={1}
                style={{ flex: 1 }}
              />
              <Button type="submit" loading={loading}>
                Comment
              </Button>
            </Group>
          </form>

          {localPost.comments.map(comment => (
            <Text key={comment.id} size="sm" mt="xs">
              <strong>{comment.author.name}:</strong> {comment.content}
            </Text>
          ))}
        </Stack>
      </Group>
    </Card>
  );
}


