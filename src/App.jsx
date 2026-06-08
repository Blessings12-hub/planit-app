import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Participant from './pages/Participant';
import Admin from './pages/Admin';
import InstallPrompt from './components/InstallPrompt';
import './styles/main.css';

function App() {
  return (
    <Router>
      <Header />
      <InstallPrompt />
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/participant" element={<Participant />} />
          <Route path="/participant/:eventId" element={<Participant />} />
          <Route path="/admin/*" element={<Admin />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;