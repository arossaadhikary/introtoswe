// src/components/ChatWidget.jsx
import React, { useState, useEffect, useContext } from 'react';
import io from 'socket.io-client';
import { getAuthHeaders } from '../api/api.js'; // Ensure correct extension
import { AuthContext } from '../context/AuthContext.jsx'; // Ensure correct extension

const ChatWidget = ({ thread, onClose }) => {
  const { currentUser } = useContext(AuthContext);
  const [messages, setMessages] = useState(thread?.messages || []);
  const [newMessage, setNewMessage] = useState('');
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (!thread || !thread._id) {
      console.error("Chat thread is not defined.");
      return;
    }

    const token = localStorage.getItem("token");
    const socketInstance = io('http://localhost:5050', {
      auth: {
        token: token,
      },
    });

    setSocket(socketInstance);

    socketInstance.on('connect', () => {
      console.log('Connected to WebSocket server');
      socketInstance.emit('joinThread', thread._id);
    });

    socketInstance.on('newMessage', (message) => {
      setMessages(prev => [...prev, message]);
    });

    socketInstance.on('disconnect', () => {
      console.log('Disconnected from WebSocket server');
    });

    // Fetch existing messages
    fetchMessages();

    return () => {
      if (socketInstance) socketInstance.disconnect();
    };
    // eslint-disable-next-line
  }, [thread._id]);

  const fetchMessages = async () => {
    try {
      const response = await fetch(`http://localhost:5050/chat/messages/${thread._id}`, {
        headers: {
          ...getAuthHeaders(),
        },
      });
      if (response.ok) {
        const data = await response.json();
        setMessages(data);
      } else {
        const data = await response.json();
        throw new Error(data.message || 'Failed to fetch messages');
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
      alert(error.message);
    }
  };

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    const messageData = {
      threadId: thread._id,
      message: {
        sender: currentUser.userId,
        content: newMessage,
        timestamp: new Date(),
      },
    };

    if (socket && socket.connected) {
      socket.emit('chatMessage', messageData);
      setMessages(prev => [...prev, messageData.message]);
      setNewMessage('');
    } else {
      alert("Socket not connected. Please try again later.");
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
          <h3 className="font-bold">
            Chat with {thread.participants.find(p => p.userId !== currentUser.userId)?.username || 'Unknown'}
          </h3>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-xl font-bold"
          >
            ×
          </button>
        </div>
      </div>
      
      <div className="h-96 overflow-y-auto p-4">
        {messages.map((message, index) => (
          <div 
            key={index}
            className={`mb-2 p-2 rounded ${
              message.sender === currentUser.userId
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
