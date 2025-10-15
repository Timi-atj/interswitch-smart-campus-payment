import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import App from "./App"; // Dashboard
import Login from "./Login";
import Signup from "./Signup";
import "./index.css";

const Root = () => {
  const isAuthenticated = !!localStorage.getItem("authToken");

  return (
    <Routes>
      {/* Default route */}
      <Route
        path="/"
        element={isAuthenticated ? <App /> : <Navigate to="/login" replace />}
      />

      {/* Auth routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Root />
    </BrowserRouter>
  </React.StrictMode>
);
