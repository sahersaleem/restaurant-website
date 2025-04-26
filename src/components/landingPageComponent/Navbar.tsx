"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import Cookie from "cookie"
import { checkAUth } from "@/actions/auth";



import Logout from "../Logout";


const navItem = [
  {
    name: "Accueil",
    link: "/",
    id: 1,
  },
  {
    name: "Restaurant",
    link: "/home",
    id: 1,
  },
  {
    name: "À propos",
    link: "/home",
    id: 1,
  },
  {
    name: "Contact",
    link: "/home",
    id: 1,
  },
  {
    
      name: "Réclamation ",
      link: "/home",
      id: 1,
    
  }
];





const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(()=>{

    const checkLogin = async () => {
    const isLoggedIn =  await checkAUth()
    setIsAuthenticated(isLoggedIn)
    }
    checkLogin()
  },[])
  

  return (
    <div className="flex justify-between items-center py-8">
      
      <div className="flex justify-center gap-x-6">
        {/* <Image src={'/images/logo3.png'} alt="logo" width={200} height={200} className="logo"/> */}
        {navItem.map((item) => (
          <Link
            href={item.link}
            key={item.id}
            className="text-white text-sm visited:text-orange hover:text-orangeDark font-bold font-comic tracking-wide"
          >
            {item.name}
          </Link>
        ))}
      </div>

      {/* <InputBox/> */}

      <div>
        {!isAuthenticated ? (
          <>
            {" "}
            <button className="text-lg button" >
              <Link href={"/signUp"}>S’inscrire</Link>
            </button>
            <button className="!bg-transparent text-sm hover:text-orange button">
              <Link href={"/login"}>Se connecter</Link>
            </button>
          </>
        ) : (
          <Logout />
        )}
      </div>
    </div>
  );
};

export default Navbar;
