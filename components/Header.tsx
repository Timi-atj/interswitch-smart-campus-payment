
import React from 'react';
import { SunIcon, MoonIcon, CreditCardIcon, ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";

interface HeaderProps {
  themeDark: boolean;
  onToggleTheme: () => void;
}

const Header: React.FC<HeaderProps> = ({ themeDark, onToggleTheme }) => {
  return (
    <header className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="rounded-xl p-2 bg-white/5 backdrop-blur-md border border-white/6 shadow-lg">
          <CreditCardIcon className="w-7 h-7 text-white/90" />
        </div>
        <h1 className="text-2xl font-semibold tracking-tight">SmartPay</h1>
        <span className="hidden sm:inline text-sm text-white/60">— Dark Glass MVP</span>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={onToggleTheme}
          className="group p-2 rounded-md bg-white/5 hover:bg-white/10 transition-colors"
          aria-label="Toggle theme"
        >
          {themeDark ? <SunIcon className="w-5 h-5 text-yellow-300" /> : <MoonIcon className="w-5 h-5 text-sky-300" />}
        </button>

        <button className="flex items-center gap-2 px-3 py-2 rounded-xl bg-gradient-to-r from-[#00FFC6]/30 to-[#0099FF]/20 backdrop-blur-sm border border-white/5 hover:scale-105 transition-transform">
          <span className="text-sm">Connect Interswitch</span>
          <ArrowRightOnRectangleIcon className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
};

export default Header;
