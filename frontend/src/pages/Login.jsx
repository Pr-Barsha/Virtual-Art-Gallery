import React, { useState, useContext } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post("/auth/login", { email, password });
      login({ token: data.token, user: data.user });
      nav("/");
    } catch (err) {
      alert(err.response?.data?.msg || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-lg">
        <h1 className="text-2xl font-bold mb-4">Login</h1>
        <form onSubmit={submit} className="space-y-4">
          <input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border rounded"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border rounded"
          />
          <button className="w-full py-3 bg-orange-500 text-white rounded">
            Login
          </button>
        </form>
        <p className="mt-4">
          No account?{" "}
          <Link to="/register" className="text-orange-500">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
