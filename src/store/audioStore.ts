import { create } from 'zustand';
import { FrequencyPreset } from '@/types/frequency';

interface AudioState {
  isPlaying: boolean;
  currentPreset: FrequencyPreset | null;
  volume: number;
  hasSeenDisclaimer: boolean;
  
  // Actions
  setPlaying: (isPlaying: boolean) => void;
  setCurrentPreset: (preset: FrequencyPreset | null) => void;
  setVolume: (volume: number) => void;
  setHasSeenDisclaimer: (seen: boolean) => void;
  stopPlayback: () => void;
}

export const useAudioStore = create<AudioState>((set) => ({
  isPlaying: false,
  currentPreset: null,
  volume: 0.5,
  hasSeenDisclaimer: false,
  
  setPlaying: (isPlaying) => set({ isPlaying }),
  setCurrentPreset: (preset) => set({ currentPreset: preset }),
  setVolume: (volume) => set({ volume: Math.max(0, Math.min(1, volume)) }),
  setHasSeenDisclaimer: (seen) => set({ hasSeenDisclaimer: seen }),
  stopPlayback: () => set({ isPlaying: false, currentPreset: null }),
}));

