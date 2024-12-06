// src/components/ChatList.jsx
import React, { useContext, useState, useEffect } from 'react';
import ChatWidget from './chatWidget';
import { AuthContext } from '../context/AuthContext';
import { getAuthHeaders } from '../api/api';

const ChatList = () => {
  const { currentUser } = useContext(AuthContext);
  const [threads, setThreads] = useState([]);
  const [selectedThread, setSelectedThread] = useState(null);
  const [showChat, setShowChat] = useState(false);

  useEffect(() => {
    if (currentUser) {
      fetchThreads();
    }
    // eslint-disable-next-line
  }, [currentUser]);

  const fetchThreads = async () => {
    try {
      const response = await fetch('http://localhost:5050/chat/threads', {
        headers: {
          ...getAuthHeaders()
        }
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to fetch threads');
      }
      const data = await response.json();
      setThreads(data);
    } catch (error) {
      console.error('Error fetching threads:', error);
      alert(error.message);
    }
  };

  const handleThreadClick = (thread) => {
    setSelectedThread(thread);
    setShowChat(true);
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
                onClick={() => handleThreadClick(thread)}
                className="p-3 hover:bg-gray-100 rounded cursor-pointer"
              >
                <div className="font-medium">
                  {thread.participants.find(p => p.userId !== currentUser.userId)?.username || 'Unknown'}
                </div>
                <div className="text-sm text-gray-500">
                  {/* Assuming recordId is populated with record details */}
                  {thread.recordId?.name || 'No Record Name'}
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

export default ChatList;
