
import React from 'react';
import { motion } from 'framer-motion';

interface QuickActionButtonProps {
    label: string;
}

const QuickActionButton: React.FC<QuickActionButtonProps> = ({ label }) => {
  return (
    <motion.button whileHover={{ scale: 1.03 }} className="w-full text-left px-4 py-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
      <div className="flex items-center justify-between">
        <div className="text-sm font-medium">{label}</div>
        <div className="text-xs text-white/60">→</div>
      </div>
    </motion.button>
  );
};

const Sidebar: React.FC = () => {
    const cardVariants = {
        hidden: { opacity: 0, y: 16 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.1,
                type: 'spring',
                stiffness: 100
            }
        })
    };

    return (
        <div className="space-y-6">
            <motion.div custom={0} initial="hidden" animate="visible" variants={cardVariants} className="rounded-2xl p-4 bg-white/5 border border-white/10 backdrop-blur-sm">
                <h4 className="text-sm text-white/70 px-1">Quick Actions</h4>
                <div className="mt-3 grid grid-cols-1 gap-3">
                    <QuickActionButton label="Generate Invoice" />
                    <QuickActionButton label="Scan QR Code" />
                    <QuickActionButton label="Top Up Balance" />
                </div>
            </motion.div>

            <motion.div custom={1} initial="hidden" animate="visible" variants={cardVariants} className="rounded-2xl p-4 bg-white/5 border border-white/10 backdrop-blur-sm">
                <h4 className="text-sm text-white/70 px-1">Linked Cards</h4>
                <div className="mt-3 space-y-3">
                    <div className="p-3 rounded-lg bg-white/5 border border-white/10 text-sm">VISA •••• 1234</div>
                    <div className="p-3 rounded-lg bg-white/5 border border-white/10 text-sm">Mastercard •••• 9876</div>
                </div>
            </motion.div>

            <motion.div custom={2} initial="hidden" animate="visible" variants={cardVariants} className="rounded-2xl p-4 bg-white/5 border border-white/10 backdrop-blur-sm">
                <h4 className="text-sm text-white/70 px-1">Security</h4>
                <div className="mt-3 text-xs text-white/60 px-1">Biometric login and OTP confirmations are enabled for all transactions.</div>
            </motion.div>
        </div>
    );
};

export default Sidebar;
