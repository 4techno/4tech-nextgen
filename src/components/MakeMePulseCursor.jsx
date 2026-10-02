import React, { useEffect, useRef, useState } from 'react';

/**
 * MakeMePulse 2016 Authentic Directional Kinetic Arrow Cursor (strive__cursor)
 * Dynamically aligns with velocity vector, stretches on movement, and pulses on hold/click.
 */
export default function MakeMePulseCursor({ isHolding, holdProgress = 0 }) {
  const cursorRef = useRef(null);
  const ringRef = useRef(null);
  const pos = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const prevPos = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const vel = useRef({ x: 0, y: 0 });
  const angle = useRef(0);
  const targetAngle = useRef(0);
  const scale = useRef(1);
  const isMoving = useRef(false);
  const [particles, setParticles] = useState([]);
  const lastSparkTime = useRef(0);

  useEffect(() => {
    const handleMouseMove = (e) => {
      pos.current.x = e.clientX;
      pos.current.y = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    let frameId;
    const update = (time) => {
      // Calculate velocity
      const dx = pos.current.x - prevPos.current.x;
      const dy = pos.current.y - prevPos.current.y;
      
      vel.current.x += (dx - vel.current.x) * 0.35;
      vel.current.y += (dy - vel.current.y) * 0.35;

      const speed = Math.hypot(vel.current.x, vel.current.y);

      if (speed > 1.2) {
        isMoving.current = true;
        // Direction angle in radians (offset by 90deg for arrow pointing up)
        targetAngle.current = Math.atan2(vel.current.y, vel.current.x) + Math.PI / 2;
        
        // Angular lerp avoiding 360 wrap jumps
        let diff = targetAngle.current - angle.current;
        while (diff < -Math.PI) diff += Math.PI * 2;
        while (diff > Math.PI) diff -= Math.PI * 2;
        angle.current += diff * 0.28;

        // Velocity stretch
        scale.current += (Math.min(2.2, 1 + speed * 0.04) - scale.current) * 0.25;

        // Spawn kinetic sparks on rapid movement
        if (speed > 14 && time - lastSparkTime.current > 40) {
          lastSparkTime.current = time;
          setParticles((prev) => [
            ...prev.slice(-12),
            {
              id: Math.random(),
              x: pos.current.x,
              y: pos.current.y,
              color: Math.random() > 0.5 ? '#00f0ff' : '#a855f7',
              size: Math.random() * 3 + 2
            }
          ]);
        }
      } else {
        isMoving.current = false;
        scale.current += (1 - scale.current) * 0.15;
      }

      prevPos.current.x = pos.current.x;
      prevPos.current.y = pos.current.y;

      if (cursorRef.current) {
        const holdScale = isHolding ? 0.8 + (holdProgress / 100) * 0.5 : 1;
        cursorRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0) translate(-50%, -70%) rotate(${angle.current}rad) scale(${scale.current * holdScale})`;
      }

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0) translate(-50%, -50%)`;
      }

      frameId = requestAnimationFrame(update);
    };

    frameId = requestAnimationFrame(update);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(frameId);
    };
  }, [isHolding, holdProgress]);

  return (
    <>
      {/* Authentic Strive Kinetic Arrow */}
      <div
        ref={cursorRef}
        className="strive__cursor pointer-events-none"
        style={{
          borderBottomColor: isHolding ? '#00f0ff' : '#ffffff',
          filter: isHolding
            ? 'drop-shadow(0 0 14px #00f0ff) drop-shadow(0 0 28px #a855f7)'
            : 'drop-shadow(0 0 8px #00f0ff)'
        }}
      />

      {/* Interactive Click & Hold Energy Concentric Halo */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 pointer-events-none rounded-full border transition-all duration-100 ease-out z-[9998] ${
          isHolding
            ? 'w-16 h-16 border-[#00f0ff] bg-[#00f0ff]/10 shadow-[0_0_24px_rgba(0,240,255,0.6)]'
            : 'w-6 h-6 border-white/20 bg-transparent'
        }`}
      />

      {/* Kinetic sparks trail */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="fixed pointer-events-none rounded-full animate-ping z-[9997]"
          style={{
            left: p.x,
            top: p.y,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            boxShadow: `0 0 8px ${p.color}`,
            transform: 'translate(-50%, -50%)'
          }}
        />
      ))}
    </>
  );
}
