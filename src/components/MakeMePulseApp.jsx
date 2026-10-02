import React, { useState, useEffect, useRef } from 'react';
import MakeMePulseCursor from './MakeMePulseCursor';
import HomePhysicsScene from './scenes/HomePhysicsScene';
import ThinkScene from './scenes/ThinkScene';
import ImagineScene from './scenes/ImagineScene';
import StriveScene from './scenes/StriveScene';
import WorkHardScene from './scenes/WorkHardScene';
import DreamBigScene from './scenes/DreamBigScene';
import PulseScene from './scenes/PulseScene';
import { sound } from '../utils/soundEngine';
import { GithubIcon, LinkedinIcon, WhatsAppIcon, InstagramIcon } from './BrandIcons';
import { X, Cpu, Layers, Radio, ShieldCheck } from 'lucide-react';

/**
 * Master Application: Exact MakeMePulse 2016 Interaction Engine & Portfolio
 * Features exact functions: click & hold timing loop, audio synthesis ramp,
 * directional strive kinetic arrow, and 6 canonical experiences.
 */
export default function MakeMePulseApp() {
  const [stage, setStage] = useState(0); // 0: Home, 1: Think, 2: Imagine, 3: Strive, 4: Work Hard, 5: Dream Big, 6: Pulse
  const [isHolding, setIsHolding] = useState(false);
  const [holdProgress, setHoldProgress] = useState(0); // 0 to 100%
  const [isAudioMuted, setIsAudioMuted] = useState(true);
  const [inspectProject, setInspectProject] = useState(null);
  const [flashBloom, setFlashBloom] = useState(false);

  const holdStartTime = useRef(0);
  const holdAnimFrame = useRef(null);

  const stageNames = ['Home', 'Think', 'Imagine', 'Strive', 'Work Hard', 'Dream Big', 'Pulse'];

  // Handle Mousedown (Click & Hold start)
  const handleMouseDown = (e) => {
    // Prevent holding if inspecting a project modal or clicking on inputs/buttons
    if (e.target.closest('button, a, input, select, textarea, .modal-interactive')) return;
    if (stage === 6) return; // Finale stage has form interaction

    setIsHolding(true);
    holdStartTime.current = performance.now();
    sound.startCharge();

    const loop = (time) => {
      const elapsed = time - holdStartTime.current;
      const duration = 2200; // 2.2 seconds hold duration
      const progress = Math.min(100, (elapsed / duration) * 100);

      setHoldProgress(progress);
      sound.updateCharge(progress);

      if (progress < 100) {
        holdAnimFrame.current = requestAnimationFrame(loop);
      } else {
        // Complete! Trigger explosive burst and advance stage
        sound.playBurst();
        setFlashBloom(true);
        setTimeout(() => setFlashBloom(false), 500);

        setIsHolding(false);
        setHoldProgress(0);
        setStage((prev) => Math.min(6, prev + 1));
      }
    };

    holdAnimFrame.current = requestAnimationFrame(loop);
  };

  // Handle Mouseup (Early release / cancel)
  const handleMouseUp = () => {
    if (!isHolding) return;
    setIsHolding(false);
    setHoldProgress(0);
    sound.stopCharge();
    if (holdAnimFrame.current) {
      cancelAnimationFrame(holdAnimFrame.current);
    }
  };

  const toggleSound = () => {
    const isUnmuted = sound.toggleMute();
    setIsAudioMuted(!isUnmuted);
  };

  const handleRestart = () => {
    sound.playSubtleClick();
    setStage(0);
    setHoldProgress(0);
    setIsHolding(false);
  };

  // Project data repository for blueprint inspection
  const projectsData = {
    '6dof-robot-arm': {
      title: '6-DOF Articulated Robotic Arm',
      category: 'ROBOTICS & KINEMATICS',
      specs: [
        { label: 'Payload Capacity', val: '2.5 kg at full 750mm extension' },
        { label: 'Kinematic Solver', val: 'Analytical Law of Cosines Inverse Kinematics' },
        { label: 'Actuator Drive', val: 'Brushless DC with Harmonic Drive Gearboxes' },
        { label: 'Control Loop Rate', val: '1 kHz deterministic FreeRTOS loop' }
      ],
      desc: 'Engineered for precision surgical manipulation and micro-assembly tasks. Features an active ruby laser targeting beam projecting directly from the tool center point, with real-time wrist orientation and optical rotary encoders.'
    },
    'drone-autopilot': {
      title: 'Precision Drone Autopilot & Navigation',
      category: 'AEROSPACE & AUTONOMOUS SYSTEMS',
      specs: [
        { label: 'Processor', val: 'STM32H7 Dual-Core ARM Cortex-M7/M4 @ 480MHz' },
        { label: 'Sensor Fusion', val: '15-State Extended Kalman Filter (EKF3)' },
        { label: 'Telemetry Link', val: 'Sub-GHz 868MHz Spread-Spectrum Radio' },
        { label: 'Attitude Stability', val: '< 0.05° angular drift under wind gust' }
      ],
      desc: 'Custom-designed flight computer with redundant IMUs, barometric pressure altitude hold, and autonomous waypoint routing across GPS-denied environments.'
    },
    'sdr-transceiver': {
      title: 'Sub-GHz Long-Range Telemetry Node',
      category: 'RF TELECOM & HARDWARE',
      specs: [
        { label: 'Frequencies', val: '433 / 868 / 915 MHz ISM bands' },
        { label: 'Sensitivity', val: '-142 dBm with LNA front-end' },
        { label: 'Encryption', val: 'Hardware AES-256 GCM authenticated' },
        { label: 'Range', val: 'Up to 24 km line-of-sight' }
      ],
      desc: 'Designed for mission-critical environmental sensor telemetry and remote robotic control with impedance-matched RF trace geometry and ultra-low power sleep states.'
    }
  };

  return (
    <div
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onTouchStart={handleMouseDown}
      onTouchEnd={handleMouseUp}
      className="relative w-screen h-screen bg-[#000000] text-white overflow-hidden select-none"
    >
      {/* Film Grain Texture Overlay */}
      <div className="film-grain opacity-25" />

      {/* Screen Bloom Flash upon Stage Completion */}
      <div
        className={`fixed inset-0 bg-white pointer-events-none z-[9990] transition-opacity duration-500 ${
          flashBloom ? 'opacity-80' : 'opacity-0'
        }`}
      />

      {/* MakeMePulse Authentic Directional Kinetic Cursor */}
      <MakeMePulseCursor isHolding={isHolding} holdProgress={holdProgress} />

      {/* Top Header / Monogram */}
      <header className="fixed top-8 left-10 right-10 z-40 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 bg-white text-black font-black text-xs flex items-center justify-center tracking-tighter">
            MV
          </div>
          <div className="font-mono text-xs tracking-[0.2em] uppercase text-neutral-300">
            Mohammed Vashir
          </div>
        </div>

        {/* Current Stage Indicator */}
        <div className="font-mono text-xs tracking-widest uppercase text-neutral-400">
          <span className="text-[#00f0ff]">{`0${stage}`}</span> // {stageNames[stage]}
        </div>
      </header>

      {/* 3D Interactive Stages Canvas */}
      <main className="w-full h-full relative">
        {stage === 0 && (
          <>
            <HomePhysicsScene isHolding={isHolding} holdProgress={holdProgress} />

            {/* Monumental MakeMePulse 2016 Home Typography */}
            <div className="absolute top-[42%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none z-20 w-full max-w-4xl px-6">
              <h1 className="text-4xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight text-white leading-none mb-3">
                Mohammed Vashir
              </h1>
              <h2 id="home-wish" className="text-xs md:text-sm font-mono tracking-[0.25em] text-neutral-400 uppercase">
                Creative Technologist & 3D Web Designer{' '}
                <span className="home-wish-white-text">2026</span>
              </h2>
            </div>
          </>
        )}

        {stage === 1 && (
          <ThinkScene
            isHolding={isHolding}
            holdProgress={holdProgress}
            onSelectProject={(id) => setInspectProject(projectsData[id] || null)}
          />
        )}

        {stage === 2 && (
          <ImagineScene
            isHolding={isHolding}
            holdProgress={holdProgress}
            onSelectProject={(id) => setInspectProject(projectsData[id] || null)}
          />
        )}

        {stage === 3 && (
          <StriveScene
            isHolding={isHolding}
            holdProgress={holdProgress}
            onSelectProject={(id) => setInspectProject(projectsData[id] || null)}
          />
        )}

        {stage === 4 && (
          <WorkHardScene isHolding={isHolding} holdProgress={holdProgress} />
        )}

        {stage === 5 && (
          <DreamBigScene isHolding={isHolding} holdProgress={holdProgress} />
        )}

        {stage === 6 && (
          <PulseScene
            onRestart={handleRestart}
            onJumpToChapter={(idx) => setStage(idx)}
          />
        )}
      </main>

      {/* Center Interactive MakeMePulse Prompt (Stages 0 to 5) */}
      {stage < 6 && (
        <div className="home-text-holder">
          {!isHolding ? (
            <h2 className="home-underline-text">click & hold</h2>
          ) : holdProgress < 82 ? (
            <h2 className="home-white-text">hold ({Math.round(holdProgress)}%)</h2>
          ) : (
            <h2 className="home-white-text bg-[#00f0ff] !text-black">ready</h2>
          )}
        </div>
      )}

      {/* Bottom Progress Bar */}
      <div
        className="experience-progress-bar"
        style={{
          width: `${Math.min(100, ((stage + holdProgress / 100) / 6) * 100)}%`
        }}
      />

      {/* Restart Button (Visible during experiences) */}
      {stage > 0 && (
        <div className="home-restart-holder">
          <button onClick={handleRestart} className="home-restart">
            Restart Experience
          </button>
        </div>
      )}

      {/* Bottom Bar: Socials Left */}
      <div className="bottom-socials">
        <a
          href="https://github.com/vashir-9cy"
          target="_blank"
          rel="noopener noreferrer"
          title="GitHub"
        >
          <GithubIcon className="w-3.5 h-3.5" />
        </a>
        <a
          href="https://linkedin.com/in/mohammed-vashir"
          target="_blank"
          rel="noopener noreferrer"
          title="LinkedIn"
        >
          <LinkedinIcon className="w-3.5 h-3.5" />
        </a>
        <a
          href="https://wa.me/919488358489"
          target="_blank"
          rel="noopener noreferrer"
          title="WhatsApp"
        >
          <WhatsAppIcon className="w-3.5 h-3.5" />
        </a>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          title="Instagram"
        >
          <InstagramIcon className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Bottom Bar: Audio & Attribution Right */}
      <div className="bottom">
        <span className="bt-artist">
          Sound Synthesis by <b>WebAudio</b>
        </span>

        <button
          onClick={toggleSound}
          className="bt-sound focus:outline-none"
          title={isAudioMuted ? 'Unmute Sound' : 'Mute Sound'}
        >
          <div className={`flex items-end gap-1 h-3 ${isAudioMuted ? 'opacity-40' : ''}`}>
            <span className="w-0.5 h-3 bg-white audio-bar" />
            <span className="w-0.5 h-2 bg-white audio-bar" />
            <span className="w-0.5 h-3.5 bg-white audio-bar" />
            <span className="w-0.5 h-1.5 bg-white audio-bar" />
          </div>
        </button>
      </div>

      {/* Blueprint Spec Inspection Modal */}
      {inspectProject && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xl flex items-center justify-center p-6 modal-interactive">
          <div className="relative max-w-2xl w-full bg-[#07090e] border border-white/20 p-8 shadow-[0_0_80px_rgba(0,240,255,0.2)]">
            <button
              onClick={() => setInspectProject(null)}
              className="absolute top-6 right-6 text-neutral-400 hover:text-white p-2 border border-white/10 hover:border-white/30 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="inline-block bg-[#00f0ff] text-black px-2 py-0.5 text-[10px] font-bold tracking-widest uppercase mb-2">
              {inspectProject.category}
            </div>
            <h2 className="text-2xl font-bold text-white uppercase tracking-wide mb-4">
              {inspectProject.title}
            </h2>
            <p className="text-xs text-neutral-300 font-mono leading-relaxed mb-6">
              {inspectProject.desc}
            </p>

            <div className="border-t border-white/10 pt-4 mb-6">
              <div className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest mb-3">
                Architectural Specifications
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {inspectProject.specs.map((s, idx) => (
                  <div key={idx} className="p-3 bg-white/5 border border-white/10 font-mono text-xs">
                    <div className="text-[10px] text-neutral-500 uppercase">{s.label}</div>
                    <div className="text-white font-bold mt-0.5">{s.val}</div>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => setInspectProject(null)}
              className="w-full py-3 bg-white text-black font-bold text-xs uppercase tracking-widest hover:bg-[#00f0ff] transition-colors"
            >
              Close Inspection Blueprint
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
