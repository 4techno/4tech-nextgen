import React, { useState } from 'react';
import { Compass, Cpu, Layers, CheckCircle2, ArrowRight } from 'lucide-react';
import MethodScene from './MethodScene';

const stages = [
  {
    num: '01',
    name: 'Discover',
    title: 'Start with the right question.',
    subtitle: 'Understand what the system needs to do, where it will operate, and what success should look like.',
    deliverables: ['Use case & boundary constraints', 'Feasibility & physics constraints analysis', 'Clear project brief & milestone roadmap'],
    codeSnippet: `// Phase 01: Requirement Vector
const systemScope = {
  domain: 'RF Direction Finding',
  centerFreq: '2.45 GHz',
  angularResolution: '±2.5 deg',
  powerBudget: '5V @ 450mA',
  environmentalGrade: 'IP65'
};`
  },
  {
    num: '02',
    name: 'Architect',
    title: 'Define topology & mathematics.',
    subtitle: 'Select components, derive link budgets, kinematic degrees of freedom, and pin multiplexing before writing code.',
    deliverables: ['Mathematical kinematic / RF link model', 'Schematic component derating & selection', 'System state machine architecture'],
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
    title: 'Bring atoms & bits into alignment.',
    subtitle: 'Custom KiCad PCB routing, SOLIDWORKS mechanical enclosures, and bare-metal firmware bring-up.',
    deliverables: ['Precision double-sided PCB routing', '3D printed / CNC mechanical housings', 'Real-time firmware drivers with RTOS'],
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
    title: 'Measure against empirical truth.',
    subtitle: 'Rigorous empirical RF power testing, load cell strain verification, and uncertainty analysis.',
    deliverables: ['Automated radiation pattern plots', 'Signal-to-noise ratio verification', 'Field deployment validation signoff'],
    codeSnippet: `// Phase 04: Empirical Calibration Script
def validate_rf_lobe(rssi_samples, angular_steps):
    front_to_back = max(rssi_samples[:90]) - min(rssi_samples[180:270])
    uncertainty = np.std(rssi_samples) / np.sqrt(len(rssi_samples))
    return {"gain_db": front_to_back, "uncertainty": uncertainty}`
  }
];

export default function EngineeringMethod() {
  const [activeStage, setActiveStage] = useState(0);
  const current = stages[activeStage];

  return (
    <section id="method" className="py-24 px-6 border-t border-white/10 relative overflow-hidden">
      <MethodScene className="opacity-35" />
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="text-xs font-mono text-[#ff3b55] uppercase tracking-widest mb-3 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ff3b55]" />
            <span>The 4tech Approach</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
            Good engineering is a process.
          </h2>
          <p className="text-zinc-400 text-lg">
            One connected way of working. Move from initial question to validated physical prototype.
          </p>
        </div>

        {/* Console Container */}
        <div className="glass-card rounded-3xl border border-white/10 overflow-hidden p-8">
          
          {/* Stage Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 border-b border-white/10 no-scrollbar">
            {stages.map((st, idx) => (
              <button
                key={st.num}
                onClick={() => setActiveStage(idx)}
                className={`px-5 py-3 rounded-2xl font-mono text-xs whitespace-nowrap transition-all flex items-center gap-2 ${
                  activeStage === idx
                    ? 'bg-white text-black font-bold shadow-lg shadow-white/10'
                    : 'bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10'
                }`}
              >
                <span className="text-[#ff3b55] font-bold">{st.num}.</span>
                <span>{st.name}</span>
              </button>
            ))}
          </div>

          {/* Active Stage Body */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Narrative & Checklist */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">
                  STAGE {current.num} OF 04
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-white mt-1 mb-3">
                  {current.title}
                </h3>
                <p className="text-zinc-300 text-base leading-relaxed">
                  {current.subtitle}
                </p>
              </div>

              <div className="space-y-3 pt-2">
                <div className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
                  Deliverables & Verification:
                </div>
                {current.deliverables.map((d, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm text-zinc-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{d}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 flex items-center gap-3">
                <button
                  onClick={() => setActiveStage((activeStage + 1) % stages.length)}
                  className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-zinc-300 hover:text-white transition flex items-center gap-2"
                >
                  <span>Advance Stage</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#ff3b55]" />
                </button>
              </div>
            </div>

            {/* Code & Schematic Terminal */}
            <div className="lg:col-span-6 rounded-2xl bg-black/80 border border-white/10 p-5 font-mono text-xs">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10 text-zinc-500">
                <span className="flex items-center gap-2 text-zinc-400">
                  <span className="w-2 h-2 rounded-full bg-[#ff3b55]" />
                  <span>pipeline_trace.ts</span>
                </span>
                <span className="text-[11px] text-zinc-500">
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
