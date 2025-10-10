import { Typography, Box } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'; // Bir ikon ekleyerek görselleştirelim

// Bu bileşen artık bir Sunucu Bileşeni, veri çekme veya state yönetimi yok.
export default function DashboardRootPage() {
    return (
        <Box 
            sx={{ 
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%', // Kapsayıcısının tüm yüksekliğini kapla
                textAlign: 'center',
                p: 3
            }}
        >
            <InfoOutlinedIcon sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h5" color="text.primary" gutterBottom>
                ContellAI'ye Hoş Geldiniz!
            </Typography>
            <Typography variant="body1" color="text.secondary">
                Başlamak için lütfen sol menüden bir çalışma alanı seçin <br />
                veya "Yeni Alan Oluştur" butonuyla ilk çalışma alanınızı yaratın.
            </Typography>
        </Box>
    );
}