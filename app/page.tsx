import dynamic from "next/dynamic";
import Hero from "./hero";
import Navbar from "./navbar";

// Lazy load below-the-fold components
const About = dynamic(() => import("./about"), { ssr: true });
const SpeakerCarousel = dynamic(() => import("./speaker"), { ssr: true });
const Highlights = dynamic(() => import("./highlights"), { ssr: true });
const Schedule = dynamic(() => import("./schedule"), { ssr: true });
const Footer = dynamic(() => import("./footer"), { ssr: true });

export default function Home() {
  return (
    <main className="bg-black">
      <Navbar />
      <section id="hero">
        <Hero />
      </section>
      <section id="about">
        <About />
      </section>
      <section id="highlights">
        <Highlights />
      </section>
      <section id="speakers">
        <SpeakerCarousel />
      </section>
      <section id="schedule">
        <Schedule excludeHighlights />
      </section>
      <section id="contact">
        <Footer />
      </section>
    </main>
  );
}
