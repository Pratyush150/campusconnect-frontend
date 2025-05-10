// src/pages/FindMentor.jsx
import React from 'react';
// ...rest of your imports and code
import { useState, useEffect } from 'react';
import { Card, TextInput, Select, Group, Avatar, Button, Badge } from '@mantine/core';
import axios from 'axios';

export default function FindMentor() {
  const [mentors, setMentors] = useState([]);
  const [search, setSearch] = useState('');
  const [expertise, setExpertise] = useState('');
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    axios.get('/api/mentor/list').then(res => setMentors(res.data));
  }, []);

  useEffect(() => {
    setFiltered(
      mentors.filter(m =>
        (m.name.toLowerCase().includes(search.toLowerCase()) || m.expertise?.toLowerCase().includes(search.toLowerCase())) &&
        (expertise ? m.expertise === expertise : true)
      )
    );
  }, [search, expertise, mentors]);

  return (
    <div>
      <Group mb="md">
        <TextInput placeholder="Search mentor..." value={search} onChange={e => setSearch(e.target.value)} />
        <Select
          placeholder="Expertise"
          data={[...new Set(mentors.map(m => m.expertise))]}
          value={expertise}
          onChange={setExpertise}
        />
      </Group>
      <Group>
        {filtered.map(m => (
          <Card key={m.id} shadow="sm" p="lg" style={{ minWidth: 250 }}>
            <Group>
              <Avatar src={m.profilePic} radius="xl" />
              <div>
                <b>{m.name}</b>
                <div>{m.expertise}</div>
                <Badge color={m.isVerified ? 'blue' : 'gray'}>{m.isVerified ? 'Verified' : 'Unverified'}</Badge>
              </div>
            </Group>
            <Button mt="md" fullWidth>Book</Button>
          </Card>
        ))}
      </Group>
    </div>
  );
}
