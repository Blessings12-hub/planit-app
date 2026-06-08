import { useState } from 'react';

export default function VotingSection({ availableDates, availableLocations, onVote }) {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedDate || !selectedLocation) return;
    onVote({ selectedDate, selectedLocation });
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: '2rem auto' }}>
      <h2>Voting</h2>

      <div style={{ marginBottom: '1rem' }}>
        <label>Choose a date:</label>
        <select
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          required
          style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem' }}
        >
          <option value="">Select date</option>
          {availableDates.map((date, index) => (
            <option key={index} value={date}>{date}</option>
          ))}
        </select>
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label>Choose a location:</label>
        <select
          value={selectedLocation}
          onChange={(e) => setSelectedLocation(e.target.value)}
          required
          style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem' }}
        >
          <option value="">Select location</option>
          {availableLocations.map((location, index) => (
            <option key={index} value={location}>{location}</option>
          ))}
        </select>
      </div>

      <button type="submit" style={{ backgroundColor: '#10B981', color: 'white', padding: '0.75rem 2rem', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
        Submit Vote
      </button>
    </form>
  );
}