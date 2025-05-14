import React, { useEffect, useState } from 'react';
import { Table, Button, Text, Container, LoadingOverlay, Title } from '@mantine/core';
import axios from 'axios';
import { showNotification } from '@mantine/notifications';

const API_URL = import.meta.env.VITE_API_URL;

export default function AdminDashboard() {
  const [pendingMentors, setPendingMentors] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPendingMentors = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/admin/pending-mentors`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setPendingMentors(data);
    } catch (error) {
      showNotification({
        color: 'red',
        title: 'Error',
        message: 'Failed to load pending mentors'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (mentorId) => {
    try {
      await axios.put(
        `${API_URL}/admin/approve-mentor/${mentorId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      setPendingMentors(pendingMentors.filter(m => m.id !== mentorId));
      showNotification({
        color: 'green',
        title: 'Success',
        message: 'Mentor approved successfully'
      });
    } catch (error) {
      showNotification({
        color: 'red',
        title: 'Error',
        message: 'Failed to approve mentor'
      });
    }
  };

  useEffect(() => {
    fetchPendingMentors();
  }, []);

  return (
    <Container size="xl">
      <Title order={2} mb="xl">Admin Dashboard - Mentor Approvals</Title>
      <LoadingOverlay visible={loading} />
      
      <Table striped highlightOnHover>
        <thead>
          <tr>
            <th>Mentor Name</th>
            <th>Expertise</th>
            <th>Hourly Rate</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {pendingMentors.map(mentor => (
            <tr key={mentor.id}>
              <td>{mentor.name}</td>
              <td>{mentor.expertise}</td>
              <td>${mentor.hourlyRate}</td>
              <td>
                <Button
                  color="green"
                  size="xs"
                  onClick={() => handleApprove(mentor.id)}
                >
                  Approve
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {!loading && pendingMentors.length === 0 && (
        <Text color="dimmed" mt="xl" align="center">
          No pending mentor approvals
        </Text>
      )}
    </Container>
  );
}

