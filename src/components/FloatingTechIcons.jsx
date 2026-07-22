import React, { useEffect, useState, useRef } from 'react';
import { Cloud, Bot, Code2, Cpu, Database, Globe, Server, BrainCircuit } from 'lucide-react';

const icons = [
  { Icon: Cloud,       x: 12, y: 18, size: 28, delay: 0.0, speed: 0.15, color: '#2E7CF6', key: 'cloud' },
  { Icon: Bot,         x: 82, y: 12, size: 32, delay: 0.4, speed: 0.20, color: '#D62828', key: 'ai' },
  { Icon: Code2,       x: 88, y: 72, size: 26, delay: 1.0, speed: 0.10, color: '#10B981', key: 'code' },
  { Icon: Cpu,         x: 6,  y: 78, size: 30, delay: 0.6, speed: 0.18, color: '#2E7CF6', key: 'cpu' },
  { Icon: Database,    x: 22, y: 60, size: 22, delay: 1.6, speed: 0.12, color: '#F59E0B', key: 'database' },
  { Icon: Globe,       x: 72, y: 84, size: 24, delay: 0.2, speed: 0.14, color: '#10B981', key: 'globe' },
  { Icon: Server,      x: 48, y: 8,  size: 26, delay: 0.8, speed: 0.08, color: '#2E7CF6', key: 'server' },
  { Icon: BrainCircuit, x: 94, y: 42, size: 22, delay: 1.2, speed: 0.22, color: '#D62828', key: 'brain' },
];

const FloatSpeeds = { fast: { dur: 3.2 }, slow: { dur: 5.0 } };

export default function FloatingTechIcons() {
  const [scrollY, setScrollY] = useState(0);
  const sectionRef = useRef(null);
  const ticking = useRef(false);
  const offsetRef = useRef(0); // cached section offset

  useEffect(() => {
    // Store initial offset once to avoid layout thrashing
    if (sectionRef.current) {
      offsetRef.current = sectionRef.current.offsetTop;
    }

    const onScroll = () => {
      if (ticking.current) return;
      requestAnimationFrame(() => {
        setScrollY(window.scrollY);
        ticking.current = false;
      });
      ticking.current = true;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const relativeScroll = Math.max(0, scrollY - offsetRef.current);

  return (
    <div
      ref={sectionRef}
      className="absolute inset-0 z-[2] pointer-events-none select-none overflow-hidden"
      aria-hidden="true"
    >
      {icons.map(({ Icon, x, y, size, delay, speed, color, key }) => {
        const parallaxOffset = Math.min(relativeScroll * speed, 140);
        const spd = delay > 0.5 ? 'slow' : 'fast';
        const { dur } = FloatSpeeds[spd];
        const floatName = `icon-float-${spd}`;

        return (
          <div
            key={key}
            className="absolute will-change-transform"
            style={{
              left: `${x}%`,
              top: `${y}%`,
              // CSS translate property is independent of transform,
              // so the @keyframes animation (which uses transform)
              // and this parallax offset can coexist.
              translate: `0 ${parallaxOffset}px`,
              animation: `${floatName} ${dur}s ease-in-out infinite`,
              animationDelay: `${delay}s`,
            }}
          >
            <div
              className="absolute inset-0 rounded-full blur-xl"
              style={{
                background: color,
                opacity: 0.08,
                transform: `scale(2)`,
              }}
            />
            <Icon
              size={size}
              strokeWidth={1.5}
              className="relative opacity-[0.12] sm:opacity-[0.18] drop-shadow-lg"
              style={{ color }}
            />
          </div>
        );
      })}
    </div>
  );
}
