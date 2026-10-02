import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

/**
 * Musée (musee.barvian.me) Exact 3D Sculpture Stage
 * Features the Venus de Milo classical marble sculpture with scroll-driven camera choreography,
 * overhead glowing halo ring, and electric cobalt (#0047DE) rim lighting.
 */
export default function MuseeSculptureScene({ scrollProgress = 0 }) {
  const mountRef = useRef(null);
  const scrollRef = useRef(0);
  const mouse = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const currentCamPos = useRef(new THREE.Vector3(0, 0, 20));
  const currentLookAt = useRef(new THREE.Vector3(-0.15, 0, 0));
  const sculptureGroupRef = useRef(null);
  const haloRingRef = useRef(null);

  // Sync scrollProgress to ref so animation loop updates without re-mounting Three.js
  useEffect(() => {
    scrollRef.current = scrollProgress;
  }, [scrollProgress]);

  // Exact 5 Camera Waypoints & LookAt Targets from musee.barvian.me
  const WAYPOINTS = [
    { pos: [0, 0, 20], look: [-0.15, 0, 0] },             // Section 0: Home / The Masterpiece
    { pos: [20, 0, 0], look: [0, 0, 1.25] },              // Section 1: The Architect (Dramatic 90° profile)
    { pos: [0, 5, 15], look: [-0.5, -0.7, -2] },          // Section 2: Selected Works (Looking down from above)
    { pos: [21.775, -4.44, 18.33], look: [-2.35, -0.5, 0] }, // Section 3: Disciplines & Method (Low diagonal)
    { pos: [8.36, 4.93, 10], look: [-0.25, -0.1, 0] }      // Section 4: Dialogue & Inquiries (Close intimate)
  ];

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);
    scene.fog = new THREE.FogExp2(0x000000, 0.018);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(WAYPOINTS[0].pos[0], WAYPOINTS[0].pos[1], WAYPOINTS[0].pos[2]);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // 2. Overhead Glowing Halo Ring (Signature Musée Light fixture)
    const haloGeom = new THREE.TorusGeometry(1.8, 0.035, 16, 64);
    const haloMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      emissive: 0xffffff,
      emissiveIntensity: 2.2,
      roughness: 0.1
    });
    const haloRing = new THREE.Mesh(haloGeom, haloMat);
    haloRing.rotation.x = Math.PI / 2 + 0.15;
    haloRing.position.set(-0.25, 4.2, -1.5);
    scene.add(haloRing);
    haloRingRef.current = haloRing;

    // Point light radiating from the halo
    const haloLight = new THREE.PointLight(0xffffff, 3.0, 25);
    haloLight.position.set(-0.25, 4.1, -1.5);
    scene.add(haloLight);

    // 3. Studio Lighting & Electric Blue Musée Accent
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.65);
    scene.add(ambientLight);

    // Main studio key light
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.8);
    keyLight.position.set(8, 14, 12);
    scene.add(keyLight);

    // Secondary fill light
    const fillLight = new THREE.DirectionalLight(0xffffff, 1.2);
    fillLight.position.set(-8, 6, 8);
    scene.add(fillLight);

    // 3.5 Atmospheric Museum Stardust Particles
    const dustCount = 450;
    const dustGeom = new THREE.BufferGeometry();
    const dustPos = new Float32Array(dustCount * 3);
    for (let i = 0; i < dustCount * 3; i += 3) {
      dustPos[i] = (Math.random() - 0.5) * 32;
      dustPos[i + 1] = (Math.random() - 0.5) * 24;
      dustPos[i + 2] = (Math.random() - 0.5) * 22;
    }
    dustGeom.setAttribute('position', new THREE.BufferAttribute(dustPos, 3));
    const dustMat = new THREE.PointsMaterial({
      color: 0xa39ef1,
      size: 0.065,
      transparent: true,
      opacity: 0.7
    });
    const dustParticles = new THREE.Points(dustGeom, dustMat);
    scene.add(dustParticles);

    // Signature Musée Electric Cobalt Rim Light (#0047DE)
    const blueRimLight = new THREE.PointLight(0x0047de, 7.5, 30);
    blueRimLight.position.set(-10, -2, 6);
    scene.add(blueRimLight);

    // Soft Lavender fill light (#a39ef1)
    const lavenderLight = new THREE.PointLight(0xa39ef1, 3.5, 25);
    lavenderLight.position.set(10, -4, 4);
    scene.add(lavenderLight);

    // 4. Sculpture Container Group
    const sculptureGroup = new THREE.Group();
    sculptureGroupRef.current = sculptureGroup;
    scene.add(sculptureGroup);

    // Classical Museum Pedestal Plinth
    const plinthGeom = new THREE.CylinderGeometry(1.4, 1.6, 2.5, 32);
    const plinthMat = new THREE.MeshStandardMaterial({
      color: 0x12141a,
      roughness: 0.35,
      metalness: 0.4
    });
    const plinthMesh = new THREE.Mesh(plinthGeom, plinthMat);
    plinthMesh.position.y = -5.2;
    sculptureGroup.add(plinthMesh);

    // Plinth Blue Accent Ring
    const plinthRingGeom = new THREE.TorusGeometry(1.65, 0.02, 16, 64);
    const plinthRingMat = new THREE.MeshBasicMaterial({ color: 0x0047de });
    const plinthRing = new THREE.Mesh(plinthRingGeom, plinthRingMat);
    plinthRing.rotation.x = Math.PI / 2;
    plinthRing.position.y = -4.0;
    sculptureGroup.add(plinthRing);

    // Procedural placeholder classical sculpture while Venus loads
    const placeholderGroup = new THREE.Group();
    const torsoGeom = new THREE.CylinderGeometry(0.7, 1.1, 4.2, 24);
    const marbleMat = new THREE.MeshStandardMaterial({
      color: 0xd8d2c8,
      roughness: 0.32,
      metalness: 0.12
    });
    const placeholderTorso = new THREE.Mesh(torsoGeom, marbleMat);
    placeholderTorso.position.y = -1.8;
    placeholderGroup.add(placeholderTorso);

    const headGeom = new THREE.SphereGeometry(0.65, 32, 32);
    const placeholderHead = new THREE.Mesh(headGeom, marbleMat);
    placeholderHead.position.y = 1.0;
    placeholderGroup.add(placeholderHead);

    sculptureGroup.add(placeholderGroup);

    // 5. Load Venus de Milo 3D Model with Draco Decompression
    const loader = new GLTFLoader();
    let dracoInstance = null;

    import('three/examples/jsm/loaders/DRACOLoader.js')
      .then(({ DRACOLoader }) => {
        dracoInstance = new DRACOLoader();
        dracoInstance.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.7/');
        loader.setDRACOLoader(dracoInstance);

        loader.load(
          '/venus.glb',
          (gltf) => {
            // Remove temporary placeholder
            sculptureGroup.remove(placeholderGroup);

            const model = gltf.scene;

            // Custom museum Carrara marble material with high-contrast specular reflections
            const venusMarble = new THREE.MeshStandardMaterial({
              color: 0xd6d0c6,
              roughness: 0.32,
              metalness: 0.18
            });

            model.traverse((child) => {
              if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
                child.material = venusMarble;
              }
            });

            // Exact coordinates and rotation from musee.barvian.me
            model.scale.set(0.015, 0.015, 0.015);
            model.position.set(0.5, 5.66, 6.75);
            model.rotation.set(-0.5, 0, Math.PI / 2 + 0.1);

            sculptureGroup.add(model);
          },
          undefined,
          (err) => {
            console.warn('Sculpture load notice:', err);
          }
        );
      })
      .catch((err) => {
        console.warn('Draco module load fallback:', err);
      });

    // Mouse Tracking for Parallax
    const handleMouseMove = (e) => {
      mouse.current.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Animation Loop with Spring Lerp
    let frameId;
    let targetCamPos = new THREE.Vector3();
    let targetLookAt = new THREE.Vector3();

    const animate = () => {
      // Smooth mouse lerp
      mouse.current.x += (mouse.current.targetX - mouse.current.x) * 0.06;
      mouse.current.y += (mouse.current.targetY - mouse.current.y) * 0.06;

      // Calculate scroll progress across 5 waypoints (0 to 4)
      const currentProg = scrollRef.current;
      const clampedProg = Math.max(0, Math.min(4, currentProg));
      const baseIdx = Math.floor(clampedProg);
      const nextIdx = Math.min(4, baseIdx + 1);
      const frac = clampedProg - baseIdx;

      // Smooth cubic Hermite ease
      const easeFrac = frac * frac * (3 - 2 * frac);

      const w1 = WAYPOINTS[baseIdx];
      const w2 = WAYPOINTS[nextIdx];

      // Interpolate camera position
      targetCamPos.set(
        w1.pos[0] + (w2.pos[0] - w1.pos[0]) * easeFrac + mouse.current.x * 1.0,
        w1.pos[1] + (w2.pos[1] - w1.pos[1]) * easeFrac + mouse.current.y * 0.8,
        w1.pos[2] + (w2.pos[2] - w1.pos[2]) * easeFrac
      );

      // Interpolate lookAt target
      targetLookAt.set(
        w1.look[0] + (w2.look[0] - w1.look[0]) * easeFrac,
        w1.look[1] + (w2.look[1] - w1.look[1]) * easeFrac,
        w1.look[2] + (w2.look[2] - w1.look[2]) * easeFrac
      );

      // Spring lerp to target
      currentCamPos.current.lerp(targetCamPos, 0.08);
      currentLookAt.current.lerp(targetLookAt, 0.08);

      camera.position.copy(currentCamPos.current);
      camera.lookAt(currentLookAt.current);

      // Sculpture continuous idle float & breathing animation
      const time = performance.now() * 0.001;
      if (sculptureGroupRef.current) {
        sculptureGroupRef.current.position.y = Math.sin(time * 1.2) * 0.12;
        sculptureGroupRef.current.rotation.y = Math.sin(time * 0.6) * 0.06;
      }

      // Halo ring gentle floating wave
      if (haloRingRef.current) {
        haloRingRef.current.position.y = 4.2 + Math.cos(time * 1.5) * 0.08;
      }

      // Drift museum stardust
      dustParticles.rotation.y = time * 0.025;
      dustParticles.rotation.x = Math.sin(time * 0.015) * 0.04;

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
      dracoLoader.dispose();
      if (renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []); // Run ONCE on mount!

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
    />
  );
}
