import Dashboard from "../_components/Dashboard";
import { RestaurntContextProvider } from "../_components/RstaurantContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <RestaurntContextProvider>
      
        {children}
     
    </RestaurntContextProvider>
  );
}
