import Dashboard from "../_components/Dashboard";
import { RestaurntContextProvider } from "../_components/RstaurantContext";
import { verify_token } from "@/actions/verify_token";
import { redirect } from "next/navigation";
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const { isAuthenticated, role } = await verify_token();

  if (!isAuthenticated || role !== "owner") {
    redirect("/unauthorized");
  }















  return (
    <RestaurntContextProvider>
      <div className="w-full flex flex-row h-auto  ">
        <Dashboard />
        {children}
      </div>
    </RestaurntContextProvider>
  );
}
