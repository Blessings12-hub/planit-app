import { useEffect, useState } from 'react';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { Link } from 'react-router-dom';
import { db, auth } from '../firebase';

export default function AdminDashboard({ user, onLogout }) {
  const [events, setEvents] = useState([]);
  const [votes, setVotes] = useState([]);

  useEffect(() => {
    if (!user) return;

    // Get events created by this admin
    const eventsQuery = query(collection(db, 'events'), where('adminId', '==', user.uid));
    const unsubscribeEvents = onSnapshot(eventsQuery, (snapshot) => {
      const eventsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setEvents(eventsData);
    });

    // Get all votes
    const unsubscribeVotes = onSnapshot(collection(db, 'votes'), (snapshot) => {
      setVotes(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    return () => {
      unsubscribeEvents();
      unsubscribeVotes();
    };
  }, [user]);

  const handleLogout = async () => {
    await signOut(auth);
    onLogout();
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h2 style={{ marginBottom: '0.5rem' }}>Welcome, {user.displayName || user.email}</h2>
          <p style={{ color: '#6B7280' }}>Manage your events and track participants</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Link to="/admin/create">
            <button style={{ backgroundColor: '#4F46E5', color: 'white', padding: '0.75rem 1.5rem', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '1rem' }}>
              + Create New Event
            </button>
          </Link>
          <button onClick={handleLogout} style={{ backgroundColor: '#6B7280', color: 'white', padding: '0.75rem 1.5rem', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '1rem' }}>
            Logout
          </button>
        </div>
      </div>

      {events.length === 0 ? (
        <div style={{ backgroundColor: '#F3F4F6', padding: '3rem', borderRadius: '8px', textAlign: 'center' }}>
          <h3 style={{ marginBottom: '1rem' }}>No events yet</h3>
          <p style={{ color: '#6B7280', marginBottom: '1.5rem' }}>Create your first event to start collecting votes</p>
          <Link to="/admin/create">
            <button style={{ backgroundColor: '#4F46E5', color: 'white', padding: '1rem 2rem', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
              Create Event
            </button>
          </Link>
        </div>
      ) : (
        events.map(event => {
          const eventVotes = votes.filter(v => v.eventId === event.id);
          const eventLink = `${window.location.origin}/participant/${event.id}`;
          
          // Calculate date votes
          const dateCounts = {};
          event.dates.forEach(date => dateCounts[date] = 0);
          eventVotes.forEach(vote => {
            if (dateCounts[vote.selectedDate] !== undefined) {
              dateCounts[vote.selectedDate]++;
            }
          });

          // Calculate location votes
          const locationCounts = {};
          event.locations.forEach(location => locationCounts[location] = 0);
          eventVotes.forEach(vote => {
            if (locationCounts[vote.selectedLocation] !== undefined) {
              locationCounts[vote.selectedLocation]++;
            }
          });

          // Get top choices
          const topDate = Object.entries(dateCounts).sort((a, b) => b[1] - a[1])[0];
          const topLocation = Object.entries(locationCounts).sort((a, b) => b[1] - a[1])[0];

          return (
            <div key={event.id} style={{ backgroundColor: 'white', border: '1px solid #E5E7EB', borderRadius: '8px', padding: '1.5rem', marginBottom: '1.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
                <div>
                  <h3 style={{ fontSize: '1.5rem', color: '#1F2937', marginBottom: '0.5rem' }}>{event.name}</h3>
                  <p style={{ color: '#6B7280', marginBottom: '0.5rem' }}>{event.description}</p>
                  <p style={{ color: '#9CA3AF', fontSize: '0.875rem' }}>
                    Deadline: {new Date(event.deadline).toLocaleString()}
                  </p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ 
                    backgroundColor: event.active ? '#10B981' : '#EF4444',
                    color: 'white',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '9999px',
                    fontSize: '0.875rem'
                  }}>
                    {event.active ? 'Active' : 'Closed'}
                  </span>
                </div>
              </div>

              {/* Statistics */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
                <div style={{ backgroundColor: '#F3F4F6', padding: '1rem', borderRadius: '8px', textAlign: 'center' }}>
                  <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#4F46E5' }}>{eventVotes.length}</p>
                  <p style={{ color: '#6B7280', fontSize: '0.875rem' }}>Total Votes</p>
                </div>
                <div style={{ backgroundColor: '#F3F4F6', padding: '1rem', borderRadius: '8px', textAlign: 'center' }}>
                  <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#10B981' }}>{event.dates.length}</p>
                  <p style={{ color: '#6B7280', fontSize: '0.875rem' }}>Date Options</p>
                </div>
                <div style={{ backgroundColor: '#F3F4F6', padding: '1rem', borderRadius: '8px', textAlign: 'center' }}>
                  <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#F59E0B' }}>{event.locations.length}</p>
                  <p style={{ color: '#6B7280', fontSize: '0.875rem' }}>Location Options</p>
                </div>
              </div>

              {/* Top Choices */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                <div style={{ backgroundColor: '#ECFDF5', padding: '1rem', borderRadius: '8px' }}>
                  <p style={{ fontSize: '0.875rem', color: '#059669', marginBottom: '0.5rem', fontWeight: 'bold' }}>TOP DATE</p>
                  <p style={{ fontSize: '1.125rem', color: '#065F46' }}>{topDate[0]}</p>
                  <p style={{ color: '#059669' }}>{topDate[1]} votes</p>
                </div>
                <div style={{ backgroundColor: '#ECFDF5', padding: '1rem', borderRadius: '8px' }}>
                  <p style={{ fontSize: '0.875rem', color: '#059669', marginBottom: '0.5rem', fontWeight: 'bold' }}>TOP LOCATION</p>
                  <p style={{ fontSize: '1.125rem', color: '#065F46' }}>{topLocation[0]}</p>
                  <p style={{ color: '#059669' }}>{topLocation[1]} votes</p>
                </div>
              </div>

              {/* Date Breakdown */}
              <div style={{ marginBottom: '1rem' }}>
                <h4 style={{ marginBottom: '0.5rem', color: '#374151' }}>Date Votes:</h4>
                {Object.entries(dateCounts).map(([date, count]) => (
                  <div key={date} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem', backgroundColor: '#F9FAFB', borderRadius: '4px', marginBottom: '0.25rem' }}>
                    <span>{date}</span>
                    <span style={{ fontWeight: 'bold', color: '#4F46E5' }}>{count} votes</span>
                  </div>
                ))}
              </div>

              {/* Location Breakdown */}
              <div style={{ marginBottom: '1rem' }}>
                <h4 style={{ marginBottom: '0.5rem', color: '#374151' }}>Location Votes:</h4>
                {Object.entries(locationCounts).map(([location, count]) => (
                  <div key={location} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem', backgroundColor: '#F9FAFB', borderRadius: '4px', marginBottom: '0.25rem' }}>
                    <span>{location}</span>
                    <span style={{ fontWeight: 'bold', color: '#4F46E5' }}>{count} votes</span>
                  </div>
                ))}
              </div>

              {/* Participants List */}
              <div style={{ marginBottom: '1rem' }}>
                <h4 style={{ marginBottom: '0.5rem', color: '#374151' }}>Participants ({eventVotes.length}):</h4>
                <div style={{ maxHeight: '200px', overflowY: 'auto', backgroundColor: '#F9FAFB', borderRadius: '4px', padding: '0.5rem' }}>
                  {eventVotes.map(vote => (
                    <div key={vote.id} style={{ padding: '0.5rem', borderBottom: '1px solid #E5E7EB', fontSize: '0.875rem' }}>
                      <strong>{vote.name}</strong> - {vote.phone}
                      <br />
                      <small style={{ color: '#6B7280' }}>
                        Date: {vote.selectedDate} | Location: {vote.selectedLocation}
                      </small>
                    </div>
                  ))}
                </div>
              </div>

              {/* Event Link with Share Buttons */}
<div>
  <h4 style={{ marginBottom: '0.5rem', color: '#374151' }}>Share this link:</h4>
  <div style={{ backgroundColor: '#F3F4F6', padding: '0.75rem', borderRadius: '4px', wordBreak: 'break-all', fontFamily: 'monospace', fontSize: '0.875rem', marginBottom: '1rem' }}>
    {eventLink}
  </div>
  
  {/* Share Buttons */}
  <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
    <a
      href={`https://wa.me/?text=Join our event! Vote on dates and locations: ${eventLink}`}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        backgroundColor: '#25D366',
        color: 'white',
        padding: '0.75rem 1.5rem',
        borderRadius: '8px',
        textDecoration: 'none',
        fontWeight: 'bold',
        fontSize: '0.875rem',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.5rem'
      }}
    >
      <span>📱</span> Share on WhatsApp
    </a>
    
    <a
      href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(eventLink)}&text=Join our event on Schedora! Vote on dates and locations`}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        backgroundColor: '#1DA1F2',
        color: 'white',
        padding: '0.75rem 1.5rem',
        borderRadius: '8px',
        textDecoration: 'none',
        fontWeight: 'bold',
        fontSize: '0.875rem',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.5rem'
      }}
    >
      <span>🐦</span> Share on Twitter
    </a>
    
    <button
      onClick={() => {
        navigator.clipboard.writeText(eventLink);
        alert('Link copied to clipboard!');
      }}
      style={{
        backgroundColor: '#6B7280',
        color: 'white',
        padding: '0.75rem 1.5rem',
        borderRadius: '8px',
        border: 'none',
        fontWeight: 'bold',
        fontSize: '0.875rem',
        cursor: 'pointer',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.5rem'
      }}
    >
      <span>📋</span> Copy Link
    </button>
  </div>
</div>
            </div>
          );
        })
      )}
    </div>
  );
}