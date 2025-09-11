import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner"
import "@stream-io/video-react-sdk/dist/css/styles.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Meeting-in",
  description: "Simple, Fast, and Secure Video Meetings",
  icons: {
    icon: "/icons/logo.svg",
  },
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ClerkProvider
        appearance={{
          layout: {
            logoImageUrl: '/icons/logo.svg',
          },
          variables: {
            colorPrimary: "#0E78F9",
            colorText: "white",
            colorBackground: "#1c1f2e",
            colorInputBackground: "#252a41",
            colorInputText: "#fff",  
          },
          elements: {
            
            socialButtonsIconButton__github: {
              filter: 'invert(1)', // Ini akan membuat ikon GitHub menjadi putih
            },
          }
        }} >
        <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white`}>
        {children}
        <Toaster />
      </body>
      </ClerkProvider>
    </html>
  );
}
