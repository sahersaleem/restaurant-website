import React from "react";
import Dashboard from "../_components/Dashboard";
import { MdMenuBook } from "react-icons/md";
import { IoLocation } from "react-icons/io5";
import { AiOutlineProfile } from "react-icons/ai";
import { MdOutlineWorkspacePremium } from "react-icons/md";
import Link from "next/link";
import { ArrowBigLeft } from "lucide-react";

const page = () => {
  return (
    <div className="bg-white  mt-20 sm:mt-10 w-full h-screen">
      <div className="flex flex-col justify-center items-center">
        {" "}
        <h1 className="text-2xl sm:text-4xl text-center font-bold font-poppins underline ">
          Tableau de bord du restaurant
        </h1>
        <Link
          href={"/"}
          className="text-center font-poppins font-bold mt-10 hover:text-red"
        >
          <ArrowBigLeft className="inline-block" />
          Aller à la page d’accueil
        </Link>
      </div>

      <div className="p-10 flex justify-between gap-10 flex-wrap mt-10">
        <div className="max-w-[300px] bg-[#FFF085] rounded-lg shadow-lg p-8 space-y-4 hover:bg-[#FFF085]/90  transition-colors">
          <MdMenuBook size={50} />
          <h3 className="text-lg">Télécharger le menu</h3>

          <p>
            Téléchargez facilement votre restaurant&apos;au format PDF pour les
            clients peut le consulter ou le télécharger à tout moment
          </p>
          <button className="homepage-btn">
            {" "}
            <Link href={"/dashboard/upload-menu"}>Vue</Link>
          </button>
        </div>
        <div className="max-w-[300px] bg-[#FFF085] rounded-lg shadow-lg p-8 space-y-4 hover:bg-[#FFF085]/90  transition-colors">
          {" "}
          <AiOutlineProfile size={50} />
          <h3 className="text-lg">Mettre à jour le profil du restaurant</h3>
          <p>
            Gardez les détails de votre restaurant à jour – nom, adresse,
            cuisine Type, heures d’ouverture, etc.
          </p>
          <button className="homepage-btn">
            <Link href={"/dashboard/profile"}>Vue</Link>
          </button>
        </div>

        <div className="max-w-[300px] bg-[#FFF085] rounded-lg shadow-lg p-8 space-y-4 hover:bg-[#FFF085]/90  transition-colors">
          {" "}
          <MdOutlineWorkspacePremium size={50} />
          <h3 className="text-lg">Passer à la version Premium</h3>
          <p>
            Boostez la visibilité de votre restaurant sur la page d’accueil et
            les résultats de recherche Résultats avec un abonnement premium.
          </p>
          <button className="homepage-btn">
            <Link href={"/dashboard/subscription"}>Vue</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default page;
