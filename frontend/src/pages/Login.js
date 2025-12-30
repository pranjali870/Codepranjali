import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5001/api/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("username", res.data.user.name);
      navigate("/tasks");
    } catch (err) {
      alert("Login failed: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "60px auto", padding: "30px", borderRadius: "10px", boxShadow: "0 4px 15px rgba(0,0,0,0.1)", backgroundColor: "#fff" }}>
      <h2 style={{ textAlign: "center", marginBottom: "25px" }}>Login</h2>
      <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column" }}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ padding: "12px", marginBottom: "15px", borderRadius: "5px", border: "1px solid #ccc" }} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required style={{ padding: "12px", marginBottom: "20px", borderRadius: "5px", border: "1px solid #ccc" }} />
        <button type="submit" style={{ padding: "12px", borderRadius: "5px", border: "none", backgroundColor: "#2563eb", color: "#fff", fontSize: "16px", cursor: "pointer" }}>Login</button>
      </form>
      <p style={{ marginTop: "15px", textAlign: "center" }}>Don't have an account? <Link to="/" style={{ color: "#4CAF50" }}>Register here</Link></p>
    </div>
  );
}

export default Login;
