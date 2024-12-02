// components/ChatList.jsx
import React, { useState, useEffect } from 'react';
import ChatWidget from './chatWidget';

const ChatList = () => {
  const [threads, setThreads] = useState([]);
  const [selectedThread, setSelectedThread] = useState(null);
  const [showChat, setShowChat] = useState(false);

  useEffect(() => {
    fetchThreads();
  }, []);

  const fetchThreads = async () => {
    try {
      const response = await fetch('http://localhost:5050/chat/threads', {
        headers: {
          ...getAuthHeaders()
        }
      });
      const data = await response.json();
      setThreads(data);
    } catch (error) {
      console.error('Error fetching threads:', error);
    }
  };

  return (
    <div className="fixed right-4 bottom-4">
      {!showChat ? (
        <div className="bg-white rounded-lg shadow-lg p-4 w-80">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold">Messages</h3>
            <button
              onClick={() => setShowChat(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              ×
            </button>
          </div>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {threads.map(thread => (
              <div
                key={thread._id}
                onClick={() => {
                  setSelectedThread(thread);
                  setShowChat(true);
                }}
                className="p-3 hover:bg-gray-100 rounded cursor-pointer"
              >
                <div className="font-medium">
                  {thread.participants.find(p => p._id !== currentUser._id).username}
                </div>
                <div className="text-sm text-gray-500">
                  {thread.recordId.name}
                </div>
                {thread.messages.length > 0 && (
                  <div className="text-sm truncate">
                    {thread.messages[thread.messages.length - 1].content}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <ChatWidget
          thread={selectedThread}
          onClose={() => {
            setShowChat(false);
            setSelectedThread(null);
          }}
        />
      )}
    </div>
  );
};

// components/ChatWidget.jsx (updated)
const ChatWidget = ({ thread, onClose }) => {
  const [messages, setMessages] = useState(thread?.messages || []);
  const [newMessage, setNewMessage] = useState('');
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:5050');
    setSocket(ws);

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.threadId === thread._id) {
        setMessages(prev => [...prev, data.message]);
      }
    };

    return () => {
      if (ws) ws.close();
    };
  }, [thread._id]);

  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    const messageData = {
      threadId: thread._id,
      content: newMessage,
      sender: currentUser._id
    };

    try {
      if (socket?.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify(messageData));
        setNewMessage('');
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg w-80">
      <div className="p-4 border-b">
        <div className="flex justify-between items-center">
          <h3 className="font-bold">
            Chat with {thread.participants.find(p => p._id !== currentUser._id).username}
          </h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">×</button>
        </div>
      </div>
      
      {/* Rest of the chat widget implementation remains similar */}
    </div>
  );
};

// Update in RecordList.jsx
const Record = ({ record, deleteRecord }) => {
  const [showChat, setShowChat] = useState(false);
  const [chatThread, setChatThread] = useState(null);

  const handleAccept = async () => {
    try {
      const response = await fetch('http://localhost:5050/chat/thread', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeaders()
        },
        body: JSON.stringify({
          recordId: record._id,
          participantId: record.owner // Assuming record has owner field
        })
      });
      const thread = await response.json();
      setChatThread(thread);
      setShowChat(true);
    } catch (error) {
      console.error('Error creating chat thread:', error);
    }
  };

  return (
    <tr>
      {/* Existing record fields */}
      <td>
        <button onClick={handleAccept}>Accept</button>
      </td>
      {showChat && chatThread && (
        <ChatWidget
          thread={chatThread}
          onClose={() => {
            setShowChat(false);
            setChatThread(null);
          }}
        />
      )}
    </tr>
  );
};