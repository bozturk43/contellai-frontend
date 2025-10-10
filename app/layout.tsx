import type { Metadata } from "next";
import ThemeRegistry from "@/ThemeRegistry";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Box } from "@mui/material";
import QueryProvider from '@/providers/QueryProvider';
import { AuthProvider } from '@/context/AuthContext';
import { getMyProfile } from '@/lib/data';
import "./globals.css";

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
        <QueryProvider>
          <AuthProvider >
            <ThemeRegistry>
              <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                <Navbar />
                <main>
                  {children}
                </main>
                <Footer />
              </Box>
            </ThemeRegistry>
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}