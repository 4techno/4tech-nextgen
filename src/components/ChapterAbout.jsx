import React, { useState } from 'react';
import { ArrowUpRight, MapPin, GraduationCap, Terminal, Cpu, Orbit, FileText, Download } from 'lucide-react';
import GalaxyStage from './GalaxyStage';
import { sound } from '../utils/soundEngine';

export default function ChapterAbout({ onExploreWorks, onOpenResume }) {
  const [stageMode, setStageMode] = useState('galaxy');

  return (
    <section id="architect" className="relative min-h-screen pt-36 pb-28 px-6 overflow-hidden border-b border-white/5">
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[850px] bg-gradient-to-tr from-[#c89f68]/10 via-[#ff3b55]/5 to-transparent rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Chapter Header Card matching Symphony of Vines */}
        <div className="max-w-3xl mb-14">
          <div className="flex items-center gap-2 mb-3">
            <span className="font-mono text-xs text-[#c89f68] font-bold">CHAPTER 01</span>
            <span className="text-zinc-600">//</span>
            <span className="text-xs font-mono tracking-widest text-zinc-400 uppercase">PROFILE & PHILOSOPHY</span>
          </div>

          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white mb-6 uppercase">
            Creative Technology &amp; <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#e8d5be] to-[#c89f68]">
              Spatial Systems
            </span>
          </h2>

          <p className="font-sans text-base sm:text-xl text-zinc-300 max-w-2xl leading-relaxed font-light">
            I’m Mohammed Vashir — an electrical systems engineer and creative technologist based in Kalpakkam, India. I specialize in spatial 3D web experiences, physical computing architectures, and kinetic robotics where high-performance software meets precision hardware.
          </p>
        </div>

        {/* Bento Grid: 3D Holographic Stage + Editorial Telemetry */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left: Interactive 3D Systems Stage */}
          <div className="lg:col-span-7 glass-card-luxury rounded-3xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden">
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
              <div className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-[#c89f68] animate-ping" />
                <span className="text-xs font-mono text-zinc-300 tracking-wider uppercase font-medium">
                  Spatial Model Inspector
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                {[
                  { id: 'galaxy', label: 'Field Galaxy' },
                  { id: 'antenna', label: 'RF Polar' },
                  { id: 'robotics', label: '5-Axis Arm' },
                  { id: 'drone', label: 'ESP32 Drone' }
                ].map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setStageMode(m.id)}
                    className={`px-3 py-1 rounded-lg text-[10px] font-mono uppercase transition ${
                      stageMode === m.id
                        ? 'bg-[#c89f68] text-black font-bold shadow-md'
                        : 'bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {m.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Three.js Interactive Galaxy Canvas */}
            <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] rounded-2xl overflow-hidden bg-black/60 border border-white/5">
              <GalaxyStage
                mode={stageMode}
                interactive={true}
                particleCount={2200}
                className="w-full h-full"
              />
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="text-xs font-mono text-zinc-400">
                <span className="text-[#c89f68] font-bold">R&amp;D DIRECTIVE:</span> First-principles engineering &amp; physical validation
              </div>
              <div className="flex flex-wrap items-center gap-3">
                {onOpenResume && (
                  <button
                    onClick={() => {
                      sound.playSubtleClick();
                      onOpenResume();
                    }}
                    className="px-4 py-2.5 rounded-xl border border-[#c89f68]/40 bg-[#c89f68]/15 hover:bg-[#c89f68] hover:text-black text-[#c89f68] font-semibold text-xs font-mono transition flex items-center gap-2 cursor-pointer shadow-md shadow-[#c89f68]/15"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>Curriculum Vitae</span>
                  </button>
                )}
                <button
                  onClick={onExploreWorks}
                  className="px-5 py-2.5 rounded-xl bg-white text-black font-semibold text-xs font-mono hover:bg-[#c89f68] hover:text-white transition flex items-center gap-2 shadow-lg cursor-pointer"
                >
                  <span>Explore Selected Works</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Right: Atelier Credentials & Manifesto */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            
            <div className="glass-card p-6 sm:p-8 rounded-3xl space-y-5">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#c89f68] to-[#9d6e46] p-0.5">
                  <div className="w-full h-full bg-[#0d0f14] rounded-2xl flex items-center justify-center font-display font-bold text-white text-lg">
                    MV
                  </div>
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg text-white">Mohammed Vashir</h3>
                  <p className="text-xs font-mono text-[#c89f68]">Principal Technologist &amp; Researcher</p>
                </div>
              </div>

              <div className="space-y-2.5 pt-3 border-t border-white/5 text-xs font-mono text-zinc-300">
                <div className="flex items-center gap-2.5">
                  <GraduationCap className="w-4 h-4 text-[#c89f68] shrink-0" />
                  <span>B.Tech Electrical &amp; Electronics Engineering</span>
                </div>
                <div className="flex items-center gap-2.5 text-zinc-400">
                  <MapPin className="w-4 h-4 text-zinc-500 shrink-0" />
                  <span>Kalpakkam Nuclear &amp; Energy Corridor, India</span>
                </div>
                <div className="pt-2 flex items-center gap-3">
                  <a
                    href="/Mohammed_Vashir_Resume.pdf"
                    download="Mohammed_Vashir_Resume.pdf"
                    className="inline-flex items-center gap-1.5 text-xs font-mono text-[#c89f68] hover:underline"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Official CV (.pdf)</span>
                  </a>
                </div>
              </div>

              <p className="text-sm text-zinc-300 leading-relaxed font-light pt-2">
                "Technology reaches its highest state when the barrier between software abstraction and physical mechanics dissolves. Every system is built from fundamental silicon, physics, and kinematics into an expressive, empirical reality."
              </p>
            </div>

            {/* Quick Stats Telemetry */}
            <div className="grid grid-cols-2 gap-4">
              <div className="glass-card p-5 rounded-2xl border border-white/5">
                <span className="font-display text-3xl font-extrabold text-[#c89f68]">15</span>
                <p className="text-xs font-mono text-zinc-300 mt-1 font-medium">Engineered Hardware Systems</p>
                <span className="text-[10px] font-mono text-zinc-500">Working Prototypes</span>
              </div>
              <div className="glass-card p-5 rounded-2xl border border-white/5">
                <span className="font-display text-3xl font-extrabold text-white">06</span>
                <p className="text-xs font-mono text-zinc-300 mt-1 font-medium">Core Technical Disciplines</p>
                <span className="text-[10px] font-mono text-zinc-500">Cross-domain Mastery</span>
              </div>
            </div>

            <div className="glass-card p-4 rounded-2xl border border-white/5 flex items-center justify-between text-xs font-mono text-zinc-400">
              <span className="text-zinc-500">Primary Stack:</span>
              <span className="text-zinc-200">Three.js · GLSL · KiCad PCB · ESP32 · ROS · PyTorch</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
