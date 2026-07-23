import React from 'react';
import { ShieldCheck, Building2, Award } from 'lucide-react';

const trustItems = [
  {
    icon: <Building2 className="w-4 h-4 text-emerald-500" />,
    text: 'SSM: 202603084068 (003836930-K)',
    label: 'Syarikat Berdaftar'
  },
  {
    icon: <ShieldCheck className="w-4 h-4 text-ghz-blue-electric" />,
    text: 'Inkubator DFK TVETMARA Besut',
    label: 'Institusi Teknikal'
  },
  {
    icon: <Award className="w-4 h-4 text-ghz-red" />,
    text: '10 Produk Siap • 8 Ejen AI',
    label: 'Berskala Industri'
  }
];

export default function TrustBar() {
  return (
    <div
      className="relative z-10 w-full bg-ghz-black/90 border-b border-ghz-silver/5 py-3"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2">
          {trustItems.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center gap-2 text-[11px] font-mono text-ghz-silver/70"
            >
              <span className="flex-shrink-0">{item.icon}</span>
              <span className="hidden sm:inline">{item.text}</span>
              <span className="sm:hidden">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
