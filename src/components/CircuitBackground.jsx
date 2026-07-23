import React, { useEffect, useRef } from 'react';

export default function CircuitBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId = null;
    let particles = [];
    let isPaused = false;
    let lastFrameTime = 0;
    const TARGET_FPS = 30;
    const FRAME_INTERVAL = 1000 / TARGET_FPS;

    // Check user preference for reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Handle resizing
    const resizeCanvas = () => {
      canvas.width = canvas.parentElement.offsetWidth;
      canvas.height = canvas.parentElement.offsetHeight;
      initParticles();
    };

    // Particle class definition
    class Particle {
      constructor(width, height) {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        // Slow ambient velocities
        this.vx = (Math.random() - 0.5) * 0.35;
        this.vy = (Math.random() - 0.5) * 0.35;
        this.radius = Math.random() * 2 + 1.5;
        this.pulse = Math.random() * Math.PI;
        this.pulseSpeed = 0.02 + Math.random() * 0.02;
      }

      update(width, height) {
        if (prefersReducedMotion) return;

        this.x += this.vx;
        this.y += this.vy;
        this.pulse += this.pulseSpeed;

        // Bounce boundaries
        if (this.x < 0 || this.x > width) this.vx = -this.vx;
        if (this.y < 0 || this.y > height) this.vy = -this.vy;

        // Keep inside bounds
        if (this.x < 0) this.x = 0;
        if (this.x > width) this.x = width;
        if (this.y < 0) this.y = 0;
        if (this.y > height) this.y = height;
      }

      draw(context) {
        // Subtle pulsing size effect
        const currentRadius = prefersReducedMotion
          ? this.radius
          : this.radius + Math.sin(this.pulse) * 0.5;

        context.beginPath();
        context.arc(this.x, this.y, currentRadius, 0, Math.PI * 2);
        context.fillStyle = 'rgba(46, 124, 246, 0.8)';
        context.fill();

        // Draw outer glow for larger nodes
        if (this.radius > 2.5) {
          context.beginPath();
          context.arc(this.x, this.y, currentRadius * 2.5, 0, Math.PI * 2);
          context.fillStyle = 'rgba(46, 124, 246, 0.1)';
          context.fill();
        }
      }
    }

    const initParticles = () => {
      const width = canvas.width;
      const height = canvas.height;
      particles = [];

      // Aggressively reduce particle count for performance
      let count = 25;
      if (width < 640) {
        count = 8;
      } else if (width < 1024) {
        count = 15;
      }

      for (let i = 0; i < count; i++) {
        particles.push(new Particle(width, height));
      }
    };

    const drawConnections = () => {
      const width = canvas.width;
      const maxDistance = width < 640 ? 90 : 130;

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i];
          const p2 = particles[j];

          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            const alpha = (1 - dist / maxDistance) * 0.18;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(46, 124, 246, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }
    };

    const animate = (timestamp) => {
      // 30fps throttle: skip if not enough time has passed
      if (!prefersReducedMotion && timestamp - lastFrameTime < FRAME_INTERVAL) {
        animationFrameId = requestAnimationFrame(animate);
        return;
      }
      lastFrameTime = timestamp;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw background ambient grid lines (skip on mobile)
      if (canvas.width >= 640) {
        drawGrid();
      }

      // Update and draw particles
      particles.forEach((p) => {
        p.update(canvas.width, canvas.height);
        p.draw(ctx);
      });

      // Connect particles with digital circuit lines
      drawConnections();

      if (!prefersReducedMotion && !isPaused) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    // Auxiliary function to draw subtle cyber grid lines
    const drawGrid = () => {
      const step = 80; // wider spacing = fewer lines = less CPU
      ctx.strokeStyle = 'rgba(196, 202, 211, 0.015)';
      ctx.lineWidth = 0.5;

      for (let x = 0; x < canvas.width; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      for (let y = 0; y < canvas.height; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
    };

    // Page Visibility API — pause animation when tab is hidden
    const onVisibilityChange = () => {
      isPaused = document.hidden;
      if (!document.hidden && !prefersReducedMotion) {
        // Cancel any stale rAF handle and restart the loop cleanly.
        // Without this, animation freezes after tab is hidden then shown.
        cancelAnimationFrame(animationFrameId);
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    // Setup resize observer on parent
    const resizeObserver = new ResizeObserver(() => {
      resizeCanvas();
      if (prefersReducedMotion) {
        animate();
      }
    });

    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
    }

    resizeCanvas();

    // Defer animation start by 2s so the main React paint completes first.
    // This dramatically improves Speed Index / LCP.
    const startDelay = setTimeout(() => {
      if (!prefersReducedMotion) {
        animationFrameId = requestAnimationFrame(animate);
      }
      // Draw one static frame if motion is reduced
      if (prefersReducedMotion) {
        animate();
      }
    }, 2000);

    document.addEventListener('visibilitychange', onVisibilityChange);

    return () => {
      clearTimeout(startDelay);
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      document.removeEventListener('visibilitychange', onVisibilityChange);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0 block"
    />
  );
}
