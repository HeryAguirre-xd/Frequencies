'use client';

import { useCallback, useRef, useEffect } from 'react';
import { FrequencyConfig } from '@/types/frequency';

interface AudioNodes {
  oscillators: OscillatorNode[];
  gainNodes: GainNode[];
  panners: StereoPannerNode[];
  noiseSource: AudioBufferSourceNode | null;
  masterGain: GainNode | null;
  analyser: AnalyserNode | null;
}

interface UseAudioEngineReturn {
  play: (config: FrequencyConfig) => Promise<void>;
  stop: () => void;
  setVolume: (volume: number) => void;
  getAnalyserNode: () => AnalyserNode | null;
  isContextReady: () => boolean;
  resumeContext: () => Promise<void>;
}

export function useAudioEngine(): UseAudioEngineReturn {
  const audioContextRef = useRef<AudioContext | null>(null);
  const nodesRef = useRef<AudioNodes>({
    oscillators: [],
    gainNodes: [],
    panners: [],
    noiseSource: null,
    masterGain: null,
    analyser: null,
  });
  const isochronicIntervalRef = useRef<number | null>(null);

  // Initialize AudioContext lazily
  const getAudioContext = useCallback((): AudioContext => {
    if (!audioContextRef.current) {
      audioContextRef.current = new AudioContext();
    }
    return audioContextRef.current;
  }, []);

  // Resume context (required for browser autoplay policy)
  const resumeContext = useCallback(async (): Promise<void> => {
    const ctx = getAudioContext();
    if (ctx.state === 'suspended') {
      await ctx.resume();
    }
  }, [getAudioContext]);

  const isContextReady = useCallback((): boolean => {
    return audioContextRef.current?.state === 'running';
  }, []);

  // Create master gain and analyser
  const setupMasterNodes = useCallback((): { masterGain: GainNode; analyser: AnalyserNode } => {
    const ctx = getAudioContext();
    
    const masterGain = ctx.createGain();
    masterGain.gain.value = 0.5;
    
    const analyser = ctx.createAnalyser();
    analyser.fftSize = 256;
    analyser.smoothingTimeConstant = 0.8;
    
    masterGain.connect(analyser);
    analyser.connect(ctx.destination);
    
    nodesRef.current.masterGain = masterGain;
    nodesRef.current.analyser = analyser;
    
    return { masterGain, analyser };
  }, [getAudioContext]);

  // Generate Brown Noise Buffer
  const createBrownNoiseBuffer = useCallback((): AudioBuffer => {
    const ctx = getAudioContext();
    const bufferSize = 2 * ctx.sampleRate;
    const buffer = ctx.createBuffer(2, bufferSize, ctx.sampleRate);
    
    for (let channel = 0; channel < 2; channel++) {
      const data = buffer.getChannelData(channel);
      let lastOut = 0;
      
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        // Brown noise: integrate white noise
        lastOut = (lastOut + 0.02 * white) / 1.02;
        data[i] = lastOut * 3.5; // Amplify
      }
    }
    
    return buffer;
  }, [getAudioContext]);

  // Play Monaural Tone
  const playMonaural = useCallback((frequency: number, masterGain: GainNode) => {
    const ctx = getAudioContext();
    
    const oscillator = ctx.createOscillator();
    oscillator.type = 'sine';
    oscillator.frequency.value = frequency;
    
    const gainNode = ctx.createGain();
    gainNode.gain.value = 1;
    
    oscillator.connect(gainNode);
    gainNode.connect(masterGain);
    
    oscillator.start();
    
    nodesRef.current.oscillators.push(oscillator);
    nodesRef.current.gainNodes.push(gainNode);
  }, [getAudioContext]);

  // Play Binaural Beats
  const playBinaural = useCallback((carrierFrequency: number, beatFrequency: number, masterGain: GainNode) => {
    const ctx = getAudioContext();
    
    const leftFreq = carrierFrequency;
    const rightFreq = carrierFrequency + beatFrequency;
    
    // Left oscillator
    const leftOsc = ctx.createOscillator();
    leftOsc.type = 'sine';
    leftOsc.frequency.value = leftFreq;
    
    const leftGain = ctx.createGain();
    leftGain.gain.value = 1;
    
    const leftPanner = ctx.createStereoPanner();
    leftPanner.pan.value = -1; // Hard left
    
    leftOsc.connect(leftGain);
    leftGain.connect(leftPanner);
    leftPanner.connect(masterGain);
    
    // Right oscillator
    const rightOsc = ctx.createOscillator();
    rightOsc.type = 'sine';
    rightOsc.frequency.value = rightFreq;
    
    const rightGain = ctx.createGain();
    rightGain.gain.value = 1;
    
    const rightPanner = ctx.createStereoPanner();
    rightPanner.pan.value = 1; // Hard right
    
    rightOsc.connect(rightGain);
    rightGain.connect(rightPanner);
    rightPanner.connect(masterGain);
    
    leftOsc.start();
    rightOsc.start();
    
    nodesRef.current.oscillators.push(leftOsc, rightOsc);
    nodesRef.current.gainNodes.push(leftGain, rightGain);
    nodesRef.current.panners.push(leftPanner, rightPanner);
  }, [getAudioContext]);

  // Play Isochronic Tones
  const playIsochronic = useCallback((carrierFrequency: number, pulseFrequency: number, masterGain: GainNode) => {
    const ctx = getAudioContext();
    
    const oscillator = ctx.createOscillator();
    oscillator.type = 'sine';
    oscillator.frequency.value = carrierFrequency;
    
    const gainNode = ctx.createGain();
    gainNode.gain.value = 0;
    
    oscillator.connect(gainNode);
    gainNode.connect(masterGain);
    
    oscillator.start();
    
    // Pulse the gain at the specified frequency
    const pulsePeriod = 1000 / pulseFrequency; // ms
    const halfPeriod = pulsePeriod / 2;
    
    let isOn = false;
    const pulse = () => {
      const currentTime = ctx.currentTime;
      const rampTime = 0.005; // 5ms ramp to avoid clicks
      
      if (isOn) {
        gainNode.gain.linearRampToValueAtTime(0, currentTime + rampTime);
      } else {
        gainNode.gain.linearRampToValueAtTime(1, currentTime + rampTime);
      }
      isOn = !isOn;
    };
    
    pulse(); // Start with on
    isochronicIntervalRef.current = window.setInterval(pulse, halfPeriod);
    
    nodesRef.current.oscillators.push(oscillator);
    nodesRef.current.gainNodes.push(gainNode);
  }, [getAudioContext]);

  // Play Brown Noise
  const playNoise = useCallback((masterGain: GainNode) => {
    const ctx = getAudioContext();
    
    const buffer = createBrownNoiseBuffer();
    const source = ctx.createBufferSource();
    source.buffer = buffer;
    source.loop = true;
    
    const gainNode = ctx.createGain();
    gainNode.gain.value = 0.5; // Brown noise can be loud
    
    source.connect(gainNode);
    gainNode.connect(masterGain);
    
    source.start();
    
    nodesRef.current.noiseSource = source;
    nodesRef.current.gainNodes.push(gainNode);
  }, [getAudioContext, createBrownNoiseBuffer]);

  // Main play function
  const play = useCallback(async (config: FrequencyConfig): Promise<void> => {
    // Stop any existing sounds first
    stop();
    
    // Resume context if needed
    await resumeContext();
    
    const { masterGain } = setupMasterNodes();
    
    switch (config.type) {
      case 'monaural':
        playMonaural(config.frequency, masterGain);
        break;
      case 'binaural':
        playBinaural(config.carrierFrequency, config.beatFrequency, masterGain);
        break;
      case 'isochronic':
        playIsochronic(config.carrierFrequency, config.pulseFrequency, masterGain);
        break;
      case 'noise':
        playNoise(masterGain);
        break;
    }
  }, [resumeContext, setupMasterNodes, playMonaural, playBinaural, playIsochronic, playNoise]);

  // Stop all sounds
  const stop = useCallback(() => {
    // Clear isochronic interval
    if (isochronicIntervalRef.current) {
      clearInterval(isochronicIntervalRef.current);
      isochronicIntervalRef.current = null;
    }
    
    // Stop and disconnect oscillators
    nodesRef.current.oscillators.forEach((osc) => {
      try {
        osc.stop();
        osc.disconnect();
      } catch {
        // Oscillator might already be stopped
      }
    });
    
    // Stop noise source
    if (nodesRef.current.noiseSource) {
      try {
        nodesRef.current.noiseSource.stop();
        nodesRef.current.noiseSource.disconnect();
      } catch {
        // Source might already be stopped
      }
    }
    
    // Disconnect gain nodes
    nodesRef.current.gainNodes.forEach((gain) => {
      try {
        gain.disconnect();
      } catch {
        // Already disconnected
      }
    });
    
    // Disconnect panners
    nodesRef.current.panners.forEach((panner) => {
      try {
        panner.disconnect();
      } catch {
        // Already disconnected
      }
    });
    
    // Disconnect master nodes
    if (nodesRef.current.masterGain) {
      try {
        nodesRef.current.masterGain.disconnect();
      } catch {
        // Already disconnected
      }
    }
    
    if (nodesRef.current.analyser) {
      try {
        nodesRef.current.analyser.disconnect();
      } catch {
        // Already disconnected
      }
    }
    
    // Reset refs
    nodesRef.current = {
      oscillators: [],
      gainNodes: [],
      panners: [],
      noiseSource: null,
      masterGain: null,
      analyser: null,
    };
  }, []);

  // Set master volume
  const setVolume = useCallback((volume: number) => {
    if (nodesRef.current.masterGain) {
      const clampedVolume = Math.max(0, Math.min(1, volume));
      nodesRef.current.masterGain.gain.value = clampedVolume;
    }
  }, []);

  // Get analyser for visualizations
  const getAnalyserNode = useCallback((): AnalyserNode | null => {
    return nodesRef.current.analyser;
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stop();
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, [stop]);

  return {
    play,
    stop,
    setVolume,
    getAnalyserNode,
    isContextReady,
    resumeContext,
  };
}

