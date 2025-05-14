import React, { useEffect, useState } from 'react';
import { Table, Button, Badge, Group, Text, TextInput, NumberInput, Select, Container } from '@mantine/core';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export default function AdminAssignmentDashboard() {
  const [assignments, setAssignments] = useState([]);
  const [editRow, setEditRow] = useState(null);
  const [edit, setEdit] = useState({});

  useEffect(() => {
    axios.get(`${API_URL}/assignments/all`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    }).then(res => setAssignments(res.data.assignments));
  }, []);

  const handleEdit = (assignment) => {
    setEditRow(assignment.id);
    setEdit({
      status: assignment.status,
      quote: assignment.quote,
      adminNote: assignment.adminNote || ''
    });
  };

  const handleSave = async (id) => {
    await axios.put(`${API_URL}/assignments/${id}`, edit, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    setEditRow(null);
    // Refresh assignments
    const res = await axios.get(`${API_URL}/assignments/all`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    setAssignments(res.data.assignments);
  };

  return (
    <Container py="xl">
      <Text size="xl" weight={700} mb="md">All Assignment Requests</Text>
      <Table>
        <thead>
          <tr>
            <th>Student</th>
            <th>Subject</th>
            <th>Status</th>
            <th>Quote</th>
            <th>Deadline</th>
            <th>Attachment</th>
            <th>Completed File</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {assignments.map(a => (
            <tr key={a.id}>
              <td>{a.student.name} ({a.student.email})</td>
              <td>{a.subject}</td>
              <td>
                {editRow === a.id ? (
                  <Select
                    data={[
                      'pending', 'quoted', 'awaiting_payment', 'paid', 'in_progress', 'completed', 'revision', 'closed'
                    ]}
                    value={edit.status}
                    onChange={status => setEdit(e => ({ ...e, status }))}
                  />
                ) : (
                  <Badge>{a.status}</Badge>
                )}
              </td>
              <td>
                {editRow === a.id ? (
                  <NumberInput value={edit.quote} onChange={val => setEdit(e => ({ ...e, quote: val }))} />
                ) : (
                  a.quote ? `₹${a.quote}` : '-'
                )}
              </td>
              <td>{new Date(a.deadline).toLocaleDateString()}</td>
              <td>{a.attachment && <a href={a.attachment} target="_blank" rel="noopener noreferrer">View</a>}</td>
              <td>{a.completedFile && <a href={a.completedFile} target="_blank" rel="noopener noreferrer">Download</a>}</td>
              <td>
                {editRow === a.id ? (
                  <Button size="xs" onClick={() => handleSave(a.id)}>Save</Button>
                ) : (
                  <Button size="xs" onClick={() => handleEdit(a)}>Edit</Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}
