import React, { useState, useEffect } from 'react';
import { 
  Container, Card, Textarea, Button, Group, Loader, Stack, 
  SegmentedControl, Avatar, Text 
} from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useAuth } from '../context/AuthContext';
import PostCard from '../components/PostCard';

const API_URL = import.meta.env.VITE_API_URL;

export default function Feed() {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [posting, setPosting] = useState(false);
  const [filter, setFilter] = useState('all');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchPosts = async (pageNum = 1, filterVal = filter) => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/posts?page=${pageNum}&filter=${filterVal}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      
      if (pageNum === 1) {
        setPosts(res.data.posts);
      } else {
        setPosts(prev => [...prev, ...res.data.posts]);
      }
      setHasMore(res.data.hasMore);
      setPage(pageNum);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts(1, filter);
  }, [filter]);

  const loadMorePosts = () => {
    if (hasMore && !loading) {
      fetchPosts(page + 1, filter);
    }
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;
    setPosting(true);
    try {
      const res = await axios.post(
        `${API_URL}/posts`,
        { content, images: [] },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      setPosts([res.data.post, ...posts]);
      setContent('');
      showNotification({ message: 'Post created successfully' });
    } catch (err) {
      showNotification({ color: 'red', message: 'Failed to create post' });
    }
    setPosting(false);
  };

  const handleLike = (postId, isLiked) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, isLiked, likesCount: isLiked ? post.likesCount + 1 : post.likesCount - 1 }
        : post
    ));
  };

  return (
    <Container size="md" py="xl">
      <SegmentedControl
        value={filter}
        onChange={setFilter}
        data={[
          { label: 'All Posts', value: 'all' },
          { label: 'Following', value: 'following' },
        ]}
        mb="xl"
      />

      <Card withBorder shadow="sm" mb="xl">
        <form onSubmit={handlePostSubmit}>
          <Group align="start" noWrap>
            <Avatar src={user?.profilePic} radius="xl">
              {user?.name?.[0]}
            </Avatar>
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
            <Button type="submit" loading={posting}>
              Post
            </Button>
          </Group>
        </form>
      </Card>

      <InfiniteScroll
        dataLength={posts.length}
        next={loadMorePosts}
        hasMore={hasMore}
        loader={<Loader />}
        endMessage={
          <Text align="center" color="dimmed" mt="md">
            No more posts to show
          </Text>
        }
      >
        <Stack>
          {posts.map(post => (
            <PostCard 
              key={post.id} 
              post={post}
              onLike={handleLike}
            />
          ))}
        </Stack>
      </InfiniteScroll>
    </Container>
  );
}

