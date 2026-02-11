
"use client"

import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import SponsorMarquee from "../components/SponsorMarquee";

const Prism = dynamic(() => import("../components/Prism"), { ssr: false });

const MotionLink = motion.create(Link);

export default function Hero() {
  return (
    <section id="hero-section" className="relative h-screen w-full overflow-hidden bg-black">
      {/* Background Image/Effect */}
      <div className="absolute inset-0 z-0">
        <Prism
          animationType="rotate"
          timeScale={0.5}
          // height/baseWidth/scale adjusted for full screen coverage if needed, strictly following user request first
          height={3.4}
          baseWidth={5.5}
          scale={2.9}
          hueShift={0}
          colorFrequency={1}
          noise={0.3}
          glow={0.8}
          offset={{ x: 100, y: -90 }} // Explicit defaults if needed, or omit
          suspendWhenOffscreen={true}
        />
        {/* Helper gradient for text visibility - Reduced opacity */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black" />
      </div>

      {/* Main Content: Title (Centered/Left-Shifted) */}
      <div className="relative z-10 h-full flex flex-col justify-center px-8 md:px-20 2xl:px-32 w-full md:w-2/3 pointer-events-none">
        {/* Pointer events none on wrapper to let background be interactive if needed, but text needs auto */}
        <motion.div
          className="pointer-events-auto flex flex-col items-start gap-8 translate-y-8"
          initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div>
            <h1 className="text-4xl md:text-7xl 2xl:text-8xl font-black text-white tracking-tight leading-[0.9] font-clash">
              VIBHAVA <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-200">
                INNOVATION <br /> SUMMIT
              </span>
            </h1>
            <p className="mt-6 text-lg 2xl:text-xl text-gray-300 max-w-xl leading-relaxed font-sans">
              Immerse yourself in a convergence of tradition, innovation, and intellect.
              Join us at CUSAT for an unforgettable journey.
            </p>
          </div>

          <MotionLink
            href="/bookings"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.95 }}
            className="group relative inline-flex items-center justify-center overflow-hidden bg-white text-black px-10 py-5 font-bold rounded-xs transition-all duration-300 hover:bg-emerald-400 hover:text-white"
          >
            <span className="text-md tracking-wide uppercase font-clash">Get Tickets</span>
          </MotionLink>
        </motion.div>
      </div>

      {/* Using reused component */}
      <SponsorMarquee />
    </section>
  );
}
