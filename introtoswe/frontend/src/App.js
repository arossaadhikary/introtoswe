import React from 'react';

// pages
import Home from './pages/home/Home';
import Login from './pages/login/LoginDialog';

// components
import Nav from './components/nav-bar/Navbar';
import Footer from './components/footer/Footer';

function App() {
  return (
    <div className="App">
      <Nav />
      <Home />
      <Login />
      <Footer />
    </div>
  );
}

export default App;
