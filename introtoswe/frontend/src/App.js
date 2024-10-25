import React from 'react';

// pages
import Login from './pages/login/Login';
import Home from './pages/home/Home';

// components
import Nav from "./components/nav-bar/Navbar";

function App() {
  return (
    <div className="App">
      <Nav />
      <Home />
      <Login />
    </div>
  );
}

export default App;