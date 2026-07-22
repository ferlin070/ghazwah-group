import React, { useEffect, useRef } from 'react';

export default function CircuitBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let particles = [];
    
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
        context.fillStyle = 'rgba(46, 124, 246, 0.8)'; // Electric blue
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

      // Determine density based on screen size (mobile-friendly)
      let count = 45;
      if (width < 640) {
        count = 15; // Fewer particles on mobile for performance
      } else if (width < 1024) {
        count = 30;
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
            // Calculate opacity based on distance
            const alpha = (1 - dist / maxDistance) * 0.18;
            ctx.beginPath();
            
            // Draw circuit-board style routes: right angle pathways
            // Instead of drawing straight diagonal lines, we draw a horizontal then vertical line
            ctx.moveTo(p1.x, p1.y);
            // Intermediate point creates a 90-degree bend
            ctx.lineTo(p2.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            
            ctx.strokeStyle = `rgba(46, 124, 246, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw background ambient grid lines
      drawGrid();

      // Update and draw particles
      particles.forEach((p) => {
        p.update(canvas.width, canvas.height);
        p.draw(ctx);
      });

      // Connect particles with digital circuit lines
      drawConnections();

      if (!prefersReducedMotion) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    // Auxiliary function to draw subtle cyber grid lines
    const drawGrid = () => {
      const step = 60;
      ctx.strokeStyle = 'rgba(196, 202, 211, 0.015)'; // Very faint silver
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

    // Setup resize observer on parent
    const resizeObserver = new ResizeObserver(() => {
      resizeCanvas();
      if (prefersReducedMotion) {
        // Redraw static frame once if motion is disabled
        animate();
      }
    });

    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
    }

    resizeCanvas();
    // Defer the first animation frame to idle time so it doesn't compete
    // with the initial React paint for main-thread time.
    if (typeof requestIdleCallback === 'function') {
      requestIdleCallback(() => animate(), { timeout: 300 });
    } else {
      // Fallback for browsers without requestIdleCallback
      setTimeout(() => animate(), 50);
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 w-full h-full pointer-events-none z-0 block" 
    />
  );
}
