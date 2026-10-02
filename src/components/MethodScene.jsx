import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function MethodScene({ className = '' }) {
  const mountRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // SCENE SETUP
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x07070a, 0.02);

    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.z = 15;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    // MATERIALS
    const wireframeMaterial = new THREE.MeshBasicMaterial({
      color: 0x9ca3af, // zinc-400
      wireframe: true,
      transparent: true,
      opacity: 0.6,
    });

    const coreMaterial = new THREE.MeshBasicMaterial({
      color: 0xff3b55, // crimson
      transparent: true,
      opacity: 0.15,
      blending: THREE.AdditiveBlending
    });
    
    const shapeSpacing = 4.5;
    const startX = -shapeSpacing * 1.5;

    const shapes = [];
    const shapeGroup = new THREE.Group();
    scene.add(shapeGroup);

    // Helper to create dual-material shapes (wireframe + inner glowing core)
    const createShape = (geometry, xPos, type) => {
      const mesh = new THREE.Mesh(geometry, wireframeMaterial.clone());
      mesh.position.x = xPos;
      
      const core = new THREE.Mesh(geometry, coreMaterial.clone());
      core.scale.setScalar(0.9);
      mesh.add(core);
      
      shapes.push({ mesh, type });
      shapeGroup.add(mesh);
    };

    // Shape 1: Discover - Octahedron
    createShape(new THREE.OctahedronGeometry(1.2, 0), startX, 'pulse');

    // Shape 2: Architect - Dodecahedron
    createShape(new THREE.DodecahedronGeometry(1.2, 0), startX + shapeSpacing, 'rotateX');

    // Shape 3: Prototype - Torus Knot
    createShape(new THREE.TorusKnotGeometry(0.8, 0.25, 64, 8), startX + shapeSpacing * 2, 'spin');

    // Shape 4: Validate - Sphere
    createShape(new THREE.SphereGeometry(1.2, 16, 16), startX + shapeSpacing * 3, 'static');


    // PARTICLES (Pipeline Streams + Ambient)
    const pipelineCount = 800;
    const ambientCount = 200;
    
    // Pipeline particles
    const pipelineGeo = new THREE.BufferGeometry();
    const pipelinePositions = new Float32Array(pipelineCount * 3);
    const pipelineSpeeds = new Float32Array(pipelineCount);
    const pipelineOffsets = new Float32Array(pipelineCount);
    
    const streamLength = shapeSpacing * 3;
    
    for (let i = 0; i < pipelineCount; i++) {
      const i3 = i * 3;
      pipelinePositions[i3] = startX + Math.random() * streamLength;
      
      const radius = Math.random() * 0.8;
      const theta = Math.random() * Math.PI * 2;
      
      pipelinePositions[i3 + 1] = Math.sin(theta) * radius;
      pipelinePositions[i3 + 2] = Math.cos(theta) * radius;
      
      pipelineSpeeds[i] = 1.0 + Math.random() * 2.0;
      pipelineOffsets[i] = Math.random() * 100;
    }
    
    pipelineGeo.setAttribute('position', new THREE.BufferAttribute(pipelinePositions, 3));
    pipelineGeo.setAttribute('speed', new THREE.BufferAttribute(pipelineSpeeds, 1));
    pipelineGeo.setAttribute('offset', new THREE.BufferAttribute(pipelineOffsets, 1));
    
    const pipelineMaterial = new THREE.PointsMaterial({
      color: 0xff3b55,
      size: 0.08,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    
    const pipelinePoints = new THREE.Points(pipelineGeo, pipelineMaterial);
    shapeGroup.add(pipelinePoints);

    // Ambient particles
    const ambientGeo = new THREE.BufferGeometry();
    const ambientPositions = new Float32Array(ambientCount * 3);
    for (let i = 0; i < ambientCount; i++) {
      ambientPositions[i * 3] = (Math.random() - 0.5) * 30;
      ambientPositions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      ambientPositions[i * 3 + 2] = (Math.random() - 0.5) * 20 - 5;
    }
    ambientGeo.setAttribute('position', new THREE.BufferAttribute(ambientPositions, 3));
    const ambientMaterial = new THREE.PointsMaterial({
      color: 0xa1a1aa, // zinc-400
      size: 0.05,
      transparent: true,
      opacity: 0.4,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    const ambientPoints = new THREE.Points(ambientGeo, ambientMaterial);
    scene.add(ambientPoints);

    // MOUSE INTERACTION
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    
    const onMouseMove = (event) => {
      const windowHalfX = window.innerWidth / 2;
      const windowHalfY = window.innerHeight / 2;
      mouseX = (event.clientX - windowHalfX) * 0.001;
      mouseY = (event.clientY - windowHalfY) * 0.001;
    };

    window.addEventListener('mousemove', onMouseMove);

    // RESIZE HANDLER
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', onResize);

    // ANIMATION LOOP
    let animationFrameId;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      
      const time = clock.getElapsedTime();
      const delta = 0.016; // approximate for 60fps instead of using getDelta

      // Mouse Parallax
      targetX = mouseX * 2;
      targetY = mouseY * 2;
      
      camera.position.x += (targetX - camera.position.x) * 0.05;
      camera.position.y += (-targetY - camera.position.y) * 0.05;
      camera.lookAt(scene.position);

      // Overall scene rotation (slow)
      shapeGroup.rotation.y = Math.sin(time * 0.1) * 0.1 + (targetX * 0.5);
      shapeGroup.rotation.x = targetY * 0.5;

      // Animate Shapes
      shapes.forEach((s) => {
        if (s.type === 'pulse') {
          const scale = 1 + Math.sin(time * 2) * 0.05;
          s.mesh.scale.set(scale, scale, scale);
          s.mesh.rotation.y = time * 0.5;
        } else if (s.type === 'rotateX') {
          s.mesh.rotation.x = time * 0.8;
          s.mesh.rotation.y = time * 0.2;
        } else if (s.type === 'spin') {
          s.mesh.rotation.x = time;
          s.mesh.rotation.y = time;
        } else if (s.type === 'static') {
          s.mesh.rotation.y = -time * 0.3;
        }
      });

      // Animate Pipeline Particles
      const positions = pipelinePoints.geometry.attributes.position.array;
      const speeds = pipelinePoints.geometry.attributes.speed.array;
      const offsets = pipelinePoints.geometry.attributes.offset.array;
      
      for (let i = 0; i < pipelineCount; i++) {
        const i3 = i * 3;
        // Move along X axis
        positions[i3] += speeds[i] * 0.05;
        
        // Reset if past end
        if (positions[i3] > startX + streamLength) {
          positions[i3] = startX;
          const radius = Math.random() * 0.8;
          const theta = Math.random() * Math.PI * 2;
          positions[i3 + 1] = Math.sin(theta) * radius;
          positions[i3 + 2] = Math.cos(theta) * radius;
        } else {
          // Add some wavy noise to Y/Z
          const noise = Math.sin(positions[i3] * 2 + time * 3 + offsets[i]) * 0.02;
          positions[i3 + 1] += noise;
          positions[i3 + 2] += Math.cos(positions[i3] * 2 + time * 2 + offsets[i]) * 0.02;
        }
      }
      pipelinePoints.geometry.attributes.position.needsUpdate = true;

      // Animate ambient particles slowly
      ambientPoints.rotation.y = time * 0.02;

      renderer.render(scene, camera);
    };

    animate();

    // CLEANUP
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(animationFrameId);
      
      scene.traverse((object) => {
        if (object.geometry) object.geometry.dispose();
        if (object.material) {
          if (Array.isArray(object.material)) {
            object.material.forEach(material => material.dispose());
          } else {
            object.material.dispose();
          }
        }
      });
      
      renderer.dispose();
      if (mountRef.current && renderer.domElement.parentNode === mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      className={`absolute inset-0 z-0 pointer-events-none overflow-hidden bg-transparent ${className}`}
    />
  );
}
