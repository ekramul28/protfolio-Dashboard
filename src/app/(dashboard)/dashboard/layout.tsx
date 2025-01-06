import SideBar from "@/components/SideBar";
import NavbarDetailsPage from "@/components/navberForDetalisPage";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen bg-gray-100 grid md:grid-cols-10">
          {/* Sidebar */}
          <div className="col-span-2  shadow-lg  inset-y-0">
            <SideBar />
          </div>

          {/* Main Content */}
          <div className="col-span-8 ">
            <NavbarDetailsPage />
            <main className="px-4 w-full h-[calc(100vh-64px)] overflow-auto hide-scrollbar">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
