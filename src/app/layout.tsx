import type { Metadata } from "next";
import { Space_Grotesk, Manrope } from "next/font/google";
import "./globals.css";
import { TopNavBar, BottomNavBar } from "@/components/Navigation";
import { StadiumProvider } from "@/context/StadiumContext";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-headline",
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FLOWVENUE - Kinetic Command Center",
  description: "Smart stadium kinetic command center with real time stats.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark ${spaceGrotesk.variable} ${manrope.variable} h-full antialiased`}
    >
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL,GRAD,opsz@100..700,0..1,-50..200,20..48&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet"/>
      </head>
      <body suppressHydrationWarning className="bg-surface text-on-surface font-body selection:bg-primary/30 min-h-screen flex flex-col overflow-x-hidden">
        <StadiumProvider>
          <TopNavBar />
          <div className="flex-grow">
            {children}
          </div>
          <BottomNavBar />
        </StadiumProvider>
      </body>
    </html>
  );
}
