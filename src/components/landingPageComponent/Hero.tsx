import Image from "next/image";
import React from "react";

const Hero = () => {
  return (
  
      <div className="mt-20 w-full flex justify-between items-center">
        <div className="mt-10">
          <h1 className=" text-6xl mb-2 font-quickSand font-bold text-orange">
            Discover Restaurants <br />
            You’ll Love
          </h1>
          <h3 className="text-white text-2xl">
            Explore a wide range of cuisines and restaurants near you. <br />
            Whether you&apo;sre craving biryani or sushi, find it on our
            interactive map.
          </h3>
          <div className="flex gap-x-4 mt-8">
            <button className="button">Explore Restaurants</button>
            <button className="button">Add your Restaurant</button>
          </div>
        </div>
        <Image
          src={"/images/rest.jpg"}
          alt="hero"
          width={620}
          height={620}
          className="rounded-lg object-cover object-center"
        />
      </div>
  
  );
};

export default Hero;
