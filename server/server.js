// server.js
import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Use Render’s dynamic port or local fallback
const PORT = process.env.PORT || 4000;

// ✅ Environment variables for sandbox credentials
const CLIENT_ID = process.env.CLIENT_ID || "your_client_id_here";
const CLIENT_SECRET = process.env.CLIENT_SECRET || "your_client_secret_here";
const BASE_URL = "https://sandbox.interswitchng.com";

// ✅ Health check route (helps Render detect app status)
app.get("/", (req, res) => {
  res.send("✅ SmartPay backend is live (Render deployment ready).");
});

// ✅ Demo payment route
app.post("/api/pay", async (req, res) => {
  const { amount, customerId, reference } = req.body;

  try {
    // Simulate redirect to Interswitch sandbox
    const paymentUrl = `${BASE_URL}/webpay/paydemo?ref=${reference}&amount=${amount}`;

    res.json({
      message: "Payment initialized (sandbox)",
      paymentUrl,
      reference,
    });
  } catch (error) {
    console.error("Payment error:", error);
    res.status(500).json({ error: "Payment initialization failed" });
  }
});

// ✅ Serve frontend build (only when in production)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "dist")));

  app.get("*", (_, res) => {
    res.sendFile(path.join(__dirname, "dist", "index.html"));
  });
}

// ✅ Start server
app.listen(PORT, () => {
  console.log(`✅ SmartPay backend running on port ${PORT}`);
});
