'use client';

import { AlertTriangle, X } from 'lucide-react';
import { useAudioStore } from '@/store/audioStore';

export function DisclaimerModal() {
  const { hasSeenDisclaimer, setHasSeenDisclaimer } = useAudioStore();

  if (hasSeenDisclaimer) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-md bg-slate-900 border border-slate-700 rounded-2xl p-6 shadow-2xl">
        {/* Close button */}
        <button
          onClick={() => setHasSeenDisclaimer(true)}
          className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 rounded-full bg-amber-500/20 flex items-center justify-center">
            <AlertTriangle className="w-8 h-8 text-amber-400" />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-xl font-semibold text-white text-center mb-3">
          Safety Notice
        </h2>

        {/* Content */}
        <div className="space-y-3 text-slate-300 text-sm">
          <p className="flex items-start gap-2">
            <span className="text-amber-400 mt-0.5">⚠</span>
            <span>
              <strong className="text-white">Do not use while driving</strong> or operating heavy machinery. These sounds require your full attention and may induce relaxation or altered states.
            </span>
          </p>
          
          <p className="flex items-start gap-2">
            <span className="text-amber-400 mt-0.5">⚡</span>
            <span>
              <strong className="text-white">Epilepsy Warning:</strong> Isochronic tones produce pulsing sounds that may trigger seizures in photosensitive individuals or those with epilepsy.
            </span>
          </p>
          
          <p className="flex items-start gap-2">
            <span className="text-teal-400 mt-0.5">🎧</span>
            <span>
              <strong className="text-white">Use headphones</strong> for binaural beats to experience the full effect. Each ear must receive a different frequency.
            </span>
          </p>
        </div>

        {/* Button */}
        <button
          onClick={() => setHasSeenDisclaimer(true)}
          className="w-full mt-6 py-3 px-4 bg-teal-600 hover:bg-teal-500 text-white font-medium rounded-xl transition-colors"
        >
          I Understand, Continue
        </button>
      </div>
    </div>
  );
}

