
'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { events } from '../../data/events';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function EventPage() {
  const params = useParams();
  const router = useRouter();
  const { id } = params;

  // Find the event
  const event = events.find((e) => e.id === Number(id));

  if (!event) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold font-clash mb-4">Event Not Found</h1>
        <button
          onClick={() => router.back()}
          className="text-emerald-400 hover:text-emerald-300 underline"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white relative">
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

      <div className="container mx-auto px-6 md:px-12 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">

          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative w-full h-[400px] md:h-[500px] rounded-lg overflow-hidden border border-white/10"
          >
            {/* Using a placeholder gradient for now as no real images are provided, but utilizing event.image if valid */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-black flex items-center justify-center">
              <span className="text-gray-600 font-clash text-2xl uppercase tracking-widest">Event Image</span>
            </div>
          </motion.div>

          {/* Details Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col gap-8"
          >
            <div>
              <div className="flex items-center gap-4 mb-4">
                <span className="px-3 py-1 bg-emerald-400/10 text-emerald-400 border border-emerald-400/20 rounded-full text-xs font-bold uppercase tracking-widest">
                  {event.club}
                </span>
                <span className="text-gray-400 text-sm font-medium uppercase tracking-wide">
                  {event.date.month} {event.date.day}, {event.date.year}
                </span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold font-clash text-white mb-6 leading-tight">
                {event.title}
              </h1>
              <p className="text-lg text-gray-400 leading-relaxed font-sans">
                {event.summary}
              </p>
            </div>

            <div className="flex flex-col gap-4 border-t border-white/10 pt-6">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
                  <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <span className="block text-xs text-gray-500 uppercase tracking-widest font-bold">Time</span>
                  <span className="text-white font-medium">{event.time}</span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
                  <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <span className="block text-xs text-gray-500 uppercase tracking-widest font-bold">Venue</span>
                  <span className="text-white font-medium">{event.venue}</span>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <Link href="#" className="w-full md:w-auto px-10 py-4 bg-white text-black font-clash font-bold text-lg uppercase tracking-wide rounded-sm hover:bg-emerald-400 hover:text-white transition-all duration-300 hover:scale-[1.02] inline-block text-center">
                Book Now
              </Link>
            </div>

          </motion.div>
        </div>
      </div>
    </main>
  );
}
