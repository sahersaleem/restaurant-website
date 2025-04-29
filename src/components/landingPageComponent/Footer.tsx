// components/Footer.tsx

import React from "react";
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-red  p-10 mt-20 h-auto lg:h-[400px] text-white font-poppins flex justify-center items-center flex-col ">
      <div className="  grid grid-cols-1  md:grid-cols-3 gap-8 ">
        {/* About Section */}
        <div>
          <h2 className="text-2xl font-bold mb-4  tracking-wider text-orangeDark">
            About Us
          </h2>
          <p className="text-sm font-poppins">
            We connect food lovers with the best restaurants in town. Explore,
            order, and enjoy!
          </p>
        </div>

        {/* Important Links */}
        <div>
          <h2 className="text-2xl font-bold mb-4  tracking-wider text-orangeDark">
            Quick Links
          </h2>
          <ul className="space-y-2 text-sm font-poppins">
            <li>
              <a href="/" className="hover:underline">
                Home
              </a>
            </li>
            <li>
              <a href="/about" className="hover:underline">
                About Us
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:underline">
                Contact
              </a>
            </li>
            <li>
              <a href="/privacy" className="hover:underline">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="/terms" className="hover:underline">
                Terms & Conditions
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h2 className="text-2xl font-bold mb-4 tracking-wider text-orangeDark">
            Contact Info
          </h2>
          <ul className="space-y-2 text-sm font-poppins">
            <li>Email: info@example.com</li>
            <li>Phone: +1-234-567-890</li>
            <li>Address: Your City, Your Country</li>
          </ul>{" "}
          <div className="flex space-x-4 mt-4">
            <a href="#" className="hover:text-blue-600">
              <FaFacebook size={20} />
            </a>
            <a href="#" className="hover:text-pink-500">
              <FaInstagram size={20} />
            </a>
            <a href="#" className="hover:text-blue-400">
              <FaTwitter size={20} />
            </a>
            <a href="#" className="hover:text-blue-700">
              <FaLinkedin size={20} />
            </a>
          </div>
        </div>
      </div>
      <div className="text-center text-sm mt-10 border-t pt-4 dark:border-gray-700">
        © 2025 FoodPanda Clone. All rights reserved. | Powered by YourName
      </div>
    </footer>
  );
};

export default Footer;
