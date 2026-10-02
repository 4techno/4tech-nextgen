import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import confetti from 'canvas-confetti';
import { Send, CheckCircle2, MessageSquare, Mail, Phone, ExternalLink } from 'lucide-react';

/**
 * MakeMePulse 2016 - Experience 06: BE PROUD / PULSE (Finale & Contact Atelier)
 * Celebration Particle Supernova & Technical Inquiry Dispatch
 */
export default function PulseScene({ onRestart, onJumpToChapter }) {
  const mountRef = useRef(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    discipline: 'Robotics & Hardware R&D',
    message: ''
  });

  useEffect(() => {
    // Launch celebratory particle confetti on arrival
    confetti({
      particleCount: 120,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#00f0ff', '#a855f7', '#ec4899', '#ffffff']
    });

    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 18);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Particle Supernova Shockwave Rings
    const ringCount = 8;
    const rings = [];
    for (let i = 0; i < ringCount; i++) {
      const g = new THREE.RingGeometry(2 + i * 1.2, 2.05 + i * 1.2, 64);
      const m = new THREE.MeshBasicMaterial({
        color: i % 2 === 0 ? 0x00f0ff : 0xa855f7,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.4
      });
      const ring = new THREE.Mesh(g, m);
      scene.add(ring);
      rings.push(ring);
    }

    // 1000 ambient stardust
    const starGeom = new THREE.BufferGeometry();
    const starCount = 800;
    const starPos = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount * 3; i += 3) {
      starPos[i] = (Math.random() - 0.5) * 50;
      starPos[i + 1] = (Math.random() - 0.5) * 35;
      starPos[i + 2] = (Math.random() - 0.5) * 20;
    }
    starGeom.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
    const starMat = new THREE.PointsMaterial({ color: 0x00f0ff, size: 0.08, transparent: true, opacity: 0.6 });
    const stars = new THREE.Points(starGeom, starMat);
    scene.add(stars);

    let frameId;
    let clock = new THREE.Clock();

    const animate = () => {
      const time = clock.getElapsedTime();
      rings.forEach((r, idx) => {
        r.rotation.z = time * 0.2 * (idx % 2 === 0 ? 1 : -1);
        const scale = 1 + Math.sin(time * 2 + idx * 0.4) * 0.15;
        r.scale.set(scale, scale, 1);
      });
      stars.rotation.y = time * 0.05;

      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };

    frameId = requestAnimationFrame(animate);

    const handleResize = () => {
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(frameId);
      if (renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    // WhatsApp dispatch payload
    const text = encodeURIComponent(
      `Hello Mohammed Vashir,\n\nName: ${formData.name}\nEmail: ${formData.email}\nDiscipline: ${formData.discipline}\n\nProject Scope:\n${formData.message}`
    );
    window.open(`https://wa.me/919488358489?text=${text}`, '_blank');
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-y-auto py-16 px-6">
      <div ref={mountRef} className="fixed inset-0 w-full h-full pointer-events-none" />

      <div className="relative z-20 max-w-4xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Column: Direct Credentials & Links */}
        <div className="lg:col-span-5 space-y-6">
          <div className="inline-block bg-[#00f0ff] text-black px-2 py-0.5 text-[10px] font-bold tracking-widest uppercase">
            Experience 06 // Pulse
          </div>
          <h1 className="text-4xl lg:text-5xl font-black text-white tracking-tight uppercase leading-none">
            Be Proud
          </h1>
          <p className="text-xs text-neutral-400 font-mono tracking-wider leading-relaxed">
            Engineering R&D Atelier based in Kalpakkam, India. Ready for strategic robotics partnerships, embedded hardware prototyping, and immersive 3D web production.
          </p>

          <div className="space-y-3 pt-2">
            <a
              href="mailto:contact@4tech.in"
              className="flex items-center gap-3 text-neutral-300 hover:text-[#00f0ff] font-mono text-xs transition-colors p-3 bg-white/5 border border-white/10 hover:border-[#00f0ff]/50"
            >
              <Mail className="w-4 h-4 text-[#00f0ff]" />
              <span>contact@4tech.in</span>
            </a>
            <a
              href="https://wa.me/919488358489"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-neutral-300 hover:text-[#00f0ff] font-mono text-xs transition-colors p-3 bg-white/5 border border-white/10 hover:border-[#00f0ff]/50"
            >
              <Phone className="w-4 h-4 text-[#00f0ff]" />
              <span>+91 94883 58489</span>
            </a>
          </div>

          {/* Quick Experience Stepper */}
          <div className="pt-4 border-t border-white/10">
            <div className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest mb-3">
              Explore Chapters
            </div>
            <div className="flex flex-wrap gap-2">
              {['Home', 'Think', 'Imagine', 'Strive', 'Work Hard', 'Dream Big'].map((name, i) => (
                <button
                  key={name}
                  onClick={() => onJumpToChapter(i)}
                  className="px-2.5 py-1 text-[10px] font-mono uppercase bg-black border border-white/20 hover:border-[#00f0ff] hover:text-[#00f0ff] transition-all"
                >
                  {name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Dispatch Form */}
        <div className="lg:col-span-7 bg-black/80 backdrop-blur-xl border border-white/20 p-8 shadow-[0_0_50px_rgba(0,0,0,0.8)]">
          {formSubmitted ? (
            <div className="py-12 text-center space-y-4">
              <CheckCircle2 className="w-12 h-12 text-[#00f0ff] mx-auto animate-bounce" />
              <h3 className="text-xl font-bold text-white uppercase tracking-wide">
                Signal Dispatched
              </h3>
              <p className="text-xs text-neutral-400 font-mono max-w-sm mx-auto">
                Your direct inquiry has been transmitted. Mohammed Vashir will establish secure telemetry shortly.
              </p>
              <button
                onClick={() => setFormSubmitted(false)}
                className="mt-4 px-6 py-2 bg-white text-black font-bold text-xs uppercase tracking-widest hover:bg-[#00f0ff] transition-colors"
              >
                Send Another Inscription
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="text-xs font-mono text-[#00f0ff] tracking-widest uppercase mb-1">
                Dispatch Technical Inquiry
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase text-neutral-400 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Elena Rostova"
                  className="w-full bg-white/5 border border-white/15 px-3 py-2 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-[#00f0ff] font-mono transition-colors"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase text-neutral-400 mb-1">
                  Electronic Mail
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="elena@enterprise.com"
                  className="w-full bg-white/5 border border-white/15 px-3 py-2 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-[#00f0ff] font-mono transition-colors"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase text-neutral-400 mb-1">
                  Domain / Focus Area
                </label>
                <select
                  value={formData.discipline}
                  onChange={(e) => setFormData({ ...formData, discipline: e.target.value })}
                  className="w-full bg-[#111625] border border-white/15 px-3 py-2 text-xs text-white focus:outline-none focus:border-[#00f0ff] font-mono"
                >
                  <option>Robotics & Kinematic Hardware R&D</option>
                  <option>Multilayer High-Speed PCB Layout</option>
                  <option>RF & Sub-GHz Antenna Engineering</option>
                  <option>Immersive 3D WebGL / Portfolio Production</option>
                  <option>Firmware & Embedded Systems Architecture</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase text-neutral-400 mb-1">
                  Project Brief & Specifications
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Describe your technical requirements, architecture constraints, or timeline..."
                  className="w-full bg-white/5 border border-white/15 px-3 py-2 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-[#00f0ff] font-mono resize-none transition-colors"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-[#00f0ff] via-[#a855f7] to-[#ffffff] text-black font-bold text-xs uppercase tracking-widest hover:opacity-95 transition-opacity flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,240,255,0.4)]"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Transmit Specification</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
