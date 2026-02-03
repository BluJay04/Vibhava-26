'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, animate, useInView } from 'framer-motion';
import PixelCard from '@/components/PixelCard';

const speakers = [
  {
    id: 1,
    name: 'DAVID HARBOUR',
    role: 'CEO, Company',
    color: '#2DE1FC', // Electric Blue
    image: '/speakers/speaker_1.png',
  },
  {
    id: 2,
    name: 'BRIE LARSON',
    role: 'CEO, Company',
    color: '#2AFC98', // Neon Green
    image: '/speakers/speaker_2.png',
  },
  {
    id: 3,
    name: 'RACHEL WEISZ',
    role: 'CEO, Company',
    color: '#F9E900', // Bright Yellow
    image: '/speakers/speaker_3.png',
  },
  {
    id: 4,
    name: 'BRIE LARSON',
    role: 'CEO, Company',
    color: '#EA00D9', // Hot Pink/Magenta
    image: '/speakers/speaker_4.png',
  },
  {
    id: 5,
    name: 'DAVID HARBOUR',
    role: 'CEO, Company',
    color: '#8000FF', // Vibrant Purple
    image: '/speakers/speaker_1.png',
  },
  {
    id: 6,
    name: 'BRIE LARSON',
    role: 'CEO, Company',
    color: '#2AFC98', // Neon Green
    image: '/speakers/speaker_2.png',
  },
  {
    id: 7,
    name: 'RACHEL WEISZ',
    role: 'CEO, Company',
    color: '#F9E900', // Bright Yellow
    image: '/speakers/speaker_3.png',
  },
  {
    id: 8,
    name: 'DAVID HARBOUR',
    role: 'CEO, Company',
    color: '#2DE1FC', // Electric Blue
    image: '/speakers/speaker_4.png',
  },
];

export default function SpeakerCarousel() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { amount: 0.2, once: false }); // Allow re-trigger for outro effect

  const [currentIndex, setCurrentIndex] = useState(0);
  const [width, setWidth] = useState(0);
  const x = useMotionValue(0);

  useEffect(() => {
    if (carouselRef.current) {
      setWidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth);
    }
  }, []);

  const ITEMS_PER_PAGE_DESKTOP = 4;
  const ITEMS_PER_PAGE_MOBILE = 1;

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const itemsPerPage = isMobile ? ITEMS_PER_PAGE_MOBILE : ITEMS_PER_PAGE_DESKTOP;
  const totalPages = Math.ceil(speakers.length / itemsPerPage);

  const handleDragEnd = () => {
    const currentX = x.get();
    const cardWidth = isMobile ? (carouselRef.current ? carouselRef.current.offsetWidth * 0.8 : 240) : (carouselRef.current ? carouselRef.current.offsetWidth / 4 : 300);
    const containerWidth = carouselRef.current ? carouselRef.current.offsetWidth : 0;

    const scrollAmount = isMobile ? cardWidth : containerWidth;

    const newPage = Math.round(Math.abs(currentX) / scrollAmount);
    const clampedPage = Math.max(0, Math.min(newPage, totalPages - 1));

    scrollTo(clampedPage);
  };

  const scrollTo = (pageIndex: number) => {
    setCurrentIndex(pageIndex);
    const containerWidth = carouselRef.current ? carouselRef.current.offsetWidth : 0;

    let targetX = 0;
    if (isMobile) {
      const mobileCardWidth = containerWidth * 0.8;
      targetX = -pageIndex * mobileCardWidth;
    } else {
      targetX = -pageIndex * containerWidth;
    }

    animate(x, targetX, {
      type: "tween",
      ease: "easeInOut",
      duration: 0.5,
    });
  };

  return (
    <section ref={sectionRef} className="w-full py-16 bg-black flex flex-col justify-center overflow-hidden">

      {/* Title Animation */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="container mx-auto px-12 mb-8"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-center md:text-left text-white uppercase tracking-tighter font-clash">
          Speakers
        </h2>
      </motion.div>

      {/* Carousel Animation */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        className="container mx-auto px-4 md:px-10"
      >
        <div ref={carouselRef} className="w-full cursor-grab active:cursor-grabbing overflow-hidden">
          <motion.div
            drag="x"
            dragConstraints={{ right: 0, left: -((totalPages - 1) * (carouselRef.current?.offsetWidth || 0)) }}
            style={{ x }}
            onDragEnd={handleDragEnd}
            className="flex w-full"
          >
            {speakers.map((speaker, index) => (
              <div
                key={`${speaker.id}-${index}`}
                className="flex-shrink-0 w-[80%] md:w-1/4 p-2"
              >
                <PixelCard
                  colors={speaker.color}
                  className="w-full h-[340px] md:h-[420px] rounded-sm group overflow-hidden border-none"
                >
                  <div
                    className="absolute inset-0 w-full h-full bg-cover bg-center mix-blend-multiply opacity-80 transition-transform duration-500 group-hover:scale-105"
                    style={{
                      backgroundImage: `linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.2) 100%), url(${speaker.image})`
                    }}
                  />

                  {/* Content Overlay */}
                  <div className="absolute bottom-0 left-0 w-full p-6 text-white z-10 pointer-events-none">
                    <h3 className="text-3xl font-bold leading-none mb-1 uppercase tracking-tight font-clash">
                      {speaker.name.split(' ').map((part, i) => (
                        <span key={i} className="block">{part}</span>
                      ))}
                    </h3>
                    <p className="text-sm font-medium opacity-90 uppercase tracking-wide font-clash">
                      {speaker.role}
                    </p>
                  </div>

                  {/* Simulated Duotone Image Filter Effect (Overlay) */}
                  <div className="absolute inset-0 bg-black/10 mix-blend-overlay pointer-events-none" />
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
      </motion.div>
    </section>
  );
}
