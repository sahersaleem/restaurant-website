import React from "react";
import Wrapper from "../Wrapper";
import Image from "next/image";

const About = () => {
  return (
    <div className="h-screen bg-black ">
      <Wrapper>
        {" "}
        <div className="pt-20 flex justify-between ">

          <div className="w-1/2">
          <h2 className=" text-6xl mb-2 font-quickSand font-bold text-orange">
            About Us
          </h2>
          <p className="text-white  text-xl text-justify ">
          At [Your Platform Name], we believe that food is more than just a meal — it's a journey that brings people together. Our platform is dedicated to making it easier for food lovers to discover amazing restaurants and for restaurant owners to share their culinary creations. Whether you’re searching for a local favorite or exploring new cuisines, we strive to offer a seamless, interactive experience. Our mission is to bridge the gap between customers and restaurants by providing a user-friendly platform with robust search features, interactive maps, and real-time menu updates. We aim to make dining experiences more accessible, enjoyable, and memorable for everyone, from food enthusiasts to restaurant owners looking to expand their reach.
          </p>
          </div>
          {" "}
       <div className="flex flex-col gap-y-9 shadow-md">
        <Image src={'/images/hero2.jpg'} alt="restaurant" width={400} height={400} className="rounded-lg ml-24" />
        <Image src={'/images/rest2.jpg'} alt="restaurant" width={400} height={400} className="rounded-lg"/>
       </div>
        </div>
      </Wrapper>
    </div>
  );
};

export default About;
