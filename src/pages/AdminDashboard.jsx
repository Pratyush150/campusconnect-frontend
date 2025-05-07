// src/pages/AdminDashboard.jsx
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function AdminDashboard() {
  const [reportedContent, setReportedContent] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [contentRes, usersRes] = await Promise.all([
          axios.get('/api/admin/reported-content'),
          axios.get('/api/admin/users')
        ]);
        setReportedContent(contentRes.data);
        setUsers(usersRes.data);
      } catch (err) {
        console.error('Admin fetch error:', err);
      }
    };
    fetchData();
  }, []);

  const handleContentAction = async (contentId, action) => {
    await axios.post('/api/admin/moderate', { contentId, action });
    setReportedContent(prev => prev.filter(item => item.id !== contentId));
  };

  const handleUserAction = async (userId, action) => {
    await axios.post('/api/admin/users', { userId, action });
    setUsers(prev => prev.filter(user => user.id !== userId));
  };

  return (
    <div className="admin-dashboard">
      <section className="reported-content">
        <h2>Reported Content ({reportedContent.length})</h2>
        {reportedContent.map(item => (
          <div key={item.id} className="content-item">
            <p>{item.type}: {item.reason}</p>
            <div className="actions">
              <button onClick={() => handleContentAction(item.id, 'delete')}>
                Delete
              </button>
              <button onClick={() => handleContentAction(item.id, 'ignore')}>
                Ignore
              </button>
            </div>
          </div>
        ))}
      </section>

      <section className="user-management">
        <h2>User Management</h2>
        {users.map(user => (
          <div key={user.id} className="user-card">
            <p>{user.name} ({user.email})</p>
            <div className="actions">
              <button onClick={() => handleUserAction(user.id, 'suspend')}>
                Suspend
              </button>
              <button onClick={() => handleUserAction(user.id, 'promote')}>
                Promote to Admin
              </button>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}

