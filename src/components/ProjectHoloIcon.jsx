import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ProjectHoloIcon({ domain = '', level = '', isHovered = false }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = 64;
    const height = 64;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 50);
    camera.position.z = 4.2;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    // Color based on level/domain
    const isResearch = level === 'Research Level';
    const mainColor = isResearch ? 0xff3b55 : 0xc89f68;

    const mat = new THREE.MeshBasicMaterial({
      color: mainColor,
      wireframe: true,
      transparent: true,
      opacity: 0.75
    });

    let mesh;
    if (domain.includes('RF') || domain.includes('Antenna') || domain.includes('Radar')) {
      // 3D Polar Torus / Dipole
      mesh = new THREE.Mesh(new THREE.TorusGeometry(1.0, 0.35, 12, 24), mat);
    } else if (domain.includes('Robotics') || domain.includes('Kinematics')) {
      // Articulated Octahedron
      mesh = new THREE.Mesh(new THREE.OctahedronGeometry(1.2, 0), mat);
    } else if (domain.includes('Embedded') || domain.includes('Hardware')) {
      // Silicon Box / Die
      mesh = new THREE.Mesh(new THREE.BoxGeometry(1.4, 1.4, 0.35), mat);
    } else if (domain.includes('AI') || domain.includes('Vision')) {
      // Neural Icosahedron
      mesh = new THREE.Mesh(new THREE.IcosahedronGeometry(1.1, 1), mat);
    } else {
      // Frontier Dodecahedron
      mesh = new THREE.Mesh(new THREE.DodecahedronGeometry(1.1, 0), mat);
    }
    group.add(mesh);

    let animId;
    let angle = 0;

    const render = () => {
      angle += isHovered ? 0.045 : 0.015;
      group.rotation.y = angle;
      group.rotation.x = angle * 0.6;
      group.scale.setScalar(isHovered ? 1.15 : 1.0);

      renderer.render(scene, camera);
      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      renderer.dispose();
      mat.dispose();
      mesh.geometry.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [domain, level, isHovered]);

  return <div ref={mountRef} className="w-16 h-16 pointer-events-none shrink-0" />;
}
