'use client';

import { useCallback, useEffect, useState } from 'react';
import { getPresetsByGroup, FREQUENCY_GROUPS, GROUP_DESCRIPTIONS, FrequencyGroup } from '@/lib/frequencies';
import { useAudioEngine } from '@/hooks/useAudioEngine';
import { useAudioStore } from '@/store/audioStore';
import { FrequencyPreset } from '@/types/frequency';
import {
  DisclaimerModal,
  FrequencyCard,
  GlobalPlayer,
  BackgroundVisualizer,
  Hero,
} from '@/components';

export default function Home() {
  const audioEngine = useAudioEngine();
  const { 
    isPlaying, 
    currentPreset, 
    volume,
    setPlaying, 
    setCurrentPreset, 
    setVolume,
    stopPlayback 
  } = useAudioStore();
  
  const [analyserNode, setAnalyserNode] = useState<AnalyserNode | null>(null);

  // Handle toggling a preset
  const handleToggle = useCallback(async (preset: FrequencyPreset) => {
    // If this preset is already playing, stop it
    if (isPlaying && currentPreset?.id === preset.id) {
      audioEngine.stop();
      stopPlayback();
      setAnalyserNode(null);
      return;
    }

    // Play the new preset
    try {
      await audioEngine.play(preset.config);
      setCurrentPreset(preset);
      setPlaying(true);
      
      // Get analyser node for visualization
      const analyser = audioEngine.getAnalyserNode();
      setAnalyserNode(analyser);
      
      // Apply current volume
      audioEngine.setVolume(volume);
    } catch (error) {
      console.error('Failed to play audio:', error);
    }
  }, [audioEngine, isPlaying, currentPreset, volume, setCurrentPreset, setPlaying, stopPlayback]);

  // Handle volume change
  const handleVolumeChange = useCallback((newVolume: number) => {
    setVolume(newVolume);
    audioEngine.setVolume(newVolume);
  }, [audioEngine, setVolume]);

  // Handle stop
  const handleStop = useCallback(() => {
    audioEngine.stop();
    stopPlayback();
    setAnalyserNode(null);
  }, [audioEngine, stopPlayback]);

  // Update volume when it changes in store
  useEffect(() => {
    if (isPlaying) {
      audioEngine.setVolume(volume);
    }
  }, [volume, isPlaying, audioEngine]);

  return (
    <main className="relative min-h-screen">
      {/* Background Visualizer */}
      <BackgroundVisualizer analyserNode={analyserNode} isPlaying={isPlaying} />
      
      {/* Disclaimer Modal */}
      <DisclaimerModal />
      
      {/* Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <Hero />
        
        {/* Frequency Groups */}
        <section className="max-w-6xl mx-auto px-4 pb-32">
          {FREQUENCY_GROUPS.map((group, groupIndex) => {
            const presets = getPresetsByGroup()[group];
            if (!presets || presets.length === 0) return null;

            return (
              <div key={group} className="mb-16">
                {/* Group Header */}
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-white mb-2">
                    {group}
                  </h2>
                  <p className="text-slate-400 text-sm max-w-2xl">
                    {GROUP_DESCRIPTIONS[group as FrequencyGroup]}
                  </p>
                </div>

                {/* Presets Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                  {presets.map((preset, index) => (
                    <div
                      key={preset.id}
                      className="animate-fade-in"
                      style={{ animationDelay: `${(groupIndex * 3 + index) * 50}ms` }}
                    >
                      <FrequencyCard
                        preset={preset}
                        isActive={isPlaying && currentPreset?.id === preset.id}
                        onToggle={() => handleToggle(preset)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
          
          {/* Info Section */}
          <div className="mt-16 text-center">
            <h2 className="text-xl font-semibold text-white mb-4">
              How It Works
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-slate-400">
              <div className="p-4 rounded-xl bg-slate-800/30 border border-slate-700/50">
                <div className="text-2xl mb-2">🎧</div>
                <h3 className="font-medium text-white mb-1">Binaural Beats</h3>
                <p>Two slightly different frequencies in each ear create a perceived third frequency in your brain.</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-800/30 border border-slate-700/50">
                <div className="text-2xl mb-2">⚡</div>
                <h3 className="font-medium text-white mb-1">Isochronic Tones</h3>
                <p>Evenly spaced pulses of sound that entrain your brainwaves without requiring headphones.</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-800/30 border border-slate-700/50">
                <div className="text-2xl mb-2">🌊</div>
                <h3 className="font-medium text-white mb-1">Pure Frequencies</h3>
                <p>Single tones at specific healing frequencies like 432Hz and 396Hz for deep resonance.</p>
              </div>
            </div>
          </div>
        </section>
      </div>
      
      {/* Global Player */}
      <GlobalPlayer 
        onVolumeChange={handleVolumeChange}
        onStop={handleStop}
      />
    </main>
  );
}
