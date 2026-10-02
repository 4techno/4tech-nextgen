import React, { useState } from 'react';
import { Send, ArrowUpRight, MessageSquare, Mail, Phone, Sparkles } from 'lucide-react';
import { GithubIcon, LinkedinIcon, InstagramIcon, WhatsAppIcon } from './BrandIcons';
import ContactScene from './ContactScene';
import confetti from 'canvas-confetti';
import { sound } from '../utils/soundEngine';

export default function ChapterContact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    discipline: 'Robotics & Control Systems',
    message: ''
  });
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setLoading(true);
    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (res.ok) {
        setStatus({ type: 'success', msg: data.message });
        sound.playChime(880); // A5 celebration chime
        confetti({
          particleCount: 90,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#c89f68', '#ff3b55', '#ffffff']
        });
        setFormData({
          name: '',
          email: '',
          phone: '',
          discipline: 'Robotics & Control Systems',
          message: ''
        });
      } else {
        setStatus({ type: 'error', msg: data.error || 'Submission failed.' });
      }
    } catch (err) {
      setStatus({ type: 'error', msg: 'Unable to reach backend gateway.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="dialogue" className="relative min-h-screen py-32 px-6 overflow-hidden">
      
      {/* 3D Radar Signal Transmission Scene */}
      <ContactScene className="opacity-35" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Chapter Header Card matching Symphony of Vines */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 mb-3">
            <span className="font-mono text-xs text-[#c89f68] font-bold">CHAPTER 05</span>
            <span className="text-zinc-600">//</span>
            <span className="text-xs font-mono tracking-widest text-zinc-400 uppercase">COMMISSIONS & INQUIRIES</span>
          </div>

          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white mb-6 uppercase">
            Initiate a <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#e8d5be] to-[#c89f68]">
              Collaboration
            </span>
          </h2>

          <p className="font-sans text-base sm:text-xl text-zinc-300 leading-relaxed font-light">
            Available for select engineering contracts, 3D web experiences, and physical computing R&amp;D. Tell me about your requirements, constraints, and target timeline.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Direct Links */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="space-y-3">
              <a
                href="https://wa.me/919360108408"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-5 rounded-2xl glass-card-luxury hover:border-[#c89f68] transition group shadow-lg"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center">
                    <WhatsAppIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-zinc-500 uppercase block tracking-wider">DIRECT WHATSAPP</span>
                    <span className="text-sm font-semibold text-white group-hover:text-emerald-400 transition">+91 9360108408</span>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-white transition" />
              </a>

              <a
                href="mailto:mohammedvashir75@gmail.com"
                className="flex items-center justify-between p-5 rounded-2xl glass-card-luxury hover:border-[#c89f68] transition group shadow-lg"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#c89f68]/15 text-[#c89f68] flex items-center justify-center">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-zinc-500 uppercase block tracking-wider">OFFICIAL INBOX</span>
                    <span className="text-sm font-semibold text-white group-hover:text-[#c89f68] transition">mohammedvashir75@gmail.com</span>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-white transition" />
              </a>
            </div>

            {/* Social Channels */}
            <div className="pt-2 flex items-center gap-3">
              {[
                { label: 'LinkedIn', href: 'https://www.linkedin.com/in/mohammed-vashir-793b89378/', Icon: LinkedinIcon },
                { label: 'GitHub', href: 'https://github.com/4techno', Icon: GithubIcon },
                { label: 'Instagram', href: 'https://www.instagram.com/_.herculex._/', Icon: InstagramIcon }
              ].map(s => {
                const Icon = s.Icon;
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="p-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-400 hover:text-white transition"
                    title={s.label}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>

            <div className="p-5 rounded-2xl bg-white/5 border border-white/5 text-xs font-mono text-zinc-400 space-y-1">
              <span className="text-[#c89f68] font-bold block uppercase">LOCATION &amp; AVAILABILITY</span>
              <p>Kalpakkam Nuclear &amp; Energy Corridor · Tamil Nadu 603102 · India</p>
              <p className="text-zinc-500">Available for contracted R&amp;D, embedded consulting, and creative technology commissions globally.</p>
            </div>

          </div>

          {/* Right Column: Inquiry Form */}
          <div className="lg:col-span-7 glass-card-luxury p-8 rounded-3xl border border-[#c89f68]/30 shadow-2xl">
            <h3 className="font-display text-xl font-bold text-white mb-2 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-[#c89f68]" />
              <span>Project Brief &amp; Technical Requirements</span>
            </h3>
            <p className="text-xs font-mono text-zinc-400 mb-6">
              Transmitted directly to Mohammed Vashir. Technical briefs are reviewed within 24 hours.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-mono text-zinc-400 uppercase tracking-wider mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Elena Rostova"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-[#c89f68] transition"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-zinc-400 uppercase tracking-wider mb-2">
                    Corporate / Personal Email *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="elena@enterprise.io"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-[#c89f68] transition"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-mono text-zinc-400 uppercase tracking-wider mb-2">
                    Phone / WhatsApp Number
                  </label>
                  <input
                    type="tel"
                    placeholder="+91 / +1..."
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-[#c89f68] transition"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-zinc-400 uppercase tracking-wider mb-2">
                    Project Scope
                  </label>
                  <select
                    value={formData.discipline}
                    onChange={(e) => setFormData({ ...formData, discipline: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-black/80 border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-[#c89f68] transition"
                  >
                    <option value="Robotics & Control Systems">Robotics &amp; Control Systems</option>
                    <option value="Embedded Systems & KiCad PCB">Embedded Systems &amp; KiCad PCB</option>
                    <option value="RF Technology & Antenna Systems">RF Technology &amp; Antenna Systems</option>
                    <option value="Spatial 3D & Web Design">Spatial 3D &amp; Web Design</option>
                    <option value="Hardware Prototyping & R&D">Hardware Prototyping &amp; R&amp;D</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono text-zinc-400 uppercase tracking-wider mb-2">
                  Project Brief &amp; Technical Scope *
                </label>
                <textarea
                  rows="4"
                  required
                  placeholder="Outline your target specifications, physical dimensions, silicon preferences, or timeline..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-[#c89f68] transition resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl bg-[#c89f68] hover:bg-[#b58c57] text-black font-bold text-xs font-mono transition flex items-center justify-center gap-2 shadow-lg shadow-[#c89f68]/20 disabled:opacity-50"
              >
                <span>{loading ? 'Transmitting Brief...' : 'Transmit Project Brief'}</span>
                <Send className="w-3.5 h-3.5" />
              </button>

              {status && (
                <div className={`p-3 rounded-xl border text-xs font-mono ${
                  status.type === 'success'
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                    : 'bg-red-500/10 border-red-500/30 text-red-400'
                }`}>
                  {status.msg}
                </div>
              )}

            </form>
          </div>

        </div>

      </div>
    </section>
  );
}
