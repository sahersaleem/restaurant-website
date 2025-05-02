"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface Iadds {
  _id: string;
  title: string;
  link: string;
  imageUrl: string;
  position: "top" | "side" | "inline";
}
type Positon = "top" | "side" | "inline";
const Advertisement = ({ position }: { position: Positon }) => {
  const [adsData, setAdsData] = useState<Iadds[] | null>(null);
  const [ads, setAdds] = useState<Iadds | null>();

  const get_all_add = async () => {
    try {
      const res = await axios.get("/api/advertisement");
      console.log(res.data)
      if (res.data) {
        setAdsData(res.data.ads);
      }
    } catch (error: any) {
      console.log("Error occurred while fetching data");
    }
  };
  useEffect(() => {
    get_all_add();
  }, []);

  useEffect(() => {
    console.log(position)
    const filtered = adsData?.filter((a: Iadds) => a.position === position);
    console.log("filterd" , filtered)
    if (filtered) {
      const randomAd = filtered[Math.floor(Math.random() * filtered?.length)];
      setAdds(randomAd);
    }
  }, [position , adsData]);

  const dimensions =
    position === "top"
      ? "w-full h-[100px] md:h-[120px]"
      : position === "side"
      ? "w-[140px] h-[400px] md:w-[160px] md:h-[600px]"
      : "w-full h-[150px] md:h-[200px]";

  return (
    <motion.a
    href={ads?.link}
    target="_blank"
    rel="noopener noreferrer"
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, ease: "easeOut" }}
    whileHover={{ scale: 1.03 }}
    className={`relative block overflow-hidden rounded-xl shadow-lg border ${dimensions}`}
  >
    {/* Yellow Ad Badge */}
    <div className="absolute top-2 left-2 bg-yellow-400 text-black text-xs font-semibold px-2 py-1 rounded z-10">
    publicité
    </div>
  
    {/* Ad Image */}
    <Image
      src={ads?.imageUrl || ""}
      alt="Advertisement"
      fill
      className="object-cover object-center transition-transform duration-300 ease-in-out hover:scale-105"
      priority
    />
  
    {/* Ad Title */}
    <div className="absolute bottom-0 left-0 w-full bg-black/60 text-white text-sm md:text-base px-3 py-2 z-10">
      {ads?.title}
    </div>
  </motion.a>
  
  
  
  );
};

export default Advertisement;
