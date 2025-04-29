"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { checkAUth } from "@/actions/auth";
import Logout from "../Logout";
import { Menu, X } from "lucide-react"; // Adding icons for mobile menu
import Image from "next/image";

const navItems = [
  { name: "Accueil", link: "/", id: 1 },
  { name: "Complain", link: "/complaint", id: 2 },
];

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const checkLogin = async () => {
      const isLoggedIn = await checkAUth();
      setIsAuthenticated(isLoggedIn);
    };
    checkLogin();
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="w-full bg-red lg:bg-transparent   py-6 px-4 md:px-8 flex justify-between items-center relative">
      {/* Logo or Brand Name */}
      <div className="text-white text-xl font-bold">

        <Image src={'/images/image.png'}  width={60} height={60} alt="iji3j" className="rounded-full lg:w-[100px] lg:h-[100px]"/>
      </div>

      {/* Desktop Links */}
      <div className="hidden md:flex gap-x-8 items-center">
        {navItems.map((item) => (
          <Link
            href={item.link}
            key={item.id}
            className="text-white text-sm hover:text-orange-400 font-semibold tracking-wide"
          >
            {item.name}
          </Link>
        ))}
      </div>

      {/* Authentication Buttons (Desktop) */}
      <div className="hidden md:flex gap-x-4 items-center">
        {!isAuthenticated ? (
          <>
            <Link href="/signUp" className="button">
              S’inscrire
            </Link>
            <Link href="/login" className="text-white font-comic hover:text-orangeDark">
              Se connecter
            </Link>
          </>
        ) : (
          <Logout />
        )}
      </div>

      {/* Mobile Menu Button */}
      <button className="text-white md:hidden" onClick={toggleMenu}>
        {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-black flex flex-col items-center py-6 gap-4 z-50">
          {navItems.map((item) => (
            <Link
              href={item.link}
              key={item.id}
              className="text-white text-base hover:text-orange-400 font-semibold hover:text-orangeDark font-comic"
              onClick={() => setIsMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}

          {!isAuthenticated ? (
            <>
              <Link href="/signUp" onClick={() => setIsMenuOpen(false)} className="button">
                S’inscrire
              </Link>
              <Link href="/login" onClick={() => setIsMenuOpen(false)} className="button">
                Se connecter
              </Link>
            </>
          ) : (
            <div onClick={() => setIsMenuOpen(false)}>
              <Logout />
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
