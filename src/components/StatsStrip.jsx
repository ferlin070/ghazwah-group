import React, { useState, useEffect, useRef } from 'react';

// Count-up animator for a single metric
function CountUp({ target, duration = 1500, trigger }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!trigger) return;

    let start = 0;
    const end = parseInt(target, 10);
    if (isNaN(end)) {
      setCount(target);
      return;
    }

    // Determine start number for large numbers to keep it short
    if (end > 1000) {
      start = end - 50; // Only count up last 50 for large numbers like 2026
    }

    const startTime = performance.now();

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease out quad formula
      const easeProgress = progress * (2 - progress);

      setCount(Math.floor(start + easeProgress * (end - start)));

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    requestAnimationFrame(animate);
  }, [target, duration, trigger]);

  return <>{count}</>;
}

export default function StatsStrip() {
  const [hasIntersected, setHasIntersected] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasIntersected(true);
          observer.unobserve(entry.target); // Trigger only once
        }
      },
      { threshold: 0.2 } // Trigger when 20% of component is in view
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const stats = [
    { target: 10, suffix: '+', label: 'Produk Siap' },
    { target: 4, suffix: '', label: 'Anak Syarikat' },
    { target: 2026, suffix: '', label: 'Tahun Ditubuhkan' },
    { target: 8, suffix: ' AI', label: 'Ejen Pintar 24/7' },
  ];

  return (
    <div 
      ref={containerRef}
      className="relative z-10 w-full bg-ghz-blue-deep/20 border-y border-ghz-silver/10 py-8 backdrop-blur-sm"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 text-center">
          {stats.map((stat, idx) => (
            <div 
              key={idx} 
              className={`flex flex-col items-center justify-center ${
                idx !== stats.length - 1 ? 'md:border-r border-ghz-silver/10' : ''
              }`}
            >
              <div className="font-mono text-3xl sm:text-4xl md:text-5xl font-bold text-ghz-blue-electric tracking-tight flex items-baseline gap-0.5">
                <CountUp target={stat.target} trigger={hasIntersected} />
                <span className="text-xl sm:text-2xl text-ghz-silver">{stat.suffix}</span>
              </div>
              <span className="mt-2 text-xs sm:text-sm font-display font-medium text-ghz-white/80 tracking-wide uppercase">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
