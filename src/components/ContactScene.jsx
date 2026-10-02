import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

export default function ContactScene({ className = '' }) {
  const mountRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;

    const scene = new THREE.Scene();
    
    // Camera
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.z = 20;
    camera.position.y = -10;
    camera.lookAt(0, 0, 0);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    mountRef.current.appendChild(renderer.domElement);

    // Group for parallax and tilt
    const mainGroup = new THREE.Group();
    // Tilt the radar field so it looks 3D
    mainGroup.rotation.x = -Math.PI / 3;
    scene.add(mainGroup);

    // Colors
    const colorCrimson = new THREE.Color('#ff3b55');
    const colorZinc = new THREE.Color('#71717a');

    // Central emitter
    const emitterGeom = new THREE.SphereGeometry(0.3, 16, 16);
    const emitterMat = new THREE.MeshBasicMaterial({ color: colorCrimson });
    const emitter = new THREE.Mesh(emitterGeom, emitterMat);
    mainGroup.add(emitter);

    // Rings
    const ringCount = 4;
    const particlesPerRing = 300;
    const rings = [];

    const ringGeom = new THREE.BufferGeometry();
    const ringPositions = new Float32Array(particlesPerRing * 3);
    for (let i = 0; i < particlesPerRing; i++) {
      const theta = (i / particlesPerRing) * Math.PI * 2;
      // Add slight randomness to radius
      const r = 1 + (Math.random() - 0.5) * 0.05;
      ringPositions[i * 3] = Math.cos(theta) * r;
      ringPositions[i * 3 + 1] = Math.sin(theta) * r;
      ringPositions[i * 3 + 2] = (Math.random() - 0.5) * 0.1;
    }
    ringGeom.setAttribute('position', new THREE.BufferAttribute(ringPositions, 3));

    for (let i = 0; i < ringCount; i++) {
      const mat = new THREE.PointsMaterial({
        color: colorCrimson,
        size: 0.1,
        transparent: true,
        opacity: 0,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const points = new THREE.Points(ringGeom, mat);
      mainGroup.add(points);
      
      rings.push({
        mesh: points,
        timeOffset: i * 2.0, // Stagger by 2 seconds
        radius: 0
      });
    }

    // Receivers
    const receiverCount = 10;
    const receivers = [];
    const receiverGeom = new THREE.IcosahedronGeometry(0.4, 0);
    
    for (let i = 0; i < receiverCount; i++) {
      const mat = new THREE.MeshBasicMaterial({ color: colorZinc.clone() });
      const mesh = new THREE.Mesh(receiverGeom, mat);
      
      // Random position around the emitter
      const theta = Math.random() * Math.PI * 2;
      const r = 4 + Math.random() * 16; // distances between 4 and 20
      mesh.position.set(Math.cos(theta) * r, Math.sin(theta) * r, (Math.random() - 0.5) * 1.5);
      
      // Random rotation
      mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
      
      mainGroup.add(mesh);
      receivers.push({
        mesh,
        distance: r,
        baseColor: colorZinc.clone(),
        glowColor: colorCrimson.clone()
      });
    }

    // Ambient particles
    const ambientCount = 400;
    const ambientGeom = new THREE.BufferGeometry();
    const ambientPositions = new Float32Array(ambientCount * 3);
    for (let i = 0; i < ambientCount; i++) {
      ambientPositions[i * 3] = (Math.random() - 0.5) * 50;
      ambientPositions[i * 3 + 1] = (Math.random() - 0.5) * 50;
      ambientPositions[i * 3 + 2] = (Math.random() - 0.5) * 25;
    }
    ambientGeom.setAttribute('position', new THREE.BufferAttribute(ambientPositions, 3));
    const ambientMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.05,
      transparent: true,
      opacity: 0.15,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const ambientPoints = new THREE.Points(ambientGeom, ambientMat);
    scene.add(ambientPoints);

    // Parallax & Mouse tracking
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    
    const handleMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Resize handling
    const resizeObserver = new ResizeObserver(() => {
      if (!mountRef.current) return;
      const w = mountRef.current.clientWidth;
      const h = mountRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    });
    resizeObserver.observe(mountRef.current);

    // Animation Loop
    const clock = new THREE.Clock();
    let animationFrameId;

    const maxLife = 8.0;
    const speed = 3.0; // Radius units per second

    const animate = () => {
      const dt = clock.getDelta();
      const t = clock.getElapsedTime();

      // Parallax
      targetX = mouseX * 2;
      targetY = mouseY * 2;
      mainGroup.position.x += (targetX - mainGroup.position.x) * 0.05;
      mainGroup.position.y += (targetY - mainGroup.position.y) * 0.05;
      // Slight rotation parallax
      mainGroup.rotation.y = mouseX * 0.05;
      mainGroup.rotation.z = t * 0.02; // slowly rotate the whole field

      // Rotate receivers locally
      receivers.forEach(recv => {
        recv.mesh.rotation.x += dt * 0.5;
        recv.mesh.rotation.y += dt * 0.5;
      });

      // Update Rings
      rings.forEach(ring => {
        // time for this ring
        let localTime = (t + ring.timeOffset) % maxLife;
        const currentRadius = localTime * speed;
        ring.radius = currentRadius;
        
        ring.mesh.scale.set(currentRadius, currentRadius, 1);
        
        // Opacity fades out as it expands
        let opacity = 0;
        if (localTime < 0.2) {
          // quick fade in
          opacity = localTime / 0.2;
        } else {
          // fade out
          opacity = 1.0 - (localTime - 0.2) / (maxLife - 0.2);
        }
        ring.mesh.material.opacity = opacity * 0.8; // max opacity cap
      });

      // Emitter pulsing
      const emitterPulse = (Math.sin(t * Math.PI) * 0.5 + 0.5) * 0.3 + 0.7;
      emitter.scale.set(emitterPulse, emitterPulse, emitterPulse);

      // Receiver logic (glow when ring passes)
      receivers.forEach(recv => {
        let maxGlow = 0;
        rings.forEach(ring => {
          const dist = Math.abs(ring.radius - recv.distance);
          // if ring is close
          if (dist < 1.5) {
            const glow = 1.0 - (dist / 1.5);
            if (glow > maxGlow) maxGlow = glow;
          }
        });
        
        // Lerp color
        recv.mesh.material.color.lerpColors(recv.baseColor, recv.glowColor, maxGlow);
        // Scale up slightly when glowing
        const s = 1.0 + maxGlow * 0.4;
        recv.mesh.scale.set(s, s, s);
      });

      // Slow drift for ambient particles
      ambientPoints.rotation.y = t * 0.02;
      ambientPoints.rotation.x = t * 0.01;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      resizeObserver.disconnect();
      
      // Cleanup
      emitterGeom.dispose();
      emitterMat.dispose();
      ringGeom.dispose();
      rings.forEach(r => r.mesh.material.dispose());
      receiverGeom.dispose();
      receivers.forEach(r => r.mesh.material.dispose());
      ambientGeom.dispose();
      ambientMat.dispose();
      
      renderer.dispose();
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      className={`absolute inset-0 pointer-events-none z-0 ${className}`} 
    />
  );
}
