// src/pages/Events.jsx
import { useEffect, useState } from 'react';
import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL;

export default function Events() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios.get(`${API_URL}/events`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    }).then(res => setEvents(res.data));
  }, []);

  return (
    <div>
      <h2>Events</h2>
      <ul>
        {events.map(event => (
          <li key={event.id}>
            {event.title} - {event.date} <br />
            {event.description}
          </li>
        ))}
      </ul>
    </div>
  );
}