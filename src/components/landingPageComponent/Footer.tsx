// components/Footer.tsx

import React from "react";
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-red  p-6 lg:p-10 mt-20 h-auto lg:h-[400px] text-white font-poppins flex justify-center items-center flex-col ">
      <div className=" flex flex-wrap justify-between gap-y-2 w-full items-center" >
       
        <div>
        <h2 className=" sm:text-lg lg:text-2xl font-bold sm:mb-2 lg:mb-4  tracking-wider text-orangeDark">
        Plan du site
          </h2>
          <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm font-poppins">
            <li>
              <a href="/" className="hover:underline">
              Si Répertoires signés
              </a>
            </li>
            <li>
              <a href="/" className="hover:underline">
              Annuaires de magasins
              </a>
            </li>
            <li>
              <a href="/" className="hover:underline">
              Tous les catalogues
              </a>
            </li>
          </ul>
        </div>
        <div>
        <h2 className=" sm:text-lg lg:text-2xl font-bold sm:mb-2 lg:mb-4  tracking-wider text-orangeDark">
        Tous les annonceurs
          </h2>
          <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm font-poppins">
            <li>
              <a href="/" className="hover:underline">
              Enseignes / Boutiques
              </a>
            </li>
            <li>
              <a href="/" className="hover:underline">
              Réseaux publicitaires
              </a>
            </li>
            <li>
              <a href="/" className="hover:underline">
              Paramètres des cookies
              </a>
            </li>
          </ul>
        </div>
        <div>
        <h2 className=" sm:text-lg lg:text-2xl font-bold sm:mb-2 lg:mb-4  tracking-wider text-orangeDark">
        Notre entreprise
          </h2>
          <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm font-poppins">
            <li>
              <a href="/" className="hover:underline">
              Qui sommes-nous ?
              </a>
            </li>
            <li>
              <a href="/" className="hover:underline">
              Mentions légales
              </a>
            </li>
            <li>
              <a href="/" className="hover:underline">
              Contactez-nous
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h2 className=" sm:text-lg lg:text-2xl font-bold sm:mb-2 lg:mb-4  tracking-wider text-orangeDark">
          Sites partenaires
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
