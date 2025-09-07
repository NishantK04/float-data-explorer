import { useEffect, useState } from 'react';

const OceanBackground = () => {
  const [bubbles, setBubbles] = useState<Array<{ id: number; left: number; delay: number; size: number }>>([]);

  useEffect(() => {
    // Generate random bubbles
    const newBubbles = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 15,
      size: 15 + Math.random() * 15
    }));
    setBubbles(newBubbles);
  }, []);

  return (
    <>
      {/* Ocean Flow Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="ocean-flow-bg" />
        <div 
          className="ocean-flow-bg" 
          style={{ animationDelay: '4s', animationDirection: 'reverse' }} 
        />
      </div>

      {/* Floating Bubbles */}
      <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
        {bubbles.map((bubble) => (
          <div
            key={bubble.id}
            className="absolute rounded-full bg-gradient-to-t from-primary/10 to-primary/20 animate-bubble"
            style={{
              left: `${bubble.left}%`,
              width: `${bubble.size}px`,
              height: `${bubble.size}px`,
              animationDelay: `${bubble.delay}s`,
              animationDuration: `${12 + Math.random() * 8}s`
            }}
          />
        ))}
      </div>

      {/* Depth Rays */}
      <div className="fixed inset-0 pointer-events-none z-5">
        <div 
          className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent"
          style={{ 
            background: `repeating-linear-gradient(
              90deg,
              transparent,
              transparent 100px,
              hsl(var(--primary) / 0.03) 102px,
              hsl(var(--primary) / 0.03) 104px
            )`,
            animation: 'ocean-flow 20s ease-in-out infinite'
          }}
        />
      </div>
    </>
  );
};

export default OceanBackground;