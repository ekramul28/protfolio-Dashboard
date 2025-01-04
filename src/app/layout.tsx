import type { Metadata } from "next";
import "./globals.css";
import SideBar from "@/components/SideBar";
import NavbarDetailsPage from "@/components/navberForDetalisPage";

export const metadata: Metadata = {
  title: "Ekramul Protfolio",
  description: "Generated by Ekramul",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className=" min-h-screen bg-gray-100 grid md:grid-cols-10">
          <div className="col-span-2">
            <SideBar />
          </div>

          <div className="col-span-8">
            <NavbarDetailsPage />
            <main className="px-4 w-full ">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
