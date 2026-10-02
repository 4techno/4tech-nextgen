import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * MakeMePulse 2016 - Experience 03: STRIVE
 * Kinetic Directional Wave Synthesis & Resonant Spherical Harmonics
 * Features: Mohammed Vashir's RF Engineering, Antenna Radiation Lobes, & Signal Telemetry.
 */
export default function StriveScene({ isHolding, holdProgress = 0, onSelectProject }) {
  const mountRef = useRef(null);
  const mouseNorm = useRef({ x: 0, y: 0 });

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

    // 1. Central Resonant Sphere with Concentric Oscillating Rings
    const sphereGroup = new THREE.Group();
    scene.add(sphereGroup);

    // Dynamic wave wireframe sphere
    const sphereGeom = new THREE.SphereGeometry(2.4, 32, 32);
    const sphereMat = new THREE.MeshStandardMaterial({
      color: 0x00f0ff,
      emissive: 0x00f0ff,
      emissiveIntensity: 0.4,
      wireframe: true,
      transparent: true,
      opacity: 0.8
    });
    const sphereMesh = new THREE.Mesh(sphereGeom, sphereMat);
    sphereGroup.add(sphereMesh);

    // Internal pulsating core
    const coreGeom = new THREE.DodecahedronGeometry(1.2, 0);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      wireframe: true
    });
    const coreMesh = new THREE.Mesh(coreGeom, coreMat);
    sphereGroup.add(coreMesh);

    // 2. Concentric Wave Rings (RF Radiation Pattern Lobes)
    const numRings = 16;
    const rings = [];
    for (let i = 0; i < numRings; i++) {
      const ringGeom = new THREE.RingGeometry(3 + i * 0.45, 3.03 + i * 0.45, 64);
      const ringMat = new THREE.MeshBasicMaterial({
        color: i % 2 === 0 ? 0x00f0ff : 0xa855f7,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: Math.max(0.1, 0.7 - (i / numRings) * 0.6)
      });
      const ringMesh = new THREE.Mesh(ringGeom, ringMat);
      ringMesh.rotation.x = Math.PI / 2;
      sphereGroup.add(ringMesh);
      rings.push(ringMesh);
    }

    // 3. Floating Antenna Dipole in 3D
    const dipoleGroup = new THREE.Group();
    const rodGeom = new THREE.CylinderGeometry(0.04, 0.04, 8, 16);
    const rodMat = new THREE.MeshStandardMaterial({ color: 0xffffff, metalness: 0.9 });
    const rod = new THREE.Mesh(rodGeom, rodMat);
    dipoleGroup.add(rod);
    sphereGroup.add(dipoleGroup);

    // Ambient Stardust
    const starGeom = new THREE.BufferGeometry();
    const starCount = 500;
    const starPos = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount * 3; i += 3) {
      starPos[i] = (Math.random() - 0.5) * 40;
      starPos[i + 1] = (Math.random() - 0.5) * 30;
      starPos[i + 2] = (Math.random() - 0.5) * 20 - 5;
    }
    starGeom.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
    const starMat = new THREE.PointsMaterial({ color: 0x00f0ff, size: 0.06, transparent: true, opacity: 0.5 });
    const stars = new THREE.Points(starGeom, starMat);
    scene.add(stars);

    // Lighting
    const ambient = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambient);

    const pointLight = new THREE.PointLight(0x00f0ff, 3, 20);
    pointLight.position.set(0, 0, 5);
    scene.add(pointLight);

    const handleMouseMove = (e) => {
      mouseNorm.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseNorm.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);

    let frameId;
    let clock = new THREE.Clock();

    const animate = () => {
      const dt = clock.getDelta();
      const time = clock.getElapsedTime();

      // Kinetic tilt following cursor
      sphereGroup.rotation.y += (mouseNorm.current.x * 1.5 - sphereGroup.rotation.y) * 0.05;
      sphereGroup.rotation.x += (-mouseNorm.current.y * 1.5 - sphereGroup.rotation.x) * 0.05;

      // Pulsate core
      const pulse = Math.sin(time * 3) * 0.15;
      coreMesh.scale.set(1 + pulse, 1 + pulse, 1 + pulse);
      coreMesh.rotation.y += 0.02;
      coreMesh.rotation.z += 0.01;

      // Concentric wave ripple outwards
      rings.forEach((r, idx) => {
        const wave = Math.sin(time * 4 - idx * 0.3);
        r.position.y = wave * (0.3 + Math.abs(mouseNorm.current.x) * 0.5);
        r.scale.setScalar(1 + (isHolding ? (holdProgress / 100) * 0.4 : 0));
      });

      // Hold camera shake
      if (isHolding) {
        camera.position.z = 16 - (holdProgress / 100) * 3;
        pointLight.intensity = 3 + (holdProgress / 100) * 8;
      } else {
        camera.position.z = 16;
        pointLight.intensity = 3;
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
        <div className="inline-block bg-[#00f0ff] text-black px-2 py-0.5 text-[10px] font-bold tracking-widest uppercase mb-2">
          Experience 03
        </div>
        <h1 className="text-4xl font-black tracking-tight text-white uppercase mb-2">
          Strive
        </h1>
        <p className="text-xs text-neutral-400 font-mono tracking-wider leading-relaxed">
          Electromagnetic Wave Propagation & Kinetic Gyroscope. Sub-GHz telemetry nodes, high-gain Yagi-Uda arrays, and software-defined radio protocols tuned for zero packet-loss.
        </p>
      </div>

      {/* Featured RF System Badge */}
      <div className="absolute bottom-28 left-10 z-20 pointer-events-auto">
        <div
          onClick={() => onSelectProject?.('sdr-transceiver')}
          className="group cursor-pointer bg-black/70 backdrop-blur-md border border-white/15 hover:border-[#00f0ff] px-5 py-3.5 transition-all duration-300"
        >
          <div className="text-[10px] text-[#00f0ff] tracking-widest font-mono uppercase mb-1">
            Featured System 03 // 4tech
          </div>
          <div className="text-sm font-bold text-white tracking-wide uppercase group-hover:text-[#00f0ff] transition-colors">
            Sub-GHz Long-Range Telemetry Transceiver
          </div>
          <div className="text-[11px] text-neutral-400 mt-1">
            433/868/915 MHz • 142dB Dynamic Link Budget • AES-256 Crypto
          </div>
        </div>
      </div>
    </div>
  );
}
