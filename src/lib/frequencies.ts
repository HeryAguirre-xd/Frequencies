import { FrequencyPreset } from '@/types/frequency';

// Group definitions for ordering
export const FREQUENCY_GROUPS = [
  'Solfeggio Scale',
  'Chakra Alignment',
  'Earth & Cosmic',
  'Brainwave Entrainment',
  'Ambient Noise',
] as const;

export type FrequencyGroup = (typeof FREQUENCY_GROUPS)[number];

// Group descriptions for UI
export const GROUP_DESCRIPTIONS: Record<FrequencyGroup, string> = {
  'Solfeggio Scale': 'Ancient healing frequencies derived from Gregorian chants, believed to promote physical and spiritual wellness.',
  'Chakra Alignment': 'Frequencies mapped to the seven energy centers for balancing mind, body, and spirit.',
  'Earth & Cosmic': 'Natural resonance frequencies found in Earth and the cosmos for grounding and meditation.',
  'Brainwave Entrainment': 'Binaural beats and isochronic tones to guide your brain into specific mental states.',
  'Ambient Noise': 'Soothing background sounds for focus, relaxation, and sleep.',
};

export const FREQUENCY_PRESETS: FrequencyPreset[] = [
  // ============================================
  // SOLFEGGIO SCALE (10 presets)
  // ============================================
  {
    id: 'solfeggio-174',
    title: 'Foundation',
    description: 'The lowest Solfeggio tone for pain reduction and grounding energy',
    category: '174Hz',
    group: 'Solfeggio Scale',
    config: {
      type: 'monaural',
      frequency: 174,
    },
    color: 'from-violet-600 to-purple-800',
    icon: 'anchor',
  },
  {
    id: 'solfeggio-285',
    title: 'Cellular Healing',
    description: 'Promotes tissue regeneration and cellular repair',
    category: '285Hz',
    group: 'Solfeggio Scale',
    config: {
      type: 'monaural',
      frequency: 285,
    },
    color: 'from-violet-500 to-purple-700',
    icon: 'dna',
  },
  {
    id: 'solfeggio-396',
    title: 'Liberation',
    description: 'Release guilt and fear, turning grief into joy',
    category: '396Hz',
    group: 'Solfeggio Scale',
    config: {
      type: 'monaural',
      frequency: 396,
    },
    color: 'from-rose-500 to-pink-600',
    icon: 'shield',
  },
  {
    id: 'solfeggio-417',
    title: 'Transmutation',
    description: 'Clears negativity and facilitates positive change',
    category: '417Hz',
    group: 'Solfeggio Scale',
    config: {
      type: 'monaural',
      frequency: 417,
    },
    color: 'from-amber-500 to-orange-600',
    icon: 'refresh-cw',
  },
  {
    id: 'solfeggio-432',
    title: 'Universal Harmony',
    description: 'The natural frequency of the universe for deep harmony',
    category: '432Hz',
    group: 'Solfeggio Scale',
    config: {
      type: 'monaural',
      frequency: 432,
    },
    color: 'from-emerald-500 to-green-600',
    icon: 'sparkles',
  },
  {
    id: 'solfeggio-528',
    title: 'Miracle Tone',
    description: 'DNA repair, transformation, and the frequency of love',
    category: '528Hz',
    group: 'Solfeggio Scale',
    config: {
      type: 'monaural',
      frequency: 528,
    },
    color: 'from-yellow-400 to-amber-500',
    icon: 'star',
  },
  {
    id: 'solfeggio-639',
    title: 'Heart Connection',
    description: 'Enhances communication, relationships, and harmony',
    category: '639Hz',
    group: 'Solfeggio Scale',
    config: {
      type: 'monaural',
      frequency: 639,
    },
    color: 'from-green-500 to-emerald-600',
    icon: 'heart',
  },
  {
    id: 'solfeggio-741',
    title: 'Awakening',
    description: 'Awakens intuition, promotes expression and solutions',
    category: '741Hz',
    group: 'Solfeggio Scale',
    config: {
      type: 'monaural',
      frequency: 741,
    },
    color: 'from-blue-500 to-cyan-600',
    icon: 'lightbulb',
  },
  {
    id: 'solfeggio-852',
    title: 'Third Eye',
    description: 'Opens spiritual perception and returns to spiritual order',
    category: '852Hz',
    group: 'Solfeggio Scale',
    config: {
      type: 'monaural',
      frequency: 852,
    },
    color: 'from-indigo-500 to-blue-700',
    icon: 'eye',
  },
  {
    id: 'solfeggio-963',
    title: 'Divine Connection',
    description: 'Activates the pineal gland and connects to higher consciousness',
    category: '963Hz',
    group: 'Solfeggio Scale',
    config: {
      type: 'monaural',
      frequency: 963,
    },
    color: 'from-purple-500 to-violet-700',
    icon: 'crown',
  },

  // ============================================
  // CHAKRA ALIGNMENT (7 presets)
  // ============================================
  {
    id: 'chakra-root',
    title: 'Root Chakra',
    description: 'Muladhara - grounding, stability, and security',
    category: 'Muladhara',
    group: 'Chakra Alignment',
    config: {
      type: 'monaural',
      frequency: 396,
    },
    color: 'from-red-600 to-red-800',
    icon: 'circle-dot',
  },
  {
    id: 'chakra-sacral',
    title: 'Sacral Chakra',
    description: 'Svadhisthana - creativity, passion, and emotional flow',
    category: 'Svadhisthana',
    group: 'Chakra Alignment',
    config: {
      type: 'monaural',
      frequency: 417,
    },
    color: 'from-orange-500 to-orange-700',
    icon: 'flame',
  },
  {
    id: 'chakra-solar',
    title: 'Solar Plexus',
    description: 'Manipura - personal power, confidence, and willpower',
    category: 'Manipura',
    group: 'Chakra Alignment',
    config: {
      type: 'monaural',
      frequency: 528,
    },
    color: 'from-yellow-400 to-yellow-600',
    icon: 'sun',
  },
  {
    id: 'chakra-heart',
    title: 'Heart Chakra',
    description: 'Anahata - love, compassion, and emotional balance',
    category: 'Anahata',
    group: 'Chakra Alignment',
    config: {
      type: 'monaural',
      frequency: 639,
    },
    color: 'from-green-500 to-green-700',
    icon: 'heart',
  },
  {
    id: 'chakra-throat',
    title: 'Throat Chakra',
    description: 'Vishuddha - communication, truth, and self-expression',
    category: 'Vishuddha',
    group: 'Chakra Alignment',
    config: {
      type: 'monaural',
      frequency: 741,
    },
    color: 'from-sky-500 to-blue-600',
    icon: 'mic',
  },
  {
    id: 'chakra-third-eye',
    title: 'Third Eye Chakra',
    description: 'Ajna - intuition, insight, and inner wisdom',
    category: 'Ajna',
    group: 'Chakra Alignment',
    config: {
      type: 'monaural',
      frequency: 852,
    },
    color: 'from-indigo-500 to-indigo-700',
    icon: 'eye',
  },
  {
    id: 'chakra-crown',
    title: 'Crown Chakra',
    description: 'Sahasrara - spiritual connection and enlightenment',
    category: 'Sahasrara',
    group: 'Chakra Alignment',
    config: {
      type: 'monaural',
      frequency: 963,
    },
    color: 'from-violet-500 to-purple-700',
    icon: 'crown',
  },

  // ============================================
  // EARTH & COSMIC (3 presets)
  // ============================================
  {
    id: 'schumann-resonance',
    title: 'Schumann Resonance',
    description: "Earth's electromagnetic heartbeat for deep grounding",
    category: '7.83Hz',
    group: 'Earth & Cosmic',
    config: {
      type: 'binaural',
      carrierFrequency: 200,
      beatFrequency: 7.83,
    },
    color: 'from-teal-600 to-green-700',
    icon: 'globe',
  },
  {
    id: 'om-frequency',
    title: 'Om Frequency',
    description: 'The cosmic vibration of creation and meditation',
    category: '136.1Hz',
    group: 'Earth & Cosmic',
    config: {
      type: 'monaural',
      frequency: 136.1,
    },
    color: 'from-amber-600 to-yellow-700',
    icon: 'infinity',
  },
  {
    id: 'sacred-temple',
    title: 'Sacred Temple',
    description: 'Ancient resonance found in megalithic chambers worldwide',
    category: '111Hz',
    group: 'Earth & Cosmic',
    config: {
      type: 'monaural',
      frequency: 111,
    },
    color: 'from-stone-500 to-amber-700',
    icon: 'landmark',
  },

  // ============================================
  // BRAINWAVE ENTRAINMENT (3 presets)
  // ============================================
  {
    id: 'deep-sleep',
    title: 'Deep Sleep',
    description: 'Delta waves for insomnia and deep restorative sleep',
    category: 'Delta',
    group: 'Brainwave Entrainment',
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
    group: 'Brainwave Entrainment',
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
    group: 'Brainwave Entrainment',
    config: {
      type: 'isochronic',
      carrierFrequency: 400,
      pulseFrequency: 40,
    },
    color: 'from-amber-500 to-orange-600',
    icon: 'zap',
  },

  // ============================================
  // AMBIENT NOISE (1 preset)
  // ============================================
  {
    id: 'brown-noise',
    title: 'Brown Noise',
    description: 'Deep ambient noise for focus and sleep masking',
    category: 'Noise',
    group: 'Ambient Noise',
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

export const getPresetsByGroup = (): Record<FrequencyGroup, FrequencyPreset[]> => {
  const grouped = {} as Record<FrequencyGroup, FrequencyPreset[]>;

  // Initialize groups in order
  for (const group of FREQUENCY_GROUPS) {
    grouped[group] = [];
  }

  // Populate groups
  for (const preset of FREQUENCY_PRESETS) {
    const group = preset.group as FrequencyGroup;
    if (grouped[group]) {
      grouped[group].push(preset);
    }
  }

  return grouped;
};
