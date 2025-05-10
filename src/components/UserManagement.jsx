// src/components/UserManagement.jsx
import React from 'react';
import { useState, useEffect } from 'react';
import { Table, Button, Select } from '@mantine/core';
import axios from 'axios';

const roles = ['USER', 'MENTOR', 'ADMIN'];

export default function UserManagement() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('/api/admin/users')
      .then(res => setUsers(res.data));
  }, []);

  const updateRole = async (userId, newRole) => {
    await axios.patch(`/api/admin/users/${userId}`, { role: newRole });
    setUsers(users.map(u => u.id === userId ? {...u, role: newRole} : u));
  };

  return (
    <Table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map(user => (
          <tr key={user.id}>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>
              <Select
                data={roles}
                value={user.role}
                onChange={(value) => updateRole(user.id, value)}
              />
            </td>
            <td>
              <Button color="red" compact>Suspend</Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
