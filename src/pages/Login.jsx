import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { authService } from '../api/auth';
import { TextInput, PasswordInput, Button, Paper, Title, Container } from '@mantine/core';
import { toast } from 'react-toastify';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { token, user } = await authService.login({ email, password });
      login(user, token);
      toast.success('Login successful!');
    } catch (err) {
      toast.error('Invalid credentials');
    }
    setLoading(false);
  };

  return (
    <Container size={420} my={40}>
      <Title align="center" mb={20}>Login</Title>
      <Paper withBorder shadow="md" p={30} radius="md">
        <form onSubmit={handleSubmit}>
          <TextInput
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            mb="sm"
          />
          <PasswordInput
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            mb="sm"
          />
          <Button type="submit" fullWidth loading={loading} mt="md">Login</Button>
        </form>
      </Paper>
    </Container>
  );
}

