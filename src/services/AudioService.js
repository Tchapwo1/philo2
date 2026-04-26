const AUDIO_ASSETS = {
  gavel: 'https://www.soundjay.com/misc/sounds/gavel-01.mp3',
  paper: 'https://www.soundjay.com/office/sounds/paper-rustle-1.mp3',
  ambient: 'https://www.soundjay.com/nature/sounds/rain-01.mp3',
  success: 'https://www.soundjay.com/misc/sounds/bell-ring-01.mp3'
};

class AudioService {
  constructor() {
    this.sounds = {};
    this.enabled = localStorage.getItem('simone_audio_enabled') !== 'false';
    this.preload();
  }

  preload() {
    if (typeof window === 'undefined') return;
    Object.entries(AUDIO_ASSETS).forEach(([key, url]) => {
      this.sounds[key] = new Audio(url);
      this.sounds[key].load();
    });
  }

  toggle() {
    this.enabled = !this.enabled;
    localStorage.setItem('simone_audio_enabled', this.enabled);
    return this.enabled;
  }

  play(key, volume = 0.5) {
    if (!this.enabled || !this.sounds[key]) return;
    
    // Clone node to allow overlapping sounds
    const sound = this.sounds[key].cloneNode();
    sound.volume = volume;
    sound.play().catch(e => console.log('Audio blocked by browser policy until user interaction.'));
  }

  startAmbient() {
    if (!this.enabled || !this.sounds.ambient) return;
    this.sounds.ambient.loop = true;
    this.sounds.ambient.volume = 0.1;
    this.sounds.ambient.play().catch(() => {});
  }

  stopAmbient() {
    if (this.sounds.ambient) {
      this.sounds.ambient.pause();
    }
  }
}

export default new AudioService();
