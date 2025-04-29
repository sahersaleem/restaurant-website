import Admin_Dashboard from "./dashboard/_components/Admin_Dashboard";
import { verify_token } from "@/actions/verify_token";
import { redirect } from "next/navigation";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  const { isAuthenticated, role } = await verify_token();

  if (!isAuthenticated || role !== "admin") {
    redirect("/unauthorized");
  }

  return (
   
      <div className="w-full flex flex-row h-auto  min-h-screen">
        <Admin_Dashboard />
        {children}
      </div>

  );
}
