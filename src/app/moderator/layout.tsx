import Moderator_Dashboard from "./_components/Moderator_Dashboard";
import { verify_token } from "@/actions/verify_token";
import { redirect } from "next/navigation";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
   const { isAuthenticated, role } = await verify_token();
  
    if (!isAuthenticated || role !== "moderator") {
      redirect("/unauthorized");
    }
  return (
   
      <div className="w-full flex flex-row h-auto  min-h-screen">
        <Moderator_Dashboard />
        {children}
      </div>

  );
}
