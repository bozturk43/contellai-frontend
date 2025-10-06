import type { Metadata } from "next";
import ThemeRegistry from "@/ThemeRegistry"; // Yeni oluşturduğumuz ThemeRegistry'yi import et
import "./globals.css";

export const metadata: Metadata = {
  title: "ContellAI",
  description: "Yapay Zeka Destekli Sosyal Medya İçerik Asistanı",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {/* Tüm uygulamayı ThemeRegistry ile sarmalıyoruz */}
        <ThemeRegistry>{children}</ThemeRegistry>
      </body>
    </html>
  );
}