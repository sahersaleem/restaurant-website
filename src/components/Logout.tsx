"use client";

import { logout } from "@/actions/logout";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

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

  return <button onClick={handleClick} className="button">Se déconnecter</button>;
};

export default Logout;
