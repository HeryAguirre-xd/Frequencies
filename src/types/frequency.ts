export type FrequencyType = 'monaural' | 'binaural' | 'isochronic' | 'noise';

export interface MonauralConfig {
    type: 'monaural';
    frequency: number;
}

export interface BinauralConfig {
    type: 'binaural';
    carrierFrequency: number;
    beatFrequency: number;
}

export interface IsochronicConfig {
    type: 'isochronic';
    carrierFrequency: number;
    pulseFrequency: number;
}

export interface NoiseConfig {
    type: 'noise';
    noiseType: 'brown' | 'white' | 'pink';
}

export type FrequencyConfig = MonauralConfig | BinauralConfig | IsochronicConfig | NoiseConfig;

export interface FrequencyPreset {
    id: string;
    title: string;
    description: string;
    category: string;
    group: string;
    config: FrequencyConfig;
    color: string;
    icon: string;
}

