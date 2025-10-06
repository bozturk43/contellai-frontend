'use client';
import { createTheme } from '@mui/material/styles';
import { Inter, Poppins } from 'next/font/google';

// Fontlarımızı Next.js'ten alıyoruz
const inter = Inter({ subsets: ['latin'] });
const poppins = Poppins({ subsets: ['latin'], weight: ['400', '700'] });

// Marka kimliğimize uygun özel temamızı oluşturuyoruz
const theme = createTheme({
  palette: {
    mode: 'light', // Varsayılan olarak aydınlık mod
    primary: {
      main: '#4F46E5', // Ana Marka Rengi (İndigo)
    },
    secondary: {
      main: '#14B8A6', // Vurgu Rengi (Camgöbeği/Teal)
    },
    background: {
      default: '#F9FAFB', // Kırık Beyaz Arka Plan
    },
    text: {
      primary: '#374151', // Koyu Gri Metin
    },
  },
  typography: {
    // Ana font olarak Inter'i belirliyoruz
    fontFamily: poppins.style.fontFamily,
    // Başlıklar için Poppins'i belirliyoruz
    h1: { fontFamily: poppins.style.fontFamily },
    h2: { fontFamily: poppins.style.fontFamily },
    h3: { fontFamily: poppins.style.fontFamily },
    h4: { fontFamily: poppins.style.fontFamily },
    h5: { fontFamily: poppins.style.fontFamily },
    h6: { fontFamily: poppins.style.fontFamily },
  },
});

export default theme;