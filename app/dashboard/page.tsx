'use client';
import { Typography, Box, Grid, Card, CardContent, Avatar } from '@mui/material';
import ChatAssistant from '@/components/ChatAssistant';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import ArticleIcon from '@mui/icons-material/Article';
import StatCard from '@/components/StatCard';


export default function DashboardPage() {

    return (
        <Box>
            <Grid container spacing={4} direction="column" alignItems="center">
                {/* ÜST SATIR: İSTATİSTİK KARTLARI */}
                <Grid size={{md:10,lg:8}} sx={{ width: '100%' }}>
                    <Typography variant="h5" sx={{ mb: 2, textAlign: 'left' }}>Genel Bakış</Typography>
                    <Grid container spacing={3}>
                        <Grid size={{xs:12,sm:6,md:4}}>
                            <StatCard title="Çalışma Alanları" value="..." icon={<BusinessCenterIcon />} />
                        </Grid>
                        <Grid size={{xs:12,sm:6,md:4}}>
                            <StatCard title="Toplam İçerik" value="..." icon={<ArticleIcon />} />
                        </Grid>
                        <Grid size={{xs:12,sm:6,md:4}}>
                            <StatCard title="Baglı Hesaplar" value="..." icon={<ArticleIcon />} />
                        </Grid>
                    </Grid>
                </Grid>
                {/* ALT SATIR: CHAT ASİSTANI */}
                <Grid size={{xs:12,md:10,lg:8}} sx={{ width: '100%', height: '60vh' }}>
                    <ChatAssistant />
                </Grid>
            </Grid>
        </Box>
    );
}