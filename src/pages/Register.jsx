import React, { useState } from 'react';
import { authService } from '../api/auth';
import {
  TextInput, PasswordInput, Select, Button, Paper, Title, Container, Text, Group
} from '@mantine/core';
import { toast } from 'react-toastify';

export default function Register() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'STUDENT',
    college: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (field) => (e) => {
    setForm({ ...form, [field]: e.target.value });
  };

  const handleRoleChange = (value) => setForm({ ...form, role: value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await authService.register(form);
      toast.success('Registration successful! Check your email to verify your account.');
      setForm({ name: '', email: '', password: '', role: 'STUDENT', college: '' });
    } catch (err) {
      toast.error(err.response?.data?.error || 'Registration failed');
    }
    setLoading(false);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <Container size={420}>
        <Paper
          withBorder
          shadow="xl"
          p={30}
          radius="lg"
          style={{
            background: 'rgba(255,255,255,0.92)',
            backdropFilter: 'blur(2px)'
          }}
        >
          <Title align="center" mb={8} color="blue" order={2}>
            Create your account
          </Title>
          <Text align="center" color="dimmed" size="sm" mb={20}>
            Join CampusConnect and unlock your dream journey!
          </Text>
          <form onSubmit={handleSubmit}>
            <TextInput label="Name" value={form.name} onChange={handleChange('name')} required mb="sm" />
            <TextInput label="Email" type="email" value={form.email} onChange={handleChange('email')} required mb="sm" />
            <PasswordInput label="Password" value={form.password} onChange={handleChange('password')} required mb="sm" />
            <Select
              label="Role"
              data={[
                { value: 'STUDENT', label: 'Student' },
                { value: 'MENTOR', label: 'Mentor' }
              ]}
              value={form.role}
              onChange={handleRoleChange}
              mb="sm"
              required
            />
            <TextInput label="College" value={form.college} onChange={handleChange('college')} mb="sm" />
            <Group mt="md" position="center">
              <Button type="submit" fullWidth loading={loading} size="md" color="blue" radius="md">
                Register
              </Button>
            </Group>
          </form>
        </Paper>
      </Container>
    </div>
  );
}


