import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

/**
 * MakeMePulse 2016 - Experience 02: IMAGINE
 * Floating Zero-Gravity Elastic Physics Spheres & Balloon Nodes
 * Features: Mohammed Vashir's 15 R&D Systems & Architectural Solutions.
 */
export default function ImagineScene({ isHolding, holdProgress = 0, onSelectProject }) {
  const mountRef = useRef(null);
  const [activeProject, setActiveProject] = useState(null);

  const projects = [
    { id: 'drone-autopilot', name: 'Precision Drone Autopilot', category: 'AEROSPACE', color: '#00f0ff', radius: 1.4 },
    { id: 'iot-energy-mesh', name: 'Smart IoT Energy Grid', category: 'EMBEDDED', color: '#a855f7', radius: 1.2 },
    { id: 'sdr-transceiver', name: 'FPGA Sub-GHz SDR', category: 'RF TELECOM', color: '#ec4899', radius: 1.5 },
    { id: 'tele-manipulator', name: 'Haptic Tele-Robot', category: 'ROBOTICS', color: '#00f0ff', radius: 1.3 },
    { id: 'lidar-mapper', name: 'Autonomous SLAM LiDAR', category: 'AUTONOMOUS', color: '#c89f68', radius: 1.6 },
    { id: 'biometric-access', name: 'Encrypted Cryptographic Key', category: 'CYBERSECURITY', color: '#38bdf8', radius: 1.1 }
  ];

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

    // 1. Create floating physics spheres
    const sphereNodes = [];

    projects.forEach((proj, i) => {
      const group = new THREE.Group();

      // Outer glass sphere
      const geom = new THREE.IcosahedronGeometry(proj.radius, 3);
      const mat = new THREE.MeshPhysicalMaterial({
        color: new THREE.Color(proj.color),
        emissive: new THREE.Color(proj.color),
        emissiveIntensity: 0.25,
        roughness: 0.1,
        metalness: 0.2,
        transmission: 0.8,
        thickness: 0.5,
        transparent: true,
        opacity: 0.75
      });
      const mesh = new THREE.Mesh(geom, mat);
      group.add(mesh);

      // Inner wireframe core
      const wireGeom = new THREE.IcosahedronGeometry(proj.radius * 0.7, 1);
      const wireMat = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        wireframe: true,
        transparent: true,
        opacity: 0.6
      });
      const wireMesh = new THREE.Mesh(wireGeom, wireMat);
      group.add(wireMesh);

      // Central glowing orb
      const orbGeom = new THREE.SphereGeometry(proj.radius * 0.25, 16, 16);
      const orbMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
      const orbMesh = new THREE.Mesh(orbGeom, orbMat);
      group.add(orbMesh);

      // Distribute initial positions
      const angle = (i / projects.length) * Math.PI * 2;
      const radiusDist = 4.5 + (i % 2) * 1.5;
      group.position.set(
        Math.cos(angle) * radiusDist,
        Math.sin(angle) * (radiusDist * 0.6),
        (Math.random() - 0.5) * 3
      );

      scene.add(group);

      sphereNodes.push({
        group,
        project: proj,
        basePos: group.position.clone(),
        vel: new THREE.Vector3((Math.random() - 0.5) * 0.02, (Math.random() - 0.5) * 0.02, 0),
        radius: proj.radius
      });
    });

    // 2. Ambient & Spot Lighting
    const ambient = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambient);

    const light1 = new THREE.PointLight(0x00f0ff, 3, 30);
    light1.position.set(5, 5, 8);
    scene.add(light1);

    const light2 = new THREE.PointLight(0xa855f7, 2.5, 30);
    light2.position.set(-5, -5, 8);
    scene.add(light2);

    // Mouse Tracking & Elastic Collision
    const mouse3D = new THREE.Vector3(0, 0, 0);
    const raycaster = new THREE.Raycaster();
    const mouseNorm = new THREE.Vector2();

    const handleMouseMove = (e) => {
      mouseNorm.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseNorm.y = -(e.clientY / window.innerHeight) * 2 + 1;
      mouse3D.set(mouseNorm.x * 9, mouseNorm.y * 6, 0);

      // Check hover
      raycaster.setFromCamera(mouseNorm, camera);
      const intersects = raycaster.intersectObjects(
        sphereNodes.map((s) => s.group.children[0])
      );

      if (intersects.length > 0) {
        const hitGroup = intersects[0].object.parent;
        const matched = sphereNodes.find((s) => s.group === hitGroup);
        if (matched) setActiveProject(matched.project);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    let frameId;
    let clock = new THREE.Clock();

    const animate = () => {
      const dt = clock.getDelta();
      const time = clock.getElapsedTime();

      sphereNodes.forEach((node, idx) => {
        // Floating sinusoidal buoyancy
        node.group.position.x += Math.sin(time + idx) * 0.005;
        node.group.position.y += Math.cos(time * 0.8 + idx) * 0.005;

        // Rotate wireframe internals
        node.group.rotation.x += 0.008;
        node.group.rotation.y += 0.012;

        // Elastic repulsion against mouse collider
        const dist = node.group.position.distanceTo(mouse3D);
        const threshold = node.radius + 1.8;

        if (dist < threshold) {
          const force = (threshold - dist) * 0.12;
          const dir = new THREE.Vector3().subVectors(node.group.position, mouse3D).normalize();
          node.vel.addScaledVector(dir, force);
        }

        // Apply velocity with friction damping
        node.group.position.add(node.vel);
        node.vel.multiplyScalar(0.92);

        // Soft return spring towards origin
        const springForce = new THREE.Vector3().subVectors(node.basePos, node.group.position).multiplyScalar(0.015);
        node.vel.add(springForce);

        // Inward vortex pull on hold
        if (isHolding) {
          const centerPull = new THREE.Vector3(0, 0, 0).sub(node.group.position).multiplyScalar(0.04 * (1 + holdProgress / 50));
          node.group.position.add(centerPull);
        }
      });

      // Camera distance modulation
      if (isHolding) {
        camera.position.z = 16 - (holdProgress / 100) * 4;
      } else {
        camera.position.z = 16;
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
        <div className="inline-block bg-[#a855f7] text-white px-2 py-0.5 text-[10px] font-bold tracking-widest uppercase mb-2">
          Experience 02
        </div>
        <h1 className="text-4xl font-black tracking-tight text-white uppercase mb-2">
          Imagine
        </h1>
        <p className="text-xs text-neutral-400 font-mono tracking-wider leading-relaxed">
          Zero-Gravity Physics Constellation. Interact directly with 15 verified engineering production systems spanning robotics, aerospace telemetry, and autonomous intelligence.
        </p>
      </div>

      {/* Dynamic Project Inspector on Hover/Collision */}
      {activeProject && (
        <div className="absolute top-24 right-10 z-20 pointer-events-auto bg-black/80 backdrop-blur-lg border border-white/20 p-5 max-w-xs shadow-[0_0_30px_rgba(0,0,0,0.8)]">
          <div className="text-[10px] tracking-widest font-mono uppercase mb-1" style={{ color: activeProject.color }}>
            {activeProject.category} // Active Node
          </div>
          <div className="text-base font-bold text-white tracking-wide uppercase mb-2">
            {activeProject.name}
          </div>
          <p className="text-[11px] text-neutral-400 font-mono leading-relaxed mb-4">
            Production grade architecture built for high-reliability field deployment. Verified hardware Schematics & firmware telemetry available.
          </p>
          <button
            onClick={() => onSelectProject?.(activeProject.id)}
            className="w-full py-2 bg-white text-black font-bold text-xs uppercase tracking-widest hover:bg-[#00f0ff] transition-colors"
          >
            Inspect Blueprint
          </button>
        </div>
      )}
    </div>
  );
}
