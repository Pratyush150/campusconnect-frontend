// src/pages/AdminDashboard.jsx
import React from 'react';
// ...rest of your imports and code
import { Table, Button, Group, Text, Badge, Title, Divider } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export default function AdminDashboard() {
  const [resources, setResources] = useState([]);
  const [pendingMentors, setPendingMentors] = useState([]);

  // Fetch resources for moderation
  useEffect(() => {
    axios.get(`${API_URL}/admin/resources`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    }).then(res => setResources(res.data));
  }, []);

  // Fetch pending mentor verifications
  useEffect(() => {
    axios.get(`${API_URL}/admin/pending-verifications`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    }).then(res => setPendingMentors(res.data));
  }, []);

  // Approve resource
  const handleApprove = async (id) => {
    await axios.post(`${API_URL}/admin/resources/${id}/approve`, {}, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    setResources(resources.map(r => r.id === id ? { ...r, status: 'approved' } : r));
    showNotification({ color: 'green', message: 'Resource approved' });
  };

  // Delete resource
  const handleDelete = async (id) => {
    await axios.delete(`${API_URL}/admin/resources/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    setResources(resources.filter(r => r.id !== id));
    showNotification({ color: 'red', message: 'Resource deleted' });
  };

  // Approve mentor
  const approveMentor = async (mentorId) => {
    await axios.post(`${API_URL}/admin/verify-mentor/${mentorId}`, {}, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    setPendingMentors(pendingMentors.filter(m => m._id !== mentorId));
    showNotification({ color: 'green', message: 'Mentor approved' });
  };

  return (
    <div style={{ maxWidth: 900, margin: "auto", padding: 24 }}>
      <Title order={2} mb="md">Mentor Verification Queue</Title>
      <Table mb="xl">
        <thead>
          <tr>
            <th>Name</th>
            <th>Expertise</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {pendingMentors.map(mentor => (
            <tr key={mentor._id}>
              <td>{mentor.name}</td>
              <td>{mentor.expertise}</td>
              <td>
                <Button color="green" size="xs" onClick={() => approveMentor(mentor._id)}>
                  Approve
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Divider my="lg" />

      <Title order={2} mb="md">Resource Moderation</Title>
      <Table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Uploader</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {resources.map(r => (
            <tr key={r.id}>
              <td>{r.title}</td>
              <td>{r.uploader?.name}</td>
              <td>
                <Badge color={r.status === 'approved' ? 'green' : 'yellow'}>
                  {r.status}
                </Badge>
              </td>
              <td>
                <Group>
                  <Button color="green" size="xs" onClick={() => handleApprove(r.id)}>Approve</Button>
                  <Button color="red" size="xs" onClick={() => handleDelete(r.id)}>Delete</Button>
                </Group>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
