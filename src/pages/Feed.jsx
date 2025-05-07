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

// src/components/PostCard.jsx
import { useState } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export default function PostCard({ post }) {
  const [comments, setComments] = useState(post.comments || []);
  const [comment, setComment] = useState('');

  // Handle adding a comment
  const handleComment = async (e) => {
    e.preventDefault();
    const res = await axios.post(`${API_URL}/posts/${post.id}/comments`, { content: comment }, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    setComments([...comments, res.data.comment]);
    setComment('');
  };

  return (
    <div className="post-card">
      <p>{post.content}</p>
      <div>
        <form onSubmit={handleComment}>
          <input value={comment} onChange={e => setComment(e.target.value)} placeholder="Comment..." required />
          <button type="submit">Add</button>
        </form>
        <ul>
          {comments.map(c => <li key={c.id}>{c.content}</li>)}
        </ul>
      </div>
    </div>
  );
}
