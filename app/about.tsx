"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

export default function About() {
  const containerRef = useRef(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  // Trigger animations when the section comes into view
  const isInView = useInView(containerRef, { amount: 0.3 });

  // Handle video autoplay/pause based on visibility
  useEffect(() => {
    if (videoRef.current) {
      if (isInView) {
        videoRef.current.play().catch((e) => console.log("Autoplay blocked", e));
      } else {
        videoRef.current.pause();
      }
    }
  }, [isInView]);

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full bg-black text-white overflow-hidden flex flex-col items-center justify-center pt-24 pb-10"
    >
      <div className="relative w-full max-w-6xl h-full grid grid-cols-1 md:grid-cols-12 md:grid-rows-12 gap-6 px-6 md:px-12 pointer-events-none">

        {/* --- CENTRAL TEXT --- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="md:col-start-3 md:col-span-8 md:row-start-1 md:row-span-2 flex flex-col items-center text-center z-30 pointer-events-auto"
        >
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold uppercase tracking-tighter mb-6 font-clash text-white">
            What is Vibhava?
          </h2>
          <p className="text-base md:text-xl font-medium text-neutral-400 max-w-2xl leading-relaxed font-clash">
            A convergence of tradition, innovation, and intellect.
            We bring together the brightest minds to explore the future.
          </p>
        </motion.div>

        {/* --- CENTRAL VIDEO --- */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          className="md:col-start-4 md:col-span-6 md:row-start-5 md:row-span-7 relative z-20 shadow-2xl rounded-sm overflow-hidden pointer-events-auto bg-neutral-900 border border-white/5"
        >
          <video
            ref={videoRef}
            className="w-full h-full object-cover opacity-90 transition-opacity duration-500 hover:opacity-100"
            muted
            loop
            playsInline
            poster="https://picsum.photos/seed/poster/800/600"
          >
            <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4" type="video/mp4" />
          </video>

          <div className="absolute inset-0 flex items-center justify-center pointer-events-none mix-blend-difference">
          </div>
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
          className="hidden md:block absolute top-[5%] right-[2%] w-44 h-32 rounded-sm overflow-hidden z-10 pointer-events-auto opacity-70 hover:opacity-100 transition-opacity duration-500"
        >
          <img src="https://picsum.photos/seed/elegan1/300/400" alt="Decoration" className="w-full h-full object-cover grayscale brightness-75 hover:grayscale-0 hover:brightness-100 transition-all duration-700" />
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
          className="hidden md:block absolute top-[15%] left-[3%] w-40 h-28 rounded-sm overflow-hidden z-10 pointer-events-auto opacity-60 hover:opacity-100 transition-opacity duration-500"
        >
          <img src="https://picsum.photos/seed/vibha_extra1/400/300" alt="Decoration" className="w-full h-full object-cover grayscale brightness-75 hover:grayscale-0 hover:brightness-100 transition-all duration-700" />
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
          className="hidden md:block absolute bottom-[18%] left-[2%] w-32 h-38 rounded-sm overflow-hidden z-10 pointer-events-auto opacity-70 hover:opacity-100 transition-opacity duration-500"
        >
          <img src="https://picsum.photos/seed/elegan2/400/300" alt="Decoration" className="w-full h-full object-cover grayscale brightness-75 hover:grayscale-0 hover:brightness-100 transition-all duration-700" />
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
          className="hidden md:block absolute bottom-[15%] right-[1%] w-32 h-48 rounded-sm overflow-hidden z-10 pointer-events-auto opacity-60 hover:opacity-100 transition-opacity duration-500"
        >
          <img src="https://picsum.photos/seed/vibha_extra2/300/400" alt="Decoration" className="w-full h-full object-cover grayscale brightness-75 hover:grayscale-0 hover:brightness-100 transition-all duration-700" />
        </motion.div>


      </div>
    </section>
  );
}
