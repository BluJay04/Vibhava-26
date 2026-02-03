"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";

const MotionLink = motion.create(Link);

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [navOffset, setNavOffset] = useState(0);
  const navRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 100);
  });

  // Calculate the exact pixel distance to move from Center to Right
  useEffect(() => {
    const calculateOffset = () => {
      if (!navRef.current) return;

      const screenW = window.innerWidth;
      const elW = navRef.current.offsetWidth;
      const paddingRight = 48;

      const targetX = (screenW / 2) - (elW / 2) - paddingRight;
      setNavOffset(targetX);
    };

    calculateOffset();
    window.addEventListener("resize", calculateOffset);
    return () => window.removeEventListener("resize", calculateOffset);
  }, []);

  return (
    <motion.nav
      className={`fixed top-0 left-0 w-full z-50 px-6 md:px-12 py-4 flex items-center justify-between transition-all duration-500 ${isScrolled ? "bg-black/60 backdrop-blur-md py-4" : "bg-transparent"
        }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="flex w-full items-center justify-between relative">
        {/* 1. Logo Section (Left) */}
        <div className="flex-shrink-0 flex items-center z-50 pointer-events-auto">
          <Link href="/" className="flex items-center gap-3 group">
            <motion.div
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="w-10 h-10 flex items-center justify-center bg-gradient-to-br from-emerald-400 to-teal-600 rounded-sm shadow-lg"
            >
              <span className="text-white font-bold text-lg font-clash">V</span>
            </motion.div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-wider text-white uppercase font-clash group-hover:text-emerald-400 transition-colors">
                Vibhava
              </span>
            </div>
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden z-50">
          <button onClick={toggleMobileMenu} className="text-white focus:outline-none">
            {isMobileMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-menu"><line x1="4" x2="20" y1="12" y2="12" /><line x1="4" x2="20" y1="6" y2="6" /><line x1="4" x2="20" y1="18" y2="18" /></svg>
            )}
          </button>
        </div>

        {/* Desktop Nav */}
        <motion.div
          className="hidden md:flex absolute left-1/2 top-1/2 -translate-y-1/2 z-40"
          initial={false}
          animate={{
            x: isScrolled ? "-50%" : `calc(-50% + ${navOffset}px)`
          }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} // "Expo out" feel for luxury smooth
        >
          <div
            ref={navRef}
            className="flex items-center gap-8 delay-100"
          >
            {[
              { name: "ABOUT", href: "/#about" },
              { name: "EVENTS", href: "/#schedule" },
              { name: "CONTACT", href: "/#contact" }
            ].map((link) => (
              <MotionLink
                key={link.name}
                href={link.href}
                className="relative text-sm font-bold tracking-widest text-white/80 hover:text-white uppercase font-clash transition-colors text-decoration-none"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {link.name}
              </MotionLink>
            ))}
          </div>
        </motion.div>

        {/* 3. CTA Section (Right - Pops in via Absolute to not disturb flow) */}
        <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 z-50 pointer-events-auto">
          <AnimatePresence>
            {isScrolled && (
              <motion.div
                initial={{ opacity: 0, x: 20, scale: 0.8 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 20, scale: 0.8 }}
                transition={{ duration: 0.5, ease: "backOut" }}
              >
                <MotionLink
                  href="/bookings"
                  className="group relative inline-flex items-center justify-center overflow-hidden bg-white text-black px-8 py-3 font-bold rounded-sm transition-all duration-300 hover:bg-emerald-400 hover:text-white"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="text-xs tracking-wide uppercase font-clash relative z-10">Get Tickets</span>
                </MotionLink>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-full left-0 w-full bg-black/95 backdrop-blur-xl border-t border-white/10 flex flex-col items-center py-8 gap-6 md:hidden shadow-2xl"
            >
              {[
                { name: "ABOUT", href: "/#about" },
                { name: "EVENTS", href: "/iternary" },
                { name: "CONTACT", href: "/#contact" }
              ].map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-lg font-bold tracking-widest text-white hover:text-emerald-400 uppercase font-clash"
                >
                  {link.name}
                </Link>
              ))}
              <div className="mt-4">
                <MotionLink
                  href="/bookings"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="inline-flex items-center justify-center bg-white text-black px-8 py-3 font-bold rounded-sm hover:bg-emerald-400 hover:text-white"
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="text-sm tracking-wide uppercase font-clash">Get Tickets</span>
                </MotionLink>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}
