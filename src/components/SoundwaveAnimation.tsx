import { useEffect, useState } from 'react';

interface SoundwaveAnimationProps {
  isActive?: boolean;
  className?: string;
}

const SoundwaveAnimation = ({ isActive = false, className = "" }: SoundwaveAnimationProps) => {
  const [bars] = useState(Array.from({ length: 20 }, (_, i) => i));

  return (
    <div className={`flex items-center justify-center space-x-1 ${className}`}>
      {bars.map((bar) => (
        <div
          key={bar}
          className={`bg-primary/60 rounded-full transition-all duration-300 ${
            isActive ? 'animate-soundwave' : 'opacity-30'
          }`}
          style={{
            width: '3px',
            height: `${12 + Math.random() * 20}px`,
            animationDelay: `${bar * 0.1}s`,
            animationDuration: `${0.8 + Math.random() * 0.4}s`
          }}
        />
      ))}
    </div>
  );
};

export default SoundwaveAnimation;