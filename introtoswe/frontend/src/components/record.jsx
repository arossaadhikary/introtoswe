// src/components/Record.js
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getAuthHeaders } from "../api"; // Import the auth headers helper

export default function Record() {
  const [form, setForm] = useState({
    name: "",
    position: "",
    level: "",
  });
  const [isNew, setIsNew] = useState(true);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const id = params.id?.toString() || undefined;
      if (!id) return;
      setIsNew(false);
      try {
        const response = await fetch(
          `http://localhost:5050/record/${id}`
        );
        if (!response.ok) {
          const message = `An error has occurred: ${response.statusText}`;
          console.error(message);
          return;
        }
        const record = await response.json();
        if (!record) {
          console.warn(`Record with id ${id} not found`);
          navigate("/");
          return;
        }
        setForm(record);
      } catch (error) {
        console.error("Error fetching record:", error);
      }
    }
    fetchData();
    return;
  }, [params.id, navigate]);

  // Update form state
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  // Handle form submission
  async function onSubmit(e) {
    e.preventDefault();
    const person = { ...form };
    try {
      let response;
      if (isNew) {
        // Create a new record (POST)
        response = await fetch("http://localhost:5050/record", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...getAuthHeaders(),
          },
          body: JSON.stringify(person),
        });
      } else {
        // Update existing record (PATCH)
        response = await fetch(`http://localhost:5050/record/${params.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            ...getAuthHeaders(),
          },
          body: JSON.stringify(person),
        });
      }

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || `HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error(
        "A problem occurred adding or updating a record: ",
        error
      );
      alert(error.message);
    } finally {
      setForm({ name: "", position: "", level: "" });
      navigate("/");
    }
  }

  return (
    <>
      <h3 className="text-lg font-semibold p-4">
        {isNew ? "Create Listing" : "Update Listing"}
      </h3>
      <form
        onSubmit={onSubmit}
        className="border rounded-lg overflow-hidden p-4 max-w-md mx-auto"
      >
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 pb-12">
          <div>
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Listing Info
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              This information will be displayed publicly so be careful what you
              share.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-x-6 gap-y-8">
            {/* Club Name */}
            <div className="sm:col-span-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Club Name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Club Name"
                  value={form.name}
                  onChange={(e) => updateForm({ name: e.target.value })}
                  required
                  className="block w-full border border-gray-300 rounded-md p-2"
                />
              </div>
            </div>

            {/* Description */}
            <div className="sm:col-span-4">
              <label
                htmlFor="position"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Description
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="position"
                  id="position"
                  placeholder="Club Description"
                  value={form.position}
                  onChange={(e) => updateForm({ position: e.target.value })}
                  required
                  className="block w-full border border-gray-300 rounded-md p-2"
                />
              </div>
            </div>

            {/* Difficulty Level */}
            <div>
              <fieldset className="mt-4">
                <legend className="sr-only">Difficulty Options</legend>
                <div className="space-y-4 sm:flex sm:items-center sm:space-x-10 sm:space-y-0">
                  <div className="flex items-center">
                    <input
                      id="levelIntern"
                      name="levelOptions"
                      type="radio"
                      value="Intern" // Changed from 'Beginner' to 'Intern'
                      className="h-4 w-4 border-gray-300 text-gray-600 focus:ring-gray-600 cursor-pointer"
                      checked={form.level === "Intern"}
                      onChange={(e) => updateForm({ level: e.target.value })}
                      required
                    />
                    <label
                      htmlFor="levelIntern"
                      className="ml-3 block text-sm font-medium leading-6 text-gray-900 mr-4"
                    >
                      Intern
                    </label>

                    <input
                      id="levelJunior"
                      name="levelOptions"
                      type="radio"
                      value="Junior" // Changed from 'Intermediate' to 'Junior'
                      className="h-4 w-4 border-gray-300 text-gray-600 focus:ring-gray-600 cursor-pointer"
                      checked={form.level === "Junior"}
                      onChange={(e) => updateForm({ level: e.target.value })}
                    />
                    <label
                      htmlFor="levelJunior"
                      className="ml-3 block text-sm font-medium leading-6 text-gray-900 mr-4"
                    >
                      Junior
                    </label>

                    <input
                      id="levelSenior"
                      name="levelOptions"
                      type="radio"
                      value="Senior" // Changed from 'Advanced' to 'Senior'
                      className="h-4 w-4 border-gray-300 text-gray-600 focus:ring-gray-600 cursor-pointer"
                      checked={form.level === "Senior"}
                      onChange={(e) => updateForm({ level: e.target.value })}
                    />
                    <label
                      htmlFor="levelSenior"
                      className="ml-3 block text-sm font-medium leading-6 text-gray-900 mr-4"
                    >
                      Senior
                    </label>
                  </div>
                </div>
              </fieldset>
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 mt-4"
        >
          {isNew ? "Post Listing" : "Update Listing"}
        </button>
      </form>
    </>
  );
}
