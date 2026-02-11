"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const sponsors = [
  { name: "KSUM", logo: "/sponsors/KSUM_logo.png" },
  { name: "Toyota", logo: "/sponsors/Toyota_logo.png" },
  { name: "Milma", logo: "/sponsors/Milma_logo.svg", className: "scale-[1.2]" },
  { name: "Culinary Story", logo: "/sponsors/Culinary_Story_logo.png" },
  { name: "KIA", logo: "/sponsors/KIA_logo.png", className: "scale-[0.8]" },
  { name: "Honda", logo: "/sponsors/Honda_Logo.png" },
  { name: "TinkerHub", logo: "/sponsors/TinkerHub_logo.png" },
  { name: "Halwani", logo: "/sponsors/Halwani_logo.png", className: "translate-y-1.5" },
];

export default function SponsorMarquee() {
  interface MarqueeItem {
    type: "label" | "logo";
    name: string;
    logo?: string;
    className?: string;
  }

  const content: MarqueeItem[] = [];
  sponsors.forEach((sponsor, index) => {
    if (index % 4 === 0) {
      content.push({ type: "label", name: "Our Partners" });
    }
    content.push({ type: "logo", ...sponsor });
  });

  return (
    <motion.div
      className="absolute bottom-0 left-0 w-full z-20 bg-black/40 backdrop-blur-md py-3 border-t border-white/5 overflow-hidden flex items-center"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
    >
      <div className="flex relative w-full">
        <motion.div
          className="flex whitespace-nowrap gap-12 md:gap-20 items-center px-4"
          animate={{ x: "-50%" }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 40,
          }}
        >
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex gap-12 md:gap-20 items-center">
              {content.map((item, index) =>
                item.type === "label" ? (
                  <span
                    key={`label-${index}`}
                    className="text-[9px] md:text-[11px] font-bold tracking-[0.3em] text-white/50 uppercase font-clash shrink-0"
                  >
                    {item.name}
                  </span>
                ) : (
                  <div
                    key={`logo-${index}`}
                    className={`relative h-5 md:h-7 2xl:h-9 flex items-center justify-center grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-300 shrink-0 ${item.className || ""
                      }`}
                  >
                    <img
                      src={item.logo}
                      alt={item.name}
                      className="h-full w-auto object-contain max-w-[100px] md:max-w-[140px] 2xl:max-w-[180px]"
                    />
                  </div>
                )
              )}
            </div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}
