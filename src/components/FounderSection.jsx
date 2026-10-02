import React from 'react';
import { ArrowUpRight, Mail, Phone, MapPin, GraduationCap, Building2, CheckCircle } from 'lucide-react';
import FounderScene from './FounderScene';

export default function FounderSection() {
  return (
    <section id="founder" className="py-24 px-6 border-t border-white/10 relative overflow-hidden">
      <FounderScene className="opacity-30" />
      <div className="max-w-7xl mx-auto relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Visual card & Credentials */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl p-1 bg-gradient-to-b from-white/20 via-white/5 to-transparent shadow-2xl">
              <div className="glass-card rounded-[22px] p-8 border border-white/10 relative overflow-hidden">
                
                {/* Glow backdrop */}
                <div className="absolute -top-16 -right-16 w-40 h-40 rounded-full bg-[#ff3b55]/20 blur-3xl pointer-events-none" />

                <div className="text-[11px] font-mono text-zinc-500 uppercase tracking-widest mb-6">
                  FIG. 01 — THE PERSON BEHIND THE PROJECTS
                </div>

                {/* Avatar / Portrait placeholder */}
                <div className="w-24 h-24 rounded-2xl bg-gradient-to-tr from-[#ff3b55] to-zinc-700 p-0.5 mb-6">
                  <div className="w-full h-full bg-[#0d0f14] rounded-2xl flex items-center justify-center font-bold text-3xl text-white font-mono">
                    MV
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-white mb-1">
                  Mohammed Vashir
                </h3>
                <p className="text-xs font-mono text-[#ff3b55] uppercase tracking-wider mb-6">
                  Founder & Principal Technologist // 4tech
                </p>

                <div className="space-y-3 text-xs font-mono text-zinc-400 pt-4 border-t border-white/5">
                  <div className="flex items-center gap-2.5">
                    <GraduationCap className="w-4 h-4 text-[#ff3b55] shrink-0" />
                    <span>B.Tech Electrical & Electronics Engineering</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Building2 className="w-4 h-4 text-zinc-500 shrink-0" />
                    <span>B.S. Abdur Rahman Crescent Institute (BSACIST)</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <MapPin className="w-4 h-4 text-zinc-500 shrink-0" />
                    <span>Kalpakkam, Tamil Nadu · India</span>
                  </div>
                </div>

                {/* Direct quick action badges */}
                <div className="mt-8 pt-6 border-t border-white/5 flex flex-wrap gap-2">
                  <a
                    href="https://wa.me/919360108408"
                    target="_blank"
                    rel="noreferrer"
                    className="px-3.5 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 text-xs font-mono text-emerald-400 flex items-center gap-1.5 transition"
                  >
                    <span>WhatsApp Me</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </a>
                  <a
                    href="mailto:mohammedvashir75@gmail.com"
                    className="px-3.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-zinc-300 flex items-center gap-1.5 transition"
                  >
                    <Mail className="w-3 h-3 text-[#ff3b55]" />
                    <span>Direct Email</span>
                  </a>
                </div>

              </div>
            </div>
          </div>

          {/* Right Column: Founder Narrative */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-6">
            
            <div className="text-xs font-mono text-[#ff3b55] uppercase tracking-widest flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff3b55]" />
              <span>{'{ 03 / THE FOUNDER }_'}</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Engineer by study. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-200 via-zinc-400 to-zinc-600">
                Builder by instinct.
              </span>
            </h2>

            <p className="text-zinc-300 text-base sm:text-lg leading-relaxed">
              I’m Mohammed Vashir, an electrical and electronics engineering researcher based in Kalpakkam, India. My practice bridges embedded hardware, robotic kinematics, radio frequency analysis, and computer vision.
            </p>

            <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
              I founded 4tech to move engineering beyond theoretical textbooks and slide decks into working physical prototypes that solve tangible problems. Whether it's an automated antenna testbench or a tracked disaster rescue vehicle, every system is designed from first principles with a rigorous path to empirical validation.
            </p>

            <div className="grid grid-cols-2 gap-4 w-full pt-4 border-t border-white/10">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                <span className="text-xs font-mono text-zinc-500 uppercase">Focus Areas</span>
                <p className="text-sm font-semibold text-white mt-1">Robotics, Embedded, RF & AI</p>
              </div>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                <span className="text-xs font-mono text-zinc-500 uppercase">Collaborating With</span>
                <p className="text-sm font-semibold text-white mt-1">Founders, Students & Labs</p>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <a
                href="#contact"
                className="px-6 py-3 rounded-xl bg-white text-black font-semibold text-xs transition hover:bg-zinc-200 flex items-center gap-1.5"
              >
                <span>Discuss a Collaboration</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>

              <a
                href="https://www.linkedin.com/in/mohammed-vashir-793b89378/"
                target="_blank"
                rel="noreferrer"
                className="px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-zinc-300 hover:text-white transition flex items-center gap-1.5"
              >
                <span>LinkedIn Profile</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
