import "./Login.css";
import { toast } from "react-toastify";
import { decodeToken } from "../utils/jwt";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../components/AuthContext";
import api from "../api/api";

function Login() {
    const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await api.post(
        "/authenticate",
        form
      );

      const token = res.data.token;
      const decoded = decodeToken(token);

      // console.log("sub", decoded.sub);

      toast.success(res.data.message);

      //  Save auth details
      localStorage.setItem("token", token);
        localStorage.setItem("username", decoded.sub);
        localStorage.setItem("role", decoded.roles[0].authority);

        login(token ,decoded.roles[0].authority)
      // Go to dashboard
      navigate("/");

    } catch (err:any) {
      const errorMessage =
    err.response?.data?.message || "Something went wrong";
    toast.error(errorMessage);
    }
  };

  return (
    <div className="login-container">
      <form className="login-card" onSubmit={handleSubmit}>
        <h2>Login</h2>

        <input
          name="username"
          placeholder="Username"
          value={form.username}
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

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
