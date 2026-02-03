
'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Schedule from '../schedule';

export default function BookingsPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-black text-white relative pt-20">
      {/* Back Button */}
      <div className="absolute top-6 left-6 z-50">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-white/80 hover:text-emerald-400 transition-colors group"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 transform group-hover:-translate-x-1 transition-transform"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span className="font-clash font-medium text-lg tracking-wide">Back</span>
        </button>
      </div>

      <div className="container mx-auto">
        <h1 className="text-center text-5xl md:text-7xl font-bold font-clash text-white mb-8 tracking-tight uppercase">
          Get <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-200">Tickets</span>
        </h1>
      </div>

      <Schedule />
    </main>
  );
}
