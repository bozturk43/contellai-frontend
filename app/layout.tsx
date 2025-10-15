import type { Metadata } from "next";
import "./globals.css";
import AppWrappers from "@/components/Providers/AppWrappers";

export const metadata: Metadata = {
  title: "ContellAI",
  description: "Yapay Zeka Destekli Sosyal Medya İçerik Asistanı",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body>
        <AppWrappers>
          {children}
        </AppWrappers>
      </body>
    </html>
  );
}