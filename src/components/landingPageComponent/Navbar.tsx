"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";



import Logout from "../Logout";

const navItem = [
  {
    name: "Home",
    link: "/",
    id: 1,
  },
  {
    name: "Restaurant",
    link: "/home",
    id: 1,
  },
  {
    name: "About",
    link: "/home",
    id: 1,
  },
  {
    name: "Contact",
    link: "/home",
    id: 1,
  },
];

// const cookieStore = cookies();
// const token = cookieStore.get('token')?.value;
// const isAuthenticated = token ? true : false;
// console.log(isAuthenticated)

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const token = document.cookie.split(';').find(row=>row.startsWith(" token="))
    console.log(token);
    if(token){
      setIsAuthenticated(true)
    }
    else{
      setIsAuthenticated(false)
    }
  }, [isAuthenticated]);

  return (
    <div className="flex justify-between items-center py-8">
      <div className="flex justify-center gap-x-9 ">
        {navItem.map((item) => (
          <Link
            href={item.link}
            key={item.id}
            className="text-white text-xl visited:text-orange hover:text-orangeDark font-bold"
          >
            {item.name}
          </Link>
        ))}
      </div>

      <div>
        {!isAuthenticated ? (
          <>
            {" "}
            <button className="text-lg button" >
              <Link href={"/signUp"}>SignUp</Link>
            </button>
            <button className="!bg-transparent text-lg hover:text-orange button">
              <Link href={"/login"}>Login</Link>
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
