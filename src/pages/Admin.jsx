import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { Link, Route, Routes } from 'react-router-dom';
import AdminLogin from '../components/AdminLogin';
import AdminDashboard from '../components/AdminDashboard';
import CreateEvent from './CreateEvent';
import { auth } from '../firebase';

export default function Admin() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsAdmin(!!currentUser);
    });

    return () => unsubscribe();
  }, []);

  const handleLogin = () => {
    setIsAdmin(true);
  };

  const handleLogout = () => {
    setIsAdmin(false);
    setUser(null);
  };

  return (
    <div>
      <h1 style={{ textAlign: 'center', marginTop: '2rem' }}>Admin Panel</h1>
      {!isAdmin ? (
        <AdminLogin onLogin={handleLogin} />
      ) : (
        <Routes>
          <Route path="/" element={
            <AdminDashboard user={user} onLogout={handleLogout} />
          } />
          <Route path="/create" element={<CreateEvent />} />
        </Routes>
      )}
    </div>
  );
}