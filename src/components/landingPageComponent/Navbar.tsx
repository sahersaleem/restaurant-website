"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { checkAUth, get_user_role } from "@/actions/auth";
import Logout from "../Logout";
import { Menu, X } from "lucide-react";
import Image from "next/image";

const navItems = [
  { name: "Accueil", link: "/", id: 1 },
  { name: "Complain", link: "/complaint", id: 2 },
];

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userRole, setUserRole] = useState<string | null>(null); // 🔧 role state
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const checkLogin = async () => {
      const isLoggedIn = await checkAUth();
      const role = await get_user_role();
      if(role){
        setUserRole(role)
      }
    
    

      setIsAuthenticated(isLoggedIn);

     
    };
    checkLogin();
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const renderDashboardLink = () => {
    if (userRole === "admin") {
      return (
        <Link
          href="/admin/dashboard"
          className="text-white text-sm font-semibold hover:text-orange underline"
        >
      Tableau de bord d’administration
        </Link>
      );
    } else if (userRole === "owner") {
      return (
        <Link
          href="/dashboard"
         className="text-white text-sm font-semibold hover:text-orange underline"
        >
     Tableau de bord du restaurant
        </Link>
      );
    }
    else if (userRole === "moderator") {
      return (
        <Link
          href="/dashboard"
         className="text-white text-sm font-semibold hover:text-orange underline"
        >
       Tableau de bord du modérateur
        </Link>
      );
    }
    return null;
  };
  

  return (
    <nav className="w-full bg-red lg:bg-transparent py-6 px-4 md:px-8 flex justify-between items-center relative">
      {/* Logo */}
      <div className="text-white text-xl font-bold">
        <div className="w-[60px] h-[60px] lg:w-[100px] lg:h-[100px] relative">
          <Image
            src="/images/image.png"
            alt="Logo"
            fill
            className="rounded-full object-cover object-center"
            priority
          />
        </div>
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

        {/* 🔧 Show Dashboard Link */}
        {isAuthenticated && renderDashboardLink()}
      </div>

      {/* Auth Buttons (Desktop) */}
      <div className="hidden md:flex gap-x-4 items-center">
        {!isAuthenticated ? (
          <>
            <Link href="/signUp" className="button">
              S’inscrire
            </Link>
            <Link
              href="/login"
              className="text-white font-comic hover:text-orangeDark"
            >
              Se connecter
            </Link>
          </>
        ) : (
          <Logout />
        )}
      </div>

      {/* Mobile Menu Toggle */}
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

          {/* 🔧 Dashboard Link in Mobile */}
          {isAuthenticated && renderDashboardLink()}

          {!isAuthenticated ? (
            <>
              <Link
                href="/signUp"
                onClick={() => setIsMenuOpen(false)}
                className="button"
              >
                S’inscrire
              </Link>
              <Link
                href="/login"
                onClick={() => setIsMenuOpen(false)}
                className="button"
              >
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
