import React from "react";
import Dashboard from "../_components/Dashboard";
import { MdMenuBook } from "react-icons/md";
import { IoLocation } from "react-icons/io5";
import { AiOutlineProfile } from "react-icons/ai";
import { MdOutlineWorkspacePremium } from "react-icons/md";
import Link from "next/link";
import { ArrowBigLeft } from "lucide-react";

const page = () => {
  return (
    <div className="bg-white  mt-20 sm:mt-10 w-full h-screen">
      <div className="flex flex-col justify-center items-center">  <h1 className="text-2xl sm:text-4xl text-center font-bold font-poppins underline ">Restaurant  Dashboard</h1>
      <Link href={'/'} className="text-center font-poppins font-bold mt-10 hover:text-red"><ArrowBigLeft className="inline-block"/>Go to home page</Link></div>
    
      <div className="p-10 flex justify-between gap-10 flex-wrap mt-10">
      <div className="max-w-[300px] bg-[#FFF085] rounded-lg shadow-lg p-8 space-y-4 hover:bg-[#FFF085]/90  transition-colors">
            <MdMenuBook size={50}/>
          <h3 className="text-lg">Upload Menu</h3>
        
          <p>
            Easily upload your restaurant&apos;s menu in PDF format so customers
            can view or download it anytime
          </p>
          <button className="homepage-btn"> <Link href={'/dashboard/upload-menu'}>View</Link></button>
        </div>
        <div className="max-w-[300px] bg-[#FFF085] rounded-lg shadow-lg p-8 space-y-4 hover:bg-[#FFF085]/90  transition-colors">
          {" "}
          <AiOutlineProfile size={50}/>
          <h3 className="text-lg">Update Restaurant Profile</h3>
          <p>
            Keep your restaurant details up to date – name, address, cuisine
            type, opening hours, and more
          </p>
          <button className="homepage-btn"><Link href={'/dashboard/profile'}>View</Link></button>
        </div>
      
        <div className="max-w-[300px] bg-[#FFF085] rounded-lg shadow-lg p-8 space-y-4 hover:bg-[#FFF085]/90  transition-colors">
          {" "} <MdOutlineWorkspacePremium  size={50}/>
          <h3 className="text-lg">Upgrade to Premium</h3>
          <p>
            Boost your restaurant’s visibility on the homepage and search
            results with a premium subscription.
          </p>
          <button className="homepage-btn"><Link href={'/dashboard/subscription'}>View</Link></button>
        </div>
      </div>
    </div>
  );
};

export default page;
