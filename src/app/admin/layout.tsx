import Admin_Dashboard from "./dashboard/_components/Admin_Dashboard";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
   
      <div className="w-full flex flex-row h-auto  min-h-screen">
        <Admin_Dashboard />
        {children}
      </div>

  );
}
