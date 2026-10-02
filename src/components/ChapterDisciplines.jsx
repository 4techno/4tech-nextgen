import React from 'react';
import { Cpu, Move3d, Radio, Sparkles, Binary, Microscope } from 'lucide-react';
import DisciplinesScene from './DisciplinesScene';

const disciplines = [
  {
    num: '01',
    code: 'MECHANICS',
    name: 'Advanced Mechanical Engineering',
    desc: 'First-principles mechanical design, structural finite element analysis (FEA), precision CAD modeling, and thermal management for high-stress deployments.',
    icon: Cpu,
    tags: ['Mechanical CAD', 'FEA Stress Analysis', 'Rapid Prototyping']
  },
  {
    num: '02',
    code: 'KINEMATICS',
    name: 'Robotics & Control Systems',
    desc: 'Multi-axis articulated inverse kinematics, closed-loop feedback motor drivers, trajectory planning solvers, and mobile all-terrain chassis.',
    icon: Move3d,
    tags: ['Inverse Kinematics', 'Closed-Loop PID', 'Mobile Platforms']
  },
  {
    num: '03',
    code: 'SILICON',
    name: 'Embedded Systems & PCB Design',
    desc: 'Custom multi-layer PCB design in KiCad, ESP32 and ARM Cortex firmware orchestration, bare-metal RTOS scheduling, and low-latency bus protocols.',
    icon: Binary,
    tags: ['KiCad PCB', 'ARM / ESP32', 'FreeRTOS / I2C / SPI']
  },
  {
    num: '04',
    code: 'RF & EM',
    name: 'RF & Electromagnetics',
    desc: 'Antenna radiation pattern characterization, software-defined radio (SDR) spectrum analysis, passive RF direction-finding, and phased array modeling.',
    icon: Radio,
    tags: ['SDR Architecture', 'Radiation Patterns', 'Direction Finding']
  },
  {
    num: '05',
    code: 'VISION & AI',
    name: 'Computer Vision & Edge AI',
    desc: 'Closed-loop spatial computer vision, real-time object tracking with OpenCV, and embedded neural inference networks for autonomous decision-making.',
    icon: Sparkles,
    tags: ['OpenCV', 'Edge Inference', 'Spatial Tracking']
  },
  {
    num: '06',
    code: 'FRONTIER',
    name: 'Applied Physics & Frontier R&D',
    desc: 'Empirical research into high-frequency resonant power transfer, electromagnetic gradient profiling, and custom sensor instrumentation.',
    icon: Microscope,
    tags: ['Resonant Power', 'Electromagnetics', 'Sensor Metrology']
  }
];

export default function ChapterDisciplines() {
  return (
    <section id="disciplines" className="relative min-h-screen py-32 px-6 overflow-hidden border-b border-white/5">
      
      {/* 3D PCB Topology Background */}
      <DisciplinesScene className="opacity-35" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Chapter Header Card matching Symphony of Vines */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 mb-3">
            <span className="font-mono text-xs text-[#c89f68] font-bold">CHAPTER 03</span>
            <span className="text-zinc-600">//</span>
            <span className="text-xs font-mono tracking-widest text-zinc-400 uppercase">CORE COMPETENCIES</span>
          </div>

          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white mb-6 uppercase">
            Technical <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#e8d5be] to-[#c89f68]">
              Disciplines
            </span>
          </h2>

          <p className="font-sans text-base sm:text-xl text-zinc-300 leading-relaxed font-light">
            Six technical specializations operating as one unified engineering practice. Eliminating the friction between mechanical structures, custom silicon, and spatial software.
          </p>
        </div>

        {/* 6 Capabilities Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {disciplines.map((d) => {
            const Icon = d.icon;
            return (
              <div
                key={d.num}
                className="group p-8 rounded-3xl glass-card-luxury hover:border-[#c89f68]/50 transition-all duration-300 flex flex-col justify-between relative overflow-hidden"
              >
                {/* Glow accent */}
                <div className="absolute -top-12 -right-12 w-28 h-28 rounded-full bg-[#c89f68]/10 blur-2xl group-hover:bg-[#c89f68]/20 transition-colors" />

                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white group-hover:text-[#c89f68] group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-[#c89f68] font-bold">{d.num}</span>
                      <span className="text-[11px] font-mono text-zinc-400 px-2 py-0.5 rounded bg-white/5 border border-white/10">
                        {d.code}
                      </span>
                    </div>
                  </div>

                  <h3 className="font-display text-xl font-bold text-white mb-3 group-hover:text-[#c89f68] transition">
                    {d.name}
                  </h3>
                  <p className="text-sm text-zinc-400 leading-relaxed mb-6 font-light">
                    {d.desc}
                  </p>
                </div>

                <div>
                  <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/5">
                    {d.tags.map((t, idx) => (
                      <span key={idx} className="text-[10px] font-mono text-zinc-400 bg-white/5 px-2 py-0.5 rounded border border-white/5">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
