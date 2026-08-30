import React from 'react';
import { ArrowUpRight, Building2, Mail, MapPin, MessageSquare, Phone } from 'lucide-react';
import logoGhazwah from '../assets/logo ghazwah group.png';
import logoDfk from '../assets/logo dfk incubator.jpg';
import { trackEvent } from '../utils/analytics';

const footerLinks = [
  { label: 'Tentang Kami', href: '#tentang' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Anak Syarikat', href: '#syarikat' },
  { label: 'Hubungi', href: '#hubungi' },
];

const focusAreas = [
  'Healthcare Technology',
  'Business & Point of Sale (POS)',
  'AI & Automasi Perniagaan',
  'Cloud & Infrastruktur Digital',
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-ghz-black-deep text-ghz-silver">
      <div className="border-b border-white/10 bg-executive-mesh">
        <div className="section-shell py-12 md:py-16">
          <div className="surface-card relative overflow-hidden p-6 sm:p-8">
            <div className="absolute -right-16 -top-20 h-64 w-64 rounded-full bg-ghz-blue-electric/10 blur-3xl" />
            <div className="relative z-10 flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
              <div>
                <p className="section-eyebrow">Next step</p>
                <h2 className="mt-3 font-display text-3xl font-semibold tracking-[-0.035em] text-ghz-white">
                  Sedia bincang projek digital anda?
                </h2>
                <p className="section-copy mt-3 max-w-2xl">
                  Mulakan dengan ringkasan cabaran perniagaan, produk yang diminati, atau peluang
                  kolaborasi yang ingin diteroka bersama Ghazwah Group.
                </p>
              </div>
              <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
                <a
                  href="#hubungi"
                  onClick={() => trackEvent('conversion', 'cta_click', 'Footer — Hubungi Kami')}
                  className="btn-primary"
                >
                  <MessageSquare className="h-4 w-4" />
                  Hubungi Kami
                </a>
                <a
                  href="https://wa.me/60195132821"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent('conversion', 'whatsapp_click', 'Footer CTA')}
                  className="btn-secondary"
                >
                  WhatsApp Kami
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="section-shell py-12">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.8fr_0.9fr]">
          <div>
            <div className="flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.06]">
                <img src={logoGhazwah} alt="Ghazwah Group" className="h-9 w-auto object-contain" />
              </span>
              <div>
                <p className="font-display text-lg font-semibold tracking-[0.18em] text-ghz-white">GHAZWAH</p>
                <p className="text-[0.62rem] font-semibold uppercase tracking-[0.24em] text-ghz-gold">Group Holding</p>
              </div>
            </div>
            <p className="mt-5 max-w-md text-sm leading-7 text-ghz-silver-muted">
              Entiti korporat dan syarikat induk yang memacu transformasi digital merentasi
              perkomputeran awan, e-dagang, agroteknologi dan pemasaran.
            </p>
            <div className="mt-5 space-y-2 text-xs text-ghz-silver-muted">
              <p className="flex items-center gap-2">
                <Building2 className="h-4 w-4 text-ghz-blue-electric" />
                Nama Berdaftar: GHAZWAH TRADING
              </p>
              <p>No. Pendaftaran SSM: 202603084068 (003836930-K)</p>
            </div>
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-ghz-white">Navigasi</h3>
            <ul className="mt-5 space-y-3 text-sm">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="professional-link">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            <h3 className="mt-8 font-display text-sm font-semibold uppercase tracking-[0.18em] text-ghz-white">Kategori Teras</h3>
            <ul className="mt-5 space-y-3 text-sm text-ghz-silver-muted">
              {focusAreas.map((area) => (
                <li key={area}>{area}</li>
              ))}
            </ul>
          </div>

          <div>
            <div className="mb-5 flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-white">
                <img src={logoDfk} alt="DFK Incubator" className="h-full w-full object-cover" />
              </span>
              <h3 className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-ghz-white">DFK Incubator</h3>
            </div>
            <div className="space-y-4 text-sm leading-7 text-ghz-silver-muted">
              <p className="flex items-start gap-3">
                <MapPin className="mt-1 h-4 w-4 shrink-0 text-ghz-blue-electric" />
                <span>
                  Inkubator DFK (Ghazwah Group), Institut Kemahiran MARA Besut (TVETMARA Besut),
                  Jalan Batu Tumbuh, Alor Lintang, 22200 Kampung Raja, Terengganu.
                </span>
              </p>
              <a href="mailto:ghazwahgroup@gmail.com" className="professional-link flex items-center gap-3">
                <Mail className="h-4 w-4 text-ghz-blue-electric" />
                ghazwahgroup@gmail.com
              </a>
              <a
                href="https://wa.me/60195132821"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent('conversion', 'whatsapp_click', 'Footer Bottom Bar')}
                className="professional-link flex items-center gap-3"
              >
                <Phone className="h-4 w-4 text-ghz-blue-electric" />
                WhatsApp: +60 19-513 2821
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-white/10 pt-6 text-xs text-ghz-silver-muted sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {currentYear} Ghazwah Group (Ghazwah Trading). Hak Cipta Terpelihara.</p>
          <div className="flex gap-5">
            <a href="#" className="professional-link">Penafian</a>
            <a href="#" className="professional-link">Dasar Privasi</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
