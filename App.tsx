import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import Dashboard from "./Dashboard";

export default function App() {
  const isLoggedIn = !!localStorage.getItem("authToken");

  return (
    <Routes>
      {/* Default route -> go to login */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* Auth routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Protected route */}
      <Route
        path="/dashboard"
        element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" replace />}
      />

      {/* Wildcard fallback */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
