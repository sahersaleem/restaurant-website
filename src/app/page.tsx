import About from "@/components/landingPageComponent/About";
import All_restaurants from "@/components/landingPageComponent/All_restaurants";
import Footer from "@/components/landingPageComponent/Footer";
import Hero from "@/components/landingPageComponent/Hero";
import Navbar from "@/components/landingPageComponent/Navbar";

export default function Home() {
  return (
    <div className=" w-full bg-[#18171C] h-screen ">
      <div className=" z-10 h-auto  max-w-7xl mx-auto">
        <Navbar />
        <Hero />
        <All_restaurants/>
   
      </div>
      <Footer/>
    </div>
  );
}
