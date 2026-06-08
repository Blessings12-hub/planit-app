import { useState } from 'react';

export default function ParticipantForm({ onSubmit }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, phone });
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: '2rem auto' }}>
      <h2>Welcome to PlanIt!</h2>
      <div style={{ marginBottom: '1rem' }}>
        <label>Enter your name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem' }}
        />
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <label>Enter your phone number:</label>
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
          style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem' }}
        />
      </div>
      <button type="submit" style={{ backgroundColor: '#4F46E5', color: 'white', padding: '0.75rem 2rem', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
        Continue
      </button>
    </form>
  );
}