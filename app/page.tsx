import Hero from "./hero";
import Navbar from "./navbar";
import SpeakerCarousel from "./speaker";
import About from "./about";
import Schedule from "./schedule";
import Footer from "./footer";

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
      <section id="speakers">
        <SpeakerCarousel />
      </section>
      <section id="schedule">
        <Schedule />
      </section>
      <section id="contact">
        <Footer />
      </section>
    </main>
  );
}
