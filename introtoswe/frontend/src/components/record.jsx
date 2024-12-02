import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

export default function Record() {
  const { username } = useAuth();
  const [form, setForm] = useState({
    name: "",
    position: "",
    level: "",
    user: username,
  });
  const [isNew, setIsNew] = useState(true);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const id = params.id?.toString();
      if (!id) return;
      setIsNew(false);

      try {
        const response = await fetch(`http://localhost:5050/record/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Add token to header
          },
        });

        if (!response.ok) {
          console.error(`Error: ${response.statusText}`);
          return;
        }

        const record = await response.json();
        if (!record) {
          navigate("/");
          return;
        }
        setForm(record);
      } catch (error) {
        console.error("Error fetching record:", error);
      }
    }

    fetchData();
  }, [params.id, navigate]);

  function updateForm(value) {
    setForm((prev) => ({ ...prev, ...value }));
  }

  async function onSubmit(e) {
    e.preventDefault();
    const person = { ...form, user: username };

    try {
      const method = isNew ? "POST" : "PATCH";
      const url = `http://localhost:5050/record${isNew ? "" : "/" + params.id}`;
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Add token to header
        },
        body: JSON.stringify(person),
      });

      if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
    } catch (error) {
      console.error("Error adding/updating record:", error);
    } finally {
      setForm({ name: "", position: "", level: "", user: username });
      navigate("/");
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        placeholder="Name"
        value={form.name}
        onChange={(e) => updateForm({ name: e.target.value })}
      />
      <input
        type="text"
        placeholder="Position"
        value={form.position}
        onChange={(e) => updateForm({ position: e.target.value })}
      />
      <input
        type="text"
        placeholder="Level"
        value={form.level}
        onChange={(e) => updateForm({ level: e.target.value })}
      />
      <button type="submit">{isNew ? "Create Listing" : "Update Listing"}</button>
    </form>
  );
}
