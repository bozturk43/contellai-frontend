import { Button, Typography, Box, Container } from '@mui/material';

export default function Home() {
  return (
    <Container maxWidth="md">
      <Box
        sx={{
          my: 4, 
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '80vh',
        }}
      >
        <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
          ContellAI'ye Hoş Geldiniz
        </Typography>

        <Typography variant="h5" component="h2" color="text.secondary" sx={{ mb: 4 }}>
          Yapay Zeka Destekli Sosyal Medya Asistanınız
        </Typography>

        <Button variant="contained" color="secondary" size="large">
          Bu Bir Material-UI Butonu
        </Button>
        <div className="p-6 mt-8 bg-primary text-white rounded-xl shadow-lg w-full max-w-sm text-center">
          <p className="font-bold">Bu da bir Tailwind CSS elementi</p>
          <p className="text-sm mt-2">Gördüğün gibi, iki sistem de uyum içinde çalışıyor.</p>
        </div>
      </Box>
    </Container>
  );
}