'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, animate } from 'framer-motion';
import Image from 'next/image';
import PixelCard from '@/components/PixelCard';

const speakers = [
  { id: 1, name: "Moosa Mehar", image: "/speakers/Moosa_Mehar.jpeg" }, // Electric Blue
  { id: 2, name: "", image: "", color: '#2AFC98' }, // Neon Green
  { id: 3, color: '#F9E900' }, // Bright Yellow
  { id: 4, color: '#EA00D9' }, // Hot Pink/Magenta
  { id: 5, color: '#8000FF' }, // Vibrant Purple
  { id: 6, color: '#2AFC98' }, // Neon Green
  { id: 7, color: '#F9E900' }, // Bright Yellow
  { id: 8, color: '#2DE1FC' }, // Electric Blue
];

export default function SpeakerCarousel() {
  const carouselRef = useRef<HTMLDivElement>(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [width, setWidth] = useState(0);
  const x = useMotionValue(0);

  useEffect(() => {
    if (carouselRef.current) {
      setWidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth);
    }
  }, []);

  const ITEMS_PER_PAGE_MOBILE = 1;
  const ITEMS_PER_PAGE_DESKTOP = 4;
  const ITEMS_PER_PAGE_2XL = 5;

  const [breakpoint, setBreakpoint] = useState<'mobile' | 'desktop' | '2xl'>('desktop');

  useEffect(() => {
    const checkBreakpoint = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setBreakpoint('mobile');
      } else if (width >= 1536) {
        setBreakpoint('2xl');
      } else {
        setBreakpoint('desktop');
      }
    };
    checkBreakpoint();
    let resizeTimer: ReturnType<typeof setTimeout> | null = null;
    const handleResize = () => {
      if (resizeTimer) clearTimeout(resizeTimer);
      resizeTimer = setTimeout(checkBreakpoint, 150);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      if (resizeTimer) clearTimeout(resizeTimer);
    };
  }, []);

  const itemsPerPage = breakpoint === 'mobile' ? ITEMS_PER_PAGE_MOBILE : (breakpoint === '2xl' ? ITEMS_PER_PAGE_2XL : ITEMS_PER_PAGE_DESKTOP);
  const totalPages = Math.ceil(speakers.length / itemsPerPage);

  const handleDragEnd = () => {
    const currentX = x.get();
    const containerWidth = carouselRef.current ? carouselRef.current.offsetWidth : 0;

    const scrollAmount = containerWidth;

    const newPage = Math.round(Math.abs(currentX) / scrollAmount);
    const clampedPage = Math.max(0, Math.min(newPage, totalPages - 1));

    scrollTo(clampedPage);
  };

  const scrollTo = (pageIndex: number) => {
    setCurrentIndex(pageIndex);
    const containerWidth = carouselRef.current ? carouselRef.current.offsetWidth : 0;

    const targetX = -pageIndex * containerWidth;

    animate(x, targetX, {
      type: "tween",
      ease: "easeInOut",
      duration: 0.5,
    });
  };

  return (
    <motion.section
      className="w-full max-w-[1820px] py-16 bg-black flex flex-col justify-center overflow-hidden"
      initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >

      {/* Title Animation */}
      <div
        className="w-full max-w-[1820px] mx-auto px-6 md:px-12 2xl:px-12 mb-8"
      >
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end border-b border-white/20 pb-6">
          <div className="mb-4 md:mb-0 text-center md:text-left">
            <h2 className="text-4xl md:text-5xl 2xl:text-7xl font-bold uppercase text-white font-clash tracking-tight">
              Speakers
            </h2>
          </div>
        </div>
      </div>

      {/* Carousel Animation */}
      <div
        className="w-full max-w-[1920px] mx-auto px-6 md:px-12 2xl:px-12"
      >
        <div ref={carouselRef} className="w-full cursor-grab active:cursor-grabbing overflow-hidden">
          <motion.div
            drag="x"
            dragConstraints={{ right: 0, left: -((totalPages - 1) * (carouselRef.current?.offsetWidth || 0)) }}
            style={{ x }}
            onDragEnd={handleDragEnd}
            className="flex select-none"
          >
            {speakers.map((speaker, index) => (
              <div
                key={`${speaker.id}-${index}`}
                className={`flex-shrink-0 p-2 ${breakpoint === 'mobile' ? 'w-full' : (breakpoint === '2xl' ? 'w-1/5' : 'w-1/4')}`}
              >
                <PixelCard
                  colors={speaker.color}
                  className="w-full aspect-[3/4] rounded-2xl group overflow-hidden border-none"
                >
                  {/* Image Background */}
                  {speaker.image && (
                    <div className="absolute inset-0">
                      <Image
                        src={speaker.image}
                        alt={speaker.name || "Speaker"}
                        fill
                        className="object-cover transition-all duration-500 pointer-events-none select-none"
                        sizes="(max-width: 768px) 100vw, (max-width: 1536px) 25vw, 20vw"
                      />
                    </div>
                  )}

                  {/* Content Overlay */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6 z-10 pointer-events-none">
                    {!speaker.image && (
                      <h3 className="text-4xl md:text-5xl 2xl:text-6xl font-black leading-none text-center uppercase tracking-tighter font-clash text-white mix-blend-overlay opacity-50">
                        Coming<br />Soon
                      </h3>
                    )}
                  </div>

                  {/* Subtle Noise/Texture Overlay */}
                  <div className="absolute inset-0 bg-black/5 opacity-50 pointer-events-none" />
                </PixelCard>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: totalPages }).map((_, pageIdx) => (
            <button
              key={pageIdx}
              onClick={() => scrollTo(pageIdx)}
              className={`h-2 rounded-full transition-all duration-300 ${currentIndex === pageIdx ? 'bg-white w-8' : 'bg-white/30 w-2 hover:bg-white/50'
                }`}
              aria-label={`Go to page ${pageIdx + 1}`}
            />
          ))}
        </div>
      </div>
    </motion.section>
  );
}
