import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { ArrowRight, Sparkles } from 'lucide-react';
import { sound } from '../utils/soundEngine';

const JOURNEY_ACTS = [
  {
    num: '01',
    roman: 'I',
    chapter: 'Chapter One',
    title: 'The Genesis',
    subtitle: 'Beyond physical boundaries, fundamental forces choreograph the birth of every system.',
    cameraZ: 11.2,
    cameraY: 0
  },
  {
    num: '02',
    roman: 'II',
    chapter: 'Chapter Two',
    title: 'The Logic of Silicon',
    subtitle: 'Etching deterministic logic into copper, routing high-speed differential pairs and bare-metal firmware.',
    cameraZ: 10.0,
    cameraY: 0.4
  },
  {
    num: '03',
    roman: 'III',
    chapter: 'Chapter Three',
    title: 'Kinetic Mechanics',
    subtitle: 'Translating abstract coordinate matrices into physical torque, 6-axis kinematics, and closed-loop actuation.',
    cameraZ: 9.8,
    cameraY: 0.2
  },
  {
    num: '04',
    roman: 'IV',
    chapter: 'Chapter Four',
    title: 'Electromagnetic Waves',
    subtitle: 'Projecting invisible waves across the radio spectrum, from directional waveguides to resonant power transfer.',
    cameraZ: 10.5,
    cameraY: 0
  }
];

