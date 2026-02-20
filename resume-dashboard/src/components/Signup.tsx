import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import api from "../api/api";

function Signup() {
    const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    password: "",
    email: ""
  });

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await api.post("/UserCreate", form);
      alert("User created successfully!");
      navigate("/");
    } catch (err) {
      alert("Signup failed");
    }
  };

  return (
    <div style={{ padding: "60px", display: "flex", justifyContent: "center" }}>
      <form
        onSubmit={handleSubmit}
        style={{
          width: "320px",
          background: "#fff",
          padding: "30px",
          borderRadius: "12px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.1)"
        }}
      >
        <h2>Sign Up</h2>

        <input
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          required
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />

        <button type="submit" style={{ marginTop: "15px" }}>
          Create Account
        </button>
      </form>
    </div>
  );
}

export default Signup;
