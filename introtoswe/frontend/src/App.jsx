// src/App.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/navbar";
import ChatList from "./components/chatList";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow container mx-auto px-4">
        <Outlet />
      </div>
      <ChatList />
    </div>
  );
}

export default App;
