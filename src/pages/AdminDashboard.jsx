import React, { useEffect, useState } from 'react';
import { Table, Button, Group, Text, Badge, Title, Divider, Container, LoadingOverlay } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export default function AdminDashboard() {
  const [resources, setResources] = useState([]);
  const [pendingMentors, setPendingMentors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      axios.get(`${API_URL}/admin/resources`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      }),
      axios.get(`${API_URL}/admin/pending-verifications`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })
    ]).then(([resRes, mentRes]) => {
      setResources(resRes.data);
      setPendingMentors(mentRes.data);
      setLoading(false);
    }).catch(() => {
      showNotification({ color: 'red', message: 'Failed to load data' });
      setLoading(false);
    });
  }, []);

  const handleResourceAction = async (id, action) => {
    try {
      if (action === 'approve') {
        await axios.post(`${API_URL}/admin/resources/${id}/approve`, {}, { headers });
        showNotification({ color: 'green', message: 'Resource approved' });
      } else {
        await axios.delete(`${API_URL}/admin/resources/${id}`, { headers });
        showNotification({ color: 'red', message: 'Resource deleted' });
      }
      setResources(resources.filter(r => r.id !== id));
    } catch {
      showNotification({ color: 'red', message: 'Action failed' });
    }
  };

  const approveMentor = async (mentorId) => {
    try {
      await axios.post(`${API_URL}/admin/verify-mentor/${mentorId}`, {}, { headers });
      setPendingMentors(pendingMentors.filter(m => m._id !== mentorId));
      showNotification({ color: 'green', message: 'Mentor approved' });
    } catch {
      showNotification({ color: 'red', message: 'Approval failed' });
    }
  };

  return (
    <Container size="xl" py="xl">
      <LoadingOverlay visible={loading} />
      <Title order={2} mb="xl">Admin Dashboard</Title>

      <Title order={3} mb="md">Mentor Verification Queue</Title>
      <Table striped highlightOnHover>
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
                <Button compact variant="light" color="green" onClick={() => approveMentor(mentor._id)}>
                  Approve
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Divider my="xl" />

      <Title order={3} mb="md">Resource Moderation</Title>
      <Table striped highlightOnHover>
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
                <Group spacing="xs">
                  <Button compact variant="light" color="green" onClick={() => handleResourceAction(r.id, 'approve')}>
                    Approve
                  </Button>
                  <Button compact variant="light" color="red" onClick={() => handleResourceAction(r.id, 'delete')}>
                    Delete
                  </Button>
                </Group>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}
