import About from "@/components/landingPageComponent/About";
import Advertisement from "@/components/landingPageComponent/Advertisement";
import All_restaurants from "@/components/landingPageComponent/All_restaurants";
import Footer from "@/components/landingPageComponent/Footer";
import Hero from "@/components/landingPageComponent/Hero";
import Navbar from "@/components/landingPageComponent/Navbar";
import { Suspense } from "react";

export default function Home() {
  return (
    <div className=" w-full lg:bg-[#18171C] h-[90vh]  ">
      <Suspense fallback={<div>Loading...</div>}>
        <Navbar />
      </Suspense>
      <Hero />
      <div className="h-auto max-w-7xl mx-auto mb-20 sm:mb-0  ">
      <Suspense fallback={<div>Loading...</div>}>

        <All_restaurants />
        </Suspense>
      </div>

      <Advertisement position="inline" />
      <Footer />
    </div>
  );
}
