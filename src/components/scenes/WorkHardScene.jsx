import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

/**
 * MakeMePulse 2016 - Experience 04: WORK HARD
 * Interactive 3D Crystalline Wireframe Engine & Gyro Tilt Dynamics
 * Features: Mohammed Vashir's 4-Phase Engineering Architecture & Tech Stack.
 */
export default function WorkHardScene({ isHolding, holdProgress = 0 }) {
  const mountRef = useRef(null);
  const mouse = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const [activePhase, setActivePhase] = useState(0);

  const phases = [
    { title: 'Phase 01 // Mathematical & Kinematic Synthesis', desc: 'Closed-form trigonometric IK, state estimation filters, and dynamic force vectors.' },
    { title: 'Phase 02 // Multilayer PCB & RF Hardware', desc: 'Impedance-matched RF trace geometry, high-speed differential pairs, and low-ESR power planes.' },
    { title: 'Phase 03 // Real-Time Deterministic Firmware', desc: 'Zero-heap bare-metal C++20 and FreeRTOS tasks with microsecond ISR latency.' },
    { title: 'Phase 04 // Field Validation & Mission Telemetry', desc: 'Stress verification across 100+ telemetry hours under extreme vibration and thermal load.' }
  ];

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 15);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 1. Nested Multilayer Crystalline Polyhedra
    const masterGroup = new THREE.Group();
    scene.add(masterGroup);

    // Layer 1: Outermost Octahedron
    const octGeom = new THREE.OctahedronGeometry(3.5, 0);
    const octMat = new THREE.MeshBasicMaterial({ color: 0x00f0ff, wireframe: true });
    const octMesh = new THREE.Mesh(octGeom, octMat);
    masterGroup.add(octMesh);

    // Layer 2: Middle Icosahedron
    const icoGeom = new THREE.IcosahedronGeometry(2.4, 0);
    const icoMat = new THREE.MeshBasicMaterial({ color: 0xa855f7, wireframe: true });
    const icoMesh = new THREE.Mesh(icoGeom, icoMat);
    masterGroup.add(icoMesh);

    // Layer 3: Inner Cube
    const boxGeom = new THREE.BoxGeometry(1.6, 1.6, 1.6);
    const boxMat = new THREE.MeshStandardMaterial({
      color: 0x06070d,
      roughness: 0.1,
      metalness: 0.9,
      emissive: 0x00f0ff,
      emissiveIntensity: 0.2
    });
    const boxMesh = new THREE.Mesh(boxGeom, boxMat);
    masterGroup.add(boxMesh);

    // Radial Nodes at vertices
    const nodeGeom = new THREE.SphereGeometry(0.12, 12, 12);
    const nodeMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const octPos = octGeom.attributes.position.array;
    for (let i = 0; i < octPos.length; i += 3) {
      const node = new THREE.Mesh(nodeGeom, nodeMat);
      node.position.set(octPos[i], octPos[i + 1], octPos[i + 2]);
      octMesh.add(node);
    }

    // 2. Surrounding Hexagonal Circuit Matrix Plane
    const gridHelper = new THREE.GridHelper(24, 24, 0x00f0ff, 0x1a2333);
    gridHelper.position.y = -4.5;
    scene.add(gridHelper);

    // Ambient & Point Lighting
    const ambient = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambient);

    const pLight1 = new THREE.PointLight(0x00f0ff, 4, 25);
    pLight1.position.set(6, 6, 8);
    scene.add(pLight1);

    const pLight2 = new THREE.PointLight(0xa855f7, 3, 25);
    pLight2.position.set(-6, -6, 8);
    scene.add(pLight2);

    const handleMouseMove = (e) => {
      mouse.current.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);

    let frameId;
    let clock = new THREE.Clock();

    const animate = () => {
      const dt = clock.getDelta();
      const time = clock.getElapsedTime();

      // Gyro inertia tilt
      mouse.current.x += (mouse.current.targetX - mouse.current.x) * 0.08;
      mouse.current.y += (mouse.current.targetY - mouse.current.y) * 0.08;

      masterGroup.rotation.y = time * 0.4 + mouse.current.x * 1.5;
      masterGroup.rotation.x = mouse.current.y * 1.2;

      // Independent nested counter-rotations
      icoMesh.rotation.y = -time * 0.6;
      icoMesh.rotation.z = time * 0.3;
      boxMesh.rotation.x = time * 0.8;
      boxMesh.rotation.y = time * 0.5;

      // Explode layers outward on hold
      const expand = isHolding ? (holdProgress / 100) * 1.6 : 0;
      octMesh.scale.setScalar(1 + expand * 0.4);
      icoMesh.scale.setScalar(1 + expand * 0.8);
      boxMesh.scale.setScalar(1 + expand * 0.2);

      if (isHolding) {
        camera.position.z = 15 - (holdProgress / 100) * 4;
      } else {
        camera.position.z = 15;
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

      {/* Experience HUD */}
      <div className="absolute top-24 left-10 z-20 pointer-events-none max-w-md">
        <div className="inline-block bg-[#ffffff] text-black px-2 py-0.5 text-[10px] font-bold tracking-widest uppercase mb-2">
          Experience 04
        </div>
        <h1 className="text-4xl font-black tracking-tight text-white uppercase mb-2">
          Work Hard
        </h1>
        <p className="text-xs text-neutral-400 font-mono tracking-wider leading-relaxed">
          Rigorous Engineering Disciplines. A seamless four-tier methodology from theoretical modeling and schematic layout down to microsecond deterministic firmware.
        </p>
      </div>

      {/* Phase Navigation Tabs */}
      <div className="absolute bottom-28 left-10 right-10 z-20 pointer-events-auto flex flex-wrap gap-3">
        {phases.map((p, idx) => (
          <button
            key={idx}
            onClick={() => setActivePhase(idx)}
            className={`px-4 py-2.5 text-left border transition-all duration-300 font-mono ${
              activePhase === idx
                ? 'bg-white text-black border-white shadow-[0_0_15px_rgba(255,255,255,0.4)]'
                : 'bg-black/60 text-neutral-400 border-white/15 hover:border-white/40'
            }`}
          >
            <div className="text-[10px] tracking-widest uppercase font-bold">{p.title}</div>
            <div className="text-[11px] mt-0.5 max-w-xs truncate">{p.desc}</div>
          </button>
        ))}
      </div>
    </div>
  );
}
