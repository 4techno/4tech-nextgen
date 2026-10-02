import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function GalaxyStage({
  mode = 'galaxy',
  interactive = true,
  particleCount = 2600,
  className = '',
  height = '100%'
}) {
  const mountRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const animFrameId = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 800;
    const height = container.clientHeight || 600;

    // 1. Scene, Camera, WebGL Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.z = 8;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Group for objects
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // 2. Galaxy Particle Field (4tech Crimson & Silver Field of Possibilities)
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const cRed = new THREE.Color('#ff3b55');
    const cDimRed = new THREE.Color('#a01627');
    const cWhite = new THREE.Color('#f0ece9');
    const cGray = new THREE.Color('#788798');

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      // Spiral arms distribution or spherical cluster
      const r = Math.pow(Math.random(), 1.6) * 7.5;
      const angle = (i % 3) * ((2 * Math.PI) / 3) + r * 0.8 + (Math.random() - 0.5) * 0.4;
      
      positions[i3] = Math.cos(angle) * r + (Math.random() - 0.5) * 0.5;
      positions[i3 + 1] = (Math.random() - 0.5) * (0.8 + r * 0.2);
      positions[i3 + 2] = Math.sin(angle) * r + (Math.random() - 0.5) * 0.5;

      // Color selection matching 4tech brand
      let mixedColor;
      const roll = Math.random();
      if (roll < 0.25) mixedColor = cRed;
      else if (roll < 0.45) mixedColor = cDimRed;
      else if (roll < 0.75) mixedColor = cGray;
      else mixedColor = cWhite;

      colors[i3] = mixedColor.r;
      colors[i3 + 1] = mixedColor.g;
      colors[i3 + 2] = mixedColor.b;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.045,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    mainGroup.add(particles);

    // 3. Central Geometry depending on mode
    let centralMesh = null;
    let extraRig = new THREE.Group();
    mainGroup.add(extraRig);

    if (mode === 'antenna') {
      // 3D Polar Toroid radiation pattern
      const geom = new THREE.TorusGeometry(1.8, 0.75, 24, 64);
      const mat = new THREE.MeshStandardMaterial({
        color: 0xff3b55,
        wireframe: true,
        emissive: 0x901020,
        emissiveIntensity: 0.4
      });
      centralMesh = new THREE.Mesh(geom, mat);
      centralMesh.rotation.x = Math.PI / 2;
      extraRig.add(centralMesh);

      // Coordinate rings
      const ringGeom = new THREE.RingGeometry(2.8, 2.84, 48);
      const ringMat = new THREE.MeshBasicMaterial({ color: 0x67717e, side: THREE.DoubleSide });
      const ring = new THREE.Mesh(ringGeom, ringMat);
      extraRig.add(ring);
    } else if (mode === 'robotics') {
      // Articulated linkage representation
      const baseGeo = new THREE.CylinderGeometry(1.2, 1.4, 0.4, 32);
      const baseMat = new THREE.MeshStandardMaterial({ color: 0x242830, wireframe: true });
      const base = new THREE.Mesh(baseGeo, baseMat);
      extraRig.add(base);

      const arm1Geo = new THREE.BoxGeometry(0.35, 2.4, 0.35);
      const armMat = new THREE.MeshStandardMaterial({ color: 0xff3b55, wireframe: true });
      const arm1 = new THREE.Mesh(arm1Geo, armMat);
      arm1.position.y = 1.2;
      arm1.rotation.z = 0.3;
      extraRig.add(arm1);

      const jointGeo = new THREE.SphereGeometry(0.4, 16, 16);
      const jointMat = new THREE.MeshBasicMaterial({ color: 0x00f0ff, wireframe: true });
      const joint = new THREE.Mesh(jointGeo, jointMat);
      joint.position.set(-0.35, 2.3, 0);
      extraRig.add(joint);
    } else if (mode === 'drone') {
      // Drone cross frame
      const frameGeo = new THREE.BoxGeometry(3.6, 0.15, 0.15);
      const frameMat = new THREE.MeshStandardMaterial({ color: 0x67717e, wireframe: true });
      const armX = new THREE.Mesh(frameGeo, frameMat);
      const armZ = armX.clone();
      armZ.rotation.y = Math.PI / 2;
      extraRig.add(armX);
      extraRig.add(armZ);

      // 4 Rotors
      const rotorGeo = new THREE.TorusGeometry(0.65, 0.05, 12, 32);
      const rotorMat = new THREE.MeshBasicMaterial({ color: 0xff3b55, wireframe: true });
      const offsets = [
        [1.8, 0, 0],
        [-1.8, 0, 0],
        [0, 0, 1.8],
        [0, 0, -1.8]
      ];
      offsets.forEach(([x, y, z]) => {
        const r = new THREE.Mesh(rotorGeo, rotorMat);
        r.position.set(x, y, z);
        r.rotation.x = Math.PI / 2;
        extraRig.add(r);
      });
    } else {
      // Standard Galaxy core: Concentric orbiting telemetry rings & central pulsating icosahedron
      const coreGeo = new THREE.IcosahedronGeometry(1.2, 2);
      const coreMat = new THREE.MeshStandardMaterial({
        color: 0xff3b55,
        wireframe: true,
        emissive: 0xff3b55,
        emissiveIntensity: 0.35
      });
      centralMesh = new THREE.Mesh(coreGeo, coreMat);
      extraRig.add(centralMesh);

      // Outer orbit gimbal
      const ring1 = new THREE.Mesh(
        new THREE.TorusGeometry(2.2, 0.02, 16, 64),
        new THREE.MeshBasicMaterial({ color: 0xc3cbd3, wireframe: true, opacity: 0.4, transparent: true })
      );
      const ring2 = new THREE.Mesh(
        new THREE.TorusGeometry(2.7, 0.02, 16, 64),
        new THREE.MeshBasicMaterial({ color: 0xff3b55, wireframe: true, opacity: 0.3, transparent: true })
      );
      ring2.rotation.x = Math.PI / 3;
      extraRig.add(ring1);
      extraRig.add(ring2);
    }

    // 4. Subtle Ambient & Dynamic Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xff3b55, 6, 25);
    pointLight.position.set(4, 3, 5);
    scene.add(pointLight);

    // 5. Mouse Interaction
    const handleMouseMove = (e) => {
      if (!interactive) return;
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      mouseRef.current.targetX = x;
      mouseRef.current.targetY = y;
    };

    if (interactive) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    // 6. Resize Observer
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    // 7. Render Loop
    let clock = new THREE.Clock();

    const animate = () => {
      const time = clock.getElapsedTime();

      // Exponential lerp smoothing for mouse
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      // Group rotation
      mainGroup.rotation.y = time * 0.12 + mouseRef.current.x * 0.6;
      mainGroup.rotation.x = Math.sin(time * 0.08) * 0.15 + mouseRef.current.y * 0.4;

      if (extraRig) {
        extraRig.rotation.y = time * 0.3;
        extraRig.rotation.z = Math.sin(time * 0.2) * 0.1;
      }

      renderer.render(scene, camera);
      animFrameId.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
      if (interactive) window.removeEventListener('mousemove', handleMouseMove);
      resizeObserver.disconnect();
      renderer.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [mode, interactive, particleCount]);

  return (
    <div
      ref={mountRef}
      className={`relative w-full overflow-hidden select-none ${className}`}
      style={{ height }}
    />
  );
}
