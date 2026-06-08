import { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { db, auth } from '../firebase';

export default function CreateEvent() {
  const navigate = useNavigate();
  const [eventName, setEventName] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [dates, setDates] = useState(['', '', '']);
  const [locations, setLocations] = useState(['', '', '']);
  const [deadline, setDeadline] = useState('');

  const handleDateChange = (index, value) => {
    const newDates = [...dates];
    newDates[index] = value;
    setDates(newDates);
  };

  const handleLocationChange = (index, value) => {
    const newLocations = [...locations];
    newLocations[index] = value;
    setLocations(newLocations);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const user = auth.currentUser;
      if (!user) {
        alert('You must be logged in as admin');
        return;
      }

      const eventData = {
        name: eventName,
        description: eventDescription,
        adminEmail: user.email,
        adminId: user.uid,
        dates: dates.filter(d => d.trim() !== ''),
        locations: locations.filter(l => l.trim() !== ''),
        deadline,
        createdAt: new Date(),
        active: true
      };

      const docRef = await addDoc(collection(db, 'events'), eventData);
      
      // Show the event link
      const eventLink = `${window.location.origin}/participant/${docRef.id}`;
      alert(`Event created! Share this link:\n${eventLink}`);
      
      navigate('/admin');
    } catch (error) {
      alert('Error creating event: ' + error.message);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '2rem auto', padding: '2rem' }}>
      <h2>Create New Event</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1rem' }}>
          <label>Event Name:</label>
          <input
            type="text"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            required
            style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem' }}
          />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label>Description:</label>
          <textarea
            value={eventDescription}
            onChange={(e) => setEventDescription(e.target.value)}
            style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem' }}
          />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label>Voting Dates (enter at least 2):</label>
          {dates.map((date, index) => (
            <input
              key={index}
              type="date"
              value={date}
              onChange={(e) => handleDateChange(index, e.target.value)}
              required
              style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem' }}
            />
          ))}
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label>Locations (enter at least 2):</label>
          {locations.map((location, index) => (
            <input
              key={index}
              type="text"
              value={location}
              onChange={(e) => handleLocationChange(index, e.target.value)}
              placeholder="Location name"
              required
              style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem' }}
            />
          ))}
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label>Voting Deadline:</label>
          <input
            type="datetime-local"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            required
            style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem' }}
          />
        </div>

        <button 
          type="submit" 
          style={{ backgroundColor: '#4F46E5', color: 'white', padding: '1rem 2rem', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '1rem', width: '100%' }}
        >
          Create Event
        </button>
      </form>
    </div>
  );
}