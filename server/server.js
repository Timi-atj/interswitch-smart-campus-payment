// server.js
import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
app.use(cors());
app.use(express.json());

// Sandbox credentials (replace with your real merchant keys later)
const CLIENT_ID = "your_client_id_here";
const CLIENT_SECRET = "your_client_secret_here";
const BASE_URL = "https://sandbox.interswitchng.com";

app.post("/api/pay", async (req, res) => {
  const { amount, customerId, reference } = req.body;

  try {
    // 🔹 Step 1: Simulate payment initialization
    // In a real implementation, you’d get an access token first, then initialize the transaction.
    // For demo, just send back a mock redirect URL.
    const paymentUrl = `${BASE_URL}/webpay/paydemo?ref=${reference}&amount=${amount}`;

    // Send response back to frontend
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

const PORT = 4000;
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
