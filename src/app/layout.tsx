import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import {cn} from "@/lib/utils"
import { ThemeProvider } from "@/components/theme-provider";

const fontSans = Plus_Jakarta_Sans({ 
  subsets: ["latin"],
  weight: ['400','500','600','700'] ,
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: "CarePulse",
  description: "A healthcare management system ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* cn -> className */}
      <ThemeProvider attribute="class" defaultTheme="dark">
        <body className={cn('min-h-screen bg-dark-400 font-sans antialiased',
            fontSans.variable,
          )}>
          {children}
        </body>
      </ThemeProvider>
    </html>
  );
}
