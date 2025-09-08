import { useEffect, useState } from 'react';

interface Fish {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  direction: number;
  type: 'small' | 'medium' | 'large';
}

const AnimatedFish = () => {
  const [fish, setFish] = useState<Fish[]>([]);

  useEffect(() => {
    // Generate fish with different types
    const newFish = Array.from({ length: 6 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: 20 + Math.random() * 60,
      size: 15 + Math.random() * 25,
      speed: 2 + Math.random() * 3,
      direction: Math.random() > 0.5 ? 1 : -1,
      type: ['small', 'medium', 'large'][Math.floor(Math.random() * 3)] as 'small' | 'medium' | 'large'
    }));
    setFish(newFish);
  }, []);

  const getFishPath = (type: string) => {
    switch (type) {
      case 'small':
        return 'M0,5 Q5,0 10,5 Q5,10 0,5 L-3,5 Z'; // Simple fish
      case 'medium':
        return 'M0,8 Q8,0 16,8 Q12,12 8,10 L0,8 L-4,8 Q-2,6 -2,10 Q-4,8 -4,8 Z'; // Fish with tail
      case 'large':
        return 'M0,10 Q10,0 20,10 Q15,15 10,12 L0,10 L-5,10 Q-3,7 -3,13 Q-5,10 -5,10 M15,6 Q18,4 18,8 Q15,10 15,6 Z'; // Fish with fin
      default:
        return 'M0,5 Q5,0 10,5 Q5,10 0,5 L-3,5 Z';
    }
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-20 overflow-hidden">
      {fish.map((fishItem) => (
        <div
          key={fishItem.id}
          className="absolute"
          style={{
            left: `${fishItem.x}%`,
            top: `${fishItem.y}%`,
            animation: `swim-${fishItem.direction > 0 ? 'right' : 'left'} ${20 / fishItem.speed}s linear infinite`,
            animationDelay: `${Math.random() * 10}s`,
          }}
        >
          <svg
            width={fishItem.size}
            height={fishItem.size * 0.6}
            viewBox="-10 -5 30 20"
            className="fish-svg"
            style={{
              transform: fishItem.direction < 0 ? 'scaleX(-1)' : 'none',
              filter: 'drop-shadow(0 0 3px rgba(255,255,255,0.3))',
            }}
          >
            <path
              d={getFishPath(fishItem.type)}
              fill="currentColor"
              className="text-primary/70"
              style={{
                animation: `fish-wiggle ${1 + Math.random()}s ease-in-out infinite`,
              }}
            />
            {/* Fish eye */}
            <circle
              cx={fishItem.type === 'large' ? 12 : fishItem.type === 'medium' ? 8 : 6}
              cy={fishItem.type === 'large' ? 7 : fishItem.type === 'medium' ? 5 : 3}
              r="1"
              fill="white"
              opacity="0.9"
            />
          </svg>
        </div>
      ))}
      
      {/* School of tiny fish */}
      <div 
        className="absolute opacity-60"
        style={{
          left: '20%',
          top: '30%',
          animation: 'school-swim 25s linear infinite',
        }}
      >
        {Array.from({ length: 8 }, (_, i) => (
          <div
            key={i}
            className="absolute"
            style={{
              left: `${(i % 4) * 8}px`,
              top: `${Math.floor(i / 4) * 6}px`,
              animation: `tiny-fish-wiggle ${0.5 + Math.random() * 0.5}s ease-in-out infinite`,
              animationDelay: `${i * 0.1}s`,
            }}
          >
            <svg width="6" height="4" viewBox="0 0 6 4">
              <path
                d="M0,2 Q2,0 4,2 Q2,4 0,2 L-1,2 Z"
                fill="currentColor"
                className="text-accent/60"
              />
            </svg>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnimatedFish;