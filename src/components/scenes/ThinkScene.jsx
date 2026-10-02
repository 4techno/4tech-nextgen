import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * MakeMePulse 2016 - Experience 01: THINK
 * The Iconic Slithering Cybernetic Ribbon / Snake
 * Features: Mohammed Vashir's Robotics, Kinematics, & Embedded Systems R&D.
 */
export default function ThinkScene({ isHolding, holdProgress = 0, onSelectProject }) {
  const mountRef = useRef(null);
  const mousePos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    // Three.js Scene Setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);
    scene.fog = new THREE.FogExp2(0x000000, 0.025);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 18);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 1. Build Multi-Segment Cybernetic Ribbon / Snake
    const numPoints = 80;
    const points = [];
    for (let i = 0; i < numPoints; i++) {
      points.push(new THREE.Vector3(0, 0, 0));
    }

    const curve = new THREE.CatmullRomCurve3(points);
    const tubeGeometry = new THREE.TubeGeometry(curve, 100, 0.22, 12, false);
    
    // Glowing gradient material
    const tubeMaterial = new THREE.MeshStandardMaterial({
      color: 0x00f0ff,
      emissive: 0x00a8cc,
      emissiveIntensity: 0.8,
      roughness: 0.2,
      metalness: 0.9,
      wireframe: false
    });

    const tubeMesh = new THREE.Mesh(tubeGeometry, tubeMaterial);
    scene.add(tubeMesh);

    // Snake wireframe skeleton
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0xa855f7,
      wireframe: true,
      transparent: true,
      opacity: 0.4
    });
    const wireMesh = new THREE.Mesh(tubeGeometry, wireMat);
    wireMesh.scale.set(1.08, 1.08, 1.08);
    scene.add(wireMesh);

    // Snake head crystal
    const headGeom = new THREE.OctahedronGeometry(0.55, 0);
    const headMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      emissive: 0x00f0ff,
      emissiveIntensity: 1.2,
      roughness: 0.1,
      metalness: 0.8
    });
    const headMesh = new THREE.Mesh(headGeom, headMat);
    scene.add(headMesh);

    // 2. Interactive Robotics Articulated Pedestal in Background
    const robotGroup = new THREE.Group();
    robotGroup.position.set(4.5, -1, -4);
    scene.add(robotGroup);

    const baseGeom = new THREE.CylinderGeometry(1.4, 1.6, 0.4, 24);
    const baseMat = new THREE.MeshStandardMaterial({ color: 0x111625, metalness: 0.8, roughness: 0.3 });
    const robotBase = new THREE.Mesh(baseGeom, baseMat);
    robotGroup.add(robotBase);

    // Cyan base ring
    const ringGeom = new THREE.TorusGeometry(1.5, 0.04, 8, 32);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0x00f0ff });
    const robotRing = new THREE.Mesh(ringGeom, ringMat);
    robotRing.rotation.x = Math.PI / 2;
    robotGroup.add(robotRing);

    // Articulated boom
    const armGeom = new THREE.BoxGeometry(0.3, 3, 0.4);
    const armMat = new THREE.MeshStandardMaterial({ color: 0x00f0ff, metalness: 0.9, roughness: 0.2 });
    const arm1 = new THREE.Mesh(armGeom, armMat);
    arm1.position.y = 1.6;
    arm1.rotation.z = -0.3;
    robotGroup.add(arm1);

    const arm2 = new THREE.Mesh(armGeom, new THREE.MeshStandardMaterial({ color: 0xa855f7, metalness: 0.8 }));
    arm2.position.set(0.8, 3.2, 0);
    arm2.rotation.z = 0.6;
    robotGroup.add(arm2);

    // Tool laser
    const laserGeom = new THREE.CylinderGeometry(0.02, 0.02, 10, 8);
    const laserMat = new THREE.MeshBasicMaterial({ color: 0xff3b55, transparent: true, opacity: 0.7 });
    const laserMesh = new THREE.Mesh(laserGeom, laserMat);
    laserMesh.position.set(-1.8, 4.5, 0);
    laserMesh.rotation.z = Math.PI / 4;
    robotGroup.add(laserMesh);

    // 3. Stardust particles field
    const particleCount = 600;
    const particleGeom = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 35;
      particlePositions[i + 1] = (Math.random() - 0.5) * 25;
      particlePositions[i + 2] = (Math.random() - 0.5) * 20 - 5;
    }
    particleGeom.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x00f0ff,
      size: 0.08,
      transparent: true,
      opacity: 0.6
    });
    const particles = new THREE.Points(particleGeom, particleMat);
    scene.add(particles);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const cyanLight = new THREE.PointLight(0x00f0ff, 3, 25);
    cyanLight.position.set(0, 4, 8);
    scene.add(cyanLight);

    const violetLight = new THREE.PointLight(0xa855f7, 2, 25);
    violetLight.position.set(-6, -4, 4);
    scene.add(violetLight);

    // Mouse Tracking in 3D
    const target3D = new THREE.Vector3(0, 0, 0);
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      mousePos.current.x = x;
      mousePos.current.y = y;

      // Project onto z = 0 plane
      target3D.set(x * 10, y * 7, 0);
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Dynamic wave parameters matching MakeMePulse snake
    let waveAngle = 0;
    const wiggleAmp = 0.4;
    const wiggleSpeed = 8.0;

    let frameId;
    let clock = new THREE.Clock();

    const animate = () => {
      const dt = clock.getDelta();
      const time = clock.getElapsedTime();

      waveAngle += dt * wiggleSpeed;

      // First point chases cursor target
      points[0].lerp(target3D, 0.18);
      headMesh.position.copy(points[0]);
      headMesh.rotation.x += 0.02;
      headMesh.rotation.y += 0.03;

      // Trail segments slither with sine wave delay
      for (let i = 1; i < numPoints; i++) {
        const prev = points[i - 1];
        const curr = points[i];
        const factor = (numPoints - i) / numPoints;
        const wave = Math.sin(waveAngle + i * 0.18) * wiggleAmp * factor;

        curr.x += (prev.x - curr.x) * 0.22 + wave * dt * 2;
        curr.y += (prev.y - curr.y) * 0.22;
        curr.z += (prev.z - curr.z) * 0.22;
      }

      // Update tube geometry
      const newCurve = new THREE.CatmullRomCurve3(points);
      const newTubeGeom = new THREE.TubeGeometry(newCurve, 100, isHolding ? 0.35 : 0.22, 10, false);
      tubeMesh.geometry.dispose();
      tubeMesh.geometry = newTubeGeom;
      wireMesh.geometry.dispose();
      wireMesh.geometry = newTubeGeom;

      // Animate robot arm
      robotGroup.rotation.y = Math.sin(time * 0.5) * 0.3;
      arm1.rotation.z = -0.3 + Math.sin(time * 1.2) * 0.15;
      arm2.rotation.z = 0.6 + Math.cos(time * 1.5) * 0.2;

      // Hold camera shake / zoom
      if (isHolding) {
        camera.position.z = 18 - (holdProgress / 100) * 4;
        camera.position.x = (Math.random() - 0.5) * 0.08 * (holdProgress / 100);
      } else {
        camera.position.z = 18;
        camera.position.x = 0;
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

      {/* MakeMePulse Experience HUD & Project Details */}
      <div className="absolute top-24 left-10 z-20 pointer-events-none max-w-md">
        <div className="inline-block bg-[#00f0ff] text-black px-2 py-0.5 text-[10px] font-bold tracking-widest uppercase mb-2">
          Experience 01
        </div>
        <h1 className="text-4xl font-black tracking-tight text-white uppercase mb-2">
          Think
        </h1>
        <p className="text-xs text-neutral-400 font-mono tracking-wider leading-relaxed">
          Robotics & Kinematics Architecture. Analytical Inverse Kinematics for 6-DOF articulated manipulators, brushless motor drive firmware, and real-time sensor fusion.
        </p>
      </div>

      {/* Featured Project Bento Badge */}
      <div className="absolute bottom-28 left-10 z-20 pointer-events-auto">
        <div
          onClick={() => onSelectProject?.('6dof-robot-arm')}
          className="group cursor-pointer bg-black/70 backdrop-blur-md border border-white/15 hover:border-[#00f0ff] px-5 py-3.5 transition-all duration-300"
        >
          <div className="text-[10px] text-[#00f0ff] tracking-widest font-mono uppercase mb-1">
            Featured System 01 // 4tech
          </div>
          <div className="text-sm font-bold text-white tracking-wide uppercase group-hover:text-[#00f0ff] transition-colors">
            6-DOF Articulated Robotic Arm
          </div>
          <div className="text-[11px] text-neutral-400 mt-1">
            Trigonometric Law of Cosines IK • Real-Time Flange Laser Tracking
          </div>
        </div>
      </div>
    </div>
  );
}
