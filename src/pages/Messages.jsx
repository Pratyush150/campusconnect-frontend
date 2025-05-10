// src/pages/Messages.jsx
import React from 'react';
// ...rest of your imports and code
import { useEffect, useState } from 'react';
import axios from 'axios';
import MessageThread from '../components/MessageThread';
const API_URL = import.meta.env.VITE_API_URL;

export default function Messages() {
  const [threads, setThreads] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    axios.get(`${API_URL}/messages`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    }).then(res => setThreads(res.data.threads));
  }, []);

  return (
    <div>
      <h2>Messages</h2>
      <div className="thread-list">
        {threads.map(thread => (
          <button key={thread.user.id} onClick={() => setSelectedUser(thread.user)}>
            {thread.user.name}
          </button>
        ))}
      </div>
      {selectedUser && <MessageThread user={selectedUser} />}
    </div>
  );
}

