import React, { useEffect, useRef } from 'react';
import Matter from 'matter-js';

/**
 * MakeMePulse 2016 Authentic Home Physics Canvas
 * Powered by Matter.js 2D physics with zero-gravity floating bodies,
 * cursor collision repulsion, and inward gravitational vortex during click & hold.
 */
export default function HomePhysicsScene({ isHolding, holdProgress = 0 }) {
  const canvasRef = useRef(null);
  const engineRef = useRef(null);
  const mouseBodyRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const width = (canvas.width = window.innerWidth);
    const height = (canvas.height = window.innerHeight);

    // 1. Matter.js Physics Engine setup
    const Engine = Matter.Engine;
    const World = Matter.World;
    const Bodies = Matter.Bodies;
    const Body = Matter.Body;

    const engine = Engine.create({
      enableSleeping: false
    });
    engine.world.gravity.y = 0; // Zero-gravity deep space
    engine.world.gravity.x = 0;
    engineRef.current = engine;

    // 2. Interactive Cursor Collider Body
    const mouseBody = Bodies.circle(width / 2, height / 2, 70, {
      isStatic: true,
      isSensor: false,
      render: { visible: false }
    });
    mouseBodyRef.current = mouseBody;
    World.add(engine.world, mouseBody);

    // 3. Generate iconic floating geometric bodies (diamonds, polygons, rings, cubes)
    const shapes = [];
    const numShapes = 32;
    const colors = ['#00f0ff', '#a855f7', '#ffffff', '#ec4899', '#38bdf8'];

    for (let i = 0; i < numShapes; i++) {
      const x = Math.random() * (width - 160) + 80;
      const y = Math.random() * (height - 160) + 80;
      const size = Math.random() * 26 + 18;
      const sides = Math.floor(Math.random() * 4) + 3; // 3 to 6 sides

      let body;
      if (sides === 4 && Math.random() > 0.5) {
        // Rhombus / diamond
        body = Bodies.polygon(x, y, 4, size, {
          restitution: 0.85,
          frictionAir: 0.02,
          density: 0.001
        });
      } else if (sides === 3) {
        body = Bodies.polygon(x, y, 3, size * 1.1, {
          restitution: 0.85,
          frictionAir: 0.02,
          density: 0.001
        });
      } else {
        body = Bodies.circle(x, y, size * 0.7, {
          restitution: 0.9,
          frictionAir: 0.015,
          density: 0.001
        });
      }

      // Initial gentle drift impulse
      Body.setVelocity(body, {
        x: (Math.random() - 0.5) * 1.5,
        y: (Math.random() - 0.5) * 1.5
      });
      Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.04);

      shapes.push({
        body,
        size,
        sides,
        color: colors[i % colors.length],
        origX: x,
        origY: y
      });

      World.add(engine.world, body);
    }

    // Handle mouse movement for physical collision
    const handleMouseMove = (e) => {
      Body.setPosition(mouseBody, { x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    // 4. Render and Physics Step Loop
    let frameId;
    let lastTime = performance.now();

    const loop = (time) => {
      const dt = Math.min(32, time - lastTime);
      lastTime = time;

      Engine.update(engine, dt);

      // Canvas Draw
      ctx.clearRect(0, 0, width, height);

      // Deep space grid
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
      ctx.lineWidth = 1;
      const step = 80;
      for (let x = 0; x < width; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Center vortex pull if holding
      const centerX = width / 2;
      const centerY = height / 2;

      shapes.forEach((s) => {
        const b = s.body;

        if (isHolding) {
          // Gravitational suction toward center
          const dx = centerX - b.position.x;
          const dy = centerY - b.position.y;
          const dist = Math.hypot(dx, dy) || 1;
          const pullForce = 0.00015 * (1 + (holdProgress / 100) * 3);
          Body.applyForce(b, b.position, {
            x: (dx / dist) * pullForce,
            y: (dy / dist) * pullForce
          });
        } else {
          // Soft boundary bounce to keep shapes in viewport
          const margin = 50;
          if (b.position.x < margin) Body.applyForce(b, b.position, { x: 0.0005, y: 0 });
          if (b.position.x > width - margin) Body.applyForce(b, b.position, { x: -0.0005, y: 0 });
          if (b.position.y < margin) Body.applyForce(b, b.position, { x: 0, y: 0.0005 });
          if (b.position.y > height - margin) Body.applyForce(b, b.position, { x: 0, y: -0.0005 });
        }

        // Render geometric body
        ctx.save();
        ctx.translate(b.position.x, b.position.y);
        ctx.rotate(b.angle);

        // Body outline
        ctx.beginPath();
        const vertices = b.vertices;
        ctx.moveTo(vertices[0].x - b.position.x, vertices[0].y - b.position.y);
        for (let j = 1; j < vertices.length; j++) {
          ctx.lineTo(vertices[j].x - b.position.x, vertices[j].y - b.position.y);
        }
        ctx.closePath();

        ctx.strokeStyle = s.color;
        ctx.lineWidth = 1.5;
        ctx.shadowColor = s.color;
        ctx.shadowBlur = isHolding ? 14 : 6;
        ctx.stroke();

        // Inner glowing translucent face
        ctx.fillStyle = s.color + '15';
        ctx.fill();

        // Center specular diamond dot
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(0, 0, 2, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      });

      // Cursor physical force field ring visual
      ctx.save();
      ctx.beginPath();
      ctx.arc(mouseBody.position.x, mouseBody.position.y, 70, 0, Math.PI * 2);
      ctx.strokeStyle = isHolding ? 'rgba(0, 240, 255, 0.4)' : 'rgba(255, 255, 255, 0.06)';
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 6]);
      ctx.stroke();
      ctx.restore();

      frameId = requestAnimationFrame(loop);
    };

    frameId = requestAnimationFrame(loop);

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(frameId);
      Matter.World.clear(engine.world);
      Matter.Engine.clear(engine);
    };
  }, [isHolding, holdProgress]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full pointer-events-auto"
    />
  );
}
