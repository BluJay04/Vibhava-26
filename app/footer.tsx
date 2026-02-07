
'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer className="w-full bg-black px-4 md:px-8 pb-4 pt-8">
      <motion.div
        className="bg-emerald-400 rounded-3xl p-6 md:p-8 text-black w-full shadow-2xl"
        initial={{ opacity: 0, scale: 0.98, filter: "blur(10px)" }}
        whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">

          {/* Left Column: Contacts & Social Links */}
          <div className="flex flex-col justify-between gap-8">

            <div className="flex flex-col gap-6">
              {/* Contacts */}
              <div className="flex flex-col gap-4">
                <h3 className="text-3xl md:text-4xl font-black font-clash uppercase tracking-tighter leading-none">
                  Contact Us
                </h3>
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col">
                    <span className="font-bold text-sm uppercase tracking-wider opacity-80">Convener</span>
                    <div className="flex flex-col">
                      <p className="text-xl font-bold font-clash leading-tight">Aditya Das</p>
                      <a href="tel:+919876543210" className="text-lg font-medium hover:underline decoration-black decoration-2 underline-offset-2 transition-all w-fit">+91 81378 68579</a>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-sm uppercase tracking-wider opacity-80">Outreach Lead</span>
                    <div className="flex flex-col">
                      <p className="text-xl font-bold font-clash leading-tight">Kalias Sachdev</p>
                      <a href="tel:+919876543211" className="text-lg font-medium hover:underline decoration-black decoration-2 underline-offset-2 transition-all w-fit">+91 62822 88093</a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex flex-col gap-4">
                <h3 className="text-3xl md:text-4xl font-black font-clash uppercase tracking-tighter leading-none">
                  Connect
                </h3>
                <div className="flex flex-col gap-1">
                  <Link href="https://www.instagram.com/vibhavacusat" target="_blank" className="text-xl font-bold font-clash hover:translate-x-1 transition-transform w-fit">
                    Instagram ↗
                  </Link>
                  <Link href="https://www.linkedin.com/company/vibhava-innovation-summit/" target="_blank" className="text-xl font-bold font-clash hover:translate-x-1 transition-transform w-fit">
                    LinkedIn ↗
                  </Link>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Map */}
          <div className="flex flex-col gap-2">
            <h3 className="text-3xl md:text-4xl font-black font-clash uppercase tracking-tighter leading-none mb-2">
              Location
            </h3>
            <div className="w-full h-full min-h-[300px] rounded-xl overflow-hidden border-2 border-black/10 bg-black/5 relative shadow-inner">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3928.6186678460126!2d76.3314729!3d10.048292099999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b080c3a571be335%3A0xe9d0d17ee3a87389!2sSchool%20of%20Engineering%2C%20CUSAT!5e0!3m2!1sen!2sin!4v1770139748760!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0, position: 'absolute', inset: 0, filter: 'grayscale(100%) invert(0%)' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
            <p className="text-black/70 font-medium text-right text-xs uppercase tracking-wide">
              School of Engineering, CUSAT • Kochi, Kerala
            </p>
          </div>

        </div>
      </motion.div>
    </footer>
  );
}
