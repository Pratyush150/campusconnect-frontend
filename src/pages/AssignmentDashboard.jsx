import React, { useEffect, useState } from 'react';
import { Table, Button, Badge, Group, Text, Container, Alert, Anchor } from '@mantine/core';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export default function AssignmentDashboard() {
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    axios.get(`${API_URL}/assignments/my`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    }).then(res => setAssignments(res.data.assignments));
  }, []);

  return (
    <Container py="xl">
      <Text size="xl" weight={700} mb="md">My Assignment Requests</Text>
      <Table>
        <thead>
          <tr>
            <th>Subject</th>
            <th>Status</th>
            <th>Quote</th>
            <th>Deadline</th>
            <th>Attachment</th>
            <th>Completed File</th>
          </tr>
        </thead>
        <tbody>
          {assignments.map(a => (
            <tr key={a.id}>
              <td>{a.subject}</td>
              <td><Badge>{a.status}</Badge></td>
              <td>{a.quote ? `₹${a.quote}` : '-'}</td>
              <td>{new Date(a.deadline).toLocaleDateString()}</td>
              <td>
                {a.attachment && (
                  <a href={a.attachment} target="_blank" rel="noopener noreferrer">
                    View
                  </a>
                )}
              </td>
              <td>
                {a.completedFile && (
                  <a href={a.completedFile} target="_blank" rel="noopener noreferrer">
                    Download
                  </a>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Alert color="blue" mt="xl" title="Need help?">
        Contact our support team at{' '}
        <Anchor href="mailto:support@yourdomain.com">support@yourdomain.com</Anchor>
        {' '}or WhatsApp us at{' '}
        <Anchor href="https://wa.me/6205385586" target="_blank" rel="noopener noreferrer">
          6205385586
        </Anchor>
      </Alert>
    </Container>
  );
}
