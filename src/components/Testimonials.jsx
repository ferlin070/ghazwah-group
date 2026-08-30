import React, { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';

const testimonials = [
  {
    quote: 'Kolaborasi bersama Ghazwah Group membuka akses kami kepada infrastruktur awan dan automasi AI yang sebelum ini sukar dijangkau. Pasukan mereka sangat profesional dan responsif.',
    author: 'Pengurus IT',
    company: 'Syarikat PKS Terengganu',
    rating: 5,
  },
  {
    quote: 'Sistem POS dan HR mereka membantu kami mengurangkan masa pengurusan operasi sebanyak 60%. Kami kini boleh fokus pada pengembangan perniagaan.',
    author: 'Pengarah Operasi',
    company: 'Rantaian F&B Malaysia Timur',
    rating: 5,
  },
  {
    quote: 'Ekosistem 4 anak syarikat di bawah satu induk memberi kami penyelesaian menyeluruh — dari hosting hingga pemasaran digital. Sangat menjimatkan kos dan masa.',
    author: 'Usahawan Teknologi',
    company: 'Inkubator Startup Kuala Lumpur',
    rating: 5,
  },
  {
    quote: 'Perkhidmatan perundingan akademik mereka sangat membantu pelajar kami dalam projek perkomputeran awan. Kerjasama ini akan diteruskan.',
    author: 'Ts. Mohd Zubir bin Md Zin',
    company: 'Penasihat Teknikal TVETMARA',
    rating: 5,
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, []);

  useEffect(() => {
    const interval = setInterval(next, 7000);
    return () => clearInterval(interval);
  }, [next]);

  const variants = {
    enter: (dir) => ({ x: dir > 0 ? 48 : -48, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir) => ({ x: dir > 0 ? -48 : 48, opacity: 0 }),
  };

  const testimonial = testimonials[current];

  return (
    <section className="relative overflow-hidden border-y border-white/10 bg-ghz-black-deep/45">
      <div className="absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-ghz-blue-electric/8 blur-[120px]" />

      <div className="section-shell relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          <p className="section-eyebrow">Social proof</p>
          <h2 className="section-title mt-3">Dipercayai oleh rakan industri dan institusi.</h2>
          <p className="section-copy mt-4">
            Maklum balas ini menggambarkan standard operasi yang kami sasarkan dalam setiap
            kolaborasi: responsif, tersusun, dan berorientasikan hasil.
          </p>
        </div>

        <div className="relative mx-auto mt-12 max-w-4xl">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.article
              key={current}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="surface-card relative overflow-hidden p-6 sm:p-10"
            >
              <div className="absolute -right-20 -top-24 h-64 w-64 rounded-full bg-ghz-gold/10 blur-3xl" />
              <div className="relative z-10">
                <div className="mb-8 flex items-center justify-between gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-ghz-blue-electric/10 text-ghz-blue-electric ring-1 ring-ghz-blue-electric/20">
                    <Quote className="h-6 w-6" />
                  </div>
                  <div className="flex items-center gap-1" aria-label={`${testimonial.rating} daripada 5 bintang`}>
                    {Array.from({ length: testimonial.rating }).map((_, index) => (
                      <Star key={index} className="h-4 w-4 fill-ghz-gold text-ghz-gold" />
                    ))}
                  </div>
                </div>

                <p className="font-display text-xl font-medium leading-8 tracking-[-0.02em] text-ghz-white sm:text-2xl sm:leading-10">
                  “{testimonial.quote}”
                </p>

                <div className="mt-8 flex flex-col gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="font-display text-base font-semibold text-ghz-white">{testimonial.author}</p>
                    <p className="mt-1 text-sm text-ghz-silver-muted">{testimonial.company}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={prev}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] text-ghz-silver transition hover:border-ghz-blue-electric/40 hover:text-ghz-white focus:outline-none focus-visible:ring-2 focus-visible:ring-ghz-blue-electric"
                      aria-label="Testimoni sebelumnya"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={next}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] text-ghz-silver transition hover:border-ghz-blue-electric/40 hover:text-ghz-white focus:outline-none focus-visible:ring-2 focus-visible:ring-ghz-blue-electric"
                      aria-label="Testimoni seterusnya"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.article>
          </AnimatePresence>

          <div className="mt-6 flex items-center justify-center gap-2">
            {testimonials.map((item, index) => (
              <button
                key={item.author}
                type="button"
                onClick={() => {
                  setDirection(index > current ? 1 : -1);
                  setCurrent(index);
                }}
                className={`h-2 rounded-full transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-ghz-blue-electric ${
                  index === current ? 'w-8 bg-ghz-blue-electric' : 'w-2 bg-white/20 hover:bg-white/40'
                }`}
                aria-label={`Lihat testimoni ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
