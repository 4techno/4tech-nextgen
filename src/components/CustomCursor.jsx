import React, { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [trailingPos, setTrailingPos] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable on pointer fine devices (desktop/mouse)
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const handleMouseMove = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target;
      const isInteractive = target.closest('button, a, input, select, textarea, [role="button"], .cursor-pointer');
      setIsHovering(!!isInteractive);
    };

    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    // Smooth lerp loop for the trailing ring
    let frameId;
    const loop = () => {
      setTrailingPos((prev) => ({
        x: prev.x + (pos.x - prev.x) * 0.22,
        y: prev.y + (pos.y - prev.y) * 0.22
      }));
      frameId = requestAnimationFrame(loop);
    };
    frameId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(frameId);
    };
  }, [pos.x, pos.y, isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Precision center dot */}
      <div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-[#c89f68] pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2 transition-transform duration-75 ease-out shadow-[0_0_10px_#c89f68]"
        style={{
          transform: `translate3d(${pos.x}px, ${pos.y}px, 0) scale(${isHovering ? 0.4 : 1})`
        }}
      />

      {/* Trailing organic ring */}
      <div
        className={`fixed top-0 left-0 rounded-full border border-[#c89f68]/60 pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2 transition-[width,height,background-color,border-color] duration-300 ease-out backdrop-invert-[0.05] ${
          isHovering
            ? 'w-12 h-12 bg-[#c89f68]/10 border-[#c89f68]'
            : 'w-8 h-8 bg-transparent'
        }`}
        style={{
          transform: `translate3d(${trailingPos.x}px, ${trailingPos.y}px, 0)`
        }}
      />
    </>
  );
}
