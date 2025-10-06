import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    // './pages/**/*.{js,ts,jsx,tsx,mdx}', // Pages Router kullanmıyoruz
    // './components/**/*.{js,ts,jsx,tsx,mdx}', // Şimdilik components klasörümüz yok
  ],
  theme: {
    extend: {
      // Renklerimizi buraya daha sonra tekrar ekleyebiliriz.
      // Önce sistemin çalışmasını sağlayalım.
    },
  },
  plugins: [],
  // ÖNEMLİ: MUI ile çakışmaları önlemek için bu ayar gerekli olabilir.
  // Ancak önce en basit haliyle çalıştıralım.
  // corePlugins: {
  //   preflight: false,
  // },
};

export default config;