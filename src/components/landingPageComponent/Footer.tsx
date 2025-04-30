// components/Footer.tsx

import React from "react";
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-red  p-6 lg:p-10 mt-20 h-auto lg:h-[400px] text-white font-poppins flex justify-center items-center flex-col ">
      <div className=" flex flex-wrap justify-between gap-y-2 w-full items-center" >
       
        <div>
        <h2 className=" sm:text-lg lg:text-2xl font-bold sm:mb-2 lg:mb-4  tracking-wider text-orangeDark">
            Site map
          </h2>
          <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm font-poppins">
            <li>
              <a href="/" className="hover:underline">
                Signed directories
              </a>
            </li>
            <li>
              <a href="/about" className="hover:underline">
                Store Directories
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:underline">
                All catalogs
              </a>
            </li>
          </ul>
        </div>
        <div>
        <h2 className=" sm:text-lg lg:text-2xl font-bold sm:mb-2 lg:mb-4  tracking-wider text-orangeDark">
            Advertisers
          </h2>
          <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm font-poppins">
            <li>
              <a href="/" className="hover:underline">
                Signs / Shops
              </a>
            </li>
            <li>
              <a href="/about" className="hover:underline">
                Advertising Networks
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:underline">
                Cookie settings
              </a>
            </li>
          </ul>
        </div>
        <div>
        <h2 className=" sm:text-lg lg:text-2xl font-bold sm:mb-2 lg:mb-4  tracking-wider text-orangeDark">
            Our company
          </h2>
          <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm font-poppins">
            <li>
              <a href="/" className="hover:underline">
                Who are we?
              </a>
            </li>
            <li>
              <a href="/about" className="hover:underline">
                Legal notice 
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:underline">
                Contact us
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h2 className=" sm:text-lg lg:text-2xl font-bold sm:mb-2 lg:mb-4  tracking-wider text-orangeDark">
            Partner sites
          </h2>
          <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm font-poppins">
            <li>
              <a href="/" className="hover:underline">
                prime.re
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
