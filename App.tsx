
import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { sampleTransactions } from './constants';
import AnimatedBackground from './components/AnimatedBackground';
import Header from './components/Header';
import BalanceCard from './components/BalanceCard';
import AnalyticsChart from './components/AnalyticsChart';
import Sidebar from './components/Sidebar';
import PaymentModal from './components/PaymentModal';

export default function App() {
  const [themeDark, setThemeDark] = useState(true);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [balance] = useState(54230.75);
  const [transactions] = useState(sampleTransactions);

  return (
    <div className={"min-h-screen w-full transition-colors duration-300 " + (themeDark ? "bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-[#081420] via-[#071124] to-[#02060a] text-white" : "bg-slate-50 text-slate-900")}>
      <AnimatedBackground />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        <Header themeDark={themeDark} onToggleTheme={() => setThemeDark(d => !d)} />

        <main className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-8">
          <div className="lg:col-span-8 flex flex-col gap-6">
            <BalanceCard
              balance={balance}
              transactions={transactions}
              onSendMoney={() => setShowPaymentModal(true)}
            />
            <AnalyticsChart transactions={transactions} />
          </div>

          <aside className="lg:col-span-4">
            <Sidebar />
          </aside>
        </main>
      </div>

      <AnimatePresence>
        {showPaymentModal && (
          <PaymentModal onClose={() => setShowPaymentModal(false)} />
        )}
      </AnimatePresence>
      
      <footer className="fixed left-6 bottom-6 text-xs text-white/50 z-20">SmartPay • Prototype</footer>
    </div>
  );
}
