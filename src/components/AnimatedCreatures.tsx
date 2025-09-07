import { useEffect, useState } from 'react';

const AnimatedCreatures = () => {
  const [creatures, setCreatures] = useState<Array<{ id: number; type: 'jellyfish' | 'fish'; delay: number; duration: number }>>([]);

  useEffect(() => {
    const newCreatures = Array.from({ length: 6 }, (_, i) => ({
      id: i,
      type: Math.random() > 0.5 ? 'jellyfish' : 'fish' as 'jellyfish' | 'fish',
      delay: Math.random() * 20,
      duration: 30 + Math.random() * 20
    }));
    setCreatures(newCreatures);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-5 overflow-hidden">
      {creatures.map((creature) => (
        <div
          key={creature.id}
          className={`absolute ${creature.type === 'jellyfish' ? 'animate-jellyfish' : 'animate-fish'}`}
          style={{
            animationDelay: `${creature.delay}s`,
            animationDuration: `${creature.duration}s`,
            top: `${20 + Math.random() * 60}%`,
          }}
        >
          {creature.type === 'jellyfish' ? (
            <JellyfishSVG />
          ) : (
            <FishSVG />
          )}
        </div>
      ))}
    </div>
  );
};

const JellyfishSVG = () => (
  <svg width="40" height="60" viewBox="0 0 40 60" className="fill-primary/20 drop-shadow-lg">
    <ellipse cx="20" cy="15" rx="18" ry="12" className="animate-pulse" />
    <path d="M8 25 Q10 35 12 45 Q14 55 16 50 Q18 45 20 55 Q22 45 24 50 Q26 55 28 45 Q30 35 32 25" 
          className="stroke-primary/30 stroke-2 fill-none" />
    <circle cx="20" cy="15" r="8" className="fill-primary/10 animate-glow-pulse" />
  </svg>
);

const FishSVG = () => (
  <svg width="50" height="20" viewBox="0 0 50 20" className="fill-accent/25 drop-shadow-lg">
    <path d="M5 10 Q15 5 25 8 Q35 10 45 8 L40 12 Q30 15 20 12 Q10 15 5 10 Z" />
    <circle cx="15" cy="10" r="2" className="fill-primary/40" />
    <path d="M45 8 L50 6 L50 12 L45 12 Z" className="fill-accent/30" />
  </svg>
);

export default AnimatedCreatures;