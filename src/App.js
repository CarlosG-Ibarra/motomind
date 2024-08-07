import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth'; // Importa los métodos necesarios de Firebase
import Header from './Components/Header';
import Home from './Components/Home';
import Footer from './Components/Footer';
import Login from './Components/Login';
import './App.css';
import Contact from './Components/Contact';
import About from './Components/About';
import Dashboard from './Components/Dashboard';

const App = () => {
  return (
    <Router>
      <Content />
    </Router>
  );
};

const Content = () => {
  const location = useLocation();

  const isLoginRoute = location.pathname === '/login';

  useEffect(() => {
    const handleLogout = async () => {
      const auth = getAuth();
      try {
        await signOut(auth);
        console.log("User signed out");
      } catch (error) {
        console.error("Error signing out:", error);
      }
    };

    const handleBeforeUnload = (event) => {
      handleLogout();
      // Para mostrar un mensaje de confirmación antes de cerrar la ventana, puedes descomentar la siguiente línea:
      // event.returnValue = "Are you sure you want to leave?";
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return (
    <div>
      {!isLoginRoute && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
      {!isLoginRoute && <Footer />}
    </div>
  );
};

export default App;
