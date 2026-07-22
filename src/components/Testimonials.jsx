import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react';

const testimonials = [
  {
    quote: 'Kolaborasi bersama Ghazwah Group membuka akses kami kepada infrastruktur awan dan automasi AI yang sebelum ini sukar dijangkau. Pasukan mereka sangat profesional dan responsif.',
    author: 'Pengurus IT',
    company: 'Syarikat PKS Terengganu',
    rating: 5
  },
  {
    quote: 'Sistem POS dan HR mereka membantu kami mengurangkan masa pengurusan operasi sebanyak 60%. Kami kini boleh fokus pada pengembangan perniagaan.',
    author: 'Pengarah Operasi',
    company: 'Rantaian F&B Malaysia Timur',
    rating: 5
  },
  {
    quote: 'Ekosistem 4 anak syarikat di bawah satu induk memberi kami penyelesaian menyeluruh — dari hosting hingga pemasaran digital. Sangat menjimatkan kos dan masa.',
    author: 'Usahawan Teknologi',
    company: 'Inkubator Startup Kuala Lumpur',
    rating: 5
  },
  {
    quote: 'Perkhidmatan perundingan akademik mereka sangat membantu pelajar kami dalam projek perkomputeran awan. Kerjasama ini akan diteruskan.',
    author: 'Ts. Mohd Zubir bin Md Zin',
    company: 'Penasihat Teknikal TVETMARA',
    rating: 5
  }
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const next = useCallback(() => {
    setDirection(1);
    setCurrent(prev => (prev + 1) % testimonials.length);
  }, []);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent(prev => (prev - 1 + testimonials.length) % testimonials.length);
  }, []);

  // Auto-slide every 6s
  useEffect(() => {
    const interval = setInterval(next, 6000);
    return () => clearInterval(interval);
  }, [next]);

  const variants = {
    enter: (dir) => ({ x: dir > 0 ? 200 : -200, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir) => ({ x: dir > 0 ? -200 : 200, opacity: 0 })
  };

  return (
    <section className="relative w-full bg-gradient-to-b from-ghz-black via-ghz-blue-deep/5 to-ghz-black py-20 overflow-hidden border-y border-ghz-silver/5">
      {/* Decorative glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-ghz-blue-electric/3 blur-[100px] pointer-events-none"></div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-[10px] font-mono text-ghz-blue-electric tracking-[0.2em] uppercase block mb-3">
            TESTIMONIALS
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-ghz-white mb-3">
            Apa Kata <span className="text-ghz-blue-electric">Rakan Strategik</span>
          </h2>
          <p className="font-sans text-sm text-ghz-silver/70 max-w-lg mx-auto">
            Kepuasan rakan kolaborasi dan pelanggan adalah bukti komitmen kami terhadap kecemerlangan.
          </p>
        </div>

        <div className="relative min-h-[220px] flex items-center justify-center">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              className="bg-ghz-blue-deep/10 border border-ghz-silver/10 rounded-2xl p-8 sm:p-10 backdrop-blur-sm w-full"
            >
              <Quote className="w-8 h-8 text-ghz-blue-electric/30 mb-4" />
              <p className="font-sans text-sm sm:text-base text-ghz-silver/90 leading-relaxed italic mb-6">
                "{testimonials[current].quote}"
              </p>
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <p className="font-display font-semibold text-sm text-ghz-white">
                    {testimonials[current].author}
                  </p>
                  <p className="text-xs font-mono text-ghz-silver/60 mt-0.5">
                    {testimonials[current].company}
                  </p>
                </div>
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: testimonials[current].rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation arrows */}
          <button
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 sm:-translate-x-6 w-10 h-10 rounded-full bg-ghz-blue-deep/40 border border-ghz-silver/10 flex items-center justify-center text-ghz-silver hover:text-ghz-white hover:bg-ghz-blue-deep/60 transition-all hover:scale-105"
            aria-label="Testimoni sebelumnya"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 sm:translate-x-6 w-10 h-10 rounded-full bg-ghz-blue-deep/40 border border-ghz-silver/10 flex items-center justify-center text-ghz-silver hover:text-ghz-white hover:bg-ghz-blue-deep/60 transition-all hover:scale-105"
            aria-label="Testimoni seterusnya"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Dots indicator */}
        <div className="flex items-center justify-center gap-2 mt-6">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => { setDirection(idx > current ? 1 : -1); setCurrent(idx); }}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                idx === current
                  ? 'bg-ghz-blue-electric w-6'
                  : 'bg-ghz-silver/20 hover:bg-ghz-silver/40'
              }`}
              aria-label={`Testimoni ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
