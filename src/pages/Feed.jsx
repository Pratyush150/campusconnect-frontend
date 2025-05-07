// This is a placeholder for the student feed.
// You can expand it to fetch and display posts from the backend.
// src/pages/Feed.jsx
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import PostCard from '../components/PostCard';

const API_URL = import.meta.env.VITE_API_URL;

export default function Feed() {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState('');

  // Fetch posts on mount
  useEffect(() => {
    axios.get(`${API_URL}/posts`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    }).then(res => setPosts(res.data.posts));
  }, []);

  // Handle post creation
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post(`${API_URL}/posts`, { content }, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    setPosts([res.data.post, ...posts]);
    setContent('');
  };

  return (
    <div>
      <h2>Student Feed</h2>
      <form onSubmit={handleSubmit}>
        <textarea value={content} onChange={e => setContent(e.target.value)} placeholder="What's on your mind?" required />
        <button type="submit">Post</button>
      </form>
      <div>
        {posts.map(post => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}

