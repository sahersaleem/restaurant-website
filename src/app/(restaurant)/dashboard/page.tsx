import React from "react";
import Dashboard from "../_components/Dashboard";
import { MdMenuBook } from "react-icons/md";
import { IoLocation } from "react-icons/io5";
import { AiOutlineProfile } from "react-icons/ai";
import { MdOutlineWorkspacePremium } from "react-icons/md";

const page = () => {
  return (
    <div className="bg-white  mt-10 w-full ">
      <h1 className="text-4xl text-center font-bold ">Restaurant Dashboard</h1>
      <div className="p-10 flex justify-between gap-10 flex-wrap">
      <div className="max-w-[300px] bg-[#FFB200] rounded-lg shadow-lg p-8 space-y-4 hover:bg-[#FFB200]/90  transition-colors">
            <MdMenuBook size={50}/>
          <h3 className="text-lg">Upload Menu</h3>
        
          <p>
            Easily upload your restaurant&apos;s menu in PDF format so customers
            can view or download it anytime
          </p>
          <button className="homepage-btn">View</button>
        </div>
        <div className="max-w-[300px] bg-[#FFB200] rounded-lg shadow-lg p-8 space-y-4 hover:bg-[#FFB200]/90  transition-colors">
          {" "}
          <AiOutlineProfile size={50}/>
          <h3 className="text-lg">Update Restaurant Profile</h3>
          <p>
            Keep your restaurant details up to date – name, address, cuisine
            type, opening hours, and more
          </p>
          <button className="homepage-btn">Edit Profile</button>
        </div>
        <div className="max-w-[300px] bg-[#FFB200] rounded-lg shadow-lg p-8 space-y-4 hover:bg-[#FFB200]/90  transition-colors">
          {" "} <IoLocation size={50}/>
          <h3 className="text-lg"> Set Your Location</h3>
          <p>
            Pin your exact restaurant location on the map to help customers find
            you easily
          </p>
          <button className="homepage-btn">Set Location</button>
        </div>
        <div className="max-w-[300px] bg-[#FFB200] rounded-lg shadow-lg p-8 space-y-4 hover:bg-[#FFB200]/90  transition-colors">
          {" "} <MdOutlineWorkspacePremium  size={50}/>
          <h3 className="text-lg">Upgrade to Premium</h3>
          <p>
            Boost your restaurant’s visibility on the homepage and search
            results with a premium subscription.
          </p>
          <button className="homepage-btn">View</button>
        </div>
      </div>
    </div>
  );
};

export default page;
