import React from 'react';
import { ArrowUpRight, ArrowUp, Mail, Phone } from 'lucide-react';
import { GithubIcon, LinkedinIcon, InstagramIcon, WhatsAppIcon } from './BrandIcons';
import FooterScene from './FooterScene';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#050508] py-16 px-6 text-zinc-400 relative overflow-hidden">
      <FooterScene className="opacity-25" />
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 mb-12 relative z-10">
        
        {/* Brand column */}
        <div className="md:col-span-5 space-y-4">
          <a href="#top" className="inline-block">
            <span className="font-extrabold text-2xl tracking-tighter text-white">
              <span className="text-[#ff3b55]">4</span>tech<span className="text-[#ff3b55]">.</span>
            </span>
          </a>
          <p className="text-sm max-w-sm leading-relaxed text-zinc-400">
            Independent engineering R&D across robotics, embedded systems, RF and automation. Project development and practical training with Mohammed Vashir.
          </p>
          <div className="text-xs font-mono text-zinc-500">
            Kalpakkam, Tamil Nadu 603102 · India
          </div>

          <div className="flex items-center gap-3 pt-2">
            <a href="https://wa.me/919360108408" target="_blank" rel="noreferrer" className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition">
              <WhatsAppIcon className="w-4 h-4" />
            </a>
            <a href="https://www.linkedin.com/in/mohammed-vashir-793b89378/" target="_blank" rel="noreferrer" className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition">
              <LinkedinIcon className="w-4 h-4" />
            </a>
            <a href="https://github.com/4techno" target="_blank" rel="noreferrer" className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition">
              <GithubIcon className="w-4 h-4" />
            </a>
            <a href="https://www.instagram.com/_.herculex._/" target="_blank" rel="noreferrer" className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition">
              <InstagramIcon className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Links Column 1 */}
        <div className="md:col-span-2 space-y-3">
          <div className="text-xs font-mono uppercase text-white tracking-wider">Navigation</div>
          <ul className="space-y-2 text-xs font-mono">
            <li><a href="#projects" className="hover:text-white transition">Work (15 Projects)</a></li>
            <li><a href="#expertise" className="hover:text-white transition">6 Disciplines</a></li>
            <li><a href="#method" className="hover:text-white transition">Engineering Process</a></li>
            <li><a href="#founder" className="hover:text-white transition">About Mohammed Vashir</a></li>
          </ul>
        </div>

        {/* Links Column 2 */}
        <div className="md:col-span-2 space-y-3">
          <div className="text-xs font-mono uppercase text-white tracking-wider">Connect</div>
          <ul className="space-y-2 text-xs font-mono">
            <li><a href="https://wa.me/919360108408" target="_blank" rel="noreferrer" className="hover:text-white transition">WhatsApp (+91 9360108408)</a></li>
            <li><a href="https://www.linkedin.com/in/mohammed-vashir-793b89378/" target="_blank" rel="noreferrer" className="hover:text-white transition">LinkedIn</a></li>
            <li><a href="https://github.com/4techno" target="_blank" rel="noreferrer" className="hover:text-white transition">GitHub (4techno)</a></li>
            <li><a href="mailto:mohammedvashir75@gmail.com" className="hover:text-white transition">Direct Email</a></li>
          </ul>
        </div>

        {/* Links Column 3 */}
        <div className="md:col-span-3 space-y-3">
          <div className="text-xs font-mono uppercase text-white tracking-wider">Telemetry Core</div>
          <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-xs font-mono space-y-2">
            <div className="flex justify-between">
              <span className="text-zinc-500">Founder:</span>
              <span className="text-white">Mohammed Vashir</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-500">Institution:</span>
              <span className="text-white">Crescent (BSACIST)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-500">R&D Lab:</span>
              <span className="text-emerald-400">Online & Active</span>
            </div>
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-zinc-500 relative z-10">
        <div>
          © 2026 4tech. From first principles to working prototypes.
        </div>
        <div className="flex items-center gap-4 mt-4 sm:mt-0">
          <a href="#top" className="text-zinc-400 hover:text-white flex items-center gap-1 transition">
            <span>Back to top</span>
            <ArrowUp className="w-3 h-3" />
          </a>
        </div>
      </div>
    </footer>
  );
}
