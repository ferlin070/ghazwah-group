import React, { useEffect, useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import logoGhazwah from '../assets/logo ghazwah group.png';

const navLinks = [
  { name: 'Tentang Kami', href: '#tentang' },
  { name: 'Portfolio', href: '#portfolio' },
  { name: 'Anak Syarikat', href: '#syarikat' },
  { name: 'Hubungi', href: '#hubungi' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 16);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-50 w-full border-b transition-all duration-300 ${
        isScrolled
          ? 'border-white/10 bg-ghz-black-deep/90 shadow-corporate-sm backdrop-blur-xl'
          : 'border-white/5 bg-ghz-black-deep/72 backdrop-blur-md'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <a
            href="#"
            className="group flex items-center gap-3 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-ghz-blue-electric focus-visible:ring-offset-2 focus-visible:ring-offset-ghz-black"
            aria-label="Ke laman utama Ghazwah Group"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.06] shadow-corporate-sm">
              <img
                src={logoGhazwah}
                alt="Ghazwah Group"
                className="h-9 w-auto object-contain"
              />
            </span>
            <span className="flex flex-col">
              <span className="font-display text-base font-semibold tracking-[0.18em] text-ghz-white sm:text-lg">
                GHAZWAH
              </span>
              <span className="text-[0.62rem] font-medium uppercase tracking-[0.26em] text-ghz-gold">
                Group Holding
              </span>
            </span>
          </a>

          <div className="hidden items-center gap-3 md:flex">
            <div className="flex items-center rounded-full border border-white/10 bg-white/[0.045] p-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="rounded-full px-4 py-2 text-sm font-medium text-ghz-silver-muted transition hover:bg-white/[0.07] hover:text-ghz-white focus:outline-none focus-visible:ring-2 focus-visible:ring-ghz-blue-electric"
                >
                  {link.name}
                </a>
              ))}
            </div>

            <a href="#collab" className="btn-gold px-5 py-2.5">
              Collab Dengan Kami
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>

          <button
            onClick={() => setIsOpen((open) => !open)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-ghz-silver transition hover:border-ghz-blue-electric/50 hover:text-ghz-white focus:outline-none focus-visible:ring-2 focus-visible:ring-ghz-blue-electric md:hidden"
            aria-expanded={isOpen}
            aria-label={isOpen ? 'Tutup menu' : 'Buka menu'}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <div
        className={`md:hidden transition-all duration-300 ${
          isOpen ? 'max-h-[28rem] opacity-100' : 'max-h-0 overflow-hidden opacity-0'
        }`}
      >
        <div className="border-t border-white/10 bg-ghz-black-deep/96 px-4 py-4 shadow-corporate backdrop-blur-xl">
          <div className="space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block rounded-2xl px-4 py-3 text-sm font-medium text-ghz-silver transition hover:bg-white/[0.06] hover:text-ghz-white focus:outline-none focus-visible:ring-2 focus-visible:ring-ghz-blue-electric"
              >
                {link.name}
              </a>
            ))}
          </div>
          <a
            href="#collab"
            onClick={() => setIsOpen(false)}
            className="btn-gold mt-4 w-full"
          >
            Collab Dengan Kami
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </nav>
  );
}
