'use client';

import { Play, Pause, Moon, Heart, Zap, Sparkles, Shield, Waves } from 'lucide-react';
import { FrequencyPreset } from '@/types/frequency';
import { WaveAnimation } from './WaveAnimation';

interface FrequencyCardProps {
  preset: FrequencyPreset;
  isActive: boolean;
  onToggle: () => void;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  moon: Moon,
  heart: Heart,
  zap: Zap,
  sparkles: Sparkles,
  shield: Shield,
  waves: Waves,
};

export function FrequencyCard({ preset, isActive, onToggle }: FrequencyCardProps) {
  const Icon = iconMap[preset.icon] || Sparkles;

  const getFrequencyLabel = () => {
    switch (preset.config.type) {
      case 'monaural':
        return `${preset.config.frequency}Hz Tone`;
      case 'binaural':
        return `${preset.config.beatFrequency}Hz Beat`;
      case 'isochronic':
        return `${preset.config.pulseFrequency}Hz Pulse`;
      case 'noise':
        return 'Ambient Noise';
    }
  };

  return (
    <div
      className={`
        relative overflow-hidden rounded-2xl border transition-all duration-300 cursor-pointer
        ${isActive 
          ? 'border-teal-500/50 bg-slate-800/80 shadow-lg shadow-teal-500/10 scale-[1.02]' 
          : 'border-slate-700/50 bg-slate-800/40 hover:bg-slate-800/60 hover:border-slate-600'
        }
      `}
      onClick={onToggle}
    >
      {/* Gradient background overlay */}
      <div 
        className={`absolute inset-0 bg-gradient-to-br ${preset.color} opacity-10 transition-opacity ${isActive ? 'opacity-20' : ''}`} 
      />
      
      {/* Content */}
      <div className="relative p-5">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className={`p-2.5 rounded-xl bg-gradient-to-br ${preset.color}`}>
            <Icon className="w-5 h-5 text-white" />
          </div>
          
          {/* Play/Pause button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggle();
            }}
            className={`
              p-2.5 rounded-full transition-all duration-200
              ${isActive 
                ? 'bg-teal-500 text-white shadow-lg shadow-teal-500/30' 
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
              }
            `}
            aria-label={isActive ? 'Stop' : 'Play'}
          >
            {isActive ? (
              <Pause className="w-4 h-4" />
            ) : (
              <Play className="w-4 h-4 ml-0.5" />
            )}
          </button>
        </div>

        {/* Title & Category */}
        <div className="mb-2">
          <span className="text-xs font-medium text-teal-400 tracking-wider uppercase">
            {preset.category}
          </span>
          <h3 className="text-lg font-semibold text-white mt-0.5">
            {preset.title}
          </h3>
        </div>

        {/* Description */}
        <p className="text-sm text-slate-400 leading-relaxed mb-4">
          {preset.description}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <span className="text-xs text-slate-500 font-mono">
            {getFrequencyLabel()}
          </span>
          
          <WaveAnimation isActive={isActive} />
        </div>
      </div>

      {/* Active glow effect */}
      {isActive && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -inset-1 bg-gradient-to-r from-teal-500/20 via-transparent to-teal-500/20 blur-xl" />
        </div>
      )}
    </div>
  );
}

