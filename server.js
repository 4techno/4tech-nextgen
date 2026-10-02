import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3002;

app.use(cors());
app.use(express.json());

// 4tech 15 Engineering Projects Database
const projects = [
  // 1. Research Level
  {
    id: 'antenna',
    title: 'Automated Antenna Radiation Pattern Measurement System',
    level: 'Research Level',
    domain: 'RF systems / Automation',
    summary: 'Coordinating precision angular rotational motion and RF logarithmic power measurements to quantify antenna radiation lobes and front-to-back ratios.',
    stage: 'Prototype development',
    technologies: ['ESP32', 'AD8317 Log Amp', 'NEMA17 Stepper', 'A4988 Driver', 'nRF24L01+'],
    category: 'rf',
    details: 'Implements an automated testbench rotating a device under test (DUT) across 360 degrees while recording RSSI values across 2.4 GHz ISM bands. Eliminates manual point-by-point plotting and delivers automated polar plots.'
  },
  {
    id: 'passive-rf-drone',
    title: 'Passive RF Drone Detection Receiver',
    level: 'Research Level',
    domain: 'RF instrumentation / Signal analysis',
    summary: 'A receive-only study of radio frequency signatures associated with controlled drone-link telemetry and video downlinks without emitting detectable transmissions.',
    stage: 'Proposed R&D concept',
    technologies: ['Software Defined Radio (SDR)', 'RF Bandpass Filters', 'Spectrum Analysis', 'Python Signal Processing', 'IQ Sampling'],
    category: 'rf',
    details: 'Captures frequency bursts and FHSS (Frequency Hopping Spread Spectrum) patterns in 2.4GHz and 5.8GHz channels. Utilizes spectral watermarking to categorize unmanned aerial vehicles.'
  },
  {
    id: 'rf-direction-finder',
    title: 'RF Direction Finder Array',
    level: 'Research Level',
    domain: 'RF measurement / Localization research',
    summary: 'Exploring how multi-antenna array phase differentials and directional angular scanning support radio emitter localization.',
    stage: 'Proposed R&D concept',
    technologies: ['Directional Antennas', 'Coherent RF Receiver', 'Angular Scanning', 'Python', 'Calibration & Uncertainty Analysis'],
    category: 'rf',
    details: 'Applies pseudo-Doppler and Watson-Watt direction-finding algorithms across calibrated VHF/UHF antenna arrays to resolve bearing angles to unknown radio beacons.'
  },
  {
    id: 'rescue',
    title: 'Autonomous Disaster Rescue Vehicle',
    level: 'Research Level',
    domain: 'Mobile robotics / Environmental perception',
    summary: 'A rugged tracked ground-vehicle concept engineered for hazardous search assistance, obstacle traversal, and human presence detection.',
    stage: 'Proposed R&D concept',
    technologies: ['LD2450 mmWave Radar', 'Mobile Robotics', 'Sensor Fusion', 'Navigation Research', 'Thermal Sensing'],
    category: 'robotics',
    details: 'Leverages high-torque tank chassis mechanics paired with 24GHz mmWave radar penetration through dust, smoke, and debris for life-sign micro-motion tracking.'
  },
  {
    id: 'ar-hud',
    title: 'AR Heads-Up Display Goggles',
    level: 'Research Level',
    domain: 'Wearable interfaces / Display optics',
    summary: 'A wearable near-eye optical combiner system presenting spatial telemetry and directional guidance directly within the human field of view.',
    stage: 'Proposed R&D concept',
    technologies: ['Near-eye Microdisplay', 'Optical Beam Splitter', 'Embedded Display Control', 'Mechanical CAD', 'UI Overlay'],
    category: 'systems',
    details: 'Features a semi-reflective beam-splitter prism and custom collimating lenses displaying crucial engineering instrumentation without requiring the user to look away.'
  },
  {
    id: 'power',
    title: 'Wireless EV Resonant Charging System',
    level: 'Research Level',
    domain: 'Power electronics / Inductive coupling',
    summary: 'Extending high-frequency magnetic resonance power transfer toward an efficient, alignment-tolerant electric vehicle charging pad architecture.',
    stage: 'Design study / Proposed extension',
    technologies: ['Inductive Magnetic Coupling', 'Resonant Inverters', 'ESP32 Telemetry', 'Litz Wire Coil Design', 'Thermal Management'],
    category: 'systems',
    details: 'Analyzes series-parallel compensation topologies operating in the 85 kHz standard band to maintain high efficiency across varying ground clearances.'
  },
  {
    id: 'magnetic-anomaly',
    title: 'Magnetic Anomaly Detector (MAD)',
    level: 'Research Level',
    domain: 'Magnetic sensing / Signal analysis',
    summary: 'A high-sensitivity fluxgate/magnetometer array observing subtle sub-microtesla distortions in the geomagnetic field caused by submerged ferromagnetic objects.',
    stage: 'Proposed R&D concept',
    technologies: ['Tri-axial Magnetometer', 'Embedded Acquisition', 'Baseline Calibration', 'Digital Filtering', 'Python FFT'],
    category: 'rf',
    details: 'Incorporates a non-magnetic boom layout and differential sensor subtraction to reject vehicle platform motor interference and isolate external anomalies.'
  },

  // 2. Advanced Level
  {
    id: 'robot-arm',
    title: 'Advanced 5-Axis Robotic Arm Systems',
    level: 'Advanced',
    domain: 'Robotics / Mechanical design / Computation',
    summary: 'A custom five-degree-of-freedom articulated manipulator designed alongside analytical inverse kinematics and neural network motion prediction.',
    stage: 'CAD design & computational studies',
    technologies: ['SOLIDWORKS', 'Python', 'Inverse Kinematics', 'MLP Neural Networks', 'Trajectory Planning'],
    category: 'robotics',
    details: 'Features planetary gear reduction, precision bearing mounts, and closed-loop position encoders. Compared numerical DH-parameter solvers against multi-layer perceptron models.'
  },
  {
    id: 'drone',
    title: 'ESP32 Drone Platform',
    level: 'Advanced',
    domain: 'PCB design / Embedded systems',
    summary: 'A custom flight controller PCB engineered around the ESP32-S3 microcontroller for agile quadcopter attitude estimation and brushless/brushed flight.',
    stage: 'Engineering development',
    technologies: ['KiCad PCB Design', 'ESP32-S3', '1S LiPo Power', '8520 Coreless Motors', 'PID Flight Control'],
    category: 'robotics',
    details: 'Includes dedicated high-discharge MOSFET motor drivers, onboard 6-DOF IMU, and low-latency WiFi/ESP-NOW communication channels with telemetry logging.'
  },
  {
    id: 'vision-tracking',
    title: 'Autonomous Vision Tracking Platform',
    level: 'Advanced',
    domain: 'Computer vision / Motion control',
    summary: 'A closed-loop optical pan-and-tilt tracking turret capable of real-time target identification, centroid localization, and servo stabilization.',
    stage: 'Proposed R&D concept',
    technologies: ['OpenCV', 'Python', 'Object Centroid Tracking', 'Pan-Tilt Servos', 'Closed-loop Feedback'],
    category: 'robotics',
    details: 'Calculates pixel coordinate error vectors from the optical center and converts them into proportional-integral servo angle updates at 30+ frames per second.'
  },
  {
    id: 'rf-shielding',
    title: 'RF Shielding Effectiveness / Faraday Enclosure',
    level: 'Advanced',
    domain: 'Electromagnetics / Enclosure design',
    summary: 'A standardized attenuation test chamber evaluating conductivity, seam geometry, and mesh apertures on radio frequency isolation from 100MHz to 6GHz.',
    stage: 'Proposed R&D concept',
    technologies: ['Conductive Enclosure Design', 'RF Vector Measurement', 'Seam Gasketing', 'Aperture Modeling', 'EMC Standards'],
    category: 'rf',
    details: 'Investigates skin-depth attenuation, finger gasket contact resistances, and waveguide-beyond-cutoff ventilation holes to achieve &gt; 60dB attenuation.'
  },
  {
    id: 'composite-drop-test',
    title: 'Composite Material Impact & Drop-Test Rig',
    level: 'Advanced',
    domain: 'Materials testing / Instrumentation',
    summary: 'A guided vertical impact tower equipped with dynamic load cells and high-speed telemetry to evaluate carbon fiber and composite delamination.',
    stage: 'Proposed R&D concept',
    technologies: ['Mechanical Fixture Design', 'Piezoelectric Load Cell', 'High-speed DAQ', 'Video Analysis', 'Stress/Strain Modeling'],
    category: 'systems',
    details: 'Measures peak impact deceleration forces, absorbed kinetic energy, and permanent deformation across standardized laminate coupon test specimens.'
  },
  {
    id: 'night-vision',
    title: 'Digital Night-Vision Monocular System',
    level: 'Advanced',
    domain: 'Imaging / Embedded displays',
    summary: 'An electro-optical night vision monocular pairing near-infrared sensor sensitivity, active 850nm/940nm illumination, and high-contrast microdisplays.',
    stage: 'Proposed R&D concept',
    technologies: ['Ultra-low-light Sensor', 'ISP Pipeline', 'Compact OLED Display', 'Optical Focusing Lens', 'Rugged Housing'],
    category: 'systems',
    details: 'Optimized for high-gain, low-noise digital image enhancement in sub-0.001 lux darkness with custom battery power regulation.'
  },

  // 3. Intermediate Level
  {
    id: 'sewersense',
    title: 'SewerSense — Hazardous Environmental IoT Node',
    level: 'Intermediate',
    domain: 'IoT / Environmental sensing',
    summary: 'An intelligent multi-gas monitoring and vital worker telemetry wearable that alerts users to lethal hydrogen sulfide, methane, and oxygen deficiency.',
    stage: 'Hardware integration & validation',
    technologies: ['ESP32', 'MQ Gas Sensors', 'DHT22 Climate', 'MAX30102 Pulse Oximetry', 'Cloud Dashboard'],
    category: 'systems',
    details: 'Integrates real-time gas threshold triggers with worker heart rate and SpO2 monitoring, immediately transmitting alerts over cellular/WiFi to remote emergency teams.'
  },
  {
    id: 'wind-tunnel',
    title: 'Desktop Subsonic Wind Tunnel',
    level: 'Intermediate',
    domain: 'Experimental mechanics / Flow measurement',
    summary: 'A benchtop aerodynamic test facility with honeycomb flow straighteners, contraction nozzle, and multi-axis aerodynamic balance for small airfoils.',
    stage: 'Proposed R&D concept',
    technologies: ['Mechanical CAD', 'Flow Conditioning Honeycomb', 'Pitot-Static Tube', 'Differential Pressure DAQ', 'Lift/Drag Analysis'],
    category: 'systems',
    details: 'Delivers stable laminar flow across 0-25 m/s test velocities, allowing direct measurement of lift and drag coefficients on 3D printed aerodynamic profiles.'
  }
];

