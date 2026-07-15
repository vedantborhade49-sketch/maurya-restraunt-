class SoundManager {
  private enabled = false;
  private audioCtx: AudioContext | null = null;

  public enable() {
    this.enabled = true;
    if (!this.audioCtx) {
      this.audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (this.audioCtx.state === "suspended") {
      this.audioCtx.resume();
    }
  }

  public disable() {
    this.enabled = false;
  }

  public isEnabled() {
    return this.enabled;
  }

  public playThud() {
    if (!this.enabled || !this.audioCtx) return;
    
    try {
      const ctx = this.audioCtx;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      // Low frequency pitch sweep
      osc.frequency.setValueAtTime(100, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(30, ctx.currentTime + 0.4);

      gain.gain.setValueAtTime(0.18, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.45);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.45);
    } catch (e) {
      console.warn("Failed to play synthesized thud:", e);
    }
  }

  public playRustle() {
    if (!this.enabled || !this.audioCtx) return;

    try {
      const ctx = this.audioCtx;
      const bufferSize = ctx.sampleRate * 0.04;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = "highpass";
      filter.frequency.value = 1500;

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.05, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      noise.start();
    } catch (e) {
      console.warn("Failed to play synthesized rustle:", e);
    }
  }
}

export const soundManager = typeof window !== "undefined" ? new SoundManager() : null;
