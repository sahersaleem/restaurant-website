"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { checkAUth, get_user_role } from "@/actions/auth";
import Logout from "../Logout";
import { Menu, SearchIcon, X } from "lucide-react";
import Image from "next/image";

const navItems = [
  { name: "Accueil", link: "/", id: 1 },
  { name: "Complain", link: "/complaint", id: 2 },
];

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const checkLogin = async () => {
      const isLoggedIn = await checkAUth();
      const role = await get_user_role();
      if (role) setUserRole(role);
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
        <Link href="/admin/dashboard" className="text-white text-sm font-semibold hover:underline">
          Tableau de bord d’administration
        </Link>
      );
    } else if (userRole === "owner") {
      return (
        <Link href="/dashboard" className="text-white text-sm font-semibold hover:underline">
          Tableau de bord du restaurant
        </Link>
      );
    } else if (userRole === "moderator") {
      return (
        <Link href="/dashboard" className="text-white text-sm font-semibold hover:underline">
          Tableau de bord du modérateur
        </Link>
      );
    }
    return null;
  };

  return (
    <>
      {/* Top Bar */}
      <div className="w-full bg-red py-4 px-4 md:px-8 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/images/logo3.png"
            alt="Logo"
            width={180}
            height={60}
            className="object-cover xs:w-[120px] xs:h-[40px] sm:w-[180px] sm:h-[60px]"
            priority
          />
        </Link>

        {/* Desktop Right Side Buttons */}
        <div className="hidden md:flex items-center gap-x-4">
       <div className="flex items-center justify-center gap-x-4 border  px-4 py-2 rounded-lg bg-white">
        <input
          placeholder="Recherchez un restaurant par cuisine, nom du restaurant et emplacement.."
          className="outline-none  font-comic w-full text-xs sm:text-sm"
          
        />
        <SearchIcon className="text-red font-bold" size={30} />
      </div>
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

        {/* Mobile Menu Toggle */}
        <button className="md:hidden text-white" onClick={toggleMenu}>
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Bottom Nav (visible only on md+ screens) */}
      <div className="hidden md:flex justify-center bg-black py-3 gap-x-10 items-center">
        {navItems.map((item) => (
          <Link
            key={item.id}
            href={item.link}
            className="text-white font-medium hover:text-orange-400 transition-colors"
          >
            {item.name}
          </Link>
        ))}
            {isAuthenticated && renderDashboardLink()}
      </div>

      {/* Mobile Menu (Slide Drawer) */}
      {isMenuOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={toggleMenu}
          />

          {/* Side Drawer */}
        {/* Side Drawer */}
        <div
        className={`fixed top-0 left-0 h-full w-64 bg-black z-50 transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col items-start p-6 gap-4">
          {/* Close Icon */}
          <button className="text-white self-end mb-4" onClick={toggleMenu}>
            <X size={28} />
          </button>

          {/* Nav Links */}
          {navItems.map((item) => (
            <Link
              href={item.link}
              key={item.id}
              className="text-white text-base hover:text-orange-400 font-semibold"
              onClick={toggleMenu}
            >
              {item.name}
            </Link>
          ))}

          {/* Dashboard Link */}
          {isAuthenticated && renderDashboardLink()}

          {!isAuthenticated ? (
            <>
              <Link href="/signUp" onClick={toggleMenu} className="button">
                S’inscrire
              </Link>
              <Link href="/login" onClick={toggleMenu} className="button">
                Se connecter
              </Link>
            </>
          ) : (
            <div onClick={toggleMenu}>
              <Logout />
            </div>
          )}
        </div>
      </div>

        </>
      )}
    </>
  );
};

export default Navbar;
