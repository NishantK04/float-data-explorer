const ParallaxWaves = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Wave Layer 1 - Slow */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          background: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 80px,
            hsl(var(--primary) / 0.1) 82px,
            hsl(var(--primary) / 0.1) 84px
          )`,
          animation: 'wave-1 20s linear infinite'
        }}
      />
      
      {/* Wave Layer 2 - Medium */}
      <div 
        className="absolute inset-0 opacity-15"
        style={{
          background: `repeating-linear-gradient(
            45deg,
            transparent,
            transparent 120px,
            hsl(var(--accent) / 0.08) 122px,
            hsl(var(--accent) / 0.08) 124px
          )`,
          animation: 'wave-2 25s linear infinite'
        }}
      />
      
      {/* Wave Layer 3 - Fast */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          background: `repeating-linear-gradient(
            90deg,
            transparent,
            transparent 60px,
            hsl(var(--primary-light) / 0.05) 62px,
            hsl(var(--primary-light) / 0.05) 64px
          )`,
          animation: 'wave-3 30s linear infinite'
        }}
      />
      
      {/* Radial wave effect */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: `radial-gradient(
            ellipse at 50% 100%,
            hsl(var(--primary) / 0.1) 0%,
            transparent 50%
          )`,
          animation: 'ocean-flow 12s ease-in-out infinite'
        }}
      />
    </div>
  );
};

export default ParallaxWaves;