import About from "@/components/landingPageComponent/About";
import Hero from "@/components/landingPageComponent/Hero";
import Navbar from "@/components/landingPageComponent/Navbar";

export default function Home() {
  return (
    <div className=" w-full bg-bgBlack/80 bg-[url('/images/hero-section-bg.jpg')] h-screen bg-center bg-opacity-25 ">
      <div className="absolute inset-0 bg-black/80 z-0"></div>
      <div className="relative z-10 h-screen  max-w-7xl mx-auto">
        <Navbar />
        <Hero />
      </div>
      <About />
    </div>
  );
}
