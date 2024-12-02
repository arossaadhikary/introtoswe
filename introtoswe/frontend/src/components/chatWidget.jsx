// src/components/ChatWidget.jsx
import React, { useState, useEffect } from 'react';

const ChatWidget = ({ job, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Initialize WebSocket connection
    const ws = new WebSocket('ws://localhost:5050'); // Update with your WebSocket server URL
    setSocket(ws);

    // Set up WebSocket event listeners
    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      setMessages(prev => [...prev, message]);
    };

    // Load existing messages
    fetchMessages();

    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, [job._id]);

  const fetchMessages = async () => {
    try {
      const response = await fetch(`http://localhost:5050/messages/${job._id}`);
      const data = await response.json();
      setMessages(data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    const message = {
      jobId: job._id,
      content: newMessage,
      sender: 'user', // Replace with actual user ID from auth system
      timestamp: new Date()
    };

    try {
      if (socket && socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify(message));
        setMessages(prev => [...prev, message]);
        setNewMessage('');
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="fixed bottom-4 right-4 w-80 bg-white shadow-lg rounded-lg">
      <div className="p-4 border-b">
        <div className="flex justify-between items-center">
          <h3 className="font-bold">Chat with {job.name}</h3>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-xl font-bold"
          >
            ×
          </button>
        </div>
      </div>
      
      <div className="h-96 overflow-y-auto p-4">
        {messages.map(message => (
          <div 
            key={message._id || message.timestamp.toString()}
            className={`mb-2 p-2 rounded ${
              message.sender === 'user' 
                ? 'bg-blue-100 ml-auto max-w-[80%]' 
                : 'bg-gray-100 max-w-[80%]'
            }`}
          >
            <p className="text-sm">{message.content}</p>
            <span className="text-xs text-gray-500">
              {new Date(message.timestamp).toLocaleTimeString()}
            </span>
          </div>
        ))}
      </div>

      <div className="p-4 border-t">
        <div className="flex gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Type a message..."
          />
          <button 
            onClick={sendMessage}
            className="px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatWidget;