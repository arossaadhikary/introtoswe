// src/components/RecordList.js
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAuthHeaders } from "../api";
import ChatWidget from "./ChatWidget"; // Import the ChatWidget component

// Record Row Component
const Record = ({ record, deleteRecord, onAccept }) => (
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
  }, []);

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

  // Handle Accept button click
  const handleAccept = (record) => {
    setSelectedRecord(record);
    setShowChat(true);
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