let inquiries = [];
let newsletterSignups = [];

// API Endpoints
app.get('/api/telemetry', (req, res) => {
  res.json({
    organization: '4tech',
    tagline: 'Ideas into reality.',
    founder: 'Mohammed Vashir',
    education: 'B.Tech Electrical & Electronics Engineering',
    institution: 'B.S. Abdur Rahman Crescent Institute of Science and Technology',
    base: 'Kalpakkam, Tamil Nadu 603102, India',
    coordinates: '12.50° N, 80.16° E',
    activeProjects: projects.length,
    disciplines: 6,
    status: 'R&D Labs Active — Accepting Collaborations',
    contacts: {
      email: 'mohammedvashir75@gmail.com',
      whatsapp: '+91 9360108408',
      linkedin: 'https://www.linkedin.com/in/mohammed-vashir-793b89378/',
      github: 'https://github.com/4techno',
      instagram: 'https://www.instagram.com/_.herculex._/'
    }
  });
});

app.get('/api/projects', (req, res) => {
  const { level, category, search } = req.query;
  let filtered = [...projects];

  if (level && level !== 'All') {
    filtered = filtered.filter(p => p.level.toLowerCase() === level.toLowerCase());
  }

  if (category && category !== 'all') {
    filtered = filtered.filter(p => p.category.toLowerCase() === category.toLowerCase());
  }

  if (search) {
    const s = search.toLowerCase();
    filtered = filtered.filter(p => 
      p.title.toLowerCase().includes(s) || 
      p.summary.toLowerCase().includes(s) ||
      p.technologies.some(t => t.toLowerCase().includes(s))
    );
  }

  res.json({ success: true, count: filtered.length, data: filtered });
});

