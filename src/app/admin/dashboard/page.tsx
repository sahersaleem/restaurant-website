
import React from "react";
import { verify_token } from "@/actions/verify_token";
import { redirect } from "next/navigation";

const page = async() => {
  const { isAuthenticated, role } = await verify_token();

  if (!isAuthenticated || role !== "admin") {
    redirect("/unauthorized");
  }

  return (
    <div className="w-full h-screen">
      <h1 className="text-4xl text-center mt-10">Admin Dashboard</h1>
    </div>
  );
};

export default page;
