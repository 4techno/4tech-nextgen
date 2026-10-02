import React, { useState } from 'react';
import { ArrowUpRight, ArrowDown, Sparkles, Orbit, Radio, Cpu, Move3d } from 'lucide-react';
import GalaxyStage from './GalaxyStage';

export default function Hero() {
  const [stageMode, setStageMode] = useState('galaxy');

  return (
    <section id="top" className="relative min-h-screen pt-32 pb-20 flex flex-col justify-center overflow-hidden grid-blueprint">
      
      {/* Background ambient radial glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[750px] bg-gradient-to-tr from-[#ff3b55]/12 via-[#ff3b55]/5 to-transparent rounded-full blur-[140px] pointer-events-none" />

      {/* Decorative vertical rails matching 4tech */}
      <div className="hidden xl:flex fixed left-6 top-1/2 -translate-y-1/2 -rotate-90 origin-left text-[10px] font-mono text-zinc-600 tracking-[0.25em] items-center gap-2 pointer-events-none z-30">
        <span>INDEPENDENT THINKING</span>
        <span className="text-[#ff3b55]">+</span>
      </div>
      <div className="hidden xl:flex fixed right-6 top-1/2 -translate-y-1/2 rotate-90 origin-right text-[10px] font-mono text-zinc-600 tracking-[0.25em] items-center gap-2 pointer-events-none z-30">
        <span>INTEGRATED ENGINEERING</span>
        <span className="text-[#ff3b55]">+</span>
      </div>

      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Left Column: Core Narrative & Actions */}
        <div className="lg:col-span-6 flex flex-col items-start text-left">
          
          {/* Status Kicker */}
          <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-zinc-300 mb-6">
            <span className="w-2 h-2 rounded-full bg-[#ff3b55] animate-ping" />
            <span>Independent engineering & creative technology</span>
            <span className="text-zinc-500">· Kalpakkam</span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.05] mb-6">
            Ideas into <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f5f5f7] via-zinc-200 to-zinc-500">
              reality<span className="text-[#ff3b55]">.</span>
            </span>
          </h1>

          {/* Description */}
          <p className="text-lg sm:text-xl text-zinc-400 font-normal max-w-lg mb-8 leading-relaxed">
            A spark is only the beginning. <br />
            Projects that work. Knowledge that stays. <br />
            <span className="text-zinc-200">Engineering possibilities, together.</span>
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 w-full mb-10">
            <a
              href="#projects"
              className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white text-black font-semibold text-sm hover:bg-zinc-200 transition shadow-lg shadow-white/10"
            >
              <span>Explore the work</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>

            <a
              href="#contact"
              className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-sm font-semibold text-white transition"
            >
              <span>Start a conversation</span>
              <ArrowUpRight className="w-4 h-4 text-[#ff3b55]" />
            </a>
          </div>

          {/* 3D Mode Switcher (Field of Possibilities) */}
          <div className="w-full pt-4 border-t border-white/10">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest flex items-center gap-1.5">
                <Orbit className="w-3.5 h-3.5 text-[#ff3b55]" />
                <span>3D Stage Visualization:</span>
              </span>
              <span className="text-[11px] font-mono text-emerald-400">WebGL 60 FPS</span>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: 'galaxy', label: 'Field Galaxy', icon: Orbit },
                { id: 'antenna', label: 'RF Polar Lobe', icon: Radio },
                { id: 'robotics', label: '5-Axis Arm', icon: Move3d },
                { id: 'drone', label: 'ESP32 Drone', icon: Cpu }
              ].map(m => {
                const Icon = m.icon;
                return (
                  <button
                    key={m.id}
                    onClick={() => setStageMode(m.id)}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-mono transition ${
                      stageMode === m.id
                        ? 'bg-[#ff3b55] text-white font-bold shadow-md shadow-[#ff3b55]/25'
                        : 'bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10 border border-white/5'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{m.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* Right Column: 3D Interactive Stage */}
        <div className="lg:col-span-6 relative flex items-center justify-center">
          
          <div className="relative w-full aspect-square max-w-[560px] rounded-3xl p-1 bg-gradient-to-b from-white/15 via-white/5 to-transparent shadow-2xl">
            <div className="w-full h-full bg-[#080a0e]/95 rounded-[22px] overflow-hidden relative border border-white/10 flex flex-col justify-between">
              
              {/* Header telemetry info */}
              <div className="p-4 flex items-center justify-between border-b border-white/10 bg-black/40 backdrop-blur z-20">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ff3b55] inline-block" />
                  <span className="text-xs font-mono text-zinc-300 font-medium">
                    4TECH // FIELD_OF_POSSIBILITIES
                  </span>
                </div>
                <div className="flex items-center gap-2 font-mono text-[11px] text-zinc-500">
                  <span>STAGE:</span>
                  <span className="text-white uppercase">{stageMode}</span>
                </div>
              </div>

              {/* Three.js Canvas */}
              <div className="relative flex-1 w-full min-h-[380px]">
                <GalaxyStage
                  mode={stageMode}
                  interactive={true}
                  particleCount={2400}
                  className="w-full h-full absolute inset-0"
                />
              </div>

              {/* Footer Hint */}
              <div className="p-3 bg-black/60 backdrop-blur border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-zinc-400 z-20">
                <span className="flex items-center gap-1.5">
                  <span className="text-[#ff3b55]">⌖</span>
                  <span>Move cursor to orbit 3D space</span>
                </span>
                <span className="text-zinc-500">2,400 Nodes</span>
              </div>

            </div>
          </div>

        </div>

      </div>

      {/* Hero Bottom Navigation cue */}
      <div className="max-w-7xl mx-auto px-6 w-full mt-12 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-zinc-500 gap-4">
        <a href="#expertise" className="flex items-center gap-2 text-zinc-400 hover:text-white transition">
          <ArrowDown className="w-3.5 h-3.5 text-[#ff3b55] animate-bounce" />
          <span>Discover what we do</span>
        </a>
        <div className="tracking-widest uppercase">
          A FIELD OF POSSIBILITIES. MOVE TO EXPLORE.
        </div>
        <div className="text-[#ff3b55] font-semibold">
          KALPAKKAM / INDIA
        </div>
      </div>

    </section>
  );
}
