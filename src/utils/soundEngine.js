// Self-contained Web Audio API Spatial Sound Synthesizer
// Generates ambient atmospheric soundscapes & crystalline acoustic chimes with zero external file dependencies.

class SpatialSoundEngine {
  constructor() {
    this.ctx = null;
    this.isMuted = true;
    this.droneGain = null;
    this.oscillators = [];
    this.filter = null;
    this.isInitialized = false;
  }

  init() {
    if (this.isInitialized) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
      this.isInitialized = true;
    } catch (e) {
      console.warn('Web Audio not supported:', e);
    }
  }

  startAmbientDrone() {
    if (!this.ctx) this.init();
    if (!this.ctx) return;

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    if (this.oscillators.length > 0) return; // already running

    const masterGain = this.ctx.createGain();
    masterGain.gain.setValueAtTime(this.isMuted ? 0 : 0.18, this.ctx.currentTime);
    masterGain.connect(this.ctx.destination);
    this.droneGain = masterGain;

    // Rich cinematic harmonic chord (C2, G2, D3, G3)
    const baseFreqs = [65.41, 98.0, 146.83, 196.0];

    // Filter
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(420, this.ctx.currentTime);
    filter.Q.setValueAtTime(3.5, this.ctx.currentTime);
    filter.connect(masterGain);
    this.filter = filter;

    // Subtle LFO modulating the filter
    const lfo = this.ctx.createOscillator();
    lfo.frequency.setValueAtTime(0.12, this.ctx.currentTime);
    const lfoGain = this.ctx.createGain();
    lfoGain.gain.setValueAtTime(180, this.ctx.currentTime);
    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);
    lfo.start();

    baseFreqs.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq + (Math.random() - 0.5) * 0.8, this.ctx.currentTime);

      const oscGain = this.ctx.createGain();
      oscGain.gain.setValueAtTime(0.25 / baseFreqs.length, this.ctx.currentTime);

      osc.connect(oscGain);
      oscGain.connect(filter);
      osc.start();

      this.oscillators.push(osc);
    });
  }

  setActTheme(actIndex) {
    if (!this.ctx || !this.filter) return;
    const now = this.ctx.currentTime;
    // Modulate filter and frequencies based on current act
    const cutoffMap = [400, 680, 850, 1100];
    const targetCutoff = cutoffMap[actIndex] || 500;
    this.filter.frequency.setTargetAtTime(targetCutoff, now, 1.2);

    // Play an acoustic chapter chime
    const pitchMap = [523.25, 587.33, 659.25, 783.99];
    this.playChime(pitchMap[actIndex] || 523.25);
  }

  toggleMute() {
    if (!this.ctx) {
      this.init();
      this.startAmbientDrone();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    this.isMuted = !this.isMuted;
    if (this.droneGain) {
      this.droneGain.gain.setTargetAtTime(this.isMuted ? 0 : 0.18, this.ctx.currentTime, 0.4);
    }
    if (!this.isMuted) {
      this.playChime(523.25); // C5 welcome chime
    }
    return !this.isMuted;
  }

  setMuted(muted) {
    if (!this.ctx) {
      this.init();
      this.startAmbientDrone();
    }
    if (this.ctx && this.ctx.state === 'suspended' && !muted) {
      this.ctx.resume();
    }
    this.isMuted = muted;
    if (this.droneGain) {
      this.droneGain.gain.setTargetAtTime(this.isMuted ? 0 : 0.18, this.ctx.currentTime, 0.4);
    }
  }

  playChime(freq = 587.33) {
    if (!this.ctx || this.isMuted) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.5, now + 0.9);

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 1.25);
    } catch (e) {
      // Audio autoplay policy fallback
    }
  }

  playSubtleClick() {
    if (!this.ctx || this.isMuted) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(140, now + 0.06);

      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.07);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.08);
    } catch (e) {}
  }
}

export const sound = new SpatialSoundEngine();
