import React, { useState, useContext } from "react";
import { register as apiRegister } from "../services/api.js";
import { AuthContext } from "../context/AuthContext.jsx";

export default function Register() {
  const { login } = useContext(AuthContext);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await apiRegister(form);
      login(res.data.token);
    } catch (err) {
      setError(err.response?.data?.msg || "Registration failed");
    }
  };

  return (
    <form
      onSubmit={submit}
      className="max-w-sm mx-auto border p-6 rounded shadow"
    >
      <h2 className="text-2xl mb-4">Register</h2>
      {error && <div className="text-red-500 mb-2">{error}</div>}
      <input
        placeholder="Name"
        className="w-full border p-2 mb-2 rounded"
        value={form.name}
        onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
      />
      <input
        type="email"
        placeholder="Email"
        className="w-full border p-2 mb-2 rounded"
        value={form.email}
        onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
      />
      <input
        type="password"
        placeholder="Password"
        className="w-full border p-2 mb-4 rounded"
        value={form.password}
        onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
      />
      <button
        type="submit"
        className="w-full bg-green-600 text-white p-2 rounded"
      >
        Register
      </button>
    </form>
  );
}
