'use client';

import { Waves } from 'lucide-react';

export function Hero() {
  return (
    <header className="relative text-center py-16 px-4">
      {/* Logo */}
      <div className="flex justify-center mb-6">
        <div className="relative">
          <div className="absolute inset-0 bg-teal-500/30 blur-2xl rounded-full" />
          <div className="relative p-4 bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl shadow-lg shadow-teal-500/20">
            <Waves className="w-10 h-10 text-white" />
          </div>
        </div>
      </div>

      {/* Title */}
      <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
        Sound <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-400">Therapy</span>
      </h1>

      {/* Subtitle */}
      <p className="text-lg text-slate-400 max-w-xl mx-auto leading-relaxed">
        Scientifically-crafted frequencies for deep relaxation, enhanced focus, and restorative sleep. 
        Select your mood and let the healing begin.
      </p>

      {/* Decorative line */}
      <div className="mt-8 flex items-center justify-center gap-2">
        <div className="h-px w-12 bg-gradient-to-r from-transparent to-slate-700" />
        <div className="w-2 h-2 rounded-full bg-teal-500/50" />
        <div className="h-px w-12 bg-gradient-to-l from-transparent to-slate-700" />
      </div>
    </header>
  );
}

