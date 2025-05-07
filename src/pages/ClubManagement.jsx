// src/pages/ClubManagement.jsx
import { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

export default function ClubManagement() {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({
    title: '',
    start: new Date(),
    end: new Date(),
    club: ''
  });

  const handleCreateEvent = async () => {
    const response = await axios.post('/api/events', newEvent);
    setEvents([...events, response.data]);
    setNewEvent({ title: '', start: new Date(), end: new Date(), club: '' });
  };

  return (
    <div className="club-management">
      <div className="event-creation">
        <h2>Create New Event</h2>
        <input
          placeholder="Event Title"
          value={newEvent.title}
          onChange={e => setNewEvent({...newEvent, title: e.target.value})}
        />
        <input
          type="datetime-local"
          onChange={e => setNewEvent({...newEvent, start: new Date(e.target.value)})}
        />
        <button onClick={handleCreateEvent}>Create Event</button>
      </div>

      <div className="calendar-view">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
        />
      </div>

      <div className="club-list">
        <h3>Your Clubs</h3>
        {/* Fetch and display clubs here */}
      </div>
    </div>
  );
}
