import React from 'react';
import { X, Download, Printer, ExternalLink, Mail, Phone, MapPin, Award, CheckCircle2, Cpu, Wrench, ShieldCheck, FileText } from 'lucide-react';
import { sound } from '../utils/soundEngine';

export default function ResumeModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const handleDownload = () => {
    sound.playSubtleClick();
    const link = document.createElement('a');
    link.href = '/Mohammed_Vashir_Resume.pdf';
    link.download = 'Mohammed_Vashir_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrint = () => {
    sound.playSubtleClick();
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-xl animate-fade-in overflow-y-auto">
      {/* Modal Container */}
      <div className="relative w-full max-w-4xl my-auto bg-[#08090d] border border-white/15 rounded-3xl shadow-[0_0_80px_rgba(200,159,104,0.18)] overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Top Control Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/[0.02]">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#c89f68] animate-pulse" />
            <span className="text-xs font-mono tracking-widest uppercase text-[#c89f68] font-bold">
              Curriculum Vitae // Mohammed Vashir
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Download PDF Button */}
            <button
              onClick={handleDownload}
              className="px-4 py-2 rounded-xl bg-[#c89f68] hover:bg-[#d9b27d] text-black font-mono font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 shadow-lg shadow-[#c89f68]/20 cursor-pointer"
              title="Download Official Vector PDF Resume"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </button>

            {/* Print / Save as PDF Button */}
            <button
              onClick={handlePrint}
              className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border border-white/10 hover:border-white/30 bg-white/5 text-zinc-300 hover:text-white font-mono text-xs uppercase tracking-wider transition-colors cursor-pointer"
              title="Print Curriculum Vitae"
            >
              <Printer className="w-3.5 h-3.5 text-[#c89f68]" />
              <span>Print</span>
            </button>

            {/* Close Button */}
            <button
              onClick={() => {
                sound.playSubtleClick();
                onClose();
              }}
              className="p-2 rounded-xl border border-white/10 hover:border-white/30 text-zinc-400 hover:text-white transition-colors cursor-pointer"
              title="Close Resume Dossier"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Resume Body */}
        <div className="overflow-y-auto p-6 sm:p-10 space-y-8 print:p-0 print:bg-white print:text-black">
          
          {/* Header Card */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/10">
            <div>
              <h1 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-white mb-2 uppercase">
                Mohammed Vashir
              </h1>
              <p className="font-mono text-xs sm:text-sm text-[#c89f68] tracking-widest uppercase font-semibold">
                Creative Technologist · Systems Architect · Physical Computing
              </p>
            </div>

            <div className="space-y-1.5 text-xs font-mono text-zinc-300 md:text-right">
              <div className="flex items-center md:justify-end gap-2 text-zinc-400">
                <MapPin className="w-3.5 h-3.5 text-[#c89f68]" />
                <span>Kalpakkam Nuclear &amp; Energy Corridor, Tamil Nadu, India</span>
              </div>
              <div className="flex items-center md:justify-end gap-2">
                <Mail className="w-3.5 h-3.5 text-[#c89f68]" />
                <a href="mailto:contact@4tech.in" className="hover:text-[#c89f68] transition-colors">
                  contact@4tech.in
                </a>
              </div>
              <div className="flex items-center md:justify-end gap-2">
                <Phone className="w-3.5 h-3.5 text-[#c89f68]" />
                <a href="https://wa.me/919488358489" target="_blank" rel="noopener noreferrer" className="hover:text-[#c89f68] transition-colors">
                  +91 94883 58489
                </a>
              </div>
            </div>
          </div>

          {/* Section: Executive Profile */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-1 h-3.5 bg-[#c89f68]" />
              <h2 className="font-display text-sm tracking-[0.2em] uppercase text-white font-bold">
                Executive Profile
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans font-light">
              Accomplished Systems Engineer and Creative Technologist specializing in the convergence of physical computing, autonomous robotics, multilayer RF hardware design, and high-performance 3D spatial web applications. Founder of 4tech Engineering R&amp;D with a proven track record of independently designing, fabricating, and empirically validating 15 production-grade hardware systems. Proficient at bridging bare-metal embedded firmware (C++20, FreeRTOS) with precision kinematic control and real-time Three.js/WebGL digital twin visualization.
            </p>
          </div>

          {/* Section: Core Technical Specializations */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-1 h-3.5 bg-[#c89f68]" />
              <h2 className="font-display text-sm tracking-[0.2em] uppercase text-white font-bold">
                Core Technical Specializations
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 font-mono text-xs">
              {[
                {
                  title: 'Robotics & Kinematics',
                  desc: 'Analytical Closed-Form Inverse Kinematics, Denavit-Hartenberg frames, Harmonic Drive actuators, precision laser focal tracking, robotic gripper physics.'
                },
                {
                  title: 'High-Speed Multilayer PCB Layout',
                  desc: '6-Layer controlled impedance routing, 50Ω single-ended & 100Ω differential pairs, KiCad, Altium, EMI/EMC shielding, high-current motor drivers.'
                },
                {
                  title: 'Embedded Firmware & IoT Architecture',
                  desc: 'Bare-metal C++20, FreeRTOS, STM32H7 Dual-Core ARM Cortex-M @ 480MHz, ESP32, microsecond ISR latency, hardware AES-256 encryption, zero heap allocations.'
                },
                {
                  title: 'Autonomous Systems & RF Engineering',
                  desc: 'ROS2 Humble nodes, 2D/3D LiDAR SLAM, 15-state EKF3 sensor fusion, Sub-GHz (433/868/915MHz) telemetry nodes (-142dBm LNA), polar radiation scanners.'
                },
                {
                  title: 'Creative Technology & 3D WebGL',
                  desc: 'Three.js, WebGL/WebGPU, custom GLSL vertex/fragment shaders, ACESFilmic tonemapping, Web Audio API synthesis, React, Tailwind CSS.'
                },
                {
                  title: 'Precision Fabrication & Diagnostics',
                  desc: 'CNC machining, 3D printing (FDM/SLA), logic analyzers, GHz oscilloscopes, SDR spectrum analyzers, SolidWorks CAD modeling.'
                }
              ].map((s, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5 space-y-1">
                  <div className="text-[#c89f68] font-bold text-xs uppercase">{s.title}</div>
                  <div className="text-zinc-400 text-[11px] leading-relaxed font-sans">{s.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Professional Experience */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-1 h-3.5 bg-[#c89f68]" />
              <h2 className="font-display text-sm tracking-[0.2em] uppercase text-white font-bold">
                Engineering Leadership &amp; Experience
              </h2>
            </div>

            <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/5 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <div>
                  <h3 className="font-display font-bold text-base text-white">4tech Engineering R&amp;D Atelier</h3>
                  <p className="text-xs font-mono text-[#c89f68]">Founder &amp; Principal Systems Architect</p>
                </div>
                <div className="text-[11px] font-mono text-zinc-400">2022 – PRESENT | KALPAKKAM, INDIA</div>
              </div>

              <ul className="space-y-2 text-xs text-zinc-300 font-sans leading-relaxed list-disc list-inside">
                <li>Spearheaded research, schematic design, high-speed PCB layout, structural fabrication, and firmware development across 15 production-grade hardware systems.</li>
                <li>Formulated closed-form trigonometric Inverse Kinematics solvers running in real time on microcontrollers for 6-axis articulated manipulators with zero singular matrix jitter.</li>
                <li>Developed an autonomous flight computer running a 15-state Extended Kalman Filter (EKF3) with triple IMU redundancy, sub-GHz telemetry dispatch, and GPS-denied obstacle clearance.</li>
                <li>Constructed automated radio frequency testbenches capable of continuous 360-degree antenna radiation pattern profiling and polar plot synthesis.</li>
                <li>Engineered museum-grade interactive 3D WebGL portfolios and digital twins connecting physical sensors directly to browser canvases via low-latency WebSockets.</li>
              </ul>
            </div>
          </div>

          {/* Section: Flagship Systems */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-1 h-3.5 bg-[#c89f68]" />
              <h2 className="font-display text-sm tracking-[0.2em] uppercase text-white font-bold">
                Selected Flagship Engineering Systems (15 Total R&amp;D Systems)
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {[
                {
                  title: '6-DOF Articulated Robotic Arm',
                  domain: 'ROBOTICS & KINEMATICS',
                  desc: 'Titanium and twin-spar aluminum manipulator featuring harmonic drive actuators, optical rotary encoders, real-time closed-form analytical IK, parallel gripper, and cursor-aligned optical targeting laser.'
                },
                {
                  title: 'Precision Dual-Core UAV Autopilot',
                  domain: 'AEROSPACE & AUTONOMOUS CONTROL',
                  desc: 'Autonomous flight management computer powered by STM32H7 dual-core ARM @ 480MHz, 15-state EKF3 navigation filter, triple redundant barometric & IMU sensors, and 868MHz spread-spectrum datalink.'
                },
                {
                  title: 'Autonomous SLAM Inspection Rover',
                  domain: 'AUTONOMOUS GROUND VEHICLES',
                  desc: 'All-terrain 4WD planetary drivetrain rover equipped with 360° LiDAR, stereo depth vision, and ROS2 Humble nodes for GPS-denied indoor cartography and structural facility inspection.'
                },
                {
                  title: 'Sub-GHz Long-Range Telemetry Node',
                  domain: 'RF TELECOMMUNICATIONS & HARDWARE',
                  desc: 'Ultra-low power (1.2µA standby) industrial telemetry node operating across 433/868/915MHz with -142dBm sensitivity, LNA front-end, hardware AES-256 GCM encryption, and 24km line-of-sight range.'
                }
              ].map((proj, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-1.5">
                  <div className="text-[10px] font-mono text-[#c89f68] uppercase tracking-wider">{proj.domain}</div>
                  <h4 className="font-display font-bold text-sm text-white">{proj.title}</h4>
                  <p className="text-xs text-zinc-400 font-sans leading-relaxed">{proj.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Education */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-1 h-3.5 bg-[#c89f68]" />
              <h2 className="font-display text-sm tracking-[0.2em] uppercase text-white font-bold">
                Education &amp; Credentials
              </h2>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h4 className="font-display font-bold text-sm text-white">Bachelor of Technology (B.Tech) in Electrical &amp; Electronics Engineering</h4>
                <p className="text-xs font-mono text-zinc-400 mt-0.5">Specialization in Embedded Systems, Control Theory, Electromagnetic Radiation &amp; Robotics</p>
              </div>
              <div className="text-xs font-mono text-[#c89f68] font-bold">
                FIRST CLASS HONORS
              </div>
            </div>
          </div>

          {/* Bottom Action Footer */}
          <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
            <div className="text-xs font-mono text-zinc-400">
              Official document verified by Mohammed Vashir · 4tech Engineering R&amp;D
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleDownload}
                className="px-5 py-2.5 rounded-xl bg-[#c89f68] hover:bg-[#d9b27d] text-black font-mono font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 shadow-lg shadow-[#c89f68]/20 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Official PDF</span>
              </button>

              <button
                onClick={() => {
                  sound.playSubtleClick();
                  onClose();
                }}
                className="px-5 py-2.5 rounded-xl border border-white/10 hover:border-white/30 text-white font-mono text-xs uppercase tracking-wider transition-colors cursor-pointer"
              >
                Close Dossier
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
