import { Geist, Geist_Mono } from "next/font/google";
import App from "@/App";
import { useState, useEffect } from "react";
import UserManagement from "@/components/UserManagement";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true); // Ensures this runs only in the browser
  }, []);

  if (!mounted) return null; // Prevents server-side rendering issues

  return (
    <>
      <div>
        {/* <App /> */}
        <UserManagement />
      </div>
    </>
  );
}
