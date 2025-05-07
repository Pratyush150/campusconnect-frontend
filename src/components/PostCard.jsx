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
