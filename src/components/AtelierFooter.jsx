import React from 'react';
import { ArrowUp, Sparkles, FileText, Download } from 'lucide-react';
import { GithubIcon, LinkedinIcon, InstagramIcon, WhatsAppIcon } from './BrandIcons';
import FooterScene from './FooterScene';
import { sound } from '../utils/soundEngine';

export default function AtelierFooter({ onRestartIntro, onOpenResume }) {
  return (
    <footer className="relative bg-[#050508] border-t border-white/10 pt-28 pb-16 px-6 overflow-hidden">
      
      {/* 3D Starfield Horizon Scene */}
      <FooterScene className="opacity-30" />

      <div className="max-w-7xl mx-auto relative z-10 text-center">
        
        {/* Outro statement */}
        <div className="mb-14">
          <div className="font-mono text-xs text-[#c89f68] uppercase tracking-[0.25em] mb-3 font-semibold">
            ATELIER // 4TECH
          </div>
          <h2 className="font-display text-4xl sm:text-6xl md:text-8xl font-bold tracking-[0.1em] uppercase text-white mb-6">
            MOHAMMED VASHIR
          </h2>
          <p className="font-sans text-sm sm:text-lg text-zinc-300 max-w-xl mx-auto leading-relaxed font-light">
            Creative technology, high-speed embedded hardware, and real-time spatial web experiences. Engineered with first-principles precision from Kalpakkam, India.
          </p>
        </div>

        {/* Restart Experience Button matching Symphony of Vines */}
        <div className="mb-20">
          <button
            onClick={() => {
              sound.playChime(659.25);
              onRestartIntro();
            }}
            className="group relative inline-flex items-center justify-center px-8 py-4 transition-transform active:scale-95"
          >
            <div className="absolute inset-0 rounded-full bg-[#c89f68]/15 blur-lg group-hover:bg-[#c89f68]/30 transition-colors" />

            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="201"
              height="59"
              viewBox="0 0 201 59"
              fill="none"
              className="absolute inset-0 w-full h-full pointer-events-none group-hover:scale-105 transition-transform"
            >
              <path
                d="M200.044 24.2553C201.378 39.2942 189.55 52.2379 174.454 52.2154C143.935 52.17 97.3621 52.0503 77.7645 51.7365C62.7815 51.4966 43.6509 52.1645 28.1167 52.9023C13.2509 53.6084 0.725484 41.6905 0.965866 26.8217C1.18899 13.0202 12.3929 1.92106 26.196 1.8276L174.268 0.824961C187.65 0.734349 198.862 10.9256 200.044 24.2553Z"
                stroke="#c89f68"
                strokeWidth="1.2"
              />
            </svg>

            <span className="relative z-10 font-mono tracking-[0.2em] text-xs uppercase text-[#f5ede3] group-hover:text-white transition-colors flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-[#c89f68]" />
              <span>Replay 3D Experience</span>
            </span>
          </button>
        </div>

        {/* Footer Meta Grid */}
        <div className="pt-12 border-t border-white/5 grid grid-cols-1 md:grid-cols-3 gap-8 items-center text-xs font-mono text-zinc-500">
          <div className="text-left space-y-1">
            <span className="text-white font-bold block font-display">MOHAMMED VASHIR</span>
            <span>Kalpakkam Nuclear &amp; Energy Corridor · Tamil Nadu, India</span>
            <div className="flex items-center gap-3 pt-1 text-[11px]">
              {onOpenResume && (
                <button
                  onClick={() => {
                    sound.playSubtleClick();
                    onOpenResume();
                  }}
                  className="text-[#c89f68] hover:underline flex items-center gap-1 cursor-pointer font-medium"
                >
                  <FileText className="w-3 h-3" />
                  <span>Curriculum Vitae</span>
                </button>
              )}
              <span className="text-zinc-700">·</span>
              <a
                href="/Mohammed_Vashir_Resume.pdf"
                download="Mohammed_Vashir_Resume.pdf"
                className="text-zinc-400 hover:text-white flex items-center gap-1"
              >
                <Download className="w-3 h-3" />
                <span>PDF Download</span>
              </a>
              <span className="text-zinc-700">·</span>
              <a
                href="/portfolio_full_project.zip"
                download="portfolio_full_project.zip"
                className="text-zinc-400 hover:text-[#c89f68] flex items-center gap-1"
                title="Download Entire Project Source Code (.zip)"
              >
                <Download className="w-3 h-3" />
                <span>Source Code (.zip)</span>
              </a>
            </div>
          </div>

          <div className="flex items-center justify-center gap-4">
            <a href="https://wa.me/919360108408" target="_blank" rel="noreferrer" className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition" title="WhatsApp">
              <WhatsAppIcon className="w-4 h-4" />
            </a>
            <a href="https://www.linkedin.com/in/mohammed-vashir-793b89378/" target="_blank" rel="noreferrer" className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition" title="LinkedIn">
              <LinkedinIcon className="w-4 h-4" />
            </a>
            <a href="https://github.com/4techno" target="_blank" rel="noreferrer" className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition" title="GitHub">
              <GithubIcon className="w-4 h-4" />
            </a>
            <a href="https://www.instagram.com/_.herculex._/" target="_blank" rel="noreferrer" className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition" title="Instagram">
              <InstagramIcon className="w-4 h-4" />
            </a>
          </div>

          <div className="text-right">
            <a href="#architect" className="inline-flex items-center gap-1.5 text-zinc-400 hover:text-[#c89f68] transition">
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        <div className="mt-8 text-[11px] font-mono text-zinc-600">
          © 2026 Mohammed Vashir // 4tech. All engineering systems, spatial designs &amp; code architectures reserved.
        </div>

      </div>
    </footer>
  );
}
