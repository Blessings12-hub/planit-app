import { Link } from 'react-router-dom';

export default function Landing() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '1rem',
      paddingBottom: '3rem'
    }}>
      <div style={{ 
        maxWidth: '800px', 
        margin: '0 auto',
        paddingTop: '3rem',
        textAlign: 'center'
      }}>
        {/* Logo */}
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            width: '120px',
            height: '120px',
            backgroundColor: 'white',
            borderRadius: '32px',
            boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
            marginBottom: '1.5rem',
            overflow: 'hidden'
          }}>
            <img 
              src="/schedora-logo.png" 
              alt="Schedora Event Planning App" 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
          <h1 style={{ 
            fontSize: '3.5rem',
            color: 'white',
            fontWeight: 'bold',
            marginBottom: '0.5rem',
            textShadow: '0 2px 10px rgba(0,0,0,0.2)'
          }}>
            Schedora
          </h1>
          <p style={{ 
            fontSize: '1.5rem',
            color: 'rgba(255,255,255,0.9)',
            fontWeight: '500'
          }}>
            Event Planning App for Groups
          </p>
        </div>

        {/* Main Content */}
        <div style={{ 
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          padding: '2.5rem',
          borderRadius: '24px',
          marginBottom: '2.5rem',
          boxShadow: '0 10px 40px rgba(0,0,0,0.15)'
        }}>
          <h2 style={{ 
            fontSize: '2rem',
            color: '#1F2937',
            fontWeight: 'bold',
            marginBottom: '1rem'
          }}>
            Group Plans That Actually Happen
          </h2>
          <p style={{ 
            fontSize: '1.25rem',
            color: '#DC2626',
            fontWeight: 'bold',
            marginBottom: '1.5rem'
          }}>
            Stop chasing people in group chats.
          </p>
          <p style={{ 
            fontSize: '1.125rem',
            color: '#6B7280',
            lineHeight: '1.8',
            marginBottom: '2rem'
          }}>
            <strong>Schedora</strong> is the free event planning app that makes group planning easy. 
            Create events, let friends vote on dates and locations, send WhatsApp invites, 
            and finally make plans happen fast. No more endless back-and-forth in group chats!
          </p>

          {/* Features */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
            gap: '1rem',
            marginBottom: '2rem',
            textAlign: 'left'
          }}>
            <div style={{ backgroundColor: '#ECFDF5', padding: '1.25rem', borderRadius: '12px' }}>
              <h3 style={{ color: '#059669', fontWeight: 'bold', marginBottom: '0.5rem' }}>📅 Easy Voting</h3>
              <p style={{ color: '#065F46', fontSize: '0.9375rem' }}>
                Create events and let everyone vote on dates & locations
              </p>
            </div>
            <div style={{ backgroundColor: '#EFF6FF', padding: '1.25rem', borderRadius: '12px' }}>
              <h3 style={{ color: '#2563EB', fontWeight: 'bold', marginBottom: '0.5rem' }}>🔗 Share Instantly</h3>
              <p style={{ color: '#1E40AF', fontSize: '0.9375rem' }}>
                Share event links on WhatsApp, Twitter, or copy to clipboard
              </p>
            </div>
            <div style={{ backgroundColor: '#FFFBEB', padding: '1.25rem', borderRadius: '12px' }}>
              <h3 style={{ color: '#D97706', fontWeight: 'bold', marginBottom: '0.5rem' }}>⏰ Track Everything</h3>
              <p style={{ color: '#92400E', fontSize: '0.9375rem' }}>
                See who voted, top choices, and all participant details
              </p>
            </div>
            <div style={{ backgroundColor: '#F0FDF4', padding: '1.25rem', borderRadius: '12px' }}>
              <h3 style={{ color: '#16A34A', fontWeight: 'bold', marginBottom: '0.5rem' }}>📱 Free & Easy</h3>
              <p style={{ color: '#15803D', fontSize: '0.9375rem' }}>
                No login required for participants. Install as app on your phone
              </p>
            </div>
          </div>

          {/* How It Works */}
          <div style={{ textAlign: 'left', marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1.5rem', color: '#1F2937', fontWeight: 'bold', marginBottom: '1rem' }}>
              How It Works
            </h3>
            <ol style={{ 
              textAlign: 'left', 
              color: '#4B5563', 
              lineHeight: '2',
              paddingLeft: '1.5rem'
            }}>
              <li>Admin creates an event with dates & locations</li>
              <li>Share the event link with your group (WhatsApp, text, etc.)</li>
              <li>Friends vote on their preferred dates and locations</li>
              <li>Admin sees all votes in real-time dashboard</li>
              <li>Make your plan and go!</li>
            </ol>
          </div>

          {/* CTA Buttons */}
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/participant">
              <button style={{ 
                backgroundColor: '#4F46E5',
                color: 'white',
                padding: '1rem 2rem',
                borderRadius: '12px',
                border: 'none',
                cursor: 'pointer',
                fontSize: '1.125rem',
                fontWeight: 'bold',
                boxShadow: '0 4px 12px rgba(79, 70, 229, 0.4)'
              }}>
                Join Event as Participant
              </button>
            </Link>
            <Link to="/admin">
              <button style={{ 
                backgroundColor: 'white',
                color: '#4F46E5',
                padding: '1rem 2rem',
                borderRadius: '12px',
                border: '2px solid #4F46E5',
                cursor: 'pointer',
                fontSize: '1.125rem',
                fontWeight: 'bold'
              }}>
                Create Event (Admin)
              </button>
            </Link>
          </div>
        </div>

        {/* Footer */}
        <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.875rem' }}>
          © 2026 Schedora - Free Event Planning App | Group Voting Made Easy
        </p>
      </div>
    </div>
  );
}