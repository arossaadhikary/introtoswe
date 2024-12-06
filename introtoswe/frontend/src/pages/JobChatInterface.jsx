import React, { useState } from 'react';
import { X, Image, Send, Settings, LogOut, User } from 'lucide-react';

const JobChatInterface = () => {
  const [selectedJob, setSelectedJob] = useState(null);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "hi, how are you, I am interested in your profile, can we connect?",
      timestamp: "14:22",
      sender: "them"
    },
    {
      id: 2,
      text: "thanks, where are you located",
      timestamp: "14:22",
      sender: "them"
    },
    {
      id: 3,
      text: "can you please share more detail about your job post?",
      timestamp: "14:22",
      sender: "them"
    },
    {
      id: 4,
      text: "yes, I am glad we can connect",
      timestamp: "14:24",
      sender: "me"
    },
    {
      id: 5,
      text: "where are you located? what is your background and skillsetes?",
      timestamp: "14:24",
      sender: "me"
    }
  ]);

  // Sample jobs data
  const jobs = [
    {
      id: 1,
      clubName: "ExampleClub1",
      jobDescription: "Do something",
      difficulty: "Medium",
      //status: "Offline"
    },
    {
      id: 2,
      clubName: "ExampleClub2",
      jobDescription: "Do something else",
      difficulty: "Easy",
      //status: "Offline"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <img src="/logo.svg" alt="Logo" className="h-6 w-6" />
            <div className="text-xl font-semibold">Chatty</div>
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <Settings size={20} />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <User size={20} />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-4">
        {/* Job List */}
        {!selectedJob && (
          <div className="bg-white rounded-lg shadow">
            <div className="grid grid-cols-4 gap-4 p-4 font-semibold border-b">
              <div>Club Name</div>
              <div>Job Description</div>
              <div>Difficulty</div>
              <div>Action</div>
            </div>
            {jobs.map((job) => (
              <div key={job.id} className="grid grid-cols-4 gap-4 p-4 border-b hover:bg-gray-50">
                <div>{job.clubName}</div>
                <div>{job.jobDescription}</div>
                <div>{job.difficulty}</div>
                <div>
                  <button
                    onClick={() => setSelectedJob(job)}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  >
                    Chat
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Chat Interface */}
        {selectedJob && (
          <div className="bg-white rounded-lg shadow-lg">
            {/* Chat Header */}
            <div className="p-4 border-b flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                  <img src="/logo.svg" alt="Logo" className="h-6 w-6" />
                </div>
                <div>
                  <div className="font-semibold">{selectedJob.clubName}</div>
                  <div className="text-sm text-gray-500">{selectedJob.status}</div>
                </div>
              </div>
              <button
                onClick={() => setSelectedJob(null)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="h-[500px] overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[70%] rounded-lg px-4 py-2 ${
                      message.sender === 'me'
                        ? 'bg-black text-white'
                        : 'bg-gray-100'
                    }`}
                  >
                    <div>{message.text}</div>
                    <div className="text-xs text-gray-400 mt-1">
                      {message.timestamp}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="p-4 border-t">
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  placeholder="Type a message..."
                  className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button className="p-2 hover:bg-gray-100 rounded-full">
                  <Image size={20} className="text-gray-500" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-full">
                  <Send size={20} className="text-gray-500" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobChatInterface;