'use client';

interface WaveAnimationProps {
  isActive: boolean;
  color?: string;
}

export function WaveAnimation({ isActive, color = 'bg-teal-400' }: WaveAnimationProps) {
  if (!isActive) return null;

  return (
    <div className="flex items-center justify-center gap-0.5 h-4">
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className={`w-0.5 rounded-full ${color} animate-pulse`}
          style={{
            height: '100%',
            animation: `wave 0.8s ease-in-out infinite`,
            animationDelay: `${i * 0.1}s`,
          }}
        />
      ))}
      <style jsx>{`
        @keyframes wave {
          0%, 100% {
            transform: scaleY(0.3);
            opacity: 0.5;
          }
          50% {
            transform: scaleY(1);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}

