import { Button, Typography, Box, Container } from '@mui/material';

export default function Home() {
  return (
    // 'Container', MUI'nin içeriği ortalayan ve kenar boşlukları veren bir bileşenidir.
    <Container maxWidth="md">
      <Box
        sx={{
          my: 4, // "margin-top" ve "margin-bottom" için MUI'nin kısaltması
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '80vh',
        }}
      >
        {/* Bu başlık, theme.ts'de tanımladığımız Poppins fontunu ve text.primary rengini kullanır */}
        <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
          ContellAI'ye Hoş Geldiniz
        </Typography>

        <Typography variant="h5" component="h2" color="text.secondary" sx={{ mb: 4 }}>
          Yapay Zeka Destekli Sosyal Medya Asistanınız
        </Typography>

        {/* Bu buton, theme.ts'de tanımladığımız Vurgu Rengini (secondary) kullanacak */}
        <Button variant="contained" color="secondary" size="large">
          Bu Bir Material-UI Butonu
        </Button>

        {/* Bu div, tailwind.config.ts'de tanımladığımız Ana Rengi (primary) kullanacak */}
        <div className="p-6 mt-8 bg-primary text-white rounded-xl shadow-lg w-full max-w-sm text-center">
          <p className="font-bold">Bu da bir Tailwind CSS elementi</p>
          <p className="text-sm mt-2">Gördüğün gibi, iki sistem de uyum içinde çalışıyor.</p>
        </div>
      </Box>
    </Container>
  );
}