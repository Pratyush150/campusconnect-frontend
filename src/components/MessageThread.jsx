// src/components/MessageThread.jsx
import { useEffect, useState } from 'react';
import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL;

export default function MessageThread({ user }) {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');

  // Fetch messages with this user
  useEffect(() => {
    axios.get(`${API_URL}/messages/${user.id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    }).then(res => setMessages(res.data.messages));
  }, [user.id]);

  // Send a new message
  const handleSend = async (e) => {
    e.preventDefault();
    const res = await axios.post(`${API_URL}/messages`, {
      recipientId: user.id,
      content: text
    }, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    setMessages([...messages, res.data.message]);
    setText('');
  };

  return (
    <div>
      <h3>Chat with {user.name}</h3>
      <div className="message-list">
        {messages.map(msg => (
          <div key={msg.id}>{msg.content}</div>
        ))}
      </div>
      <form onSubmit={handleSend}>
        <input value={text} onChange={e => setText(e.target.value)} placeholder="Type a message..." required />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}
