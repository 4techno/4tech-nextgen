const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

function generateResume(outputPath) {
  const doc = new PDFDocument({
    size: 'A4',
    margins: { top: 36, bottom: 36, left: 40, right: 40 }
  });

  const stream = fs.createWriteStream(outputPath);
  doc.pipe(stream);

  const gold = '#c89f68';
  const bronze = '#9d6e46';
  const dark = '#0b0c10';
  const gray = '#4a4b52';
  const lightGray = '#71717a';

  // 1. Header
  doc
    .font('Helvetica-Bold')
    .fontSize(22)
    .fillColor(dark)
    .text('MOHAMMED VASHIR', { characterSpacing: 1.5 });

  doc
    .font('Helvetica-Bold')
    .fontSize(10)
    .fillColor(bronze)
    .text('CREATIVE TECHNOLOGIST · SYSTEMS ARCHITECT · PHYSICAL COMPUTING', { characterSpacing: 0.8 });

  doc
    .font('Helvetica')
    .fontSize(8.5)
    .fillColor(gray)
    .text('Kalpakkam Nuclear & Energy Corridor, Tamil Nadu, India  |  contact@4tech.in  |  +91 94883 58489  |  Portfolio: 4tech-9cy.pages.dev', { lineGap: 4 });

  // Accent Line
  doc.moveDown(0.4);
  doc
    .strokeColor(gold)
    .lineWidth(2)
    .moveTo(40, doc.y)
    .lineTo(555, doc.y)
    .stroke();

  doc.moveDown(0.8);

  function sectionHeader(title) {
    doc.moveDown(0.6);
    const y = doc.y;
    doc
      .rect(40, y + 1, 4, 11)
      .fill(gold);
    doc
      .font('Helvetica-Bold')
      .fontSize(10)
      .fillColor(dark)
      .text(`   ${title.toUpperCase()}`, { characterSpacing: 1.2 });
    doc
      .strokeColor('#e5e7eb')
      .lineWidth(0.6)
      .moveTo(40, doc.y + 2)
      .lineTo(555, doc.y + 2)
      .stroke();
    doc.moveDown(0.4);
  }

  // 2. Executive Profile
  sectionHeader('Executive Profile');
  doc
    .font('Helvetica')
    .fontSize(8.5)
    .fillColor(dark)
    .text(
      'Accomplished Systems Engineer and Creative Technologist specializing in physical computing, autonomous robotics, multilayer RF hardware design, and high-performance 3D spatial web applications. Founder of 4tech Engineering R&D with a proven track record of independently designing, fabricating, and empirically validating 15 production-grade hardware systems. Proficient at bridging bare-metal embedded firmware (C++20, FreeRTOS) with precision kinematic control and real-time Three.js/WebGL digital twin visualization.',
      { lineGap: 2.5, align: 'justify' }
    );

  // 3. Core Technical Specializations
  sectionHeader('Core Technical Specializations');
  const skills = [
    ['Robotics & Kinematics', 'Analytical Closed-Form Inverse Kinematics, Denavit-Hartenberg frames, Harmonic Drive actuators, precision laser focal tracking, robotic gripper physics.'],
    ['High-Speed PCB Design', '6-Layer controlled impedance routing, 50Ω single-ended & 100Ω differential pairs, KiCad, Altium, EMI/EMC shielding, high-current motor drivers.'],
    ['Embedded Firmware & IoT', 'Bare-metal C++20, FreeRTOS, STM32H7 Dual-Core ARM Cortex-M @ 480MHz, ESP32, microsecond ISR latency, hardware AES-256 encryption, zero heap allocations.'],
    ['Autonomous Systems & RF', 'ROS2 Humble nodes, 2D/3D LiDAR SLAM, 15-state EKF3 sensor fusion, Sub-GHz (433/868/915MHz) telemetry nodes (-142dBm LNA), polar radiation scanners.'],
    ['Spatial Web & Graphics', 'Three.js, WebGL/WebGPU, custom GLSL vertex/fragment shaders, ACESFilmic tonemapping, Web Audio API synthesis, React, Vite.'],
    ['Fabrication & Testing', 'CNC machining, 3D printing (FDM/SLA), logic analyzers, GHz oscilloscopes, SDR spectrum analyzers, SolidWorks CAD modeling.']
  ];

  skills.forEach(([cat, detail]) => {
    doc
      .font('Helvetica-Bold')
      .fontSize(8.2)
      .fillColor(dark)
      .text(`• ${cat}: `, { continued: true })
      .font('Helvetica')
      .fillColor(gray)
      .text(detail, { lineGap: 1.5 });
  });

  // 4. Engineering Leadership
  sectionHeader('Engineering Leadership & Experience');
  doc
    .font('Helvetica-Bold')
    .fontSize(9)
    .fillColor(dark)
    .text('4tech Engineering R&D Atelier', { continued: true })
    .font('Helvetica-Oblique')
    .fillColor(bronze)
    .text(' — Founder & Principal Systems Architect', { continued: true })
    .font('Helvetica')
    .fontSize(7.5)
    .fillColor(lightGray)
    .text('   2022 – PRESENT  |  KALPAKKAM, INDIA', { align: 'right' });

  const leadershipBullets = [
    'Spearheaded research, schematic design, high-speed PCB layout, structural fabrication, and firmware development across 15 production-grade hardware systems.',
    'Formulated closed-form trigonometric Inverse Kinematics solvers running in real time on microcontrollers for 6-axis articulated manipulators with zero singular matrix jitter.',
    'Developed an autonomous flight computer running a 15-state Extended Kalman Filter (EKF3) with triple IMU redundancy, sub-GHz telemetry dispatch, and GPS-denied obstacle clearance.',
    'Constructed automated radio frequency testbenches capable of continuous 360-degree antenna radiation pattern profiling and polar plot synthesis.',
    'Engineered museum-grade interactive 3D WebGL portfolios and digital twins connecting physical sensors directly to browser canvases via low-latency WebSockets.'
  ];

  leadershipBullets.forEach((bullet) => {
    doc
      .font('Helvetica')
      .fontSize(8.2)
      .fillColor(dark)
      .text(`  -  ${bullet}`, { lineGap: 1.8 });
  });

  // 5. Selected Flagship Engineering Systems
  sectionHeader('Selected Flagship Engineering Systems');
  const systems = [
    ['6-DOF Articulated Robotic Arm (Robotics & Kinematics)', 'Titanium and twin-spar aluminum manipulator featuring harmonic drive actuators, optical rotary encoders, real-time closed-form analytical IK, parallel gripper, and cursor-aligned optical targeting laser.'],
    ['Precision Dual-Core UAV Autopilot (Aerospace & Autonomous Control)', 'Autonomous flight management computer powered by STM32H7 dual-core ARM @ 480MHz, 15-state EKF3 navigation filter, triple redundant barometric & IMU sensors, and 868MHz spread-spectrum datalink.'],
    ['Autonomous SLAM Inspection Rover (Autonomous Ground Vehicles)', 'All-terrain 4WD planetary drivetrain rover equipped with 360° LiDAR, stereo depth vision, and ROS2 Humble nodes for GPS-denied indoor cartography and structural facility inspection.'],
    ['Sub-GHz Long-Range Telemetry Node (RF Telecommunications)', 'Ultra-low power (1.2µA standby) industrial telemetry node operating across 433/868/915MHz with -142dBm sensitivity, LNA front-end, hardware AES-256 GCM encryption, and 24km line-of-sight range.']
  ];

  systems.forEach(([title, desc]) => {
    doc
      .font('Helvetica-Bold')
      .fontSize(8.3)
      .fillColor(dark)
      .text(title)
      .font('Helvetica')
      .fontSize(7.8)
      .fillColor(gray)
      .text(desc, { lineGap: 1.5 });
    doc.moveDown(0.2);
  });

  // 6. Education
  sectionHeader('Education & Credentials');
  doc
    .font('Helvetica-Bold')
    .fontSize(8.5)
    .fillColor(dark)
    .text('Bachelor of Technology (B.Tech) in Electrical & Electronics Engineering', { continued: true })
    .font('Helvetica-Bold')
    .fillColor(bronze)
    .text('   FIRST CLASS HONORS', { align: 'right' });

  doc
    .font('Helvetica')
    .fontSize(7.8)
    .fillColor(gray)
    .text('Coursework: Embedded Systems, Control Theory, Electromagnetic Radiation, Microcontrollers, Signals & Systems');

  doc.end();

  return new Promise((resolve) => {
    stream.on('finish', resolve);
  });
}

const pub1 = path.join(__dirname, '..', 'public', 'Mohammed_Vashir_Resume.pdf');
const pub2 = path.join(__dirname, '..', 'public', 'resume.pdf');

generateResume(pub1).then(() => {
  console.log('Generated:', pub1, fs.statSync(pub1).size, 'bytes');
  fs.copyFileSync(pub1, pub2);
  console.log('Generated:', pub2, fs.statSync(pub2).size, 'bytes');
});
