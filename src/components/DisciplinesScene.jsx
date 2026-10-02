import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function DisciplinesScene({ className = '' }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // SCENE SETUP
    const scene = new THREE.Scene();
    
    const camera = new THREE.PerspectiveCamera(
      60,
      mount.clientWidth / mount.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 6;
    
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true 
    });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    const sceneGroup = new THREE.Group();
    // Tilt slightly for a more dynamic "floating" look
    sceneGroup.rotation.x = 0.3;
    scene.add(sceneGroup);

    // COLORS
    const colorCrimson = new THREE.Color('#ff3b55');
    const colorZinc = new THREE.Color('#71717a');
    const colorLightZinc = new THREE.Color('#a1a1aa');

    // 1. GENERATE HEXAGONAL GRID (PCB Nodes)
    const nodes = [];
    const radius = 0.3;
    const hexSize = 12; // Controls number of rings
    
    for (let q = -hexSize; q <= hexSize; q++) {
      for (let r = -hexSize; r <= hexSize; r++) {
        if (Math.abs(q + r) <= hexSize) {
          const x = radius * (1.5 * q);
          const y = radius * (Math.sqrt(3) / 2 * q + Math.sqrt(3) * r);
          // Add slight z-variation for a 3D topology feel
          const z = (Math.random() - 0.5) * 0.3;
          nodes.push(new THREE.Vector3(x, y, z));
        }
      }
    }

    // 2. CREATE EDGES (Wireframe Traces) & ADJACENCY
    const edges = [];
    const adjacency = new Map();
    nodes.forEach((_, i) => adjacency.set(i, []));

    const distanceThreshold = radius * 1.6;
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        if (nodes[i].distanceTo(nodes[j]) < distanceThreshold) {
          edges.push(nodes[i], nodes[j]);
          adjacency.get(i).push(j);
          adjacency.get(j).push(i);
        }
      }
    }

    const traceGeometry = new THREE.BufferGeometry().setFromPoints(edges);
    const traceMaterial = new THREE.LineBasicMaterial({
      color: colorZinc,
      transparent: true,
      opacity: 0.15,
      blending: THREE.AdditiveBlending
    });
    const traceLines = new THREE.LineSegments(traceGeometry, traceMaterial);
    sceneGroup.add(traceLines);

    // 3. CREATE NODE POINTS
    const nodeGeometry = new THREE.BufferGeometry().setFromPoints(nodes);
    const nodeMaterial = new THREE.PointsMaterial({
      color: colorLightZinc,
      size: 0.04,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending
    });
    const nodePoints = new THREE.Points(nodeGeometry, nodeMaterial);
    sceneGroup.add(nodePoints);

    // 4. THE 6 DISCIPLINE CLUSTERS
    const clusterIndices = [];
    const clusterPoints = [];
    for (let i = 0; i < 6; i++) {
      const angle = (i / 6) * Math.PI * 2;
      const dist = 2.8;
      const targetPos = new THREE.Vector3(Math.cos(angle) * dist, Math.sin(angle) * dist, 0);
      
      let closestIdx = 0;
      let minD = Infinity;
      nodes.forEach((n, idx) => {
        const d = n.distanceTo(targetPos);
        if (d < minD) {
          minD = d;
          closestIdx = idx;
        }
      });
      clusterIndices.push(closestIdx);
      clusterPoints.push(nodes[closestIdx]);
    }

    const clusterGeometry = new THREE.BufferGeometry().setFromPoints(clusterPoints);
    const clusterMaterial = new THREE.PointsMaterial({
      color: colorCrimson,
      size: 0.25,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
      map: createGlowTexture(),
      depthWrite: false
    });
    const clusters = new THREE.Points(clusterGeometry, clusterMaterial);
    sceneGroup.add(clusters);

    // 5. ENERGY PULSES ALONG TRACES
    const pulseCount = 80;
    const pulseData = [];
    const pulsePositions = new Float32Array(pulseCount * 3);
    
    for (let i = 0; i < pulseCount; i++) {
      const startNode = Math.floor(Math.random() * nodes.length);
      const neighbors = adjacency.get(startNode);
      const targetNode = neighbors.length > 0 
        ? neighbors[Math.floor(Math.random() * neighbors.length)] 
        : startNode;
        
      pulseData.push({
        start: startNode,
        target: targetNode,
        progress: Math.random(),
        speed: 0.01 + Math.random() * 0.02
      });
    }

    const pulseGeometry = new THREE.BufferGeometry();
    pulseGeometry.setAttribute('position', new THREE.BufferAttribute(pulsePositions, 3));
    const pulseMaterial = new THREE.PointsMaterial({
      color: colorCrimson,
      size: 0.08,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });
    const pulsePoints = new THREE.Points(pulseGeometry, pulseMaterial);
    sceneGroup.add(pulsePoints);

    // 6. AMBIENT PARTICLES
    const ambientCount = 800;
    const ambientPos = new Float32Array(ambientCount * 3);
    for (let i = 0; i < ambientCount * 3; i++) {
      ambientPos[i] = (Math.random() - 0.5) * 15; // Spread widely
    }
    const ambientGeometry = new THREE.BufferGeometry();
    ambientGeometry.setAttribute('position', new THREE.BufferAttribute(ambientPos, 3));
    const ambientMaterial = new THREE.PointsMaterial({
      color: colorLightZinc,
      size: 0.02,
      transparent: true,
      opacity: 0.3,
      blending: THREE.AdditiveBlending
    });
    const ambientParticles = new THREE.Points(ambientGeometry, ambientMaterial);
    sceneGroup.add(ambientParticles);

    // UTILS
    function createGlowTexture() {
      const canvas = document.createElement('canvas');
      canvas.width = 64;
      canvas.height = 64;
      const ctx = canvas.getContext('2d');
      const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
      gradient.addColorStop(0.2, 'rgba(255, 255, 255, 0.8)');
      gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.2)');
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 64, 64);
      const texture = new THREE.CanvasTexture(canvas);
      return texture;
    }

    // INTERACTION & ANIMATION
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const onMouseMove = (event) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', onMouseMove);

    const resizeObserver = new ResizeObserver(() => {
      if (!mount) return;
      const width = mount.clientWidth;
      const height = mount.clientHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    });
    resizeObserver.observe(mount);

    let animationFrameId;
    const clock = new THREE.Clock();

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();
      
      // Update Pulses
      for (let i = 0; i < pulseCount; i++) {
        const p = pulseData[i];
        p.progress += p.speed;
        
        if (p.progress >= 1) {
          p.start = p.target;
          const neighbors = adjacency.get(p.start);
          p.target = neighbors.length > 0 
            ? neighbors[Math.floor(Math.random() * neighbors.length)] 
            : p.start;
          p.progress = 0;
        }
        
        const v1 = nodes[p.start];
        const v2 = nodes[p.target];
        
        pulsePositions[i * 3] = v1.x + (v2.x - v1.x) * p.progress;
        pulsePositions[i * 3 + 1] = v1.y + (v2.y - v1.y) * p.progress;
        pulsePositions[i * 3 + 2] = v1.z + (v2.z - v1.z) * p.progress;
      }
      pulseGeometry.attributes.position.needsUpdate = true;

      // Cluster pulse effect (size and opacity scaling)
      const pulseScale = Math.sin(elapsedTime * 2) * 0.05 + 0.25;
      clusterMaterial.size = pulseScale;

      // Ambient particles slow drift
      ambientParticles.rotation.y = elapsedTime * 0.02;
      ambientParticles.rotation.z = elapsedTime * 0.01;

      // Scene rotation
      sceneGroup.rotation.y += 0.0005;

      // Parallax interaction (lerping)
      targetX = mouseX * 0.8;
      targetY = mouseY * 0.8;
      camera.position.x += (targetX - camera.position.x) * 0.02;
      camera.position.y += (targetY - camera.position.y) * 0.02;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // CLEANUP
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      resizeObserver.disconnect();
      cancelAnimationFrame(animationFrameId);
      
      // Dispose Geometries and Materials
      traceGeometry.dispose();
      traceMaterial.dispose();
      nodeGeometry.dispose();
      nodeMaterial.dispose();
      clusterGeometry.dispose();
      clusterMaterial.dispose();
      pulseGeometry.dispose();
      pulseMaterial.dispose();
      ambientGeometry.dispose();
      ambientMaterial.dispose();
      if (clusterMaterial.map) clusterMaterial.map.dispose();

      if (mount && mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className={`absolute inset-0 z-0 pointer-events-none overflow-hidden ${className}`}
      aria-hidden="true"
    />
  );
}
