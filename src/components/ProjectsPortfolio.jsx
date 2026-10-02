import React, { useState, useEffect } from 'react';
import { Search, ArrowUpRight, X, Layers, CheckCircle2, ShieldCheck, Terminal, Cpu } from 'lucide-react';
import ProjectsScene from './ProjectsScene';

export default function ProjectsPortfolio() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeLevel, setActiveLevel] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (activeLevel !== 'All') params.append('level', activeLevel);
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

  const levels = ['All', 'Research Level', 'Advanced', 'Intermediate'];

  return (
    <section id="projects" className="py-24 px-6 border-t border-white/10 relative overflow-hidden">
      <ProjectsScene className="opacity-30" />
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-mono text-[#ff3b55] uppercase tracking-widest mb-3 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ff3b55]"></span>
            <span>The 4tech R&D Collection</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
            Systems thinking. <br />
            Real-world ambition.
          </h2>
          <p className="text-zinc-400 text-lg leading-relaxed">
            From RF radiation pattern measurement to multi-axis robotic motion. A focused collection of integrated hardware systems, working prototypes, and experimental directions.
          </p>
        </div>

        {/* Controls: Difficulty Filters + Search Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10 pb-6 border-b border-white/10">
          
          {/* Level Tabs */}
          <div className="flex flex-wrap gap-2">
            {levels.map(level => (
              <button
                key={level}
                onClick={() => setActiveLevel(level)}
                className={`px-4 py-2 rounded-xl text-xs font-mono transition-all ${
                  activeLevel === level
                    ? 'bg-white text-black font-bold shadow-lg shadow-white/10'
                    : 'bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10 border border-white/5'
                }`}
              >
                {level === 'All' ? 'All engineering (15)' : level}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative min-w-[280px]">
            <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search project or technology..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-[#ff3b55] transition"
            />
          </div>

        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((proj, idx) => (
            <article
              key={proj.id}
              className="group p-7 rounded-3xl glass-card hover:border-white/20 transition-all duration-300 flex flex-col justify-between relative cursor-pointer"
              onClick={() => setSelectedProject(proj)}
            >
              <div>
                
                {/* Meta info & Level Badge */}
                <div className="flex items-center justify-between mb-4">
                  <span className={`text-[11px] font-mono px-2.5 py-1 rounded-full border ${
                    proj.level === 'Research Level'
                      ? 'bg-[#ff3b55]/10 text-[#ff3b55] border-[#ff3b55]/30'
                      : proj.level === 'Advanced'
                      ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                      : 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30'
                  }`}>
                    {proj.level}
                  </span>

                  <span className="text-xs font-mono text-zinc-500 font-bold">
                    #{String(idx + 1).padStart(2, '0')}
                  </span>
                </div>

                <div className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider mb-2">
                  {proj.domain}
                </div>

                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#ff3b55] transition leading-snug">
                  {proj.title}
                </h3>

                <p className="text-sm text-zinc-400 leading-relaxed mb-6">
                  {proj.summary}
                </p>

              </div>

              {/* Footer Tech Tags & Trigger */}
              <div>
                <div className="flex flex-wrap gap-1.5 mb-5 pt-4 border-t border-white/5">
                  {proj.technologies.slice(0, 4).map((tech, i) => (
                    <span key={i} className="text-[10px] font-mono text-zinc-400 bg-white/5 px-2 py-0.5 rounded border border-white/5">
                      {tech}
                    </span>
                  ))}
                  {proj.technologies.length > 4 && (
                    <span className="text-[10px] font-mono text-zinc-500">
                      +{proj.technologies.length - 4} more
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between text-xs font-mono text-zinc-400 pt-2 border-t border-white/5">
                  <span className="text-[11px] text-zinc-500">{proj.stage}</span>
                  <span className="text-white group-hover:translate-x-1 transition-transform flex items-center gap-1 font-semibold">
                    <span>View Specs</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#ff3b55]" />
                  </span>
                </div>
              </div>

            </article>
          ))}
        </div>

        {projects.length === 0 && !loading && (
          <div className="text-center py-20 text-zinc-500 font-mono text-sm">
            No engineering projects matched your query.
          </div>
        )}

      </div>

      {/* Modal: Detailed Technical Specs */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-2xl rounded-3xl glass-card border border-white/15 p-8 max-h-[90vh] overflow-y-auto">
            
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-6 right-6 p-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-[#ff3b55]/15 text-[#ff3b55] border border-[#ff3b55]/30">
                  {selectedProject.level}
                </span>
                <span className="text-xs font-mono text-zinc-500">
                  Stage: {selectedProject.stage}
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
                {selectedProject.title}
              </h3>
              <p className="text-xs font-mono text-zinc-400">
                DOMAIN: {selectedProject.domain}
              </p>
            </div>

            <div className="space-y-6 text-sm text-zinc-300">
              <div>
                <h4 className="text-xs font-mono text-[#ff3b55] uppercase tracking-wider mb-2">
                  System Overview
                </h4>
                <p className="leading-relaxed text-zinc-300">
                  {selectedProject.summary}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-mono text-[#ff3b55] uppercase tracking-wider mb-2">
                  Engineering Architecture & Implementation
                </h4>
                <p className="leading-relaxed text-zinc-400 bg-black/50 p-4 rounded-xl border border-white/5 font-mono text-xs">
                  {selectedProject.details}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-mono text-[#ff3b55] uppercase tracking-wider mb-2">
                  Hardware & Software Stack
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
                Mohammed Vashir // 4tech R&D
              </span>
              <a
                href="#contact"
                onClick={() => setSelectedProject(null)}
                className="px-5 py-2.5 rounded-xl bg-[#ff3b55] hover:bg-[#ff203e] text-white font-semibold text-xs transition flex items-center gap-1.5"
              >
                <span>Discuss This System</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}
