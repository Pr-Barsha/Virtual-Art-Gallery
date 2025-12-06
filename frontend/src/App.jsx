import React, { useContext } from "react";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminUpload from "./pages/AdminUpload";
import Gallery from "./components/Gallery";
import { AuthProvider, AuthContext } from "./context/AuthContext";

function ProtectedRoute({ children }) {
  const { user } = useContext(AuthContext);
  return user ? children : <Navigate to="/login" />;
}

function AppShell() {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50 to-indigo-100">
      <nav className="w-full bg-white/30 backdrop-blur-lg shadow-lg border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
            🎨 Virtual Art Gallery
          </h1>

          <div className="flex items-center gap-8 text-lg font-semibold">
            <Link to="/" className="text-gray-700 hover:text-purple-600">
              Gallery
            </Link>
            <Link to="/upload" className="text-gray-700 hover:text-indigo-600">
              Admin Upload
            </Link>

            {user ? (
              <button
                onClick={logout}
                className="px-4 py-2 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="px-4 py-2 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </nav>

      <div className="p-8 max-w-7xl mx-auto animate-fadeIn">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route
            path="/upload"
            element={
              <ProtectedRoute>
                <AdminUpload />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppShell />
    </AuthProvider>
  );
}
