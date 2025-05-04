"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { checkAUth, get_user_role } from "@/actions/auth";
import Logout from "../Logout";
import { Menu, SearchIcon, X } from "lucide-react";
import Image from "next/image";
import { IoPersonOutline } from "react-icons/io5";
import { IoMdLogOut } from "react-icons/io";
import { redirect, useRouter } from "next/navigation";
import { logout } from "@/actions/logout";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

const navItems = [
  { name: "Accueil", link: "/", id: 1 },
  { name: "Complain", link: "/complaint", id: 2 },
];

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [suggestions, setSuggestions] = useState<string[] | null>(null);

  const router = useRouter();

  const handleClick = async () => {
    await logout();
    setIsAuthenticated(false);
    router.refresh();
  };

  const handleSearch = async () => {
    if (searchTerm.trim() !== "") {
      console.log(searchTerm);
      router.push(`/?query=${encodeURIComponent(searchTerm)}`);
      setSearchTerm("");
    }
  };

  useEffect(() => {
    if (searchTerm.length < 2) return;
    const fetchSuggestions = async () => {
      const res = await axios.get(
        `/api/search-suggestions?query=${searchTerm}`
      );
    console.log(res)
      if (res.data) {
        setSuggestions(res.data.suggestions);
      }
    };

    fetchSuggestions();
  }, [searchTerm]);

  useEffect(() => {
    const checkLogin = async () => {
      const isLoggedIn = await checkAUth();
      const role = await get_user_role();
      if (role) setUserRole(role);
      setIsAuthenticated(isLoggedIn);
    };
    checkLogin();
  }, []);

  useEffect(() => {
    // URL se query remove karo page load ke baad
    router.replace("/", undefined);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const renderDashboardLink = () => {
    if (userRole === "admin") {
      return (
        <Link
          href="/admin/dashboard"
          className="text-white text-sm font-semibold hover:underline"
        >
          Tableau de bord d’administration
        </Link>
      );
    } else if (userRole === "owner") {
      return (
        <Link
          href="/dashboard"
          className="text-white text-sm font-semibold hover:underline"
        >
          Tableau de bord du restaurant
        </Link>
      );
    } else if (userRole === "moderator") {
      return (
        <Link
          href="/dashboard"
          className="text-white text-sm font-semibold hover:underline"
        >
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
<div className="hidden md:flex items-center gap-x-4 relative">
  <div className="flex items-center justify-center gap-x-4 border px-4 py-2 rounded-lg bg-white relative">
    <input
      placeholder="Recherchez un restaurant par cuisine, nom du restaurant et emplacement.."
      className="outline-none font-comic w-full text-xs sm:text-sm"
      value={searchTerm}
      onChange={(e) => {
        setSearchTerm(e.target.value);
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          handleSearch();
        }
      }}
    />
    <SearchIcon className="text-red font-bold" size={30} />

    {/* Suggestions Dropdown */}
    {suggestions && suggestions.length > 0 && (
      <ul className="absolute top-full left-0 w-full bg-white shadow mt-1 rounded z-10">
        {suggestions.map((sug, index) => (
          <li
            key={index}
            className="px-2 py-1 border-b text-sm hover:bg-gray-100 cursor-pointer"
            onClick={() => {
              setSearchTerm(sug);
              setSuggestions(null);
              router.push(`/?query=${encodeURIComponent(sug)}`);
            }}
          >
            {sug}
          </li>
        ))}
      </ul>
    )}
  </div>

  {/* Login/Logout Button */}
  {!isAuthenticated ? (
    <Link href="/login" className="button">
      <IoPersonOutline size={25} />
    </Link>
  ) : (
    <button onClick={handleClick} className="button">
      <IoMdLogOut size={25} />
    </button>
  )}
</div>


        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center gap-4">
          {/* Search Icon */}
          <button className="text-white" onClick={() => setIsSearchOpen(true)}>
            <SearchIcon size={24} />
          </button>

          {/* Menu Icon */}
          <button className="text-white" onClick={toggleMenu}>
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
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
                  <Link href="/login" className="button">
                    <IoPersonOutline size={25} />
                  </Link>
                </>
              ) : (
                <button onClick={handleClick} className="button">
                  <IoMdLogOut size={25} />
                </button>
              )}
            </div>
          </div>
        </>
      )}

      {isSearchOpen && (
        <AnimatePresence>
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.3 }}
            className="fixed top-12 left-0 w-full z-50 p-4 "
          >
            <div className="flex items-center">
              <input
                type="text"
                placeholder="Entrez le nom du restaurant..."
                className="w-full px-3 py-2 border bg-white rounded text-black text-sm"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearch();
                  }
                }}
              />
               {suggestions && suggestions.length > 0 && (
      <ul className="absolute top-full left-0 w-full bg-white shadow  rounded z-10">
        {suggestions.map((sug, index) => (
          <li
            key={index}
            className="px-2 py-1 border-b text-sm hover:bg-gray-100 cursor-pointer"
            onClick={() => {
              setSearchTerm(sug);
              setSuggestions(null);
              router.push(`/?query=${encodeURIComponent(sug)}`);
            }}
          >
            {sug}
          </li>
        ))}
      </ul>
    )}
              <button onClick={() => setIsSearchOpen(false)}>
                <X size={24} className="text-black" />
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      )}
    </>
  );
};

export default Navbar;
