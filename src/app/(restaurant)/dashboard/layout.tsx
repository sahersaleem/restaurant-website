import Dashboard from "../_components/Dashboard";
import { RestaurntContextProvider } from "../_components/RstaurantContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <RestaurntContextProvider>
      <div className="w-full flex flex-row h-auto ">
        <Dashboard />
        {children}
      </div>
    </RestaurntContextProvider>
  );
}
