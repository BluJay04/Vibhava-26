"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";

const CAROUSEL_IMAGES = [
  "/about/About_2.jpg",
  "/about/About_6.jpg",
  "/about/About_7.jpg",
  "/about/About_8.jpg",
];

export default function About() {
  const containerRef = useRef(null);
  const [currentImage, setCurrentImage] = useState(0);
  // Trigger animations when the section comes into view
  const isInView = useInView(containerRef, { amount: 0.3 });

  // Handle carousel auto-rotation
  useEffect(() => {
    if (isInView) {
      const interval = setInterval(() => {
        setCurrentImage((prev) => (prev + 1) % CAROUSEL_IMAGES.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [isInView]);

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full bg-black text-white overflow-hidden flex flex-col items-center justify-center pt-24 pb-10"
    >
      <div className="relative w-full max-w-6xl 2xl:max-w-[90rem] h-auto md:h-full grid grid-cols-1 md:grid-cols-12 md:grid-rows-12 gap-12 md:gap-6 px-6 md:px-12 2xl:px-24 pointer-events-none">

        {/* --- CENTRAL TEXT --- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="md:col-start-3 md:col-span-8 2xl:col-start-2 2xl:col-span-10 md:row-start-1 md:row-span-2 sm:-mt-8 flex flex-col items-center text-center z-30 pointer-events-auto"
        >
          <h2 className="text-3xl md:text-5xl lg:text-6xl 2xl:text-7xl font-bold uppercase mb-4 sm:mb-6 lg:mb-2 2xl:mb-6 font-clash text-white">
            What is Vibhava?
          </h2>
          <p className="text-base md:text-xl 2xl:text-2xl font-medium text-neutral-400 max-w-2xl 2xl:max-w-6xl leading-relaxed font-clash">
            A convergence of tradition, innovation, and intellect. Where bold ideas meet brilliant minds and innovation comes alive. It’s a launchpad for creators, thinkers, and doers to turn imagination into impact.
          </p>
        </motion.div>

        {/* --- Central Carousel --- */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          className="md:col-start-4 md:col-span-6 2xl:col-start-2 2xl:col-span-10 md:row-start-5 md:row-span-7 2xl:row-start-4 2xl:row-span-8 relative z-20 shadow-2xl rounded-sm overflow-hidden pointer-events-auto bg-neutral-900 border border-white/5 h-[40vh] md:h-auto"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentImage}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              className="absolute inset-0 w-full h-full"
            >
              <Image
                src={CAROUSEL_IMAGES[currentImage]}
                alt="Vibhava Values"
                fill
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1536px) 50vw, 40vw"
                className="object-cover"
              />
            </motion.div>
          </AnimatePresence>
        </motion.div>




        {/* --- FLOATING ELEMENTS (More & smaller) --- */}

        {/* Top Right: Floating Portrait */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={isInView ? {
            opacity: 1,
            x: 0,
            y: [0, -4, 0],
          } : {}}
          transition={{
            opacity: { duration: 0.8, delay: 0.4 },
            y: { duration: 6, repeat: Infinity, ease: "easeInOut" }
          }}
          className="hidden md:block absolute top-[5%] right-[2%] 2xl:-right-[10%] w-44 h-32 2xl:w-72 2xl:h-48 rounded-sm overflow-hidden z-20 pointer-events-auto opacity-70 hover:opacity-100 transition-opacity duration-500"
        >
          <Image
            src="/about/About_1.jpg"
            alt="Decoration"
            fill
            sizes="(max-width: 1536px) 11rem, 18rem"
            className="object-cover transition-all duration-700"
          />
        </motion.div>

        {/* Top Left: Small Landscape (New) */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? {
            opacity: 1,
            x: 0,
            y: [0, 4, 0],
          } : {}}
          transition={{
            opacity: { duration: 0.8, delay: 0.6 },
            y: { duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1.5 }
          }}
          className="hidden md:block absolute top-[15%] left-[3%] 2xl:-left-[10%] w-40 h-28 2xl:w-60 2xl:h-40 rounded-sm overflow-hidden z-20 pointer-events-auto opacity-80 hover:opacity-100 transition-opacity duration-500"
        >
          <Image
            src="/about/About_5.jpg"
            alt="Decoration"
            fill
            sizes="(max-width: 1536px) 10rem, 15rem"
            className="object-cover transition-all duration-700"
          />
        </motion.div>

        {/* Bottom Left: Floating Landscape */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? {
            opacity: 1,
            x: 0,
            y: [0, 5, 0],
          } : {}}
          transition={{
            opacity: { duration: 0.8, delay: 0.5 },
            y: { duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }
          }}
          className="hidden md:block absolute bottom-[13%] left-[2%] 2xl:-left-[8%] w-32 h-38 2xl:w-52 2xl:h-78 rounded-sm overflow-hidden z-20 pointer-events-auto opacity-70 hover:opacity-100 transition-opacity duration-500"
        >
          <Image
            src="/about/About_3.jpg"
            alt="Decoration"
            fill
            sizes="(max-width: 1536px) 8rem, 13rem"
            className="object-cover transition-all duration-700"
          />
        </motion.div>

        {/* Bottom Right: Small Portrait (New) */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={isInView ? {
            opacity: 1,
            x: 0,
            y: [0, -5, 0],
          } : {}}
          transition={{
            opacity: { duration: 0.8, delay: 0.7 },
            y: { duration: 8, repeat: Infinity, ease: "easeInOut", delay: 0.5 }
          }}
          className="hidden md:block absolute bottom-[15%] right-[1%] 2xl:-right-[8%] w-32 h-48 2xl:w-48 2xl:h-72 rounded-sm overflow-hidden z-20 pointer-events-auto opacity-60 hover:opacity-100 transition-opacity duration-500"
        >
          <Image
            src="/about/About_9.jpg"
            alt="Decoration"
            fill
            sizes="(max-width: 1536px) 8rem, 12rem"
            className="object-cover transition-all duration-700"
          />
        </motion.div>


      </div>
    </section >
  );
}
