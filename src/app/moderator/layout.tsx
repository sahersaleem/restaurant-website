import Moderator_Dashboard from "./_components/Moderator_Dashboard";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
   
      <div className="w-full flex flex-row h-auto  min-h-screen">
        <Moderator_Dashboard />
        {children}
      </div>

  );
}
