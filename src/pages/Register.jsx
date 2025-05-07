import { useState } from 'react';
import { authService } from '../api/auth';

export default function Register() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'STUDENT',
    college: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Handle input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      await authService.register(form);
      setSuccess('Registration successful! Check your email to verify your account.');
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed');
    }
  };

  return (
    <div>
      <h2>Register</h2>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
      <form onSubmit={handleSubmit}>
        <input name="name" value={form.name} onChange={handleChange} placeholder="Name" required />
        <input name="email" value={form.email} onChange={handleChange} placeholder="Email" required />
        <input name="password" type="password" value={form.password} onChange={handleChange} placeholder="Password" required />
        <select name="role" value={form.role} onChange={handleChange}>
          <option value="STUDENT">Student</option>
          <option value="MENTOR">Mentor</option>
        </select>
        <input name="college" value={form.college} onChange={handleChange} placeholder="College" />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
