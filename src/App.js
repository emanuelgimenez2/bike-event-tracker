import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import EventosPage from './components/EventosPage';
// Comentamos EventosPage hasta que lo creemos
// import EventosPage from './components/EventosPage';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/eventos" element={<EventosPage />} />
          {/* Comentamos esta ruta hasta que creemos el componente
          <Route path="/eventos" element={<EventosPage />} /> */}
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;