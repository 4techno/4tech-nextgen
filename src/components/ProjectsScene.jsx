import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

export default function ProjectsScene({ className = '' }) {
  const mountRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // 1. SCENE SETUP
    const scene = new THREE.Scene();
    
    // Fog for depth of field feel (nodes further away fade into background)
    scene.fog = new THREE.FogExp2(0x07070a, 0.06);

    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.z = 18;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);

    // COLORS
    const colorCrimson = new THREE.Color(0xff3b55);
    const colorSilver = new THREE.Color(0x888899);

    // GROUPS
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // 2. GENERATE NODES
    const nodeCount = 15;
    const nodes = [];
    const nodePositions = [];
    
    // Geometries & Materials
    const sphereGeo = new THREE.SphereGeometry(0.15, 16, 16);
    const sphereMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const shellGeo = new THREE.IcosahedronGeometry(0.35, 0);
    const shellMat = new THREE.MeshBasicMaterial({ 
      color: colorCrimson, 
      wireframe: true, 
      transparent: true, 
      opacity: 0.4, 
      blending: THREE.AdditiveBlending 
    });

    for (let i = 0; i < nodeCount; i++) {
      // Golden spiral distribution for even spacing in a sphere
      const phi = Math.acos( -1 + ( 2 * i ) / nodeCount );
      const theta = Math.sqrt( nodeCount * Math.PI ) * phi;
      const radius = 5 + Math.random() * 2; // Varying distances
      
      const x = radius * Math.cos(theta) * Math.sin(phi);
      const y = radius * Math.sin(theta) * Math.sin(phi);
      const z = radius * Math.cos(phi);

      const pos = new THREE.Vector3(x, y, z);
      nodePositions.push(pos);

      const nodeGroup = new THREE.Group();
      nodeGroup.position.copy(pos);
      
      const sphere = new THREE.Mesh(sphereGeo, sphereMat);
      const shell = new THREE.Mesh(shellGeo, shellMat);
      
      nodeGroup.add(sphere);
      nodeGroup.add(shell);
      
      mainGroup.add(nodeGroup);
      nodes.push({ group: nodeGroup, shell: shell });
    }

    // 3. NETWORK CONNECTIONS
    const connections = [];
    const lineGeo = new THREE.BufferGeometry();
    const linePositions = [];
    
    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        const d = nodePositions[i].distanceTo(nodePositions[j]);
        if (d < 8) { // Connect nodes that are relatively close
          linePositions.push(
            nodePositions[i].x, nodePositions[i].y, nodePositions[i].z,
            nodePositions[j].x, nodePositions[j].y, nodePositions[j].z
          );
          connections.push({ start: i, end: j });
        }
      }
    }
    lineGeo.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
    const lineMat = new THREE.LineBasicMaterial({ 
      color: 0x333344, 
      transparent: true, 
      opacity: 0.6 
    });
    const lines = new THREE.LineSegments(lineGeo, lineMat);
    mainGroup.add(lines);

    // 4. ENERGY PARTICLES ON LINES
    // Spawn a few particles per connection
    const particlesCount = connections.length * 2;
    const energyGeo = new THREE.BufferGeometry();
    const energyPositions = new Float32Array(particlesCount * 3);
    
    const energyData = [];
    for (let i = 0; i < particlesCount; i++) {
      const conn = connections[i % connections.length];
      energyData.push({
        conn: conn,
        progress: Math.random(),
        speed: 0.002 + Math.random() * 0.004
      });
    }
    
    energyGeo.setAttribute('position', new THREE.BufferAttribute(energyPositions, 3));
    
    const energyMat = new THREE.PointsMaterial({
      color: colorCrimson,
      size: 0.15,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    const energyPoints = new THREE.Points(energyGeo, energyMat);
    mainGroup.add(energyPoints);

    // 5. AMBIENT DUST
    const dustCount = 600;
    const dustGeo = new THREE.BufferGeometry();
    const dustPos = new Float32Array(dustCount * 3);
    for (let i = 0; i < dustCount * 3; i++) {
      dustPos[i] = (Math.random() - 0.5) * 30;
    }
    dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPos, 3));
    const dustMat = new THREE.PointsMaterial({
      color: colorSilver,
      size: 0.05,
      transparent: true,
      opacity: 0.3,
      blending: THREE.AdditiveBlending
    });
    const dustPoints = new THREE.Points(dustGeo, dustMat);
    scene.add(dustPoints);

    // 6. INTERACTIVITY & PARALLAX
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const onMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', onMouseMove);

    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width, height } = entry.contentRect;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
      }
    });
    resizeObserver.observe(mountRef.current);

    // 7. ANIMATION LOOP
    const clock = new THREE.Clock();
    let reqId;

    const animate = () => {
      reqId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      // Parallax Interpolation
      targetX = mouseX * 1.5;
      targetY = mouseY * 1.5;
      mainGroup.position.x += (targetX - mainGroup.position.x) * 0.05;
      mainGroup.position.y += (targetY - mainGroup.position.y) * 0.05;
      
      camera.position.x += (targetX * 0.5 - camera.position.x) * 0.02;
      camera.position.y += (targetY * 0.5 - camera.position.y) * 0.02;
      camera.lookAt(scene.position);

      // Orbit
      mainGroup.rotation.y = time * 0.03;
      mainGroup.rotation.x = Math.sin(time * 0.05) * 0.2; // Gentle tilt

      // Node shell animation
      nodes.forEach((node, i) => {
        node.shell.rotation.x = time * 0.5 + i;
        node.shell.rotation.y = time * 0.3 + i;
      });

      // Energy particles traveling
      const positions = energyGeo.attributes.position.array;
      for (let i = 0; i < particlesCount; i++) {
        const ed = energyData[i];
        ed.progress += ed.speed;
        if (ed.progress > 1) {
          ed.progress = 0;
        }
        
        const startNode = nodePositions[ed.conn.start];
        const endNode = nodePositions[ed.conn.end];
        
        const idx = i * 3;
        positions[idx] = startNode.x + (endNode.x - startNode.x) * ed.progress;
        positions[idx + 1] = startNode.y + (endNode.y - startNode.y) * ed.progress;
        positions[idx + 2] = startNode.z + (endNode.z - startNode.z) * ed.progress;
      }
      energyGeo.attributes.position.needsUpdate = true;

      // Dust animation
      dustPoints.rotation.y = time * 0.02;
      const dPositions = dustGeo.attributes.position.array;
      for (let i = 1; i < dustCount * 3; i += 3) {
        dPositions[i] += 0.01; // float up
        if (dPositions[i] > 15) {
          dPositions[i] = -15;
        }
      }
      dustGeo.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };
    
    animate();

    // 8. CLEANUP
    return () => {
      cancelAnimationFrame(reqId);
      window.removeEventListener('mousemove', onMouseMove);
      resizeObserver.disconnect();

      sphereGeo.dispose();
      sphereMat.dispose();
      shellGeo.dispose();
      shellMat.dispose();
      lineGeo.dispose();
      lineMat.dispose();
      energyGeo.dispose();
      energyMat.dispose();
      dustGeo.dispose();
      dustMat.dispose();

      if (mountRef.current && renderer.domElement.parentNode === mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className={`absolute inset-0 pointer-events-none z-0 ${className}`}
      style={{ overflow: 'hidden' }}
    />
  );
}
