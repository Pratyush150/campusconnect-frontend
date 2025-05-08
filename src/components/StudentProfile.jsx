import { Card, Avatar, Text, Button, Group, TextInput } from '@mantine/core';
import { useState } from 'react';

export default function StudentProfile({ user, onProfileUpdate }) {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ ...user });

  const handleSave = () => {
    onProfileUpdate(form);
    setEditing(false);
  };

  return (
    <Card shadow="sm" p="lg" radius="md" withBorder style={{ maxWidth: 400, margin: 'auto' }}>
      <Group position="center">
        <Avatar src={user.profilePic} size={100} radius="xl" />
      </Group>
      <Text align="center" size="xl" weight={700} mt="md">{user.name}</Text>
      <Text align="center" color="dimmed">{user.email}</Text>
      <Text align="center" color="dimmed" size="sm" mb="md">{user.college}</Text>
      {editing ? (
        <>
          <TextInput
            label="Name"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            mt="md"
          />
          <TextInput
            label="College"
            value={form.college}
            onChange={e => setForm({ ...form, college: e.target.value })}
            mt="md"
          />
          <TextInput
            label="Semester"
            value={form.semester}
            onChange={e => setForm({ ...form, semester: e.target.value })}
            mt="md"
          />
          <Group position="right" mt="md">
            <Button onClick={handleSave}>Save</Button>
            <Button variant="outline" onClick={() => setEditing(false)}>Cancel</Button>
          </Group>
        </>
      ) : (
        <Group position="right" mt="md">
          <Button onClick={() => setEditing(true)}>Edit Profile</Button>
        </Group>
      )}
    </Card>
  );
}
