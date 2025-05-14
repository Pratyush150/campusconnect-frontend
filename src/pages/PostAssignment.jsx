import React, { useState } from 'react';
import { TextInput, Textarea, Button, Group, DatePicker, FileInput, NumberInput, Container } from '@mantine/core';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export default function PostAssignment() {
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState(null);
  const [budget, setBudget] = useState('');
  const [attachment, setAttachment] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    let attachmentUrl = '';
    if (attachment) {
      const formData = new FormData();
      formData.append('file', attachment);
      // Upload to your backend or cloud storage, get URL
      // For now, skip or mock
    }
    await axios.post(`${API_URL}/assignments`, {
      subject, description, deadline, budget, attachment: attachmentUrl
    }, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    setLoading(false);
    // Optionally, redirect or show success
  };

  return (
    <Container size="sm" py="xl">
      <form onSubmit={handleSubmit}>
        <TextInput label="Subject" value={subject} onChange={e => setSubject(e.target.value)} required />
        <Textarea label="Description" value={description} onChange={e => setDescription(e.target.value)} required />
        <DatePicker label="Deadline" value={deadline} onChange={setDeadline} required />
        <NumberInput label="Budget (optional)" value={budget} onChange={setBudget} min={0} />
        <FileInput label="Attachment (optional)" value={attachment} onChange={setAttachment} />
        <Group position="right" mt="md">
          <Button type="submit" loading={loading}>Submit Request</Button>
        </Group>
      </form>
    </Container>
  );
}
