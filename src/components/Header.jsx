import React from 'react';
import { ArrowUpRight, Compass, Cpu, Radio, Shield } from 'lucide-react';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-white/10 px-6 py-3.5 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Wordmark */}
        <div className="flex items-center gap-4">
          <a href="#top" className="flex items-center gap-1.5 group cursor-pointer">
            <span className="font-extrabold text-2xl tracking-tighter text-white">
              <span className="text-[#ff3b55]">4</span>tech<span className="text-[#ff3b55]">.</span>
            </span>
          </a>

          {/* Location badge */}
          <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-mono text-zinc-400">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ff3b55] animate-pulse"></span>
            <span>Kalpakkam, IN · 12.50° N, 80.16° E</span>
          </div>
        </div>

        {/* Main navigation */}
        <nav className="hidden md:flex items-center gap-8 text-[13px] font-mono tracking-tight text-zinc-400">
          <a href="#projects" className="hover:text-white transition flex items-center gap-1">
            <span>Work</span>
            <span className="text-[10px] text-zinc-600 font-bold">15</span>
          </a>
          <a href="#expertise" className="hover:text-white transition">Expertise</a>
          <a href="#method" className="hover:text-white transition">Process</a>
          <a href="#founder" className="hover:text-white transition">Founder</a>
          <a href="#contact" className="hover:text-white transition">Contact</a>
        </nav>

        {/* Action Button */}
        <div className="flex items-center gap-3">
          <a
            href="https://wa.me/919360108408"
            target="_blank"
            rel="noreferrer"
            className="hidden sm:flex items-center gap-1 px-3.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-zinc-300 hover:text-white transition"
          >
            <span>WhatsApp</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>

          <a
            href="#contact"
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#ff3b55] hover:bg-[#ff203e] text-white text-xs font-semibold tracking-wide shadow-lg shadow-[#ff3b55]/25 transition"
          >
            <span>Let's build</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>
    </header>
  );
}