export default function CinematicIntro3D({ onEnter }) {
  const mountRef = useRef(null);
  const [journeyStage, setJourneyStage] = useState('gate'); // 'gate' | 'journey'
  const [currentAct, setCurrentAct] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [isEntering, setIsEntering] = useState(false);

  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0, isDown: false });
  const animFrameRef = useRef(null);

  // References to 3D sub-assemblies
  const rootGroupRef = useRef(null);
  const genesisGroupRef = useRef(null);
  const pcbGroupRef = useRef(null);
  const robotArmRef = useRef(null);
  const rfGroupRef = useRef(null);

  // Robotic Arm kinematic joint references
  const turretRef = useRef(null);
  const shoulderRef = useRef(null);
  const upperArmRef = useRef(null);
  const elbowRef = useRef(null);
  const forearmRef = useRef(null);
  const wristPitchRef = useRef(null);
  const gripperLeftRef = useRef(null);
  const gripperRightRef = useRef(null);

  const handleToggleSound = (e) => {
    e.stopPropagation();
    const active = sound.toggleMute();
    setSoundEnabled(active);
  };

  const startJourney = () => {
    setJourneyStage('journey');
    if (!soundEnabled) {
      sound.setMuted(false);
      setSoundEnabled(true);
    }
    sound.setActTheme(0);
  };

  const handleFinalEnter = () => {
    if (isEntering) return;
    setIsEntering(true);
    sound.playChime(659.25);
    setTimeout(() => {
      onEnter();
    }, 1200);
  };

  const setAct = (index) => {
    const nextIdx = Math.max(0, Math.min(JOURNEY_ACTS.length - 1, index));
    setCurrentAct(nextIdx);
    sound.setActTheme(nextIdx);
  };

  const nextAct = () => {
    if (currentAct < JOURNEY_ACTS.length - 1) {
      setAct(currentAct + 1);
    } else {
      handleFinalEnter();
    }
  };

  // Auto-progress through the 4 chapters in journey mode (11 seconds each)
  useEffect(() => {
    if (journeyStage !== 'journey' || isEntering) return;

    const timer = setInterval(() => {
      setCurrentAct((prev) => {
        if (prev < JOURNEY_ACTS.length - 1) {
          sound.setActTheme(prev + 1);
          return prev + 1;
        } else {
          clearInterval(timer);
          return prev;
        }
      });
    }, 11000);

    return () => clearInterval(timer);
  }, [journeyStage, isEntering]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050608, 0.035);

    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    camera.position.set(0, 0, 11);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    const rootGroup = new THREE.Group();
    scene.add(rootGroup);
    rootGroupRef.current = rootGroup;

    // 2. Primordial Luminous Particles (5,500 points)
    const count = 5500;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const origins = new Float32Array(count * 3);

    const cGold = new THREE.Color('#c89f68');
    const cChampagne = new THREE.Color('#f5ede3');
    const cBronze = new THREE.Color('#8c5e35');
    const cCrimson = new THREE.Color('#ff3b55');
    const cWhite = new THREE.Color('#ffffff');

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const u = Math.random();
      const v = Math.random();
      const radius = 1.5 + Math.pow(u, 0.75) * 12.0;
      const theta = v * Math.PI * 2 * 4.0 + radius * 0.6;

      const px = Math.cos(theta) * radius + (Math.random() - 0.5) * 0.5;
      const py = Math.sin(radius * 0.85 + theta * 0.45) * 1.8 + (Math.random() - 0.5) * 0.9;
      const pz = Math.sin(theta) * radius * 0.7 + (Math.random() - 0.5) * 4.0;

      positions[i3] = px;
      positions[i3 + 1] = py;
      positions[i3 + 2] = pz;

      origins[i3] = px;
      origins[i3 + 1] = py;
      origins[i3 + 2] = pz;

      let chosenColor;
      const roll = Math.random();
      if (roll < 0.4) chosenColor = cGold;
      else if (roll < 0.65) chosenColor = cChampagne;
      else if (roll < 0.85) chosenColor = cBronze;
      else if (roll < 0.95) chosenColor = cCrimson;
      else chosenColor = cWhite;

      colors[i3] = chosenColor.r;
      colors[i3 + 1] = chosenColor.g;
      colors[i3 + 2] = chosenColor.b;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    grad.addColorStop(0, 'rgba(255,255,255,1)');
    grad.addColorStop(0.2, 'rgba(245,230,200,0.85)');
    grad.addColorStop(0.6, 'rgba(200,159,104,0.25)');
    grad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 64, 64);
    const particleTex = new THREE.CanvasTexture(canvas);

    const particleMat = new THREE.PointsMaterial({
      size: 0.065,
      vertexColors: true,
      transparent: true,
      opacity: 0.88,
      map: particleTex,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    rootGroup.add(particles);

    // 3. Act 1: Quantum Astrolabe Core
    const genesisGroup = new THREE.Group();
    const ringMatGold = new THREE.MeshBasicMaterial({ color: 0xc89f68, wireframe: true, transparent: true, opacity: 0.35 });
    const ringMatCrimson = new THREE.MeshBasicMaterial({ color: 0xff3b55, wireframe: true, transparent: true, opacity: 0.3 });

    const ring1 = new THREE.Mesh(new THREE.TorusGeometry(3.3, 0.015, 16, 72), ringMatGold);
    const ring2 = new THREE.Mesh(new THREE.TorusGeometry(2.5, 0.015, 16, 72), ringMatGold);
    ring2.rotation.x = Math.PI / 2.7;
    const ring3 = new THREE.Mesh(new THREE.TorusGeometry(1.8, 0.015, 16, 64), ringMatCrimson);
    ring3.rotation.y = Math.PI / 3;

    const innerIcosa = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.2, 1),
      new THREE.MeshBasicMaterial({ color: 0xff3b55, wireframe: true, transparent: true, opacity: 0.35 })
    );

    genesisGroup.add(ring1);
    genesisGroup.add(ring2);
    genesisGroup.add(ring3);
    genesisGroup.add(innerIcosa);
    rootGroup.add(genesisGroup);
    genesisGroupRef.current = genesisGroup;

    // 4. Act 2: 3D Multilayer Silicon PCB Substrate
    const pcbGroup = new THREE.Group();
    const chipGeo = new THREE.BoxGeometry(2.4, 2.4, 0.3);
    const chipMat = new THREE.MeshStandardMaterial({
      color: 0x111318,
      wireframe: true,
      emissive: 0xc89f68,
      emissiveIntensity: 0.4
    });
    const chip = new THREE.Mesh(chipGeo, chipMat);
    pcbGroup.add(chip);

    // Radiating bus traces
    const traceGeo = new THREE.BufferGeometry();
    const tracePositions = [];
    for (let x = -6.5; x <= 6.5; x += 0.9) {
      tracePositions.push(x, -4, 0, x, 4, 0);
      tracePositions.push(-4, x, 0, 4, x, 0);
    }
    traceGeo.setAttribute('position', new THREE.Float32BufferAttribute(tracePositions, 3));
    const traceMat = new THREE.LineBasicMaterial({ color: 0xc89f68, transparent: true, opacity: 0.28 });
    const traceGrid = new THREE.LineSegments(traceGeo, traceMat);
    pcbGroup.add(traceGrid);

    // Glowing silicon capacitor pins around chip
    const pinsGeo = new THREE.BoxGeometry(0.12, 0.25, 0.1);
    const pinsMat = new THREE.MeshBasicMaterial({ color: 0xff3b55 });
    for (let i = -1.0; i <= 1.0; i += 0.25) {
      const pinTop = new THREE.Mesh(pinsGeo, pinsMat);
      pinTop.position.set(i, 1.3, 0);
      const pinBottom = new THREE.Mesh(pinsGeo, pinsMat);
      pinBottom.position.set(i, -1.3, 0);
      pcbGroup.add(pinTop);
      pcbGroup.add(pinBottom);
    }
    rootGroup.add(pcbGroup);
    pcbGroupRef.current = pcbGroup;

    // 5. Act 3: ACCURATE 6-DOF INDUSTRIAL ARTICULATED ROBOTIC ARM
    // Base coordinates at Y = -1.8
    const robotArmRoot = new THREE.Group();
    robotArmRoot.position.set(0, -1.8, 0);

    const darkTitaniumMat = new THREE.MeshStandardMaterial({
      color: 0x181a20,
      metalness: 0.85,
      roughness: 0.25,
      wireframe: true
    });
    const jointGoldMat = new THREE.MeshStandardMaterial({
      color: 0xc89f68,
      metalness: 0.9,
      roughness: 0.2,
      wireframe: true
    });
    const ledCrimsonMat = new THREE.MeshBasicMaterial({ color: 0xff3b55 });

    // J0: Mounting Flange Pedestal
    const baseFlange = new THREE.Mesh(new THREE.CylinderGeometry(1.6, 1.8, 0.3, 32), darkTitaniumMat);
    robotArmRoot.add(baseFlange);

    // J1: Turret Turntable (Yaw rotation on Y axis)
    const turret = new THREE.Group();
    turret.position.y = 0.2;
    const turretBody = new THREE.Mesh(new THREE.CylinderGeometry(1.3, 1.4, 0.7, 32), darkTitaniumMat);
    turretBody.position.y = 0.35;
    turret.add(turretBody);

    const turretLedRing = new THREE.Mesh(new THREE.TorusGeometry(1.32, 0.03, 8, 32), ledCrimsonMat);
    turretLedRing.rotation.x = Math.PI / 2;
    turretLedRing.position.y = 0.45;
    turret.add(turretLedRing);

    robotArmRoot.add(turret);
    turretRef.current = turret;

    // J2: Shoulder Actuator Joint (Pitch rotation on Z axis, height = 0.7)
    const shoulder = new THREE.Group();
    shoulder.position.set(0, 0.7, 0);
    const shoulderGearbox = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.55, 0.9, 24), jointGoldMat);
    shoulderGearbox.rotation.x = Math.PI / 2;
    shoulder.add(shoulderGearbox);

    turret.add(shoulder);
    shoulderRef.current = shoulder;

    // Upper Arm Boom (L1 = 2.4)
    const L1 = 2.4;
    const upperArm = new THREE.Group();
    const boomMesh = new THREE.Mesh(new THREE.BoxGeometry(0.42, L1, 0.42), darkTitaniumMat);
    boomMesh.position.y = L1 / 2;
    upperArm.add(boomMesh);

    shoulder.add(upperArm);
    upperArmRef.current = upperArm;

    // J3: Elbow Joint Actuator (at tip of upper arm: y = L1)
    const elbow = new THREE.Group();
    elbow.position.set(0, L1, 0);
    const elbowGearbox = new THREE.Mesh(new THREE.CylinderGeometry(0.48, 0.48, 0.8, 24), jointGoldMat);
    elbowGearbox.rotation.x = Math.PI / 2;
    elbow.add(elbowGearbox);

    const elbowRing = new THREE.Mesh(new THREE.TorusGeometry(0.5, 0.025, 8, 24), ledCrimsonMat);
    elbowRing.rotation.y = Math.PI / 2;
    elbow.add(elbowRing);

    upperArm.add(elbow);
    elbowRef.current = elbow;

    // Forearm Link (L2 = 2.0)
    const L2 = 2.0;
    const forearm = new THREE.Group();
    const forearmMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.35, L2, 16), darkTitaniumMat);
    forearmMesh.position.y = L2 / 2;
    forearm.add(forearmMesh);

    elbow.add(forearm);
    forearmRef.current = forearm;

    // J4 & J5: Wrist Pitch & Roll Assembly (at tip of forearm: y = L2)
    const wristPitch = new THREE.Group();
    wristPitch.position.set(0, L2, 0);
    const wristClevis = new THREE.Mesh(new THREE.SphereGeometry(0.35, 16, 16), jointGoldMat);
    wristPitch.add(wristClevis);

    // End-Effector: Precision Two-Finger Parallel Gripper
    const toolFlange = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.35, 0.25, 24), darkTitaniumMat);
    toolFlange.position.y = 0.25;
    wristPitch.add(toolFlange);

    // Gripper Jaws
    const jawGeo = new THREE.BoxGeometry(0.08, 0.45, 0.12);
    const jawMat = new THREE.MeshStandardMaterial({ color: 0xff3b55, wireframe: true });

    const leftJaw = new THREE.Mesh(jawGeo, jawMat);
    leftJaw.position.set(-0.2, 0.55, 0);
    wristPitch.add(leftJaw);
    gripperLeftRef.current = leftJaw;

    const rightJaw = new THREE.Mesh(jawGeo, jawMat);
    rightJaw.position.set(0.2, 0.55, 0);
    wristPitch.add(rightJaw);
    gripperRightRef.current = rightJaw;

    // Central optical laser focal ring
    const laserEmitter = new THREE.Mesh(new THREE.RingGeometry(0.05, 0.1, 16), ledCrimsonMat);
    laserEmitter.rotation.x = Math.PI / 2;
    laserEmitter.position.y = 0.4;
    wristPitch.add(laserEmitter);

    forearm.add(wristPitch);
    wristPitchRef.current = wristPitch;

    rootGroup.add(robotArmRoot);
    robotArmRef.current = robotArmRoot;

    // 6. Act 4: RF Toroidal Radiation Lobes & Phased Array Dipole
    const rfGroup = new THREE.Group();
    const rfMatToroid = new THREE.MeshBasicMaterial({ color: 0xff3b55, wireframe: true, transparent: true, opacity: 0.38 });
    const rfMatPolar = new THREE.MeshBasicMaterial({ color: 0xc89f68, wireframe: true, transparent: true, opacity: 0.32 });

    const toroidLobe = new THREE.Mesh(new THREE.TorusGeometry(2.5, 0.95, 16, 64), rfMatToroid);
    toroidLobe.rotation.x = Math.PI / 2;
    rfGroup.add(toroidLobe);

    const outerRing = new THREE.Mesh(new THREE.RingGeometry(3.8, 3.84, 64), rfMatPolar);
    outerRing.rotation.x = Math.PI / 2;
    rfGroup.add(outerRing);

    const verticalDipole = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 4.4, 16), rfMatPolar);
    rfGroup.add(verticalDipole);

    rootGroup.add(rfGroup);
    rfGroupRef.current = rfGroup;

    // Mouse Listeners
    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      mouseRef.current.targetX = x;
      mouseRef.current.targetY = y;
    };

    const handleMouseDown = () => {
      mouseRef.current.isDown = true;
      sound.playSubtleClick();
    };

    const handleMouseUp = () => {
      mouseRef.current.isDown = false;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    // 7. Animation Loop with Exact Analytical Inverse Kinematics
    let time = 0;
    const animate = () => {
      time += 0.007;

      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.06;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.06;

      const inJourney = journeyStage === 'journey';
      const act = inJourney ? currentAct : 0;

      // Visibility toggles between acts
      genesisGroup.visible = !inJourney || act === 0;
      pcbGroup.visible = inJourney && act === 1;
      robotArmRoot.visible = inJourney && act === 2;
      rfGroup.visible = inJourney && act === 3;

      // Real-time particle flow & sculpting
      const posArr = particleGeo.attributes.position.array;
      const mx = mouseRef.current.x * 4.5;
      const my = -mouseRef.current.y * 3.5;
      const isCarving = mouseRef.current.isDown;

      for (let i = 0; i < count; i += 3) {
        const i3 = i * 3;
        const ox = origins[i3];
        const oy = origins[i3 + 1];
        const oz = origins[i3 + 2];

        const wave = Math.sin(time * 2.4 + ox * 0.35 + oz * 0.25) * 0.25;
        const dx = posArr[i3] - mx;
        const dy = posArr[i3 + 1] - my;
        const distSq = dx * dx + dy * dy;

        if (distSq < (isCarving ? 7.0 : 3.2)) {
          const force = (isCarving ? 0.25 : 0.09) / (distSq + 0.12);
          posArr[i3] += dx * force;
          posArr[i3 + 1] += dy * force;
        } else {
          posArr[i3] += (ox - posArr[i3]) * 0.035;
          posArr[i3 + 1] += (oy + wave - posArr[i3 + 1]) * 0.035;
          posArr[i3 + 2] += (oz - posArr[i3 + 2]) * 0.035;
        }
      }
      particleGeo.attributes.position.needsUpdate = true;

      // Particles ambient rotation
      particles.rotation.y = time * 0.2 + mouseRef.current.x * 0.25;
      particles.rotation.x = Math.sin(time * 0.35) * 0.08 + mouseRef.current.y * 0.18;

      // Model-specific updates
      if (!inJourney || act === 0) {
        genesisGroup.rotation.y = time * 0.6;
        genesisGroup.rotation.x = time * 0.35;
        innerIcosa.rotation.z = -time * 1.1;
      } else if (act === 1) {
        pcbGroup.rotation.y = time * 0.35 + mouseRef.current.x * 0.4;
        pcbGroup.rotation.x = 0.45 + Math.sin(time * 0.5) * 0.12 + mouseRef.current.y * 0.3;
      } else if (act === 2) {
        // --- 6-DOF INVERSE KINEMATICS ENGINE ---
        // Target 3D coordinate from mouse cursor:
        const targetX = mouseRef.current.x * 3.4;
        const targetY = -mouseRef.current.y * 2.2 + 0.5;
        const targetZ = 1.6 + mouseRef.current.x * 0.5;

        // Base Turret Yaw Angle (theta1)
        const theta1 = Math.atan2(targetX, targetZ);
        if (turretRef.current) {
          turretRef.current.rotation.y = THREE.MathUtils.lerp(turretRef.current.rotation.y, theta1, 0.08);
        }

        // 2-Link Planar Solver for Shoulder & Elbow
        const planarR = Math.sqrt(targetX * targetX + targetZ * targetZ);
        const planarH = targetY - 0.7; // offset from shoulder joint height
        const dist = Math.sqrt(planarR * planarR + planarH * planarH);

        // Clamp distance within physical reach of L1 + L2
        const clampedDist = Math.max(0.8, Math.min(L1 + L2 - 0.15, dist));

        // Law of Cosines for Elbow Angle (theta3)
        const cosElbow = (L1 * L1 + L2 * L2 - clampedDist * clampedDist) / (2 * L1 * L2);
        const elbowAngle = Math.PI - Math.acos(THREE.MathUtils.clamp(cosElbow, -1, 1));

        // Shoulder Angle (theta2)
        const phi1 = Math.atan2(planarH, planarR);
        const phi2 = Math.atan2(L2 * Math.sin(elbowAngle), L1 + L2 * Math.cos(elbowAngle));
        const shoulderAngle = -(phi1 - phi2 - Math.PI / 2);

        if (shoulderRef.current) {
          shoulderRef.current.rotation.z = THREE.MathUtils.lerp(shoulderRef.current.rotation.z, shoulderAngle, 0.08);
        }
        if (elbowRef.current) {
          elbowRef.current.rotation.z = THREE.MathUtils.lerp(elbowRef.current.rotation.z, elbowAngle - Math.PI / 2, 0.08);
        }

        // Wrist Pitch alignment toward target
        if (wristPitchRef.current) {
          wristPitchRef.current.rotation.z = THREE.MathUtils.lerp(
            wristPitchRef.current.rotation.z,
            -shoulderAngle - elbowAngle + Math.PI / 2,
            0.08
          );
        }

        // Gripper flex on mouse hold
        const jawOffset = mouseRef.current.isDown ? 0.08 : 0.22;
        if (gripperLeftRef.current && gripperRightRef.current) {
          gripperLeftRef.current.position.x = THREE.MathUtils.lerp(gripperLeftRef.current.position.x, -jawOffset, 0.12);
          gripperRightRef.current.position.x = THREE.MathUtils.lerp(gripperRightRef.current.position.x, jawOffset, 0.12);
        }
      } else if (act === 3) {
        rfGroup.rotation.y = time * 0.75 + mouseRef.current.x * 0.6;
        toroidLobe.rotation.z = Math.sin(time * 0.6) * 0.25 + mouseRef.current.y * 0.4;
        outerRing.scale.setScalar(1 + Math.sin(time * 2.2) * 0.08);
      }

      // Camera motion
      if (isEntering) {
        camera.position.z -= 0.22;
        camera.fov = Math.min(115, camera.fov + 0.8);
        camera.updateProjectionMatrix();
        particleMat.opacity = Math.max(0, particleMat.opacity - 0.03);
      } else {
        const targetZ = inJourney ? JOURNEY_ACTS[act].cameraZ : 11;
        const targetY = inJourney ? JOURNEY_ACTS[act].cameraY : 0;
        camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.04);
        camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY - mouseRef.current.y * 0.4, 0.05);
        camera.position.x = THREE.MathUtils.lerp(camera.position.x, mouseRef.current.x * 0.6, 0.05);
        camera.lookAt(0, targetY, 0);
      }

      renderer.render(scene, camera);
      animFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      resizeObserver.disconnect();
      renderer.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      particleTex.dispose();
      ringMatGold.dispose();
      ringMatCrimson.dispose();
      chipMat.dispose();
      chipGeo.dispose();
      traceGeo.dispose();
      traceMat.dispose();
      darkTitaniumMat.dispose();
      jointGoldMat.dispose();
      ledCrimsonMat.dispose();
      rfMatToroid.dispose();
      rfMatPolar.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [journeyStage, currentAct, isEntering]);

  const activeActData = JOURNEY_ACTS[currentAct];

  return (
    <div
      className={`fixed inset-0 z-50 bg-[#050608] overflow-hidden transition-opacity duration-1000 ${
        isEntering ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* 3D WebGL Canvas */}
      <div ref={mountRef} className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Atmospheric Vignette matching Symphony of Vines */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_25%,#050608_95%)]" />

      {/* Top Header Bar matching Symphony of Vines */}
      <header className="absolute top-0 left-0 right-0 p-6 md:p-12 flex items-center justify-between z-20 pointer-events-auto">
        <div className="flex items-center gap-3">
          <span className="font-display tracking-[0.25em] text-xs uppercase text-zinc-300">
            MOHAMMED VASHIR
          </span>
        </div>

        {/* Audio Equalizer Button with Rotating Organic Ring */}
        <button
          onClick={handleToggleSound}
          className="group relative w-12 h-12 flex items-center justify-center rounded-full bg-black/40 backdrop-blur border border-white/10 hover:border-[#c89f68] transition-colors"
          title={soundEnabled ? 'Mute Audio' : 'Enable Audio'}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="88"
            height="89"
            viewBox="0 0 88 89"
            fill="none"
            className="absolute inset-0 w-full h-full pointer-events-none p-1 animate-spin-slow opacity-60"
          >
            <path
              d="M79.2772 39.8839C85.1004 61.603 71.2873 75.883 45.8134 82.7045C26.5499 87.8629 13.5523 68.9115 8.57604 50.3515C3.11311 26.843 21.1028 12.7143 40.3664 7.55583C59.6299 2.3974 72.3952 14.2159 79.2772 39.8839Z"
              stroke="#c89f68"
              strokeWidth="1.2"
            />
          </svg>

          <div className="flex items-end gap-0.5 h-3.5 relative z-10">
            <span className={`w-0.5 bg-[#c89f68] rounded-full ${soundEnabled ? 'audio-bar' : 'h-1'}`} />
            <span className={`w-0.5 bg-[#c89f68] rounded-full ${soundEnabled ? 'audio-bar' : 'h-2.5'}`} />
            <span className={`w-0.5 bg-[#c89f68] rounded-full ${soundEnabled ? 'audio-bar' : 'h-1.5'}`} />
            <span className={`w-0.5 bg-[#c89f68] rounded-full ${soundEnabled ? 'audio-bar' : 'h-3'}`} />
          </div>
        </button>
      </header>

      {/* STAGE 1: THE OPENING GATE SCREEN (Pure Minimalist Symphony of Vines) */}
      {journeyStage === 'gate' && (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-20 pointer-events-none animate-fade-in">
          
          <div className="font-luxury italic text-5xl sm:text-7xl md:text-8xl text-[#c89f68] mb-1 select-none tracking-wide drop-shadow">
            The
          </div>

          <h1 className="font-display text-4xl sm:text-7xl md:text-8xl tracking-[0.14em] uppercase text-white font-bold leading-none mb-6 select-none drop-shadow-[0_10px_35px_rgba(0,0,0,0.8)]">
            Symphony <br className="sm:hidden" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#f5ede3] to-[#c89f68]">
              of Systems
            </span>
          </h1>

          <p className="font-luxury text-xl sm:text-2xl md:text-3xl text-zinc-300 max-w-xl mx-auto leading-relaxed mb-12 select-none font-light drop-shadow">
            Explore our origins and reveal the energy beneath the silicon and mechanics that shapes our creations.
          </p>

          <div className="pointer-events-auto">
            <button
              onClick={startJourney}
              onMouseEnter={() => sound.playSubtleClick()}
              className="group relative inline-flex items-center justify-center px-10 py-5 text-white transition-transform active:scale-95"
            >
              <div className="absolute inset-0 rounded-full bg-[#c89f68]/20 blur-xl group-hover:bg-[#c89f68]/45 transition-colors" />

              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="240"
                height="70"
                viewBox="0 0 201 59"
                fill="none"
                className="absolute inset-0 w-full h-full pointer-events-none transition-transform duration-700 group-hover:scale-105"
              >
                <path
                  d="M200.044 24.2553C201.378 39.2942 189.55 52.2379 174.454 52.2154C143.935 52.17 97.3621 52.0503 77.7645 51.7365C62.7815 51.4966 43.6509 52.1645 28.1167 52.9023C13.2509 53.6084 0.725484 41.6905 0.965866 26.8217C1.18899 13.0202 12.3929 1.92106 26.196 1.8276L174.268 0.824961C187.65 0.734349 198.862 10.9256 200.044 24.2553Z"
                  stroke="#c89f68"
                  strokeWidth="1.2"
                  className="transition-colors group-hover:stroke-white"
                />
                <path
                  opacity="0.45"
                  d="M0.897654 31.49C-1.37964 15.3499 11.2901 0.990105 27.5879 1.25014C43.8399 1.50944 63.225 1.81895 77.7391 2.05135C97.8433 2.37327 144.937 4.80207 174.299 6.39704C188.125 7.14811 198.873 18.6413 198.765 32.4904C198.651 47.0398 186.614 58.6622 172.069 58.2662L26.444 54.3019C13.5026 53.9496 2.70635 44.3089 0.897654 31.49Z"
                  stroke="#9d6e46"
                  strokeWidth="0.9"
                />
              </svg>

              <span className="relative z-10 font-display tracking-[0.25em] text-xs sm:text-sm uppercase text-[#f5ede3] group-hover:text-white transition-colors">
                Enter experience
              </span>
            </button>
          </div>

          <button
            onClick={handleFinalEnter}
            className="absolute bottom-6 right-8 z-20 text-[11px] font-mono text-zinc-600 hover:text-zinc-300 uppercase tracking-widest transition pointer-events-auto"
          >
            Skip to Portfolio →
          </button>
        </div>
      )}

      {/* STAGE 2: THE MULTI-ACT CINEMATIC 3D JOURNEY (Symphony of Vines Chapter Flow) */}
      {journeyStage === 'journey' && (
        <div className="absolute inset-0 flex flex-col justify-between p-6 md:p-12 z-20 pointer-events-none animate-fade-in">
          
          {/* Chapter Title Card (Top Center) */}
          <div className="mt-20 md:mt-24 text-center max-w-2xl mx-auto">
            <div className="font-luxury italic text-sm md:text-base text-[#c89f68] tracking-widest mb-1">
              {activeActData.chapter}
            </div>
            <h2 className="font-display text-3xl sm:text-5xl md:text-6xl uppercase tracking-[0.14em] text-white font-bold leading-tight drop-shadow-2xl">
              {activeActData.title}
            </h2>
          </div>

          {/* Subtitle / Poetic Voiceover at Bottom Center matching Symphony of Vines */}
          <div className="mb-20 text-center max-w-xl mx-auto">
            <p className="font-luxury text-xl sm:text-2xl md:text-3xl text-zinc-300 leading-relaxed font-light drop-shadow">
              {activeActData.subtitle}
            </p>
          </div>

          {/* Floating Symphony of Vines Chapter Controls (Bottom Bar) */}
          <div className="pointer-events-auto flex items-center justify-between w-full max-w-4xl mx-auto pt-4 border-t border-white/5">
            
            {/* Circular Chapter Numbers */}
            <div className="flex items-center gap-2.5">
              {JOURNEY_ACTS.map((act, idx) => (
                <button
                  key={act.num}
                  onClick={() => setAct(idx)}
                  className={`w-9 h-9 rounded-full font-mono text-xs flex items-center justify-center transition-all ${
                    currentAct === idx
                      ? 'bg-[#c89f68] text-black font-bold shadow-lg shadow-[#c89f68]/30 scale-110'
                      : 'bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10'
                  }`}
                  title={act.title}
                >
                  {act.num}
                </button>
              ))}
            </div>

            {/* Advance to Next Chapter or Enter Portfolio */}
            <div className="flex items-center gap-4">
              {currentAct < JOURNEY_ACTS.length - 1 ? (
                <button
                  onClick={nextAct}
                  className="px-5 py-2.5 rounded-full bg-black/60 border border-white/10 hover:border-[#c89f68] text-xs font-mono text-zinc-200 hover:text-white transition flex items-center gap-2 shadow-lg"
                >
                  <span>Next Chapter</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#c89f68]" />
                </button>
              ) : (
                <button
                  onClick={handleFinalEnter}
                  className="px-6 py-2.5 rounded-full bg-white text-black font-semibold text-xs font-mono hover:bg-[#c89f68] hover:text-white transition flex items-center gap-2 shadow-xl"
                >
                  <span>Enter Portfolio</span>
                  <Sparkles className="w-3.5 h-3.5 text-[#c89f68]" />
                </button>
              )}

              <button
                onClick={handleFinalEnter}
                className="text-[11px] font-mono text-zinc-500 hover:text-zinc-200 uppercase tracking-wider transition"
              >
                Skip →
              </button>
            </div>

          </div>

        </div>
      )}

    </div>
  );
}
