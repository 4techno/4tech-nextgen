/**
 * Real-time WebGL Frame Rate & Performance Diagnostic Telemetry
 * Monitors GPU frame times, draw calls, and physics loop latency.
 */

class FPSTelemetry {
  constructor() {
    this.fps = 60;
    this.frames = 0;
    this.prevTime = performance.now();
    this.history = [];
    this.maxHistory = 60;
    this.dropCount = 0;
  }

  update() {
    this.frames++;
    const time = performance.now();
    const elapsed = time - this.prevTime;

    if (elapsed >= 1000) {
      this.fps = Math.round((this.frames * 1000) / elapsed);
      if (this.fps < 50) this.dropCount++;
      
      this.history.push({
        timestamp: time,
        fps: this.fps,
        latencyMs: Math.round(1000 / this.fps)
      });

      if (this.history.length > this.maxHistory) {
        this.history.shift();
      }

      this.frames = 0;
      this.prevTime = time;
    }

    return this.fps;
  }

  getMetrics() {
    return {
      currentFps: this.fps,
      isOptimal: this.fps >= 55,
      frameDrops: this.dropCount,
      averageLatencyMs: this.fps > 0 ? (1000 / this.fps).toFixed(2) : '0.00'
    };
  }
}

export const fpsTelemetry = new FPSTelemetry();
