// src/pages/Clubs.jsx
import { useEffect, useState } from 'react';
import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL;

export default function Clubs() {
  const [clubs, setClubs] = useState([]);
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');

  useEffect(() => {
    axios.get(`${API_URL}/clubs`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    }).then(res => setClubs(res.data));
  }, []);

  // Create a club
  const handleCreate = async (e) => {
    e.preventDefault();
    await axios.post(`${API_URL}/clubs`, { name, description: desc }, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    setName('');
    setDesc('');
    // Refetch clubs
    const res = await axios.get(`${API_URL}/clubs`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    setClubs(res.data);
  };

  return (
    <div>
      <h2>Clubs</h2>
      <form onSubmit={handleCreate}>
        <input value={name} onChange={e => setName(e.target.value)} placeholder="Club Name" required />
        <input value={desc} onChange={e => setDesc(e.target.value)} placeholder="Description" required />
        <button type="submit">Create Club</button>
      </form>
      <ul>
        {clubs.map(club => (
          <li key={club.id}>{club.name}: {club.description}</li>
        ))}
      </ul>
    </div>
  );
}