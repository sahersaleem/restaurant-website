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
}

const Advertisement = () => {
  const [adsData, setAdsData] = useState<Iadds[] | null>(null);

  const get_all_add = async () => {
    try {
      const res = await axios.get("/api/advertisement");
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

  return (
    <div className="flex flex-wrap gap-6 justify-center py-6">
      {adsData?.map((item) => (
        <motion.div
          key={item._id}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          whileHover={{ scale: 1.05 }}
          className="relative rounded-lg overflow-hidden shadow-md hover:shadow-xl bg-white p-2 w-[220px]"
        >
          {/* "Ad" Badge */}
          <span className="absolute top-2 left-2 bg-yellow-500 text-white text-xs font-semibold px-2 py-1 rounded">
            Ad
          </span>

          {/* Ad Image */}
          <a href={item.link} target="_blank" rel="noopener noreferrer">
            <Image
              src={item.imageUrl}
              width={200}
              height={200}
              alt={item.title}
              className="object-cover rounded-md"
            />
          </a>

          {/* Title below image */}
          <p className="mt-2 text-center text-sm font-medium">{item.title}</p>
        </motion.div>
      ))}
    </div>
  );
};

export default Advertisement;
