const UnderwaterLandscape = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Ocean Water Layers */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'var(--gradient-ocean)',
        }}
      />
      
      {/* Seafloor Landscape */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-2/5"
        style={{
          background: 'var(--gradient-seafloor)',
          clipPath: 'polygon(0 40%, 15% 30%, 35% 45%, 50% 25%, 65% 35%, 80% 20%, 100% 30%, 100% 100%, 0 100%)'
        }}
      />
      
      {/* Rocky Outcrops */}
      <div className="absolute bottom-0 left-0 right-0">
        {/* Rock Formation 1 */}
        <div 
          className="absolute bottom-0 left-[10%] w-20 h-32"
          style={{
            background: `linear-gradient(45deg, hsl(var(--rock)), hsl(var(--rock)/0.8))`,
            clipPath: 'polygon(20% 100%, 0% 20%, 50% 0%, 80% 15%, 100% 100%)',
          }}
        />
        
        {/* Rock Formation 2 */}
        <div 
          className="absolute bottom-0 right-[20%] w-24 h-24"
          style={{
            background: `linear-gradient(135deg, hsl(var(--rock)), hsl(var(--rock)/0.7))`,
            clipPath: 'polygon(30% 100%, 10% 30%, 40% 10%, 70% 25%, 90% 100%)',
          }}
        />
        
        {/* Coral Reef */}
        <div 
          className="absolute bottom-0 left-[60%] w-16 h-20"
          style={{
            background: `linear-gradient(90deg, hsl(var(--coral)), hsl(var(--coral)/0.8))`,
            clipPath: 'polygon(0% 100%, 20% 40%, 40% 60%, 60% 30%, 80% 50%, 100% 100%)',
          }}
        />
      </div>
      
      {/* Seaweed */}
      <div className="absolute bottom-0 left-0 right-0">
        {Array.from({ length: 8 }, (_, i) => (
          <div
            key={i}
            className="absolute bottom-0"
            style={{
              left: `${15 + i * 12}%`,
              width: '3px',
              height: `${40 + Math.random() * 30}px`,
              background: `hsl(var(--seaweed))`,
              transformOrigin: 'bottom',
              animation: `seaweed-sway ${3 + Math.random() * 2}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`,
              borderRadius: '50px',
            }}
          />
        ))}
      </div>
      
      {/* Sand Particles */}
      <div className="absolute inset-0">
        {Array.from({ length: 15 }, (_, i) => (
          <div
            key={i}
            className="absolute rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${60 + Math.random() * 40}%`,
              width: `${2 + Math.random() * 4}px`,
              height: `${2 + Math.random() * 4}px`,
              background: `hsl(var(--sand))`,
              animation: `float-particle ${8 + Math.random() * 4}s linear infinite`,
              animationDelay: `${Math.random() * 8}s`,
            }}
          />
        ))}
      </div>
      
      {/* Water Caustics */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          background: `repeating-linear-gradient(
            45deg,
            transparent,
            transparent 100px,
            hsl(var(--primary-light) / 0.1) 102px,
            hsl(var(--primary-light) / 0.1) 104px
          )`,
          animation: 'caustics 8s ease-in-out infinite'
        }}
      />
    </div>
  );
};

export default UnderwaterLandscape;