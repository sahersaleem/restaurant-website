import Image from "next/image";
import Link from "next/link";
import React from "react";

const Hero = () => {
  return (
    <div className="  lg:-mt-20 w-full flex justify-center lg:justify-between items-center flex-col lg:flex-row px-10 lg:px-0  gap-y-10  lg:pb-0   h-[80vh] lg:h-screen   lg:bg-transparent">
      <div className="w-full">
        <h2 className="text-[#DA3255] font-chew tracking-wide text-2xl lg:text-3xl">
          Faim ? Réglons ça.
        </h2>
        <h1 className=" text-5xl lg:text-7xl mb-2 font-chew font-bold text-[#E2CB30] tracking-wider ">
          Découvrir des restaurants
        </h1>
        <h3 className="text-white text-sm lg:text-lg font-comic font-bold tracking-wide  ">
          Parcourez les restaurants locaux, consultez les menus et{" "}
          <br className="hidden lg:inline-block" /> comblez vos envies
          gourmandes.
        </h3>
        <div className="flex gap-x-4 mt-8">
          <button className="button !font-comic tracking-wide !bg-[#DA3255]">
            {" "}
            <Link href={"#all_restaurants"}>Explorer les restaurants</Link>
          </button>
        </div>
      </div>
      <Image
        src={"/images/burger2.png"}
        alt="hero"
        width={720}
        height={720}
        className="rounded-lg object-cover object-center hidden lg:block"
      />
    </div>
  );
};

export default Hero;
