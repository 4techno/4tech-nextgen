import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

export default function FounderScene({ className = '' }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // Scene setup
    const scene = new THREE.Scene();
    // Use near-black fog to blend with the background
    scene.fog = new THREE.FogExp2(0x07070a, 0.04);

    const camera = new THREE.PerspectiveCamera(45, mount.clientWidth / mount.clientHeight, 0.1, 100);
    camera.position.z = 16;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    // Group for the main DNA helix
    const helixGroup = new THREE.Group();
    scene.add(helixGroup);

    // Helix properties
    const numParticles = 300; // Per strand
    const radius = 2.5;
    const height = 24;
    const turns = 6;

    // We use InstancedMesh for performance with sphere geometries
    const sphereGeometry = new THREE.SphereGeometry(0.1, 8, 8);
    const material1 = new THREE.MeshBasicMaterial({ color: 0xff3b55 }); // Crimson
    const material2 = new THREE.MeshBasicMaterial({ color: 0x788798 }); // Silver/Zinc

    const mesh1 = new THREE.InstancedMesh(sphereGeometry, material1, numParticles);
    const mesh2 = new THREE.InstancedMesh(sphereGeometry, material2, numParticles);
    helixGroup.add(mesh1);
    helixGroup.add(mesh2);

    const dummy = new THREE.Object3D();
    const positions1 = [];
    const positions2 = [];

    // Construct the Double Helix
    for (let i = 0; i < numParticles; i++) {
      const t = i / numParticles;
      const theta = t * Math.PI * 2 * turns;
      const y = (t - 0.5) * height;

      // Strand 1
      const x1 = Math.cos(theta) * radius;
      const z1 = Math.sin(theta) * radius;
      dummy.position.set(x1, y, z1);
      dummy.updateMatrix();
      mesh1.setMatrixAt(i, dummy.matrix);
      positions1.push(new THREE.Vector3(x1, y, z1));

      // Strand 2 (offset by PI)
      const x2 = Math.cos(theta + Math.PI) * radius;
      const z2 = Math.sin(theta + Math.PI) * radius;
      dummy.position.set(x2, y, z2);
      dummy.updateMatrix();
      mesh2.setMatrixAt(i, dummy.matrix);
      positions2.push(new THREE.Vector3(x2, y, z2));
    }

    // Cross-links (DNA rungs)
    const lineMaterial = new THREE.LineBasicMaterial({ 
      color: 0x788798, 
      transparent: true, 
      opacity: 0.25 
    });
    
    const linePoints = [];
    // Add rungs every 6 particles
    for (let i = 0; i < numParticles; i += 6) {
      linePoints.push(positions1[i], positions2[i]);
    }
    const lineGeometry = new THREE.BufferGeometry().setFromPoints(linePoints);
    const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
    helixGroup.add(lines);

    // Ambient Floating Particles
    const ambientCount = 300;
    const ambientGeometry = new THREE.BufferGeometry();
    const ambientPositions = new Float32Array(ambientCount * 3);
    for (let i = 0; i < ambientCount * 3; i++) {
      ambientPositions[i] = (Math.random() - 0.5) * 40;
    }
    ambientGeometry.setAttribute('position', new THREE.BufferAttribute(ambientPositions, 3));
    
    // Create a circular sprite for points so they look like soft spheres
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const context = canvas.getContext('2d');
    context.beginPath();
    context.arc(16, 16, 14, 0, Math.PI * 2);
    context.fillStyle = '#ffffff';
    context.fill();
    const spriteTexture = new THREE.CanvasTexture(canvas);

    const ambientMaterial = new THREE.PointsMaterial({
      color: 0xff3b55,
      size: 0.15,
      map: spriteTexture,
      transparent: true,
      opacity: 0.4,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    
    const ambientPoints = new THREE.Points(ambientGeometry, ambientMaterial);
    scene.add(ambientPoints);

    // Mouse Interaction
    let targetX = 0;
    let targetY = 0;

    const onDocumentMouseMove = (event) => {
      const windowHalfX = window.innerWidth / 2;
      const windowHalfY = window.innerHeight / 2;
      targetX = (event.clientX - windowHalfX) * 0.001;
      targetY = (event.clientY - windowHalfY) * 0.001;
    };

    window.addEventListener('mousemove', onDocumentMouseMove);

    // Animation Loop
    let animationFrameId;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      // Rotate main helix
      helixGroup.rotation.y = time * 0.15;
      
      // Gentle bobbing motion
      helixGroup.position.y = Math.sin(time * 0.5) * 0.5;

      // Animate ambient particles slowly floating
      const positions = ambientGeometry.attributes.position.array;
      for (let i = 0; i < ambientCount; i++) {
        const i3 = i * 3;
        // Add subtle drifting based on original position and time
        positions[i3 + 1] += Math.sin(time * 0.5 + positions[i3]) * 0.01;
        positions[i3] += Math.cos(time * 0.3 + positions[i3 + 1]) * 0.005;
      }
      ambientGeometry.attributes.position.needsUpdate = true;

      // Mouse tilt (smooth lerp)
      helixGroup.rotation.x += (targetY - helixGroup.rotation.x) * 0.05;
      helixGroup.rotation.z += (targetX - helixGroup.rotation.z) * 0.05;

      // Camera parallax
      camera.position.x += (targetX * 4 - camera.position.x) * 0.02;
      camera.position.y += (-targetY * 4 - camera.position.y) * 0.02;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };

    animate();

    // Resize Handler
    const resizeObserver = new ResizeObserver(() => {
      if (!mount) return;
      const width = mount.clientWidth;
      const height = mount.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    });
    resizeObserver.observe(mount);

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', onDocumentMouseMove);
      resizeObserver.disconnect();
      cancelAnimationFrame(animationFrameId);
      
      if (mount && mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
      
      // Dispose resources
      sphereGeometry.dispose();
      material1.dispose();
      material2.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      ambientGeometry.dispose();
      ambientMaterial.dispose();
      spriteTexture.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className={`absolute inset-0 pointer-events-none z-0 ${className}`}
    />
  );
}
