import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("authToken", "mock123");
    navigate("/");
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-[#081420] via-[#071124] to-[#02060a] text-white relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, type: "spring" }}
        className="relative z-10 w-[90%] max-w-md bg-gradient-to-br from-white/10 to-white/5 border border-white/10 backdrop-blur-xl rounded-2xl shadow-2xl p-8"
      >
        <h2 className="text-2xl font-semibold text-center mb-6">Create Account</h2>

        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label className="text-xs text-white/70">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-2 w-full rounded-lg p-3 bg-transparent border border-white/20 text-white placeholder-white/40 outline-none focus:ring-2 focus:ring-[#00FFC6]/50"
            />
          </div>

          <div>
            <label className="text-xs text-white/70">Password</label>
            <input
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-2 w-full rounded-lg p-3 bg-transparent border border-white/20 text-white placeholder-white/40 outline-none focus:ring-2 focus:ring-[#0099FF]/50"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 mt-2 rounded-lg bg-gradient-to-r from-[#00FFC6]/30 to-[#0099FF]/30 hover:opacity-80 transition-opacity"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-sm text-white/60 mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-[#00FFC6] hover:underline">
            Log in
          </Link>
        </p>
      </motion.div>

      <footer className="absolute bottom-6 text-xs text-white/40">SmartPay • Prototype</footer>
    </div>
  );
}
