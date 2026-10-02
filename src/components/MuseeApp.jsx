import React, { useState, useEffect, useRef } from 'react';
import MuseeSculptureScene from './MuseeSculptureScene';
import { Send, CheckCircle2, Mail, Phone, ExternalLink, X, ArrowUpRight } from 'lucide-react';

/**
 * Musée (musee.barvian.me) Exact Experience & Portfolio of Mohammed Vashir
 * Built with full architectural grid-guides, fixed classical header,
 * on-this-page dynamic expanding indicator, and scroll-driven 3D Venus sculpture.
 */
export default function MuseeApp() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState(0);
  const [inspectProject, setInspectProject] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    discipline: 'Robotics & Kinematic Hardware R&D',
    message: ''
  });

  const sectionRefs = [useRef(null), useRef(null), useRef(null), useRef(null), useRef(null)];

  // Track window scroll and map to 0..4 scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const winHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight - winHeight;

      if (docHeight > 0) {
        // Map scroll across 4 intervals (sections 0 to 4)
        const progress = (scrollY / docHeight) * 4;
        setScrollProgress(progress);

        // Find active section
        const currentIdx = Math.min(4, Math.max(0, Math.round(progress)));
        setActiveSection(currentIdx);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (idx) => {
    const el = sectionRefs[idx]?.current;
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const sectionNames = [
    { title: 'Museum of Ancient Art & Engineering', href: '#intro' },
    { title: 'The Architect & Telemetry', href: '#the-architect' },
    { title: 'Discovery of Masterpieces', href: '#selected-works' },
    { title: 'Engineering Disciplines & Method', href: '#engineering-method' },
    { title: 'An Enigmatic Icon & Dialogue', href: '#atelier-dialogue' }
  ];

  const projects = [
    {
      id: '6dof-robot-arm',
      title: '6-DOF Articulated Robotic Arm',
      category: 'ROBOTICS & KINEMATICS',
      specs: [
        { label: 'Kinematics', val: 'Analytical Closed-Form Inverse Kinematics' },
        { label: 'Gearboxes', val: 'Precision Harmonic Drive Actuators' },
        { label: 'Payload', val: '2.5 kg at 750mm spherical reach' },
        { label: 'Targeting', val: 'Coaxial Laser Focal Tracking' }
      ],
      desc: 'High-dexterity articulated manipulator built with titanium twin-spar spars, optical rotary encoders, and microsecond deterministic trajectory execution.'
    },
    {
      id: 'drone-autopilot',
      title: 'Precision Drone Autopilot & Navigation Computer',
      category: 'AEROSPACE & AUTONOMOUS SYSTEMS',
      specs: [
        { label: 'Processor', val: 'STM32H7 Dual-Core ARM @ 480MHz' },
        { label: 'State Filter', val: '15-State Extended Kalman Filter (EKF3)' },
        { label: 'Telemetry', val: 'Sub-GHz 868MHz Spread-Spectrum Link' },
        { label: 'Redundancy', val: 'Triple IMU & Barometric Sensor Fusion' }
      ],
      desc: 'Autonomous flight computer capable of GPS-denied obstacle clearance, high-wind trajectory stabilization, and real-time mission telemetry dispatch.'
    },
    {
      id: 'sdr-transceiver',
      title: 'Sub-GHz Long-Range Telemetry Node',
      category: 'RF TELECOM & HARDWARE',
      specs: [
        { label: 'Frequency', val: '433 / 868 / 915 MHz ISM Bands' },
        { label: 'Sensitivity', val: '-142 dBm with LNA Front-End' },
        { label: 'Link Range', val: 'Up to 24 km Line-of-Sight' },
        { label: 'Security', val: 'Hardware AES-256 GCM Authenticated' }
      ],
      desc: 'Industrial telemetry node with impedance-matched RF trace geometry, ultra-low standby power (1.2µA), and high dynamic range receiver design.'
    },
    {
      id: 'slam-rover',
      title: 'Autonomous SLAM Inspection Rover',
      category: 'AUTONOMOUS GROUND VEHICLES',
      specs: [
        { label: 'Perception', val: '360° 2D/3D LiDAR & Depth Stereo Vision' },
        { label: 'Framework', val: 'ROS2 Humble Real-Time Nodes' },
        { label: 'Drive Base', val: '4WD Planetary Geared Brushless Motors' },
        { label: 'Autonomy', val: 'Real-Time Point Cloud Cartography & Path Planning' }
      ],
      desc: 'All-terrain autonomous rover designed for hazardous facility inspection, structural health monitoring, and precision GPS-denied indoor mapping.'
    }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    const text = encodeURIComponent(
      `Hello Mohammed Vashir,\n\nName: ${formData.name}\nEmail: ${formData.email}\nDiscipline: ${formData.discipline}\n\nProject Scope:\n${formData.message}`
    );
    window.open(`https://wa.me/919488358489?text=${text}`, '_blank');
  };

  return (
    <div className="relative min-h-screen bg-black text-white selection:bg-[#0047DE] selection:text-white">
      {/* 1. Fixed Architectural Grid Guides (Exact Musée Signature) */}
      <div className="pointer-events-none fixed inset-0 z-40 size-full">
        <div className="grid-guides container relative grid h-full">
          <div className="border-r border-white/10" />
          <div className="border-r border-white/10" />
          <div className="border-r border-white/10 max-md:hidden" />
          <div className="border-r border-white/10 max-lg:hidden" />
        </div>
      </div>

      {/* 2. Fixed Full-Screen 3D WebGL Sculpture Canvas */}
      <MuseeSculptureScene scrollProgress={scrollProgress} />

      {/* 3. Fixed Header with Musée Logo & Navigation */}
      <header className="fixed top-0 z-30 w-full py-8 md:py-10">
        <div className="grid-guides container flex items-center justify-between gap-4">
          {/* Classical Roman Serif Wordmark */}
          <a href="#intro" className="flex items-center gap-3">
            <span className="font-cinzel text-xl md:text-2xl font-bold tracking-widest text-white uppercase hover:text-[#a39ef1] transition-colors">
              Musée
            </span>
            <span className="text-[10px] font-mono tracking-widest text-white/40 uppercase hidden sm:inline-block">
              // Mohammed Vashir
            </span>
          </a>

          {/* Navigation Links with Musée Blue Hover Line */}
          <nav className="hidden md:block text-xs font-medium uppercase tracking-widest">
            <ul className="flex items-center gap-8 lg:gap-12">
              {[
                { name: 'Home', idx: 0 },
                { name: 'Architect', idx: 1 },
                { name: 'Collection', idx: 2 },
                { name: 'Method', idx: 3 },
                { name: 'Dialogue', idx: 4 }
              ].map((item) => (
                <li key={item.name} className="group relative">
                  <button
                    onClick={() => scrollToSection(item.idx)}
                    className="text-white/80 hover:text-white transition-colors cursor-pointer"
                  >
                    {item.name}
                  </button>
                  <div
                    className={`absolute left-0 top-[160%] h-0.5 w-[2.5em] transition-all rounded-full ${
                      activeSection === item.idx
                        ? 'bg-[#0047DE]'
                        : 'bg-white [clip-path:inset(0_100%_0_0_round_100px)] group-hover:bg-[#a39ef1] group-hover:[clip-path:inset(0_0_0_0_round_100px)]'
                    }`}
                  />
                </li>
              ))}
            </ul>
          </nav>

          {/* 9-Square Grid Button (Right) */}
          <button
            onClick={() => scrollToSection(4)}
            className="cursor-pointer justify-self-end p-2 text-white/80 hover:text-white transition-colors"
            title="Atelier Inquiries"
          >
            <svg width="20" height="20" viewBox="0 0 22 22" fill="none">
              <rect width="4" height="4" fill="#D9D9D9" />
              <rect x="9" width="4" height="4" fill="#D9D9D9" />
              <rect x="18" width="4" height="4" fill="#D9D9D9" />
              <rect y="9" width="4" height="4" fill="#D9D9D9" />
              <rect x="9" y="9" width="4" height="4" fill="#D9D9D9" />
              <rect x="18" y="9" width="4" height="4" fill="#D9D9D9" />
              <rect y="18" width="4" height="4" fill="#D9D9D9" />
              <rect x="9" y="18" width="4" height="4" fill="#D9D9D9" />
              <rect x="18" y="18" width="4" height="4" fill="#D9D9D9" />
            </svg>
          </button>
        </div>
      </header>

      {/* 4. Left Vertical "On this page" Progress Navigation (Exact Musée Signature) */}
      <nav
        aria-label="On this page"
        className="hidden md:flex pointer-events-none fixed inset-0 z-30 items-center pl-8 lg:pl-12"
      >
        <ul className="space-y-3 pointer-events-auto">
          {sectionNames.map((s, idx) => {
            const isActive = activeSection === idx;
            return (
              <li key={idx}>
                <button
                  onClick={() => scrollToSection(idx)}
                  title={s.title}
                  className="block py-2 group cursor-pointer focus:outline-none"
                >
                  <span
                    className="block h-0.5 rounded-full transition-all duration-500"
                    style={{
                      width: isActive ? '3rem' : '0.25rem',
                      backgroundColor: isActive ? '#0047DE' : 'rgba(255, 255, 255, 0.4)'
                    }}
                  />
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* 5. Main Museum Content Sections */}
      <main className="relative z-10">

        {/* Section 0: Museum of Ancient Art & Engineering (Intro) */}
        <section
          ref={sectionRefs[0]}
          id="intro"
          className="container min-h-screen relative flex flex-col justify-end pb-20 pt-36"
        >
          <div className="grid-guides grid gap-6">
            <div className="col-span-4 lg:col-span-3 lg:col-start-3 lg:justify-self-end lg:text-right">
              <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl tracking-tight leading-tight text-white mb-6">
                Museum of Ancient Art & Engineering
              </h1>
              <p className="max-w-xl justify-self-end text-sm md:text-base text-white/70 leading-relaxed font-sans">
                History and computational engineering converge to forge the autonomous machines of tomorrow. Our atelier, spanning articulated 6-DOF robotic arms, multi-layer RF telemetry, and classical aesthetics, offers a synthesis of scientific rigor and timeless artistic achievement.
              </p>
              <div className="mt-8 flex items-center justify-end gap-4">
                <button
                  onClick={() => scrollToSection(2)}
                  className="px-6 py-3 border border-white/20 hover:border-[#0047DE] hover:bg-[#0047DE] text-white text-xs font-mono uppercase tracking-widest transition-all cursor-pointer"
                >
                  Explore Collection
                </button>
              </div>
            </div>
          </div>

          {/* Animated Scroll to Explore Prompt */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none opacity-80">
            <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-white/50 animate-pulse">
              Scroll to Explore Sculpture
            </span>
            <div className="w-5 h-8 border border-white/30 rounded-full flex justify-center pt-1.5 shadow-[0_0_10px_rgba(0,71,222,0.3)]">
              <div className="w-1 h-2 bg-[#0047DE] rounded-full animate-bounce" />
            </div>
          </div>
        </section>

        {/* Section 1: The Architect & Telemetry (Alexandros & Vashir) */}
        <section
          ref={sectionRefs[1]}
          id="the-architect"
          className="container min-h-screen relative flex items-center py-24"
        >
          <div className="grid-guides grid gap-6 w-full">
            <div className="col-span-4 lg:col-span-3 lg:col-start-2">
              <dl className="space-y-12">
                <div>
                  <dt className="font-serif text-3xl md:text-5xl lg:text-6xl text-white mb-3">
                    Mohammed Vashir
                  </dt>
                  <dd className="max-w-prose text-xs md:text-sm text-white/70 leading-relaxed font-sans">
                    Creative Technologist, Kinematics Architect, and Embedded Systems Engineer. Founder of 4tech Engineering R&D in Kalpakkam, synthesizing mechanical precision, high-speed circuit synthesis, and visceral 3D web design.
                  </dd>
                </div>

                <div>
                  <dt className="font-serif text-3xl md:text-5xl lg:text-6xl text-white mb-3">
                    15 Production Systems
                  </dt>
                  <dd className="max-w-prose text-xs md:text-sm text-white/70 leading-relaxed font-sans">
                    A rigorously verified engineering portfolio spanning dual-core autonomous UAV autopilots, medical haptic tele-robots, Sub-GHz encryption nodes, and LiDAR cartography rovers.
                  </dd>
                </div>

                <div>
                  <dt className="font-serif text-3xl md:text-5xl lg:text-6xl text-white mb-3">
                    Kalpakkam Atelier
                  </dt>
                  <dd className="max-w-prose text-xs md:text-sm text-white/70 leading-relaxed font-sans">
                    Independent R&D workshop and laboratory located in Kalpakkam, Tamil Nadu, India. Dedicated to prototyping high-reliability physical systems and mentoring forward-thinking creators.
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </section>

        {/* Section 2: Discovery of Masterpieces (Selected Works) */}
        <section
          ref={sectionRefs[2]}
          id="selected-works"
          className="container min-h-screen relative flex flex-col justify-center py-24"
        >
          <div className="grid-guides grid gap-6 w-full">
            <div className="col-span-4 lg:col-span-4 lg:col-start-2 mb-8">
              <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl text-white mb-3">
                Discovery of Masterpieces
              </h2>
              <p className="max-w-prose text-xs md:text-sm text-white/70 font-sans">
                Each system represents a harmony of closed-form mathematics, bare-metal firmware, and precision mechanical fabrication.
              </p>
            </div>

            {/* Bento Grid of 4 Masterpieces */}
            <div className="col-span-4 lg:col-span-4 lg:col-start-2 grid grid-cols-1 md:grid-cols-2 gap-4">
              {projects.map((proj) => (
                <div
                  key={proj.id}
                  onClick={() => setInspectProject(proj)}
                  className="group cursor-pointer bg-black/60 backdrop-blur-md border border-white/15 hover:border-[#0047DE] p-6 transition-all duration-300 relative overflow-hidden"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-mono text-[#0047DE] tracking-widest uppercase">
                      {proj.category}
                    </span>
                    <ArrowUpRight className="w-4 h-4 text-white/40 group-hover:text-[#0047DE] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </div>
                  <h3 className="font-serif text-2xl text-white group-hover:text-white mb-2">
                    {proj.title}
                  </h3>
                  <p className="text-xs text-white/60 font-sans leading-relaxed mb-4 line-clamp-2">
                    {proj.desc}
                  </p>
                  <div className="text-[10px] font-mono text-white/40 group-hover:text-white/80 transition-colors uppercase tracking-wider">
                    Inspect Architectural Blueprint →
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 3: Engineering Disciplines & Method (Missing Arms Mystery) */}
        <section
          ref={sectionRefs[3]}
          id="engineering-method"
          className="container min-h-screen relative flex items-center py-24"
        >
          <div className="grid-guides grid gap-6 w-full">
            <div className="col-span-4 lg:col-span-3 lg:col-start-2">
              <dl className="space-y-12">
                <div>
                  <dt className="font-serif text-3xl md:text-5xl lg:text-6xl text-white mb-3">
                    Mathematical Kinematics
                  </dt>
                  <dd className="max-w-prose text-xs md:text-sm text-white/70 leading-relaxed font-sans">
                    Analytical closed-form Inverse Kinematics, Denavit-Hartenberg parameters, and real-time Jacobian matrices ensuring deterministic tool center point trajectory tracking with zero singular matrix jitter.
                  </dd>
                </div>

                <div>
                  <dt className="font-serif text-3xl md:text-5xl lg:text-6xl text-white mb-3">
                    High-Speed Multilayer PCB
                  </dt>
                  <dd className="max-w-prose text-xs md:text-sm text-white/70 leading-relaxed font-sans">
                    6-layer controlled impedance routing for 50Ω single-ended and 100Ω differential pairs. Designed for severe EMI/EMC compliance, high-power motor drivers, and RF link integrity.
                  </dd>
                </div>

                <div>
                  <dt className="font-serif text-3xl md:text-5xl lg:text-6xl text-white mb-3">
                    Deterministic Real-Time Firmware
                  </dt>
                  <dd className="max-w-prose text-xs md:text-sm text-white/70 leading-relaxed font-sans">
                    Zero-allocation bare-metal C++20 and FreeRTOS tasks operating with microsecond ISR latency. Comprehensive hardware diagnostics and encrypted field telemetry.
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </section>

        {/* Section 4: An Enigmatic Icon & Atelier Dialogue */}
        <section
          ref={sectionRefs[4]}
          id="atelier-dialogue"
          className="container min-h-screen relative flex flex-col justify-center py-24"
        >
          <div className="grid-guides grid gap-6 w-full">
            <div className="col-span-4 lg:col-span-3 lg:col-start-2 mb-8">
              <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl text-white mb-3">
                An Enigmatic Icon
              </h2>
              <p className="max-w-prose text-xs md:text-sm text-white/70 font-sans">
                Renowned for combining classical craftsmanship with autonomous computational engineering, Mohammed Vashir welcomes strategic collaborations, bespoke robotics contracts, and exploratory creative technology briefs.
              </p>
            </div>

            {/* Direct Dispatch Form */}
            <div className="col-span-4 lg:col-span-3 lg:col-start-2 bg-black/75 backdrop-blur-xl border border-white/20 p-8 shadow-[0_0_50px_rgba(0,71,222,0.15)]">
              {formSubmitted ? (
                <div className="py-12 text-center space-y-4">
                  <CheckCircle2 className="w-12 h-12 text-[#0047DE] mx-auto animate-pulse" />
                  <h3 className="font-serif text-2xl text-white uppercase tracking-wide">
                    Telemetry Dispatched
                  </h3>
                  <p className="text-xs text-white/70 font-mono max-w-sm mx-auto">
                    Your brief has been transmitted to Mohammed Vashir. Secure communication will be initiated promptly.
                  </p>
                  <button
                    onClick={() => setFormSubmitted(false)}
                    className="mt-4 px-6 py-2 border border-white/20 hover:border-[#0047DE] text-white text-xs font-mono uppercase tracking-widest"
                  >
                    Transmit Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="text-[11px] font-mono text-[#0047DE] uppercase tracking-widest">
                    Direct Atelier Inscription
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-mono uppercase text-white/50 mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Elena Rostova"
                        className="w-full bg-white/5 border border-white/15 px-3.5 py-2.5 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#0047DE] font-mono transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono uppercase text-white/50 mb-1">
                        Electronic Mail
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="elena@enterprise.com"
                        className="w-full bg-white/5 border border-white/15 px-3.5 py-2.5 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#0047DE] font-mono transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono uppercase text-white/50 mb-1">
                      Engineering Domain
                    </label>
                    <select
                      value={formData.discipline}
                      onChange={(e) => setFormData({ ...formData, discipline: e.target.value })}
                      className="w-full bg-[#0a0a0f] border border-white/15 px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#0047DE] font-mono"
                    >
                      <option>Robotics & Kinematic Hardware R&D</option>
                      <option>Multilayer High-Speed PCB Layout</option>
                      <option>Sub-GHz RF & Antenna Engineering</option>
                      <option>Autonomous UAV & Ground Vehicle Autopilot</option>
                      <option>High-End 3D WebGL / Museum Experience</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono uppercase text-white/50 mb-1">
                      Project Specifications & Brief
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Specify requirements, kinematic constraints, or collaboration goals..."
                      className="w-full bg-white/5 border border-white/15 px-3.5 py-2.5 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#0047DE] font-mono resize-none transition-colors"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-[#0047DE] hover:bg-[#0038b3] text-white font-mono font-bold text-xs uppercase tracking-widest transition-colors flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(0,71,222,0.4)] cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Transmit Inscription</span>
                  </button>
                </form>
              )}

              {/* Direct Channels */}
              <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-white/60">
                <a
                  href="mailto:contact@4tech.in"
                  className="flex items-center gap-2 hover:text-[#0047DE] transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-[#0047DE]" />
                  <span>contact@4tech.in</span>
                </a>
                <a
                  href="https://wa.me/919488358489"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-[#0047DE] transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-[#0047DE]" />
                  <span>+91 94883 58489</span>
                </a>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* Blueprint Spec Inspection Modal */}
      {inspectProject && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xl flex items-center justify-center p-6">
          <div className="relative max-w-2xl w-full bg-[#08080c] border border-white/20 p-8 shadow-[0_0_80px_rgba(0,71,222,0.25)]">
            <button
              onClick={() => setInspectProject(null)}
              className="absolute top-6 right-6 text-white/60 hover:text-white p-2 border border-white/10 hover:border-white/40 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="inline-block bg-[#0047DE] text-white px-2 py-0.5 text-[10px] font-mono tracking-widest uppercase mb-2">
              {inspectProject.category}
            </div>
            <h2 className="font-serif text-3xl font-bold text-white uppercase tracking-wide mb-3">
              {inspectProject.title}
            </h2>
            <p className="text-xs text-white/70 font-sans leading-relaxed mb-6">
              {inspectProject.desc}
            </p>

            <div className="border-t border-white/10 pt-4 mb-6">
              <div className="text-[10px] font-mono text-white/50 uppercase tracking-widest mb-3">
                Architectural Telemetry
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {inspectProject.specs.map((s, idx) => (
                  <div key={idx} className="p-3 bg-white/5 border border-white/10 font-mono text-xs">
                    <div className="text-[10px] text-white/40 uppercase">{s.label}</div>
                    <div className="text-white font-bold mt-0.5">{s.val}</div>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => setInspectProject(null)}
              className="w-full py-3 bg-[#0047DE] hover:bg-[#0038b3] text-white font-mono font-bold text-xs uppercase tracking-widest transition-colors cursor-pointer"
            >
              Close Inscription
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
