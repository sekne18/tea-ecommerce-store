import Navbar from "@/components/Navbar";
import "./globals.css";
import Footer from "@/components/Footer";
import { StateContext } from "./context/StateContext";
import { Toaster } from "react-hot-toast";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body className="layout">
        <StateContext>
          <Toaster />
          <header>
            <Navbar />
          </header>
          <main className="main-container"></main>
          {children}
          <footer>
            <Footer />
          </footer>
        </StateContext>
      </body>
    </html>
  );
}
