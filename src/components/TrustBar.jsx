import React from 'react';
import { Award, Building2, ShieldCheck } from 'lucide-react';

const trustItems = [
  {
    icon: Building2,
    text: 'SSM: 202603084068 (003836930-K)',
    label: 'Syarikat Berdaftar',
  },
  {
    icon: ShieldCheck,
    text: 'Inkubator DFK TVETMARA Besut',
    label: 'Institusi Teknikal',
  },
  {
    icon: Award,
    text: '10 Produk Siap • 8 Ejen AI',
    label: 'Berskala Industri',
  },
];

export default function TrustBar() {
  return (
    <div className="relative z-10 border-y border-white/10 bg-ghz-black-deep/60 py-4 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-3 sm:grid-cols-3">
          {trustItems.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.label}
                className="flex items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/[0.035] px-4 py-3 text-center"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-ghz-blue-electric/10 text-ghz-blue-electric ring-1 ring-ghz-blue-electric/20">
                  <Icon className="h-4 w-4" />
                </span>
                <span className="min-w-0 text-left">
                  <span className="block text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-ghz-gold">
                    {item.label}
                  </span>
                  <span className="block truncate text-xs font-medium text-ghz-silver sm:text-sm">
                    {item.text}
                  </span>
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
