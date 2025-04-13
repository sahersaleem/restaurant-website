"use client";

import Image from "next/image";
import React from "react";
import { restaurantDashboardLinks } from "@/data/dashboardLinks";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Dashboard = () => {
  const path = usePathname();
  return (
    <div className="h-auto lg:w-[400px] bg-gray-100  ">
      <Image src={"/images/logo.png"} width={180} height={100} alt="logo" />
      <div className="flex flex-col  px-10 py-12 gap-y-6 items-start justify-center">
        {restaurantDashboardLinks.map((item, i) => (
          <Link
            href={item.href}
            key={i}
            className={`text-lg hover:bg-red w-full transition-all px-4 hover:rounded-lg py-1 text-black hover:text-white border-b-2 border-red/20 hover:border-red  active:bg-red  ${
              path == item.href
                ? "bg-red rounded-lg border-none text-white"
                : ""
            }`}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
