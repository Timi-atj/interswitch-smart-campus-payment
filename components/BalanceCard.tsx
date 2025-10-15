
import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { formatCurrency } from '../utils';
import type { Transaction } from '../types';

interface TransactionRowProps {
  tx: Transaction;
}

const TransactionRow: React.FC<TransactionRowProps> = ({ tx }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
  >
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-md bg-gradient-to-br from-[#00FFC6]/20 to-[#0099FF]/20 flex items-center justify-center text-xl">
        {tx.icon}
      </div>
      <div>
        <div className="text-sm font-medium">{tx.title}</div>
        <div className="text-xs text-white/60">{tx.subtitle}</div>
      </div>
    </div>
    <div className="text-right">
      <div className={`text-sm font-semibold ${tx.amount < 0 ? 'text-rose-400' : 'text-green-400'}`}>
        {tx.amount < 0 ? '-' : '+'} {formatCurrency(Math.abs(tx.amount))}
      </div>
      <div className="text-xs text-white/60">{tx.time}</div>
    </div>
  </motion.div>
);

interface BalanceCardProps {
  balance: number;
  transactions: Transaction[];
  onSendMoney: () => void;
}

const BalanceCard: React.FC<BalanceCardProps> = ({ balance, transactions, onSendMoney }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleTilt = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `perspective(1000px) rotateY(${x / 40}deg) rotateX(${-y / 40}deg)`;
  };

  const resetTilt = () => {
    const el = cardRef.current;
    if (el) el.style.transform = `perspective(1000px) rotateY(0deg) rotateX(0deg)`;
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleTilt}
      onMouseLeave={resetTilt}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, type: 'spring' }}
      className="relative overflow-hidden rounded-3xl p-6 backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 shadow-2xl"
      style={{ WebkitBackdropFilter: 'blur(16px)', backdropFilter: 'blur(16px)', transformStyle: 'preserve-3d' }}
    >
      <div className="pointer-events-none absolute inset-0 mix-blend-overlay opacity-10">
        <div className="w-full h-full bg-[linear-gradient(90deg,rgba(255,255,255,0.06),rgba(255,255,255,0.0))] animate-shimmer"></div>
      </div>
      
      <div className="flex items-start justify-between gap-6">
        <div>
          <h2 className="text-sm text-white/70">Available Balance</h2>
          <p className="text-4xl font-bold tracking-tight mt-1">{formatCurrency(balance)}</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={onSendMoney}
            className="relative overflow-hidden rounded-full px-5 py-2.5 bg-gradient-to-r from-[#00FFC6]/20 to-[#0099FF]/20 border border-white/8 hover:scale-105 transition-transform text-sm font-medium"
          >
            Send
            <span className="absolute -right-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 blur-md" />
          </button>
          <button className="rounded-full px-5 py-2.5 bg-white/5 border border-white/10 hover:bg-white/20 transition text-sm">Request</button>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-3 gap-4">
        {['Payments', 'Invoices', 'Cards'].map((t, i) => (
          <motion.div whileHover={{ y: -6 }} key={t} className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm cursor-pointer">
            <h3 className="text-xs text-white/70">{t}</h3>
            <p className="mt-2 text-lg font-semibold">{i === 0 ? '23' : i === 1 ? '5 unpaid' : '2 linked'}</p>
          </motion.div>
        ))}
      </div>

      <div className="mt-8">
        <h3 className="text-sm text-white/70 mb-3">Recent Activity</h3>
        <div className="space-y-3">
          {transactions.slice(0, 4).map((tx) => (
            <TransactionRow key={tx.id} tx={tx} />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default BalanceCard;
