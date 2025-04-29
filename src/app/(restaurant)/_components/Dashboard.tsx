"use client";

import Image from "next/image";
import React, { useState } from "react";
import { restaurantDashboardLinks } from "@/data/dashboardLinks";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaBars } from "react-icons/fa";


const Dashboard = () => {
  const path = usePathname();
  const [isOpen , setIsOpen] = useState<boolean>(false)
  return (
    <div
    className={` fixed lg:relative h-auto min-h-screen bg-gray-100 shadow-lg z-50 transition-all duration-300
      ${isOpen ? "w-64 fixed " : "w-16 relative"} lg:w-72 px-4 py-6`}
  >
    {/* Top Logo and Button */}
    <div className="flex items-center justify-between">
      <Image
        src="/images/logo.png"
        width={180}
        height={100}
        alt="Logo"
        className={`transition-all duration-300 ${isOpen ? "w-32 h-24" : "w-0 h-0"} lg:w-[120px] lg:h-[120px]`}
      />
      {/* Toggle Button only on small screens */}
      <FaBars
        className="text-2xl cursor-pointer lg:hidden"
        onClick={() => setIsOpen(!isOpen)}
      />
    </div>

    {/* Sidebar Links */}
    <div className={`flex flex-col mt-10 gap-4 transition-all duration-300
      ${isOpen ? "opacity-100 visible" : "opacity-0 invisible lg:opacity-100 lg:visible"}`}>
      {restaurantDashboardLinks.map((item, i) => (
        <Link
          href={item.href}
          key={i}
          onClick={()=>setIsOpen(!isOpen)}
          className={`text-base font-medium w-full px-4 py-2 rounded-md transition-all
            ${path === item.href ? "bg-red text-white" : "text-black hover:bg-red hover:text-white"}`}
        >
          {item.label}
        </Link>
      ))}
    </div>
  </div>
  );
};

export default Dashboard;
