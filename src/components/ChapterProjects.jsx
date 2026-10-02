import React, { useState, useEffect } from 'react';
import { Search, ArrowUpRight, X, Sparkles, Filter, ExternalLink, Cpu, LayoutGrid, ListFilter } from 'lucide-react';
import ProjectsScene from './ProjectsScene';
import ProjectHoloIcon from './ProjectHoloIcon';
import { sound } from '../utils/soundEngine';

export default function ChapterProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeLevel, setActiveLevel] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'blueprint'
  const [hoveredCardId, setHoveredCardId] = useState(null);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (activeLevel !== 'All') {
        const queryLevel = activeLevel === 'Research R&D' ? 'Research Level' : activeLevel;
        params.append('level', queryLevel);
      }
      if (searchQuery) params.append('search', searchQuery);

      const res = await fetch(`/api/projects?${params.toString()}`);
      const data = await res.json();
      if (data.success) {
        setProjects(data.data);
      }
    } catch (err) {
      console.error('Failed to load projects:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [activeLevel, searchQuery]);

  const levels = ['All', 'Research R&D', 'Advanced', 'Intermediate'];

  return (
    <section id="works" className="relative min-h-screen py-32 px-6 overflow-hidden border-b border-white/5">
      
      {/* 3D Constellation & Data Matrix Background */}
      <ProjectsScene className="opacity-30" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Chapter Header Card matching Symphony of Vines */}
        <div className="max-w-3xl mb-14">
          <div className="flex items-center gap-2 mb-3">
            <span className="font-mono text-xs text-[#c89f68] font-bold">CHAPTER 02</span>
            <span className="text-zinc-600">//</span>
            <span className="text-xs font-mono tracking-widest text-zinc-400 uppercase">SELECTED WORKS</span>
          </div>

          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white mb-6 uppercase">
            Engineered <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#f2dec4] to-[#c89f68]">
              Systems &amp; R&amp;D
            </span>
          </h2>

          <p className="font-sans text-base sm:text-xl text-zinc-300 leading-relaxed font-light">
            Fifteen working hardware systems, experimental apparatuses, and spatial software architectures. From automated RF measurement scanners to multi-axis kinematics and custom silicon.
          </p>
        </div>

        {/* Filter Controls, Search, and View Mode Toggle */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-10 pb-6 border-b border-white/10">
          
          {/* Level Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {levels.map(level => (
              <button
                key={level}
                onClick={() => {
                  setActiveLevel(level);
                  sound.playSubtleClick();
                }}
                className={`px-4 py-2 rounded-xl text-xs font-mono transition-all ${
                  activeLevel === level
                    ? 'bg-[#c89f68] text-black font-bold shadow-lg shadow-[#c89f68]/20'
                    : 'bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10 border border-white/5'
                }`}
              >
                {level === 'All' ? 'All Systems (15)' : level}
              </button>
            ))}
          </div>

          {/* Search & View Mode Switcher */}
          <div className="flex items-center gap-3">
            <div className="relative min-w-[260px] sm:min-w-[280px]">
              <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search systems, silicon, protocols..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-black/60 border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-[#c89f68] transition"
              />
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center p-1 rounded-xl bg-black/60 border border-white/10">
              <button
                onClick={() => {
                  setViewMode('grid');
                  sound.playSubtleClick();
                }}
                className={`p-2 rounded-lg text-xs transition ${
                  viewMode === 'grid' ? 'bg-[#c89f68] text-black' : 'text-zinc-400 hover:text-white'
                }`}
                title="Card Gallery View"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  setViewMode('blueprint');
                  sound.playSubtleClick();
                }}
                className={`p-2 rounded-lg text-xs transition ${
                  viewMode === 'blueprint' ? 'bg-[#c89f68] text-black' : 'text-zinc-400 hover:text-white'
                }`}
                title="Blueprint Matrix View"
              >
                <ListFilter className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

        {/* View Mode 1: 3D Holographic Card Gallery */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((proj, idx) => (
              <article
                key={proj.id}
                onMouseEnter={() => setHoveredCardId(proj.id)}
                onMouseLeave={() => setHoveredCardId(null)}
                onClick={() => {
                  setSelectedProject(proj);
                  sound.playChime(784); // G5 inspect chime
                }}
                className="group p-7 rounded-3xl glass-card-luxury hover:border-[#c89f68]/50 transition-all duration-300 flex flex-col justify-between relative cursor-pointer hover:-translate-y-1.5 shadow-xl"
              >
                <div>
                  
                  {/* Top Bar with 3D Holographic Icon and Meta Badges */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-1 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                      <ProjectHoloIcon
                        domain={proj.domain}
                        level={proj.level}
                        isHovered={hoveredCardId === proj.id}
                      />
                    </div>

                    <div className="flex flex-col items-end gap-1.5">
                      <span className="text-xs font-mono text-zinc-500 font-bold">
                        SYS-{String(idx + 1).padStart(2, '0')}
                      </span>
                      <span className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full border ${
                        proj.level === 'Research Level'
                          ? 'bg-[#ff3b55]/15 text-[#ff3b55] border-[#ff3b55]/30'
                          : proj.level === 'Advanced'
                          ? 'bg-[#c89f68]/15 text-[#c89f68] border-[#c89f68]/30'
                          : 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30'
                      }`}>
                        {proj.level}
                      </span>
                    </div>
                  </div>

                  <div className="text-[11px] font-mono text-[#c89f68] uppercase tracking-wider mb-2 font-medium">
                    {proj.domain}
                  </div>

                  <h3 className="font-display text-lg font-bold text-white mb-2.5 group-hover:text-[#c89f68] transition leading-snug">
                    {proj.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mb-6 font-light">
                    {proj.summary}
                  </p>

                </div>

                <div>
                  {/* Tech Stack Chips */}
                  <div className="flex flex-wrap gap-1.5 mb-4 pt-4 border-t border-white/5">
                    {proj.technologies.slice(0, 4).map((tech, i) => (
                      <span key={i} className="text-[10px] font-mono text-zinc-300 bg-white/5 px-2 py-0.5 rounded border border-white/5">
                        {tech}
                      </span>
                    ))}
                    {proj.technologies.length > 4 && (
                      <span className="text-[10px] font-mono text-zinc-500 py-0.5">
                        +{proj.technologies.length - 4} more
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between text-xs font-mono text-zinc-400 pt-2.5 border-t border-white/5">
                    <span className="text-[11px] text-zinc-500">{proj.stage}</span>
                    <span className="text-white group-hover:text-[#c89f68] group-hover:translate-x-1 transition flex items-center gap-1 font-semibold">
                      <span>Inspect Specs</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-[#c89f68]" />
                    </span>
                  </div>
                </div>

              </article>
            ))}
          </div>
        ) : (
          /* View Mode 2: High-Density Blueprint Matrix Table */
          <div className="rounded-3xl glass-card-luxury overflow-hidden border border-white/10 shadow-2xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs font-mono">
                <thead>
                  <tr className="border-b border-white/10 bg-white/5 text-[#c89f68] uppercase text-[10px] tracking-wider">
                    <th className="py-4 px-6">ID</th>
                    <th className="py-4 px-6">System Architecture</th>
                    <th className="py-4 px-6">Domain</th>
                    <th className="py-4 px-6">Hardware &amp; Silicon Stack</th>
                    <th className="py-4 px-6">Status</th>
                    <th className="py-4 px-6 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-zinc-300">
                  {projects.map((proj, idx) => (
                    <tr
                      key={proj.id}
                      onClick={() => {
                        setSelectedProject(proj);
                        sound.playChime(784);
                      }}
                      className="hover:bg-[#c89f68]/10 transition-colors cursor-pointer group"
                    >
                      <td className="py-4 px-6 text-[#c89f68] font-bold">
                        SYS-{String(idx + 1).padStart(2, '0')}
                      </td>
                      <td className="py-4 px-6 font-display font-semibold text-white group-hover:text-[#c89f68] transition">
                        {proj.title}
                      </td>
                      <td className="py-4 px-6 text-zinc-400">
                        {proj.domain}
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex flex-wrap gap-1 max-w-sm">
                          {proj.technologies.slice(0, 3).map((t, i) => (
                            <span key={i} className="px-2 py-0.5 rounded bg-white/5 border border-white/5 text-[10px]">
                              {t}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-[10px] px-2 py-0.5 rounded-full border border-white/10 bg-white/5">
                          {proj.stage}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <span className="text-[#c89f68] group-hover:underline inline-flex items-center gap-1 font-semibold">
                          <span>Inspect</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {projects.length === 0 && !loading && (
          <div className="text-center py-24 text-zinc-500 font-mono text-sm">
            No engineering projects matched your query.
          </div>
        )}

      </div>

      {/* Technical Spec Inspection Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-fade-in">
          <div className="relative w-full max-w-2xl rounded-3xl glass-card-luxury border border-[#c89f68]/40 p-8 max-h-[90vh] overflow-y-auto shadow-2xl">
            
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-6 right-6 p-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-[#c89f68]/15 text-[#c89f68] border border-[#c89f68]/30">
                  {selectedProject.level}
                </span>
                <span className="text-xs font-mono text-zinc-500">
                  Status: {selectedProject.stage}
                </span>
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white mb-1">
                {selectedProject.title}
              </h3>
              <p className="text-xs font-mono text-[#c89f68]">
                DOMAIN: {selectedProject.domain}
              </p>
            </div>

            <div className="space-y-6 text-sm text-zinc-300">
              <div>
                <h4 className="text-xs font-mono text-[#c89f68] uppercase tracking-wider mb-2 font-semibold">
                  System Overview
                </h4>
                <p className="leading-relaxed text-zinc-300 font-light">
                  {selectedProject.summary}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-mono text-[#c89f68] uppercase tracking-wider mb-2 font-semibold">
                  Engineering Architecture &amp; Implementation
                </h4>
                <p className="leading-relaxed text-zinc-300 bg-black/60 p-4 rounded-xl border border-white/10 font-mono text-xs">
                  {selectedProject.details}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-mono text-[#c89f68] uppercase tracking-wider mb-2 font-semibold">
                  Hardware &amp; Software Stack
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.technologies.map((t, i) => (
                    <span key={i} className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 font-mono text-xs text-white">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs font-mono text-zinc-500">
                Mohammed Vashir // Systems Engineering
              </span>
              <a
                href="#dialogue"
                onClick={() => setSelectedProject(null)}
                className="px-5 py-2.5 rounded-xl bg-[#c89f68] hover:bg-[#b58c57] text-black font-bold text-xs font-mono transition flex items-center gap-1.5 shadow-lg"
              >
                <span>Discuss System Deployment</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}
