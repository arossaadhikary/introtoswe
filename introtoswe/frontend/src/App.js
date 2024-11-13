import React from 'react';
import { Routes, Route } from 'react-router-dom';

// pages
import Home from './pages/home/Home';
import Login from './pages/login/LoginDialog';
import UserProfile from './pages/user-profile/UserProfile';

// components
import Nav from './components/nav-bar/Navbar';
import Footer from './components/footer/Footer';

function App() {
  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/john_user_profile" element={<UserProfile />} /> 
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
