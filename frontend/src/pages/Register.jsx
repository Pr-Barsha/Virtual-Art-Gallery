import React, { useState, useContext } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Register() {
  const { login } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post("/auth/register", {
        name,
        email,
        password,
      });
      login({ token: data.token, user: data.user });
      nav("/");
    } catch (err) {
      alert(err.response?.data?.message || "Register failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-lg">
        <h1 className="text-2xl font-bold mb-4">Register</h1>
        <form onSubmit={submit} className="space-y-4">
          <input
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 border rounded"
          />
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
            Register
          </button>
        </form>
        <p className="mt-4">
          Have an account?{" "}
          <Link to="/login" className="text-orange-500">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
