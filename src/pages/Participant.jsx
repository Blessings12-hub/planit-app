import { useState, useEffect } from 'react';
import { addDoc, collection, serverTimestamp, onSnapshot } from 'firebase/firestore';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ParticipantForm from '../components/ParticipantForm';
import { db } from '../firebase';
import { useParams } from 'react-router-dom';
import { sendVoteNotification } from '../services/emailService';

export default function Participant() {
  const { eventId } = useParams();
  const [step, setStep] = useState(1);
  const [participantInfo, setParticipantInfo] = useState(null);
  const [event, setEvent] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [votes, setVotes] = useState([]);

  // Load event data
  useEffect(() => {
    if (!eventId) return;
    
    const fetchEvent = async () => {
      try {
        const eventDoc = await collection(db, 'events').doc(eventId).get();
        if (eventDoc.exists) {
          setEvent(eventDoc.data());
        }
      } catch (error) {
        console.error('Error loading event:', error);
      }
    };

    fetchEvent();
  }, [eventId]);

  // Listen to votes for this event
  useEffect(() => {
    if (!eventId) return;

    const unsubscribe = onSnapshot(collection(db, 'votes'), (snapshot) => {
      const eventVotes = snapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() }))
        .filter(v => v.eventId === eventId);
      setVotes(eventVotes);
    });

    return () => unsubscribe();
  }, [eventId]);

  const handleFormSubmit = (info) => {
    setParticipantInfo(info);
    setStep(2);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleLocationChange = (e) => {
    setSelectedLocation(e.target.value);
  };

  const handleSubmitVote = async () => {
    if (!selectedDate || !selectedLocation) {
      alert('Please select both a date and location');
      return;
    }

    try {
      // Save vote to Firestore
      const voteData = {
        ...participantInfo,
        selectedDate: selectedDate.toISOString().split('T')[0],
        selectedLocation: selectedLocation,
        eventId: eventId,
        createdAt: serverTimestamp()
      };

      await addDoc(collection(db, 'votes'), voteData);

      // Count total votes for this event (including this one)
      const totalVotes = votes.length + 1;

      // Send email notification to admin
      if (event) {
        await sendVoteNotification(event, voteData, totalVotes);
      }

      alert('Thank you for voting! Admin has been notified.');

      // Reset form
      setStep(1);
      setSelectedDate(null);
      setSelectedLocation('');
    } catch (error) {
      console.error('Vote error:', error);
      alert('Vote failed: ' + error.message);
    }
  };

  if (!eventId) {
    return (
      <div style={{ textAlign: 'center', padding: '3rem' }}>
        <h2>Please open a valid event link</h2>
      </div>
    );
  }

  if (!event) {
    return (
      <div style={{ textAlign: 'center', padding: '3rem' }}>
        <h2>Loading event...</h2>
      </div>
    );
  }

  // Convert event dates to Date objects for the picker
  const availableDates = event.dates.map((d) => new Date(d));

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', marginTop: '2rem', color: '#4F46E5', fontSize: '2.5rem', fontWeight: 'bold' }}>
        {event.name}
      </h1>
      <p style={{ textAlign: 'center', color: '#6B7280', marginBottom: '2rem', fontSize: '1.125rem' }}>
        {event.description}
      </p>
      
      {step === 1 ? (
        <ParticipantForm onSubmit={handleFormSubmit} />
      ) : (
        <div style={{ padding: '2rem', backgroundColor: '#F9FAFB', borderRadius: '12px', marginTop: '2rem' }}>
          <h2 style={{ fontSize: '1.75rem', color: '#1F2937', marginBottom: '1.5rem', textAlign: 'center' }}>
            Vote for Your Preferences
          </h2>
          
          {/* Date Picker */}
          <div style={{ marginBottom: '2rem' }}>
            <label style={{ fontSize: '1.125rem', color: '#374151', fontWeight: 'bold', marginBottom: '0.75rem', display: 'block' }}>
              Choose a Date:
            </label>
            <DatePicker
              selected={selectedDate}
              onChange={handleDateChange}
              minDate={new Date()}
              filterDate={(date) => availableDates.includes(date)}
              placeholderText="Select from available dates"
              style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #D1D5DB', fontSize: '1rem' }}
            />
            <p style={{ color: '#6B7280', fontSize: '0.875rem', marginTop: '0.5rem' }}>
              Available dates: {event.dates.join(', ')}
            </p>
          </div>
          
          {/* Location Selector */}
          <div style={{ marginBottom: '2rem' }}>
            <label style={{ fontSize: '1.125rem', color: '#374151', fontWeight: 'bold', marginBottom: '0.75rem', display: 'block' }}>
              Choose a Location:
            </label>
            <select 
              value={selectedLocation}
              onChange={handleLocationChange}
              style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #D1D5DB', fontSize: '1rem' }}
            >
              <option value="">Select a location</option>
              {event.locations.map((location, index) => (
                <option key={index} value={location}>{location}</option>
              ))}
            </select>
          </div>
          
          {/* Submit Button */}
          <button
            onClick={handleSubmitVote}
            disabled={!selectedDate || !selectedLocation}
            style={{ 
              backgroundColor: (!selectedDate || !selectedLocation) ? '#9CA3AF' : '#10B981', 
              color: 'white', 
              padding: '1rem 2rem', 
              border: 'none', 
              borderRadius: '8px', 
              cursor: (!selectedDate || !selectedLocation) ? 'not-allowed' : 'pointer',
              fontSize: '1.125rem',
              fontWeight: 'bold',
              width: '100%',
              boxShadow: (!selectedDate || !selectedLocation) ? 'none' : '0 4px 12px rgba(16, 185, 129, 0.3)'
            }}
          >
            Submit Vote
          </button>
        </div>
      )}
    </div>
  );
}