import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

// Count-up animator for a single metric with enhanced easing
function CountUp({ target, duration = 2000, trigger }) {
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

      // Ease out cubic for smoother deceleration
      const easeProgress = 1 - Math.pow(1 - progress, 3);

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
    { target: 10, suffix: '+', label: 'Produk Siap', icon: '🚀' },
    { target: 4, suffix: '', label: 'Anak Syarikat', icon: '🏢' },
    { target: 2026, suffix: '', label: 'Tahun Ditubuhkan', icon: '📅' },
    { target: 8, suffix: ' AI', label: 'Ejen Pintar 24/7', icon: '🤖' },
  ];

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className="relative z-10 w-full bg-gradient-to-r from-ghz-blue-deep/20 via-ghz-blue-deep/30 to-ghz-blue-deep/20 border-y border-ghz-silver/10 py-8 backdrop-blur-sm overflow-hidden"
    >
      {/* Animated background pattern */}
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: "100%" }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 bg-gradient-to-r from-transparent via-ghz-blue-electric/5 to-transparent pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 text-center">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className={`flex flex-col items-center justify-center relative group ${
                idx !== stats.length - 1 ? 'md:border-r border-ghz-silver/10' : ''
              }`}
            >
              {/* Glow effect on hover */}
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                className="absolute inset-0 bg-ghz-blue-electric/5 rounded-lg blur-xl"
              />

              <div className="relative z-10 flex flex-col items-center">
                {/* Animated number */}
                <motion.div
                  initial={{ scale: 0.5 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", bounce: 0.5, delay: idx * 0.1 + 0.2 }}
                  className="font-mono text-3xl sm:text-4xl md:text-5xl font-bold text-ghz-blue-electric tracking-tight flex items-baseline gap-0.5"
                >
                  <CountUp target={stat.target} trigger={hasIntersected} />
                  <span className="text-xl sm:text-2xl text-ghz-silver">{stat.suffix}</span>
                </motion.div>

                {/* Label with slide-up animation */}
                <motion.span
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 + 0.3 }}
                  className="mt-2 text-xs sm:text-sm font-display font-medium text-ghz-white/80 tracking-wide uppercase"
                >
                  {stat.label}
                </motion.span>

                {/* Underline accent */}
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "60%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1 + 0.4 }}
                  className="h-0.5 bg-gradient-to-r from-transparent via-ghz-blue-electric to-transparent mt-2"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
