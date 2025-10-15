
import React from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell } from 'recharts';
import type { Transaction } from '../types';
import { formatCurrency } from '../utils';

interface AnalyticsChartProps {
  transactions: Transaction[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg p-2 backdrop-blur-lg bg-slate-900/50 border border-white/10 text-xs">
        <p className="font-bold">{label}</p>
        <p className="text-cyan-300">{`Spending: ${formatCurrency(payload[0].value)}`}</p>
      </div>
    );
  }
  return null;
};

const AnalyticsChart: React.FC<AnalyticsChartProps> = ({ transactions }) => {
  const spendingData = transactions
    .filter(tx => tx.amount < 0)
    .map(tx => ({ name: tx.title, spending: Math.abs(tx.amount) }))
    .slice(0, 5)
    .reverse();

  const colors = ["#00FFC6", "#00E0FF", "#00C2FF", "#00A3FF", "#0099FF"];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, type: 'spring', delay: 0.1 }}
      className="rounded-3xl p-6 bg-white/5 border border-white/10 backdrop-blur-sm"
    >
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-sm text-white/70">Spending (Last 5)</h4>
        <div className="text-xs text-white/60">Past 30d</div>
      </div>
      <div className="w-full h-48">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={spendingData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
            <defs>
                <linearGradient id="colorSpending" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00FFC6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#0099FF" stopOpacity={0.4}/>
                </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
            <XAxis dataKey="name" tick={{ fill: 'rgba(255, 255, 255, 0.6)', fontSize: 11 }} tickLine={false} axisLine={false} />
            <YAxis tick={{ fill: 'rgba(255, 255, 255, 0.6)', fontSize: 11 }} tickFormatter={(value) => `₦${Number(value) / 1000}k`} tickLine={false} axisLine={false} />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255, 255, 255, 0.05)' }}/>
            <Bar dataKey="spending" radius={[4, 4, 0, 0]}>
                 {spendingData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default AnalyticsChart;
