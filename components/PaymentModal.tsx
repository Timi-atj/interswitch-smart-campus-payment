import React, { useState } from "react";
import { motion } from "framer-motion";

interface PaymentModalProps {
  onClose: () => void;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ onClose }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!recipient || !amount) {
      alert("Please fill in all fields.");
      return;
    }

    setIsProcessing(true);

    try {
      // Call your backend that talks to Interswitch
      const response = await fetch("http://localhost:4000/api/pay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: Number(amount) * 100, // Convert ₦100 → 10000 kobo
          customerId: recipient,
          reference: "TXN_" + Date.now(),
        }),
      });

      const data = await response.json();
      console.log("Interswitch response:", data);

      // 🔹 If the backend returns a redirect URL (sandbox gateway)
      if (data?.paymentUrl) {
        window.location.href = data.paymentUrl;
      } else {
        alert("Payment initialized — check console for details.");
      }
    } catch (error) {
      console.error(error);
      alert("Payment failed. Please check console for details.");
    } finally {
      setIsProcessing(false);
      onClose();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.22, type: "spring", stiffness: 120 }}
        className="relative rounded-2xl p-6 w-full max-w-lg bg-gradient-to-br from-white/10 to-white/5 border border-white/10 backdrop-blur-xl"
      >
        <h3 className="text-lg font-semibold">Send Money</h3>
        <p className="text-sm text-white/60 mt-1">
          Use Interswitch to process the transaction securely.
        </p>

        <form className="mt-4 space-y-4" onSubmit={handlePayment}>
          <div>
            <label className="text-xs text-white/70">Recipient (Email / ID)</label>
            <input
              required
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              placeholder="Recipient email or merchant ID"
              className="mt-2 w-full rounded-lg p-3 bg-transparent border border-white/20 outline-none focus:ring-2 focus:ring-[#00FFC6]/50 transition-shadow"
            />
          </div>
          <div>
            <label className="text-xs text-white/70">Amount (₦)</label>
            <input
              required
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className="mt-2 w-full rounded-lg p-3 bg-transparent border border-white/20 outline-none focus:ring-2 focus:ring-[#0099FF]/50 transition-shadow"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition"
              disabled={isProcessing}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#00FFC6]/30 to-[#0099FF]/30 hover:opacity-80 transition-opacity"
              disabled={isProcessing}
            >
              {isProcessing ? "Processing..." : "Confirm Payment"}
            </button>
          </div>
        </form>

        {isProcessing && (
          <div className="mt-4">
            <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-[#00FFC6] to-[#0099FF] animate-progress" />
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default PaymentModal;
