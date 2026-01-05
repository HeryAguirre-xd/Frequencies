# Frequencies

A modern web application delivering scientifically-crafted sound therapy frequencies for wellness. Built with Next.js, React, and the Web Audio API.

## Features

- **24 Healing Frequency Presets** organized into 5 categories:
  - **Solfeggio Scale** - Ancient healing frequencies (174Hz - 963Hz)
  - **Chakra Alignment** - Energy center frequencies for mind-body balance
  - **Earth & Cosmic** - Natural resonance frequencies (Schumann, Om, Temple)
  - **Brainwave Entrainment** - Binaural beats and isochronic tones
  - **Ambient Noise** - Brown noise for focus and sleep

- **4 Audio Synthesis Types**:
  - Binaural Beats - Two frequencies creating a perceived third tone
  - Isochronic Tones - Pulsed sounds for brainwave entrainment
  - Monaural Tones - Pure single frequencies
  - Brown Noise - Deep ambient sound masking

- **Real-time Visualization** - Interactive particle animation that responds to audio

- **Responsive Design** - Works on desktop, tablet, and mobile

## Tech Stack

- **Framework**: Next.js 16 with App Router
- **UI**: React 19, TypeScript, Tailwind CSS 4
- **State Management**: Zustand
- **Audio**: Web Audio API (native browser synthesis)
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, pnpm, or bun

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd frequencies-app

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Create production build |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout with fonts & metadata
│   ├── page.tsx           # Main page with frequency groups
│   └── globals.css        # Global styles & Tailwind
├── components/            # React components
│   ├── BackgroundVisualizer.tsx  # Canvas particle animation
│   ├── FrequencyCard.tsx         # Individual preset card
│   ├── GlobalPlayer.tsx          # Bottom audio player
│   ├── DisclaimerModal.tsx       # Safety warning modal
│   ├── Hero.tsx                  # Header section
│   └── WaveAnimation.tsx         # Animated wave bars
├── hooks/
│   └── useAudioEngine.ts  # Web Audio API synthesis engine
├── store/
│   └── audioStore.ts      # Zustand state management
├── lib/
│   └── frequencies.ts     # Preset definitions & helpers
└── types/
    └── frequency.ts       # TypeScript interfaces
```

## Frequency Categories

### Solfeggio Scale
Ancient frequencies derived from Gregorian chants:
- 174 Hz - Foundation (pain reduction)
- 285 Hz - Cellular Healing
- 396 Hz - Liberation (release fear/guilt)
- 417 Hz - Transmutation (facilitate change)
- 432 Hz - Universal Harmony
- 528 Hz - Miracle Tone (DNA repair, love)
- 639 Hz - Heart Connection (relationships)
- 741 Hz - Awakening (intuition)
- 852 Hz - Third Eye (spiritual perception)
- 963 Hz - Divine Connection (higher consciousness)

### Chakra Alignment
Frequencies mapped to the seven energy centers:
- Root (396 Hz) - Grounding, stability
- Sacral (417 Hz) - Creativity, passion
- Solar Plexus (528 Hz) - Personal power
- Heart (639 Hz) - Love, compassion
- Throat (741 Hz) - Communication, truth
- Third Eye (852 Hz) - Intuition, insight
- Crown (963 Hz) - Spiritual connection

### Earth & Cosmic
Natural resonance frequencies:
- 7.83 Hz - Schumann Resonance (Earth's heartbeat)
- 136.1 Hz - Om Frequency (cosmic vibration)
- 111 Hz - Sacred Temple (ancient chamber resonance)

### Brainwave Entrainment
- Delta (2 Hz) - Deep sleep
- Alpha (10 Hz) - Relaxation, stress relief
- Gamma (40 Hz) - Focus, cognition

## Usage Notes

- **Headphones Required**: Binaural beats require stereo headphones to work properly
- **Volume**: Start at low volume and adjust to comfort
- **Session Length**: 15-30 minutes recommended for therapeutic benefit
- **Safety**: Not recommended while driving or operating machinery

## Deployment

Deploy easily on [Vercel](https://vercel.com):

```bash
npm run build
```

See [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for other platforms.

## License

MIT
