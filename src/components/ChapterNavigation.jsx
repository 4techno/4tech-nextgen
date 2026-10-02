import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Menu, X, ArrowUpRight, FileText } from 'lucide-react';
import { sound } from '../utils/soundEngine';

const chapters = [
  { id: 'architect', num: '01', roman: 'I', title: 'Profile', desc: 'Mohammed Vashir // Creative Technologist' },
  { id: 'works', num: '02', roman: 'II', title: 'Selected Works', desc: '15 Production Systems & Hardware R&D' },
  { id: 'disciplines', num: '03', roman: 'III', title: 'Disciplines', desc: '6 Core Technical Specializations' },
  { id: 'method', num: '04', roman: 'IV', title: 'Methodology', desc: 'First-Principles Engineering Pipeline' },
  { id: 'dialogue', num: '05', roman: 'V', title: 'Contact', desc: 'Contract & Collaboration Inquiries' }
];

export default function ChapterNavigation({ activeChapter = 'architect', onSelectChapter, onReplayIntro, onOpenResume }) {
  const [soundActive, setSoundActive] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectorExpanded, setSelectorExpanded] = useState(false);

  const toggleSound = () => {
    const nextState = sound.toggleMute();
    setSoundActive(nextState);
  };

  const currentChapter = chapters.find(c => c.id === activeChapter) || chapters[0];

  return (
    <>
      {/* 1. Top Fixed Navigation Bar */}
      <header className="fixed top-0 left-0 right-0 z-40 px-6 py-5 md:px-10 flex items-center justify-between pointer-events-none">
        
        {/* Left: Brand Monogram */}
        <div className="flex items-center gap-4 pointer-events-auto">
          <a
            href="#architect"
            onClick={(e) => {
              e.preventDefault();
              onSelectChapter('architect');
              sound.playSubtleClick();
            }}
            className="group flex items-center gap-3"
          >
            <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center font-display text-sm font-bold text-[#c89f68] group-hover:border-[#c89f68] transition-colors">
              MV
            </div>
            <div className="flex flex-col">
              <span className="font-display tracking-[0.2em] text-xs uppercase text-white font-bold group-hover:text-[#c89f68] transition-colors">
                Mohammed Vashir
              </span>
              <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">
                Creative Technologist · Systems Architect
              </span>
            </div>
          </a>
        </div>

        {/* Center: Chapter Direct Links (Desktop) */}
        <nav className="hidden lg:flex items-center gap-8 px-6 py-2.5 rounded-full bg-black/60 backdrop-blur-xl border border-white/10 pointer-events-auto">
          {chapters.map((ch) => {
            const isActive = activeChapter === ch.id;
            return (
              <button
                key={ch.id}
                onClick={() => {
                  onSelectChapter(ch.id);
                  sound.playSubtleClick();
                }}
                className={`relative text-xs font-mono tracking-wider transition-colors py-1 ${
                  isActive ? 'text-[#c89f68] font-bold' : 'text-zinc-400 hover:text-white'
                }`}
              >
                <span>{ch.roman}. {ch.title}</span>
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#c89f68] rounded-full shadow-[0_0_8px_#c89f68]" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right: Sound Control, Resume Dossier & Replay 3D Intro */}
        <div className="flex items-center gap-2.5 sm:gap-3 pointer-events-auto">
          
          {/* Resume Dossier Button */}
          {onOpenResume && (
            <button
              onClick={() => {
                sound.playSubtleClick();
                onOpenResume();
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-[#c89f68]/40 bg-[#c89f68]/15 hover:bg-[#c89f68] hover:text-black text-[#c89f68] text-[11px] font-mono font-bold transition-all shadow-[0_0_15px_rgba(200,159,104,0.18)] cursor-pointer"
              title="Open Official Resume Dossier"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Resume</span>
            </button>
          )}

          {/* Replay 3D Intro Button */}
          {onReplayIntro && (
            <button
              onClick={onReplayIntro}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-white/10 bg-black/40 backdrop-blur text-[11px] font-mono text-zinc-400 hover:text-white hover:border-[#c89f68]/40 transition cursor-pointer"
              title="Re-open 3D Cinematic Intro"
            >
              <span>3D Intro</span>
            </button>
          )}

          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            className="flex items-center gap-2 px-3.5 py-2 rounded-full border border-white/10 bg-black/50 backdrop-blur hover:border-[#c89f68] transition-colors cursor-pointer"
            title={soundActive ? 'Mute Atmospheric Audio' : 'Unmute Atmospheric Audio'}
          >
            <div className="flex items-end gap-0.5 h-3.5">
              <span className={`w-0.5 bg-[#c89f68] rounded-full ${soundActive ? 'audio-bar' : 'h-1'}`} />
              <span className={`w-0.5 bg-[#c89f68] rounded-full ${soundActive ? 'audio-bar' : 'h-2.5'}`} />
              <span className={`w-0.5 bg-[#c89f68] rounded-full ${soundActive ? 'audio-bar' : 'h-1.5'}`} />
              <span className={`w-0.5 bg-[#c89f68] rounded-full ${soundActive ? 'audio-bar' : 'h-3'}`} />
            </div>
          </button>

          {/* Connect Button */}
          <button
            onClick={() => onSelectChapter('dialogue')}
            className="px-4 py-2 rounded-full bg-white text-black font-semibold text-xs font-mono hover:bg-[#c89f68] hover:text-white transition flex items-center gap-1.5 shadow-md shadow-white/5 cursor-pointer"
          >
            <span>Let's Talk</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-full bg-white/5 border border-white/10 text-zinc-300 cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-[#07070a]/95 backdrop-blur-2xl p-8 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="font-display text-sm tracking-widest text-[#c89f68]">CHAPTERS</span>
            <button onClick={() => setMobileMenuOpen(false)} className="p-2 text-zinc-400">
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="space-y-6 my-auto">
            {onOpenResume && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenResume();
                }}
                className="w-full py-3.5 px-4 rounded-2xl bg-[#c89f68] text-black font-mono font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg cursor-pointer"
              >
                <FileText className="w-4 h-4" />
                <span>View Curriculum Vitae (PDF)</span>
              </button>
            )}
            {chapters.map((ch) => (
              <button
                key={ch.id}
                onClick={() => {
                  onSelectChapter(ch.id);
                  setMobileMenuOpen(false);
                }}
                className="block text-left w-full group"
              >
                <span className="text-xs font-mono text-[#c89f68] block">{ch.roman}</span>
                <span className="text-2xl font-display font-bold text-white group-hover:text-[#c89f68] transition">
                  {ch.title}
                </span>
                <span className="text-xs text-zinc-500 block">{ch.desc}</span>
              </button>
            ))}
          </div>
          <div className="text-xs font-mono text-zinc-600">
            MOHAMMED VASHIR // 4TECH
          </div>
        </div>
      )}

      {/* 2. Floating Circular Chapter Selector matching Symphony of Vines */}
      <div className="fixed bottom-6 right-6 z-40 flex items-center gap-4">
        
        {/* Expanded Chapters Drawer on Hover / Click */}
        {selectorExpanded && (
          <div className="glass-card-luxury p-4 rounded-2xl border border-[#c89f68]/30 shadow-2xl flex flex-col gap-2 animate-fade-in w-64">
            <div className="text-[10px] font-mono text-[#c89f68] uppercase tracking-widest border-b border-white/10 pb-1.5 flex justify-between">
              <span>EXPLORE CHAPTERS</span>
              <span>[05]</span>
            </div>
            {chapters.map((ch) => (
              <button
                key={ch.id}
                onClick={() => {
                  onSelectChapter(ch.id);
                  setSelectorExpanded(false);
                  sound.playSubtleClick();
                }}
                className={`text-left p-2 rounded-xl text-xs transition flex items-center justify-between ${
                  activeChapter === ch.id
                    ? 'bg-[#c89f68]/20 text-[#c89f68] font-bold border border-[#c89f68]/30'
                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[10px] text-zinc-500">{ch.num}</span>
                  <span className="font-display">{ch.title}</span>
                </div>
                <span className="font-mono text-[10px] text-zinc-600">{ch.roman}</span>
              </button>
            ))}
          </div>
        )}

        {/* Circular Trigger with Organic Rotating Rings from Symphony of Vines */}
        <button
          onClick={() => {
            setSelectorExpanded(!selectorExpanded);
            sound.playSubtleClick();
          }}
          className="group relative w-20 h-20 flex items-center justify-center rounded-full bg-black/80 backdrop-blur border border-white/10 hover:border-[#c89f68] transition-all shadow-xl"
          title="Toggle Chapter Navigation"
        >
          {/* Rotating Organic Bezier Rings */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="88"
            height="89"
            viewBox="0 0 88 89"
            fill="none"
            className="absolute inset-0 w-full h-full pointer-events-none p-1.5 animate-spin-slow group-hover:scale-105 transition-transform"
          >
            <path
              d="M79.2772 39.8839C85.1004 61.603 71.2873 75.883 45.8134 82.7045C26.5499 87.8629 13.5523 68.9115 8.57604 50.3515C3.11311 26.843 21.1028 12.7143 40.3664 7.55583C59.6299 2.3974 72.3952 14.2159 79.2772 39.8839Z"
              stroke="#c89f68"
              strokeWidth="1.2"
            />
          </svg>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="88"
            height="89"
            viewBox="0 0 88 89"
            fill="none"
            className="absolute inset-0 w-full h-full pointer-events-none p-2 animate-spin-reverse opacity-50"
          >
            <path
              d="M62.4666 15.6093C84.6472 25.7798 87.7796 45.5223 77.024 68.9216C68.8907 86.6163 44.3981 83.6003 25.4438 74.9092C1.98109 63.2791 1.68789 40.5466 9.82126 22.8519C17.9546 5.1572 36.2532 3.58968 62.4666 15.6093Z"
              stroke="#9d6e46"
              strokeWidth="0.8"
            />
          </svg>

          {/* Center Roman Numeral & Chapter Indicator */}
          <div className="relative z-10 flex flex-col items-center justify-center">
            <span className="font-luxury italic text-sm text-[#c89f68] leading-none">Ch.</span>
            <span className="font-display font-bold text-sm text-white leading-tight">
              {currentChapter.roman}
            </span>
          </div>
        </button>

      </div>
    </>
  );
}
