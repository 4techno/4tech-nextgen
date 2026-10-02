import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * MakeMePulse 2016 - Experience 05: DREAM BIG
 * Monumental 3D Typographic Sculpture & Chromatic Aberration Dynamics
 * Features: Mohammed Vashir's Creative Technologist Manifesto & Technical Skills.
 */
export default function DreamBigScene({ isHolding, holdProgress = 0 }) {
  const mountRef = useRef(null);
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 16);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 1. Central Monumental 3D Structure: Geometric Letterforms & Diamonds
    const monumentGroup = new THREE.Group();
    scene.add(monumentGroup);

    // Iconic MakeMePulse diamond rhombuses
    const diamonds = [];
    const diamondGeom = new THREE.OctahedronGeometry(1.2, 0);
    const diamondColors = [0x00f0ff, 0xffffff, 0xa855f7, 0xec4899];

    for (let i = 0; i < 4; i++) {
      const mat = new THREE.MeshStandardMaterial({
        color: diamondColors[i],
        emissive: diamondColors[i],
        emissiveIntensity: 0.3,
        roughness: 0.1,
        metalness: 0.9,
        wireframe: false
      });
      const d = new THREE.Mesh(diamondGeom, mat);
      d.position.set((i - 1.5) * 3.8, 0, 0);
      d.rotation.z = Math.PI / 4;
      monumentGroup.add(d);
      diamonds.push(d);

      // Inner wireframe
      const wire = new THREE.Mesh(
        diamondGeom,
        new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true })
      );
      wire.scale.setScalar(1.2);
      d.add(wire);
    }

    // 2. Surrounding Floating Polyhedra (representing Core Competencies)
    const skills = [
      { name: 'C++20 / BARE-METAL', pos: [-5, 3.5, -2] },
      { name: 'PYTHON / AI INFERENCE', pos: [5, 3.5, -2] },
      { name: 'WEBGL / THREE.JS', pos: [-5, -3.5, -2] },
      { name: 'ROS2 / ROBOTICS', pos: [5, -3.5, -2] }
    ];

    const skillMeshes = [];
    skills.forEach((s) => {
      const g = new THREE.IcosahedronGeometry(0.8, 0);
      const m = new THREE.MeshBasicMaterial({ color: 0x00f0ff, wireframe: true });
      const mesh = new THREE.Mesh(g, m);
      mesh.position.set(s.pos[0], s.pos[1], s.pos[2]);
      scene.add(mesh);
      skillMeshes.push(mesh);
    });

    // 3. Stardust particles field
    const particleCount = 700;
    const particleGeom = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 45;
      particlePositions[i + 1] = (Math.random() - 0.5) * 35;
      particlePositions[i + 2] = (Math.random() - 0.5) * 20 - 5;
    }
    particleGeom.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.07,
      transparent: true,
      opacity: 0.6
    });
    const particles = new THREE.Points(particleGeom, particleMat);
    scene.add(particles);

    // Lighting
    const ambient = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambient);

    const lightCyan = new THREE.PointLight(0x00f0ff, 4, 30);
    lightCyan.position.set(4, 5, 8);
    scene.add(lightCyan);

    const lightViolet = new THREE.PointLight(0xa855f7, 3, 30);
    lightViolet.position.set(-4, -5, 8);
    scene.add(lightViolet);

    const handleMouseMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);

    let frameId;
    let clock = new THREE.Clock();

    const animate = () => {
      const dt = clock.getDelta();
      const time = clock.getElapsedTime();

      // Kinetic tilt
      monumentGroup.rotation.y = time * 0.3 + mouse.current.x * 1.2;
      monumentGroup.rotation.x = -mouse.current.y * 0.8;

      diamonds.forEach((d, i) => {
        d.rotation.x += 0.02 * (i % 2 === 0 ? 1 : -1);
        d.rotation.y += 0.025;
        d.position.y = Math.sin(time * 2 + i) * 0.4;
      });

      skillMeshes.forEach((sm, i) => {
        sm.rotation.x += 0.015;
        sm.rotation.y += 0.02;
        sm.position.y += Math.sin(time * 1.5 + i) * 0.005;
      });

      // Chromatic / camera agitation on hold
      if (isHolding) {
        camera.position.z = 16 - (holdProgress / 100) * 5;
        camera.position.x = (Math.random() - 0.5) * 0.15 * (holdProgress / 100);
        camera.position.y = (Math.random() - 0.5) * 0.15 * (holdProgress / 100);
      } else {
        camera.position.z = 16;
        camera.position.x = 0;
        camera.position.y = 0;
      }

      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };

    frameId = requestAnimationFrame(animate);

    const handleResize = () => {
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(frameId);
      if (renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [isHolding, holdProgress]);

  return (
    <div className="relative w-full h-full">
      <div ref={mountRef} className="absolute inset-0 w-full h-full" />

      {/* MakeMePulse Monumental SVG Letterforms */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none text-center">
        <h1 className="text-7xl md:text-9xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-white via-[#00f0ff] to-[#a855f7] uppercase opacity-90">
          VASHIR
        </h1>
        <div className="text-xs md:text-sm font-mono tracking-[0.4em] text-neutral-400 uppercase mt-4">
          DREAM BIG • ARCHITECT THE IMPOSSIBLE
        </div>
      </div>

      {/* Experience HUD */}
      <div className="absolute top-24 left-10 z-20 pointer-events-none max-w-md">
        <div className="inline-block bg-[#ec4899] text-white px-2 py-0.5 text-[10px] font-bold tracking-widest uppercase mb-2">
          Experience 05
        </div>
        <h1 className="text-4xl font-black tracking-tight text-white uppercase mb-2">
          Dream Big
        </h1>
        <p className="text-xs text-neutral-400 font-mono tracking-wider leading-relaxed">
          High-Couture Creative Technology. Fusing computational geometry, embedded hardware engineering, and visceral WebGL interactivity.
        </p>
      </div>
    </div>
  );
}
