"use client";

import { logout } from "@/actions/logout";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { IoMdLogOut } from "react-icons/io";
const Logout = () => {
  const [islogout, setisLogout] = useState(false);
  const router = useRouter();

 

  const handleClick = async () => {
    await logout();
    setisLogout(true);
    if(islogout==true){
      redirect('/')
    }
  };

  return <button onClick={handleClick} className="button"><IoMdLogOut size={25}/></button>;
};

export default Logout;