app.get('/api/projects/:id', (req, res) => {
  const project = projects.find(p => p.id === req.params.id);
  if (!project) return res.status(404).json({ error: 'Project not found' });
  res.json({ success: true, data: project });
});

app.post('/api/inquiries', (req, res) => {
  const { name, email, discipline, message, budget, phone } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required.' });
  }

  const newInquiry = {
    id: `INQ-${Date.now()}`,
    name,
    email,
    phone: phone || '',
    discipline: discipline || 'General Engineering',
    budget: budget || 'Undisclosed',
    message,
    submittedAt: new Date().toISOString()
  };

  inquiries.unshift(newInquiry);
  console.log(`[4TECH INQUIRY] New project brief received from ${name} (${email}) for ${discipline}`);

  res.status(201).json({
    success: true,
    message: 'Your project brief has been received. Mohammed Vashir will review your requirements and reach out within 24 hours.',
    inquiryId: newInquiry.id
  });
});

app.post('/api/newsletter', (req, res) => {
  const { email } = req.body;
  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'Valid email is required.' });
  }

  newsletterSignups.push({ email, date: new Date().toISOString() });
  res.json({ success: true, message: 'Subscribed to 4tech technical research updates.' });
});

app.listen(PORT, () => {
  console.log(`[4TECH SYSTEM] Engineering Backend listening at http://localhost:${PORT}`);
});
