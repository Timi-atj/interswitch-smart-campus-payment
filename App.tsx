import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import Dashboard from "./Dashboard";

export default function App() {
  const isLoggedIn = !!localStorage.getItem("authToken");

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route
        path="/dashboard"
        element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" replace />}
      />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
