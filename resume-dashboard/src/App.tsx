import { useState } from 'react'
import { Routes, Route, useLocation } from "react-router-dom";
import Header from './components/Header'
import Dashboard from './pages/Dashboard'
import Footer from './components/Footer'
import Signup from './components/Signup';
import Login from './pages/Login';
import FloatingNav from "./components/FloatingNav";
import Education from "./pages/Education";
import Projects from "./pages/Projects";

function App() {

  const location = useLocation();
  const showFloatingNav = ["/", "/education", "/projects"].includes(
    location.pathname
  );

  return (
    <>
      <Header />
      
      {/* Show floating nav ONLY on dashboard (resume page) */}
      {showFloatingNav && <FloatingNav />}
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/education" element={<Education />} />
          <Route path="/projects" element={<Projects />} />
        </Routes>
     
      <Footer />
    </>
  )
}

export default App
