// server.js
import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4000;

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const MERCHANT_CODE = process.env.MERCHANT_CODE;
const BASE_URL = "https://sandbox.interswitchng.com";

// 🪙 Get Access Token
async function getAccessToken() {
  const tokenUrl = `${BASE_URL}/passport/oauth/token`;

  const headers = {
    "Content-Type": "application/x-www-form-urlencoded",
    Authorization:
      "Basic " + Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64"),
  };

  const body = new URLSearchParams({
    grant_type: "client_credentials",
  });

  const response = await fetch(tokenUrl, {
    method: "POST",
    headers,
    body,
  });

  if (!response.ok) throw new Error("Failed to get access token");

  const data = await response.json();
  return data.access_token;
}

// 💳 Initialize Payment
app.post("/api/pay", async (req, res) => {
  const { amount, customerId, reference } = req.body;

  try {
    const accessToken = await getAccessToken();

    const initUrl = `${BASE_URL}/api/v1/payments`;
    const headers = {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    };

    const payload = {
      amount,
      currency: "566", // NGN
      merchantCode: MERCHANT_CODE,
      payItemId: "Default_Pay_Item",
      transactionReference: reference,
      redirectUrl: "https://your-frontend-domain.com/payment-success",
      customerId,
      customerEmail: "test@example.com",
    };

    const response = await fetch(initUrl, {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    console.log("Interswitch IPG response:", data);

    // Respond to frontend
    if (data.paymentUrl) {
      res.json({ paymentUrl: data.paymentUrl });
    } else {
      res.json({ message: "Payment initialized", data });
    }
  } catch (error) {
    console.error("Payment error:", error);
    res.status(500).json({ error: error.message });
  }
});

app.get("/", (req, res) => {
  res.send("✅ SmartPay IPG backend live on Render!");
});

app.listen(PORT, () =>
  console.log(`✅ SmartPay backend running on port ${PORT}`)
);
