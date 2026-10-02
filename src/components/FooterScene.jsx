import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

export default function FooterScene({ className = '' }) {
  const mountRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene Setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x07070a, 0.003); // very subtle fog

    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 120;
    camera.position.y = 10;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Particles: Flattened disk formation / horizon
    const particleCount = 800;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    
    const colorBase = new THREE.Color(0x71717a); // zinc-500
    const colorAccent = new THREE.Color(0xff3b55); // crimson

    for (let i = 0; i < particleCount; i++) {
      // Cylindrical distribution for a distant disk/horizon
      const radius = 60 + Math.random() * 200;
      const theta = Math.random() * 2 * Math.PI;
      
      // y is tight, clustered near 0 to form a disk
      const y = (Math.random() - 0.5) * (Math.random() * 10);
      
      const x = radius * Math.cos(theta);
      const z = radius * Math.sin(theta);

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      const isAccent = Math.random() > 0.85; // ~15% crimson
      const c = isAccent ? colorAccent : colorBase;
      
      // randomize slightly for variety
      colors[i * 3] = Math.max(0, Math.min(1, c.r + (Math.random() * 0.1 - 0.05)));
      colors[i * 3 + 1] = Math.max(0, Math.min(1, c.g + (Math.random() * 0.1 - 0.05)));
      colors[i * 3 + 2] = Math.max(0, Math.min(1, c.b + (Math.random() * 0.1 - 0.05)));
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Circular particle texture
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');
    const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
    gradient.addColorStop(0, 'rgba(255,255,255,1)');
    gradient.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(16, 16, 16, 0, Math.PI * 2);
    ctx.fill();
    const texture = new THREE.CanvasTexture(canvas);

    const material = new THREE.PointsMaterial({
      size: 1.5,
      vertexColors: true,
      map: texture,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      transparent: true,
      opacity: 0.5
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Mouse Interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const onMouseMove = (event) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', onMouseMove);

    // Resize Handling
    const resizeObserver = new ResizeObserver(entries => {
      for (let entry of entries) {
        const { width, height } = entry.contentRect;
        renderer.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
      }
    });
    resizeObserver.observe(mountRef.current);

    // Animation Loop
    let animationFrameId;
    let time = 0;

    const animate = () => {
      time += 0.0005; // Very slow drift

      // Gentle rotation
      particles.rotation.y = time;
      particles.rotation.z = Math.sin(time * 0.5) * 0.03;

      // Lerp camera for slight parallax
      targetX = mouseX * 4;
      targetY = mouseY * 2 + 10; // Keep slightly above the horizon
      
      camera.position.x += (targetX - camera.position.x) * 0.02;
      camera.position.y += (targetY - camera.position.y) * 0.02;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animate();

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      resizeObserver.disconnect();
      cancelAnimationFrame(animationFrameId);
      
      geometry.dispose();
      material.dispose();
      texture.dispose();
      renderer.dispose();
      
      if (mountRef.current && renderer.domElement.parentNode) {
        mountRef.current.removeChild(renderer.domElement);
      }
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
