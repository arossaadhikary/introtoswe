// src/components/RecordList.js
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAuthHeaders } from "../api"; // Import the auth headers helper
import ChatWidget from "./chatWidget"; // Import the ChatWidget component
import { MessageCircle, X, Home } from 'lucide-react';


// Record Row Component
const Record = ({ record, deleteRecord , onAccept}) => (
  <tr className="border-b transition-colors hover:bg-gray-100">
    <td className="p-4 align-middle">{record.name}</td>
    <td className="p-4 align-middle">{record.position}</td>
    <td className="p-4 align-middle">{record.level}</td>
    <td className="p-4 align-middle">
      <div className="flex gap-2">
        <Link
          to={`/edit/${record._id}`}
          className="px-3 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
        >
          Edit
        </Link>
        <button
          onClick={() => deleteRecord(record._id)}
          className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
        >
          Delete
        </button>
        <button
          onClick={() => onAccept(record)}
          className="px-3 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
        >
          Accept
        </button>
      </div>
    </td>
  </tr>
);

export default function RecordList() {
  const [records, setRecords] = useState([]);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [showChat, setShowChat] = useState(false);

  const [isOpen, setIsOpen] = useState(false);
  const [showNotification, setShowNotification] = useState(false);


  // Fetch records from the database
  useEffect(() => {
    async function getRecords() {
      try {
        const response = await fetch("http://localhost:5050/record/");
        if (!response.ok) {
          const message = `An error occurred: ${response.statusText}`;
          console.error(message);
          return;
        }
        const records = await response.json();
        setRecords(records);
      } catch (error) {
        console.error("Error fetching records:", error);
      }
    }
    getRecords();
  }, []); // Removed dependency on records.length to prevent infinite loop

  // Delete a record
  async function deleteRecord(id) {
    if (!window.confirm("Are you sure you want to delete this record?")) {
      return;
    }
    try {
      const response = await fetch(`http://localhost:5050/record/${id}`, {
        method: "DELETE",
        headers: {
          ...getAuthHeaders(),
        },
      });
      if (response.ok) {
        const newRecords = records.filter((el) => el._id !== id);
        setRecords(newRecords);
        alert("Record deleted successfully.");
      } else {
        const data = await response.json();
        alert(data.message || "Failed to delete record.");
      }
    } catch (error) {
      console.error("Error deleting record:", error);
      alert("An error occurred while deleting the record.");
    }
  }

   // Sample messages based on selected job
   const getMessages = () => {
    if (!selectedRecord) return [];
    return [
      {
        id: 1,
        sender: selectedRecord.user,
        text: `Hi! Thanks for your interest in the "${selectedRecord.position}" position.`,
        time: 'Just now'
      }
    ];
  };

  // Handle Accept button click
  // const handleAccept = (record) => {
  //   setSelectedRecord(record);
  //   setShowChat(true);
  // };
  const handleAccept = (record) => {
    setSelectedRecord(record);
    setIsOpen(true);
    setShowNotification(true);
  };

  // Map out the records in a table
  function recordList() {
    return records.map((record) => (
      <Record
        record={record}
        deleteRecord={deleteRecord}
        onAccept={handleAccept}
        key={record._id}
      />
    ));
  }

  return (
    <>
      <h3 className="text-lg font-semibold p-4">Listings</h3>
      <div className="border rounded-lg overflow-hidden max-w-4xl mx-auto">
        <div className="relative w-full overflow-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-200">
              <tr>
                <th className="h-12 px-4 text-left">Club Name</th>
                <th className="h-12 px-4 text-left">Job Description</th>
                <th className="h-12 px-4 text-left">Difficulty</th>
                <th className="h-12 px-4 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {recordList()}
            </tbody>
          </table>
          {/* <JobListingWithChat /> */}
          {/* <ChatWidget2 /> */}


          {/* Chat Widget */}
      <div className="fixed bottom-4 right-4 z-50">
        {isOpen && (
          <div className="absolute bottom-16 right-0 w-80 bg-white rounded-lg shadow-xl overflow-hidden">
            {/* Header */}
            <div className="bg-navy-900 text-white p-4">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold">Messages</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:text-gray-300"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Messages List */}
            <div className="max-h-96 overflow-y-auto">
              {getMessages().map((message) => (
                <div
                  key={message.id}
                  className="p-4 border-b hover:bg-gray-50"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                      <MessageCircle className="text-white" size={20} />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h3 className="font-medium">{message.sender}</h3>
                        <span className="text-sm text-gray-500">{message.time}</span>
                      </div>
                      <p className="text-sm text-gray-600">{message.text}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Navigation */}
            <div className="border-t flex justify-around p-4">
              <button className="flex flex-col items-center text-gray-600 hover:text-gray-900">
                <Home size={20} />
                <span className="text-xs mt-1">Home</span>
              </button>
              <button className="flex flex-col items-center text-blue-600">
                <MessageCircle size={20} />
                <span className="text-xs mt-1">Messages</span>
              </button>
            </div>
          </div>
        )}

        {/* Floating Action Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-3 shadow-lg flex items-center justify-center relative"
        >
          <MessageCircle size={24} />
          {showNotification && !isOpen && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              1
            </span>
          )}
        </button>
      </div>

        </div>
      </div>


      {showChat && selectedRecord && (
        <ChatWidget
          job={selectedRecord}
          onClose={() => {
            setShowChat(false);
            setSelectedRecord(null);
          }}
        />
      )}

    </>
  );
}
