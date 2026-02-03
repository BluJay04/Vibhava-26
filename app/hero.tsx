
"use client"

import Link from "next/link";
import Image from "next/image";
import Prism from "../components/Prism";
import { motion } from "framer-motion";

const sponsors = [
  { name: "KSUM", logo: "/logos/ksum.png" },
  { name: "FabLab", logo: "/logos/fablab.png" },
  { name: "ASAP", logo: "/logos/asap-logo.png" },
  { name: "SolidWorks", logo: "/logos/SolidWorks-logo.png" },
  { name: "KIREAP", logo: "/logos/KIREAP-logo-light.jpeg" },
  { name: "Altair", logo: "/logos/Altair_logo.png" },
  { name: "Adhira Appa Coffee", logo: "/logos/AdhiraAppaCoffee-logo.png" },
];

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
          noise={0.5}
          glow={0.8}
          offset={{ x: 100, y: -90 }} // Explicit defaults if needed, or omit
        />
        {/* Helper gradient for text visibility - Reduced opacity */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black" />
      </div>

      {/* Main Content: Title (Centered/Left-Shifted) */}
      <div className="relative z-10 h-full flex flex-col justify-center px-8 md:px-20 w-full md:w-2/3 pointer-events-none">
        {/* Pointer events none on wrapper to let background be interactive if needed, but text needs auto */}
        <motion.div
          className="pointer-events-auto flex flex-col items-start gap-8 translate-y-8"
          initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div>
            <h1 className="text-4xl md:text-7xl font-black text-white tracking-tight leading-[0.9] font-clash">
              VIBHAVA <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-200">
                KNOWLEDGE <br /> FEST
              </span>
            </h1>
            <p className="mt-6 text-lg text-gray-300 max-w-xl leading-relaxed font-sans">
              Immerse yourself in a convergence of tradition, innovation, and intellect.
              Join us at CUSAT for an unforgettable journey.
            </p>
          </div>

          <Link href="/bookings" passHref>
            <motion.a
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.95 }}
              className="group relative inline-flex items-center justify-center overflow-hidden bg-white text-black px-10 py-5 font-bold rounded-xs transition-all duration-300 hover:bg-emerald-400 hover:text-white"
            >
              <span className="text-md tracking-wide uppercase font-clash">Get Tickets</span>
            </motion.a>
          </Link>
        </motion.div>
      </div>

      {/* Sponsor Marquee Overlay */}
      <div className="absolute bottom-0 left-0 w-full z-20 bg-black/20 backdrop-blur-sm py-4 border-t border-white/5 overflow-hidden">
        <div className="flex relative w-full">
          <motion.div
            className="flex whitespace-nowrap gap-16 items-center"
            animate={{ x: "-50%" }}
            transition={{
              repeat: Infinity,
              ease: "linear",
              duration: 30
            }}
          >
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex gap-16 items-center">
                {sponsors.map((sponsor, index) => (
                  <div key={index} className="relative h-8 md:h-12 w-24 md:w-32 flex items-center justify-center grayscale hover:grayscale-0 opacity-70 hover:opacity-100 transition-all duration-300">
                    <Image
                      src={sponsor.logo}
                      alt={sponsor.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                ))}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
