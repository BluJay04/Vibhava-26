'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { client } from '@/sanity/lib/client';

interface HighlightEvent {
  poster: string;
  title: string;
  subtitle: string;
  isCrowdWork?: boolean;
}

const highlights: HighlightEvent[] = [
  {
    poster: '/events/Stand_Up_Comedy_Poster.jpeg',
    title: 'Crowd Work Show',
    subtitle: 'ft. Mahadevan',
    isCrowdWork: true,
  },
  {
    poster: '/events/Auto_Show_Poster.jpeg',
    title: 'Auto Show',
    subtitle: 'Innovation in Motion',
  },
  {
    poster: '/events/RC_Car_Poster.jpeg',
    title: 'Torque X',
    subtitle: 'RC Car Racing',
  },
];

export default function Highlights() {
  const router = useRouter();

  // Pre-fetch the Crowd Work Show event ID from Sanity
  const [crowdWorkId, setCrowdWorkId] = useState<string | null>(null);

  useEffect(() => {
    const fetchCrowdWorkEvent = async () => {
      try {
        const query = `*[_type == "event" && title match "Crowd Work*"][0]{ _id }`;
        const data = await client.fetch(query);
        if (data?._id) {
          setCrowdWorkId(data._id);
        }
      } catch (error) {
        console.error('Error fetching crowd work event:', error);
      }
    };
    fetchCrowdWorkEvent();
  }, []);

  const handleCardClick = (event: HighlightEvent) => {
    if (event.isCrowdWork && crowdWorkId) {
      router.push(`/event/${crowdWorkId}`);
    }
  };

  return (
    <motion.section
      className="w-full py-20 bg-black text-white relative"
      initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <div className="w-full max-w-[1920px] mx-auto px-6 md:px-12 2xl:px-12">
        {/* Header */}
        <div className="border-b border-white/20 pb-6 mb-12">
          <h2 className="text-4xl md:text-5xl 2xl:text-7xl font-bold uppercase text-white font-clash tracking-tight text-center md:text-left">
            Spotlight Events
          </h2>
          <p className="text-gray-400 mt-3 text-base md:text-lg font-sans text-center md:text-left">
            Don&apos;t miss these!
          </p>
        </div>

        {/* Poster Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {highlights.map((event, index) => {
            const isClickable = event.isCrowdWork && crowdWorkId;

            return (
              <div
                key={event.title}
                onClick={() => handleCardClick(event)}
                className={`group relative rounded-lg overflow-hidden bg-white/5 transition-all duration-500 border border-white/10 hover:border-emerald-400/50 hover:shadow-[0_0_25px_rgba(89,203,171,0.15),inset_0_0_25px_rgba(89,203,171,0.05)] ${isClickable ? 'cursor-pointer' : ''
                  }`}
              >
                {/* Poster Image */}
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src={event.poster}
                    alt={event.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    priority={index === 0}
                  />

                  {/* Arrow for clickable card */}
                  {isClickable && (
                    <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
                      <div className="w-9 h-9 rounded-full bg-emerald-400/20 border border-emerald-400/40 flex items-center justify-center backdrop-blur-md">
                        <svg
                          className="w-4 h-4 text-emerald-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  )}
                </div>

                {/* Content section */}
                <div className="p-5 md:p-6 bg-black">
                  <h3 className="text-xl md:text-2xl font-bold font-clash text-white mb-1 group-hover:text-emerald-400 transition-colors duration-300">
                    {event.title}
                  </h3>
                  <p className="text-gray-400 text-sm md:text-base font-sans">
                    {event.subtitle}
                  </p>
                  {isClickable && (
                    <p className="text-emerald-400/70 text-xs font-clash uppercase tracking-widest mt-3">
                      View Event →
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
}
