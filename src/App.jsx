import React, { useState, useEffect } from 'react';
import CinematicIntro3D from './components/CinematicIntro3D';
import ChapterNavigation from './components/ChapterNavigation';
import ChapterAbout from './components/ChapterAbout';
import ChapterProjects from './components/ChapterProjects';
import ChapterDisciplines from './components/ChapterDisciplines';
import ChapterMethod from './components/ChapterMethod';
import ChapterContact from './components/ChapterContact';
import AtelierFooter from './components/AtelierFooter';
import CustomCursor from './components/CustomCursor';
import ResumeModal from './components/ResumeModal';

export default function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [activeChapter, setActiveChapter] = useState('architect');
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  // Track active section on scroll
  useEffect(() => {
    if (showIntro) return;

    const sections = ['architect', 'works', 'disciplines', 'method', 'dialogue'];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveChapter(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [showIntro]);

  const scrollToChapter = (chapterId) => {
    setActiveChapter(chapterId);
    const element = document.getElementById(chapterId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#050608] text-white selection:bg-[#c89f68] selection:text-black relative">
      {/* Authentic Analog Film Grain Texture Overlay */}
      <div className="film-grain" />

      {/* Custom Precision Magnetic Cursor */}
      <CustomCursor />

      {/* 3D Cinematic Intro Experience matching Symphony of Vines */}
      {showIntro && (
        <CinematicIntro3D onEnter={() => setShowIntro(false)} />
      )}

      {/* Main Portfolio Surface */}
      <div className={`transition-opacity duration-1000 ${showIntro ? 'opacity-0' : 'opacity-100'}`}>
        
        {/* Fixed Navigation & Symphony of Vines Circular Chapter Selector */}
        <ChapterNavigation
          activeChapter={activeChapter}
          onSelectChapter={scrollToChapter}
          onReplayIntro={() => setShowIntro(true)}
          onOpenResume={() => setIsResumeOpen(true)}
        />

        <main id="main">
          {/* Chapter I: The Architect */}
          <ChapterAbout
            onExploreWorks={() => scrollToChapter('works')}
            onOpenResume={() => setIsResumeOpen(true)}
          />

          {/* Chapter II: Selected Works (15 Projects R&D) */}
          <ChapterProjects />

          {/* Chapter III: Elemental Disciplines */}
          <ChapterDisciplines />

          {/* Chapter IV: The Method & Engineering Architecture */}
          <ChapterMethod />

          {/* Chapter V: The Dialogue & Atelier Inquiries */}
          <ChapterContact />
        </main>

        {/* The Finale / Atelier Footer */}
        <AtelierFooter
          onRestartIntro={() => setShowIntro(true)}
          onOpenResume={() => setIsResumeOpen(true)}
        />

      </div>

      {/* Official Interactive Curriculum Vitae Modal */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />
    </div>
  );
}
