import React from "react";
import { verify_token } from "@/actions/verify_token";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowBigLeft } from "lucide-react";

const page = async () => {
  const { isAuthenticated, role } = await verify_token();

  if (!isAuthenticated || role !== "admin") {
    redirect("/unauthorized");
  }

  return (
    <div className="w-full h-screen">
      <h1 className="text-4xl text-center mt-10"> Tableau de bord d’administration</h1>
      <div className="w-full flex justify-center items-center">
        <Link
          href={"/"}
          className=" font-poppins font-bold mt-10 hover:text-red w-full text-center"
        >
          <ArrowBigLeft className="inline-block" />
          Aller à la page d’accueil
        </Link>
      </div>
    </div>
  );
};

export default page;
