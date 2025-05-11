import React, { useState } from 'react';
import { authService } from '../api/auth';
import { TextInput, PasswordInput, Select, Button, Paper, Title, Container, Text } from '@mantine/core';
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
    <Container size={420} my={40}>
      <Title align="center" mb={20}>Register</Title>
      <Paper withBorder shadow="md" p={30} radius="md">
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
          />
          <TextInput label="College" value={form.college} onChange={handleChange('college')} mb="sm" />
          <Button type="submit" fullWidth loading={loading} mt="md">Register</Button>
        </form>
      </Paper>
    </Container>
  );
}

