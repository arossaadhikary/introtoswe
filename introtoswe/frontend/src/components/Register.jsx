import React, { useState } from "react";

export default function Register() {
  const [form, setForm] = useState({ username: "", password: "" });

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5050/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      if (response.ok) {
        alert("Registration successful!");
      } else {
        alert(data.message || "Registration failed");
      }
    } catch (error) {
      console.error("Error registering", error);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Username"
        value={form.username}
        onChange={(e) => setForm({ ...form, username: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />
      <button type="submit">Register</button>
    </form>
  );
}
