import { FrequencyPreset } from '@/types/frequency';

export const FREQUENCY_PRESETS: FrequencyPreset[] = [
  {
    id: 'deep-sleep',
    title: 'Deep Sleep',
    description: 'Delta waves for insomnia and deep restorative sleep',
    category: 'Delta',
    config: {
      type: 'binaural',
      carrierFrequency: 100,
      beatFrequency: 2,
    },
    color: 'from-indigo-600 to-purple-700',
    icon: 'moon',
  },
  {
    id: 'anxiety-relief',
    title: 'Anxiety Relief',
    description: 'Alpha waves for calm relaxation and stress reduction',
    category: 'Alpha',
    config: {
      type: 'binaural',
      carrierFrequency: 200,
      beatFrequency: 10,
    },
    color: 'from-teal-500 to-cyan-600',
    icon: 'heart',
  },
  {
    id: 'sharp-focus',
    title: 'Sharp Focus',
    description: 'Gamma pulses for enhanced concentration and cognition',
    category: 'Gamma',
    config: {
      type: 'isochronic',
      carrierFrequency: 400,
      pulseFrequency: 40,
    },
    color: 'from-amber-500 to-orange-600',
    icon: 'zap',
  },
  {
    id: 'universal-calm',
    title: 'Universal Calm',
    description: 'The natural frequency of the universe for harmony',
    category: '432Hz',
    config: {
      type: 'monaural',
      frequency: 432,
    },
    color: 'from-emerald-500 to-green-600',
    icon: 'sparkles',
  },
  {
    id: 'fear-release',
    title: 'Fear Release',
    description: 'Solfeggio frequency for liberating guilt and fear',
    category: '396Hz',
    config: {
      type: 'monaural',
      frequency: 396,
    },
    color: 'from-rose-500 to-pink-600',
    icon: 'shield',
  },
  {
    id: 'brown-noise',
    title: 'Brown Noise',
    description: 'Deep ambient noise for focus and sleep masking',
    category: 'Noise',
    config: {
      type: 'noise',
      noiseType: 'brown',
    },
    color: 'from-stone-500 to-stone-700',
    icon: 'waves',
  },
];

export const getPresetById = (id: string): FrequencyPreset | undefined => {
  return FREQUENCY_PRESETS.find((preset) => preset.id === id);
};

