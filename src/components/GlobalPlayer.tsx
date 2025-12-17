'use client';

import { Volume2, VolumeX, Square, Headphones } from 'lucide-react';
import { useAudioStore } from '@/store/audioStore';
import { WaveAnimation } from './WaveAnimation';

interface GlobalPlayerProps {
  onVolumeChange: (volume: number) => void;
  onStop: () => void;
}

export function GlobalPlayer({ onVolumeChange, onStop }: GlobalPlayerProps) {
  const { isPlaying, currentPreset, volume } = useAudioStore();

  if (!isPlaying || !currentPreset) return null;

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    onVolumeChange(newVolume);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40">
      {/* Gradient blur backdrop */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/95 to-transparent backdrop-blur-lg" />
      
      <div className="relative max-w-4xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Now Playing Info */}
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center">
              <WaveAnimation isActive={true} color="bg-white" />
            </div>
            
            <div className="min-w-0">
              <p className="text-sm font-medium text-white truncate">
                {currentPreset.title}
              </p>
              <p className="text-xs text-slate-400 flex items-center gap-1">
                <Headphones className="w-3 h-3" />
                {currentPreset.config.type === 'binaural' && 'Use headphones'}
                {currentPreset.config.type === 'monaural' && 'Speakers or headphones'}
                {currentPreset.config.type === 'isochronic' && 'Speakers or headphones'}
                {currentPreset.config.type === 'noise' && 'Background ambience'}
              </p>
            </div>
          </div>

          {/* Volume Control */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => onVolumeChange(volume === 0 ? 0.5 : 0)}
              className="p-2 text-slate-400 hover:text-white transition-colors"
              aria-label={volume === 0 ? 'Unmute' : 'Mute'}
            >
              {volume === 0 ? (
                <VolumeX className="w-5 h-5" />
              ) : (
                <Volume2 className="w-5 h-5" />
              )}
            </button>
            
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
              className="w-24 h-1.5 bg-slate-700 rounded-full appearance-none cursor-pointer
                [&::-webkit-slider-thumb]:appearance-none
                [&::-webkit-slider-thumb]:w-3.5
                [&::-webkit-slider-thumb]:h-3.5
                [&::-webkit-slider-thumb]:rounded-full
                [&::-webkit-slider-thumb]:bg-teal-400
                [&::-webkit-slider-thumb]:shadow-lg
                [&::-webkit-slider-thumb]:shadow-teal-400/30
                [&::-webkit-slider-thumb]:cursor-pointer
                [&::-webkit-slider-thumb]:transition-transform
                [&::-webkit-slider-thumb]:hover:scale-110
              "
              aria-label="Volume"
            />
            
            <span className="text-xs text-slate-500 w-8 text-right font-mono">
              {Math.round(volume * 100)}%
            </span>
          </div>

          {/* Stop Button */}
          <button
            onClick={onStop}
            className="flex-shrink-0 p-2.5 bg-slate-800 hover:bg-red-600/80 border border-slate-700 hover:border-red-500 rounded-lg text-slate-300 hover:text-white transition-all duration-200"
            aria-label="Stop"
          >
            <Square className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

