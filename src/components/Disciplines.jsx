import React from 'react';
import { Cpu, Move3d, Radio, Sparkles, Binary, Microscope, ArrowUpRight } from 'lucide-react';
import DisciplinesScene from './DisciplinesScene';

const disciplines = [
  {
    num: '01',
    code: 'ENGINEER',
    name: 'Advanced Engineering',
    desc: 'First-principles mechanical design, structural finite element analysis, and precision fabrication.',
    icon: Cpu,
    tags: ['Mechanical CAD', 'Stress Analysis', 'Rapid Prototyping']
  },
  {
    num: '02',
    code: 'MOVE',
    name: 'Robotics',
    desc: 'Multi-axis articulated kinematics, motor drivers, trajectory solvers, and mobile tracked mechanisms.',
    icon: Move3d,
    tags: ['Kinematics', 'Actuators', 'Obstacle Traversal']
  },
  {
    num: '03',
    code: 'CONNECT',
    name: 'Embedded Systems',
    desc: 'Custom PCB design in KiCad, ESP32 firmware orchestration, RTOS scheduling, and sensor integration.',
    icon: Binary,
    tags: ['KiCad PCB', 'ESP32 / ARM', 'I2C / SPI / UART']
  },
  {
    num: '04',
    code: 'TRANSMIT',
    name: 'RF Technology',
    desc: 'Antenna radiation pattern measurement, SDR spectrum analysis, passive detection, and directional arrays.',
    icon: Radio,
    tags: ['SDR', 'Radiation Plots', 'RF Direction Finding']
  },
  {
    num: '05',
    code: 'INTERPRET',
    name: 'Automation & AI',
    desc: 'Closed-loop computer vision, PID feedback controllers, and neural trajectory prediction networks.',
    icon: Sparkles,
    tags: ['OpenCV', 'Neural Kinematics', 'Feedback Loops']
  },
  {
    num: '06',
    code: 'DISCOVER',
    name: 'Research & Development',
    desc: 'Experimental investigation into magnetic anomalies, wireless resonant power, and composite materials.',
    icon: Microscope,
    tags: ['Electromagnetics', 'Resonant Transfer', 'Materials Test']
  }
];

export default function Disciplines() {
  return (
    <section id="expertise" className="py-24 px-6 border-t border-white/10 relative overflow-hidden">
      <DisciplinesScene className="opacity-40" />
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="text-xs font-mono text-[#ff3b55] uppercase tracking-widest mb-3 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff3b55]" />
              <span>Capabilities & Focus Areas</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-2">
              An integrated engineering practice.
            </h2>
            <p className="text-zinc-400 text-base sm:text-lg">
              6 disciplines. One cohesive first-principles approach.
            </p>
          </div>

          <div className="text-xs font-mono text-zinc-500">
            {'{ 01 / WHAT WE DO }_'}
          </div>
        </div>

        {/* 6 Capabilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {disciplines.map((d) => {
            const Icon = d.icon;
            return (
              <div
                key={d.num}
                className="group p-8 rounded-3xl glass-card hover:border-white/20 transition-all duration-300 flex flex-col justify-between relative overflow-hidden"
              >
                {/* Glow accent */}
                <div className="absolute -top-12 -right-12 w-28 h-28 rounded-full bg-[#ff3b55]/10 blur-2xl group-hover:bg-[#ff3b55]/20 transition-colors" />

                <div>
                  {/* Top Bar with Number & Code */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white group-hover:text-[#ff3b55] group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-[#ff3b55] font-bold">{d.num}</span>
                      <span className="text-[11px] font-mono text-zinc-400 px-2 py-0.5 rounded bg-white/5 border border-white/10">
                        {d.code}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#ff3b55] transition">
                    {d.name}
                  </h3>
                  <p className="text-sm text-zinc-400 leading-relaxed mb-6">
                    {d.desc}
                  </p>
                </div>

                <div>
                  <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/5">
                    {d.tags.map((t, idx) => (
                      <span key={idx} className="text-[11px] font-mono text-zinc-500 bg-white/5 px-2 py-0.5 rounded">
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
