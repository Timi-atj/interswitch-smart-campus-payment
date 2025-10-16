import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import AnimatedBackground from "./components/AnimatedBackground";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      localStorage.setItem("authToken", "mock123");
      navigate("/Dashboard");
    }, 1000);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-[#081420] via-[#071124] to-[#02060a] text-white relative overflow-hidden">
      <AnimatedBackground />
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, type: "spring" }}
        className="relative z-10 w-[90%] max-w-md bg-gradient-to-br from-white/10 to-white/5 border border-white/10 backdrop-blur-xl rounded-2xl shadow-2xl p-8"
      >
        <h2 className="text-2xl font-semibold mb-1">Welcome Back</h2>
        <p className="text-sm text-white/60 mb-6">
          Log in to your SmartPay account
        </p>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-xs text-white/70">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 w-full rounded-lg p-3 bg-transparent border border-white/20 outline-none focus:ring-2 focus:ring-[#00FFC6]/50 transition"
            />
          </div>

          <div>
            <label className="text-xs text-white/70">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 w-full rounded-lg p-3 bg-transparent border border-white/20 outline-none focus:ring-2 focus:ring-[#0099FF]/50 transition"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg bg-gradient-to-r from-[#00FFC6]/30 to-[#0099FF]/30 hover:opacity-80 transition"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-xs text-white/50 text-center mt-6">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-[#00FFC6] hover:underline">
            Sign up
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
