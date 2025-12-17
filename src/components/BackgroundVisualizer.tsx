'use client';

import { useEffect, useRef } from 'react';

interface BackgroundVisualizerProps {
  analyserNode: AnalyserNode | null;
  isPlaying: boolean;
}

export function BackgroundVisualizer({ analyserNode, isPlaying }: BackgroundVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const particlesRef = useRef<Particle[]>([]);

  interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    radius: number;
    baseRadius: number;
    color: string;
    alpha: number;
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize particles
    const colors = ['#14b8a6', '#0891b2', '#6366f1', '#8b5cf6'];
    const particles: Particle[] = [];
    
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: Math.random() * 2 + 1,
        baseRadius: Math.random() * 2 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.5 + 0.1,
      });
    }
    particlesRef.current = particles;

    // Animation loop
    const dataArray = analyserNode ? new Uint8Array(analyserNode.frequencyBinCount) : null;

    const animate = () => {
      ctx.fillStyle = 'rgba(15, 23, 42, 0.1)'; // slate-900 with low opacity for trail effect
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Get audio data
      let avgVolume = 0;
      if (analyserNode && dataArray && isPlaying) {
        analyserNode.getByteFrequencyData(dataArray);
        avgVolume = dataArray.reduce((a, b) => a + b, 0) / dataArray.length / 255;
      }

      // Draw and update particles
      particlesRef.current.forEach((particle) => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // React to audio
        const audioInfluence = isPlaying ? 1 + avgVolume * 3 : 1;
        particle.radius = particle.baseRadius * audioInfluence;

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.globalAlpha = particle.alpha * (isPlaying ? (0.5 + avgVolume) : 0.3);
        ctx.fill();
        ctx.globalAlpha = 1;
      });

      // Draw connections between nearby particles
      particlesRef.current.forEach((p1, i) => {
        particlesRef.current.slice(i + 1).forEach((p2) => {
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = p1.color;
            ctx.globalAlpha = (1 - distance / 150) * 0.1 * (isPlaying ? (1 + avgVolume * 2) : 0.5);
            ctx.lineWidth = 0.5;
            ctx.stroke();
            ctx.globalAlpha = 1;
          }
        });
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [analyserNode, isPlaying]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.6 }}
    />
  );
}

