import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../firebase';

export default function AdminLogin({ onLogin }) {
  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      onLogin();
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '3rem' }}>
      <h2>Admin Login</h2>
      <p>Only administrators can access this page</p>
      <button
        onClick={handleGoogleSignIn}
        style={{
          backgroundColor: '#DB4437',
          color: 'white',
          padding: '1rem 2rem',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          fontSize: '1rem',
          marginTop: '1rem'
        }}
      >
        Sign in with Google
      </button>
    </div>
  );
}