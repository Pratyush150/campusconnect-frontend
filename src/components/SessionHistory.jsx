// src/components/SessionHistory.jsx
import React from 'react';
// ...rest of your imports and code
import { useEffect, useState } from 'react';
import { Table, Badge } from '@mantine/core';
import axios from 'axios';

export default function SessionHistory({ userId }) {
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    axios.get(`/api/users/${userId}/sessions`).then(res => setSessions(res.data));
  }, [userId]);

  return (
    <Table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Mentor/Student</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {sessions.map(s => (
          <tr key={s.id}>
            <td>{new Date(s.date).toLocaleString()}</td>
            <td>{s.otherPartyName}</td>
            <td>
              <Badge color={s.status === 'completed' ? 'green' : 'yellow'}>
                {s.status}
              </Badge>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
