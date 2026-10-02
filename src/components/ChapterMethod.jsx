import React, { useState } from 'react';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import MethodScene from './MethodScene';
import { sound } from '../utils/soundEngine';

const stages = [
  {
    num: '01',
    name: 'Discover',
    title: 'Physics & Boundary Constraints.',
    subtitle: 'Define the fundamental problem space, operational environmental envelope, and strict electrical or mechanical tolerances.',
    deliverables: ['Thermal, mechanical & RF power budget', 'Physics feasibility & component stress study', 'Milestone-driven engineering roadmap'],
    codeSnippet: `// Phase 01: System Specification Vector
const systemScope = {
  domain: 'RF Direction Finding & Radar',
  centerFreq: '2.45 GHz S-Band',
  angularResolution: '±2.5 deg azimuth',
  powerBudget: '5V @ 450mA regulated',
  environmentalRating: 'IP65 hermetic enclosure'
};`
  },
  {
    num: '02',
    name: 'Architect',
    title: 'Mathematical Modeling & Topology.',
    subtitle: 'Derive link budgets, kinematic transformation matrices, and microcontroller pin allocation before routing printed circuits.',
    deliverables: ['Denavit-Hartenberg (DH) kinematic matrices', 'Schematic component derating calculations', 'Deterministic real-time state machine'],
    codeSnippet: `// Phase 02: Kinematic Transformation Matrix
function forwardKinematics(theta1, theta2, d3) {
  const T = new Matrix4();
  T.multiply(dhParameter(theta1, d1, a1, alpha1));
  T.multiply(dhParameter(theta2, 0, a2, 0));
  return T.getTranslation();
}`
  },
  {
    num: '03',
    name: 'Prototype',
    title: 'Silicon Fabrication & Firmware Bring-Up.',
    subtitle: 'Custom double-sided KiCad PCB routing, precision mechanical fabrication, and bare-metal ESP32 C++ driver bring-up.',
    deliverables: ['High-speed multi-layer PCB routing & fabrication', 'Precision CNC milled & 3D printed housings', 'Bare-metal C++ firmware drivers & RTOS tasks'],
    codeSnippet: `// Phase 03: Firmware Driver Bring-up
void setup() {
  Wire.begin(I2C_SDA, I2C_SCL, 400000);
  initAD8317LogAmp(&SPI, CS_PIN);
  stepperMotor.setMaxSpeed(1200);
  stepperMotor.setAcceleration(800);
}`
  },
  {
    num: '04',
    name: 'Validate',
    title: 'Empirical Measurement & Calibration.',
    subtitle: 'Automated RF power plotting, load-cell strain measurement, and uncertainty verification under real-world operational stress.',
    deliverables: ['Automated radiation pattern lobe plots', 'Signal-to-noise ratio (SNR) validation', 'Field deployment reliability sign-off'],
    codeSnippet: `// Phase 04: Empirical Calibration Script
def validate_rf_lobe(rssi_samples, angular_steps):
    front_to_back = max(rssi_samples[:90]) - min(rssi_samples[180:270])
    uncertainty = np.std(rssi_samples) / np.sqrt(len(rssi_samples))
    return {"gain_db": front_to_back, "uncertainty": uncertainty}`
  }
];

export default function ChapterMethod() {
  const [activeStage, setActiveStage] = useState(0);
  const current = stages[activeStage];

  return (
    <section id="method" className="relative min-h-screen py-32 px-6 overflow-hidden border-b border-white/5">
      
      {/* 3D Pipeline Scene Background */}
      <MethodScene className="opacity-35" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Chapter Header Card matching Symphony of Vines */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 mb-3">
            <span className="font-mono text-xs text-[#c89f68] font-bold">CHAPTER 04</span>
            <span className="text-zinc-600">//</span>
            <span className="text-xs font-mono tracking-widest text-zinc-400 uppercase">ENGINEERING PIPELINE</span>
          </div>

          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white mb-6 uppercase">
            The Scientific <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#e8d5be] to-[#c89f68]">
              Methodology
            </span>
          </h2>

          <p className="font-sans text-base sm:text-xl text-zinc-300 leading-relaxed font-light">
            Engineering excellence is an iterative discipline. Every project moves systematically from fundamental governing equations to empirically measured, tested prototypes.
          </p>
        </div>

        {/* Method Console */}
        <div className="glass-card-luxury rounded-3xl p-8 border border-white/10">
          
          {/* Phase Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 border-b border-white/10">
            {stages.map((st, idx) => (
              <button
                key={st.num}
                onClick={() => {
                  setActiveStage(idx);
                  sound.playSubtleClick();
                }}
                className={`px-5 py-3 rounded-2xl font-mono text-xs whitespace-nowrap transition-all flex items-center gap-2 ${
                  activeStage === idx
                    ? 'bg-[#c89f68] text-black font-bold shadow-lg shadow-[#c89f68]/20'
                    : 'bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10'
                }`}
              >
                <span className="text-zinc-900 font-bold">{st.num}.</span>
                <span>{st.name}</span>
              </button>
            ))}
          </div>

          {/* Body */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            <div className="lg:col-span-6 space-y-6">
              <div>
                <span className="text-xs font-mono text-[#c89f68] uppercase tracking-widest font-medium">
                  PHASE {current.num} OF 04
                </span>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mt-1 mb-3">
                  {current.title}
                </h3>
                <p className="text-zinc-300 text-base leading-relaxed font-light">
                  {current.subtitle}
                </p>
              </div>

              <div className="space-y-3 pt-2">
                <div className="text-xs font-mono text-zinc-400 uppercase tracking-wider font-medium">
                  Deliverables &amp; Empirical Verification:
                </div>
                {current.deliverables.map((d, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm text-zinc-300">
                    <CheckCircle2 className="w-4 h-4 text-[#c89f68] shrink-0" />
                    <span className="font-light">{d}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 flex items-center gap-3">
                <button
                  onClick={() => {
                    setActiveStage((activeStage + 1) % stages.length);
                    sound.playSubtleClick();
                  }}
                  className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-zinc-300 hover:text-white transition flex items-center gap-2"
                >
                  <span>Advance Pipeline Stage</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#c89f68]" />
                </button>
              </div>
            </div>

            {/* Code & Schematic Terminal */}
            <div className="lg:col-span-6 rounded-2xl bg-black/85 border border-white/10 p-5 font-mono text-xs">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10 text-zinc-500">
                <span className="flex items-center gap-2 text-zinc-300">
                  <span className="w-2 h-2 rounded-full bg-[#c89f68]" />
                  <span>pipeline_trace.ts</span>
                </span>
                <span className="text-[11px] text-[#c89f68]">
                  {current.name.toUpperCase()} SPECIFICATION
                </span>
              </div>
              <pre className="text-zinc-300 leading-relaxed overflow-x-auto">
                <code>{current.codeSnippet}</code>
              </pre>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
