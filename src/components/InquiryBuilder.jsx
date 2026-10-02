import React, { useState } from 'react';
import { Send, CheckCircle2, ArrowUpRight, MessageSquare, Phone, Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon, InstagramIcon, WhatsAppIcon } from './BrandIcons';
import ContactScene from './ContactScene';
import confetti from 'canvas-confetti';

export default function InquiryBuilder() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    discipline: 'Robotics & Kinematics',
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
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
        setFormData({
          name: '',
          email: '',
          phone: '',
          discipline: 'Robotics & Kinematics',
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
    <section id="contact" className="py-24 px-6 border-t border-white/10 relative overflow-hidden">
      <ContactScene className="opacity-35" />
      <div className="max-w-7xl mx-auto relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Headline & Direct Contact Links */}
          <div className="lg:col-span-5 space-y-6">
            <div className="text-xs font-mono text-[#ff3b55] uppercase tracking-widest flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff3b55]" />
              <span>{'{ 04 / LET’S BUILD SOMETHING }_'}</span>
            </div>

            <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Every great project starts with <br />
              <span className="text-[#ff3b55]">'what if?'</span>
            </h2>

            <p className="text-zinc-400 text-base sm:text-lg leading-relaxed">
              Tell us what you're thinking. Whether it's an ambitious robotics project, embedded PCB bring-up, or RF measurement system, let's find out what's possible.
            </p>

            {/* Direct Connect Grid */}
            <div className="space-y-3 pt-4">
              <a
                href="https://wa.me/919360108408"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-4 rounded-2xl glass-card hover:border-[#ff3b55]/40 transition group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                    <WhatsAppIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-zinc-500 block">WHATSAPP DIRECT</span>
                    <span className="text-sm font-semibold text-white group-hover:text-emerald-400 transition">+91 9360108408</span>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-white transition" />
              </a>

              <a
                href="mailto:mohammedvashir75@gmail.com"
                className="flex items-center justify-between p-4 rounded-2xl glass-card hover:border-[#ff3b55]/40 transition group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#ff3b55]/10 text-[#ff3b55] flex items-center justify-center">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-zinc-500 block">OFFICIAL EMAIL</span>
                    <span className="text-sm font-semibold text-white group-hover:text-[#ff3b55] transition">mohammedvashir75@gmail.com</span>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-white transition" />
              </a>
            </div>

            {/* Social channels */}
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
                    className="p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-400 hover:text-white transition"
                    title={s.label}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>

          </div>

          {/* Right Column: Interactive Proposal Form */}
          <div className="lg:col-span-7 glass-card p-8 rounded-3xl border border-white/10">
            <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-[#ff3b55]" />
              <span>Project Brief & Inquiry Submission</span>
            </h3>
            <p className="text-xs font-mono text-zinc-400 mb-6">
              Connect directly with Mohammed Vashir to discuss requirements, feasibility, and timelines.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Alex Henderson"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-[#ff3b55] transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="alex@domain.io"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-[#ff3b55] transition"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">
                    Phone / WhatsApp
                  </label>
                  <input
                    type="tel"
                    placeholder="+91..."
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-[#ff3b55] transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">
                    Primary Discipline
                  </label>
                  <select
                    value={formData.discipline}
                    onChange={(e) => setFormData({ ...formData, discipline: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-black/80 border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-[#ff3b55] transition"
                  >
                    <option value="Robotics & Kinematics">Robotics & Kinematics</option>
                    <option value="Embedded Systems & KiCad PCB">Embedded Systems & KiCad PCB</option>
                    <option value="RF Technology & Antenna Systems">RF Technology & Antenna Systems</option>
                    <option value="Automation, Vision & AI">Automation, Vision & AI</option>
                    <option value="Experimental R&D">Experimental R&D</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">
                  Project Brief & Technical Requirements *
                </label>
                <textarea
                  rows="4"
                  required
                  placeholder="Describe what the system needs to accomplish, key constraints, and desired outcomes..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-[#ff3b55] transition resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl bg-[#ff3b55] hover:bg-[#ff203e] text-white font-semibold text-xs transition flex items-center justify-center gap-2 shadow-lg shadow-[#ff3b55]/25 disabled:opacity-50"
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
