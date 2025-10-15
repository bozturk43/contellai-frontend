import { Typography, Box, Grid, Card, CardContent, Avatar } from '@mui/material';
import ChatAssistant from '@/components/ChatAssistant';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import ArticleIcon from '@mui/icons-material/Article';
import StatCard from '@/components/StatCard';
import { getMyWorkspaces } from '@/lib/data';


export default async function DashboardPage() {
    
     const [workspaces] = await Promise.all([
        getMyWorkspaces(),
    ]);
    const stats = {
        workspaceCount: workspaces?.length ?? 0,
        totalPostCount: workspaces?.reduce((sum, ws) => sum + ws.postCount, 0) ?? 0,
        totalAccountCount: workspaces?.reduce((sum, ws) => sum + ws.accountCount, 0) ?? 0,
    };

    return (
        <Box>
            <Grid container spacing={4} direction="column" alignItems="center">
                {/* ÜST SATIR: İSTATİSTİK KARTLARI */}
                <Grid size={{md:10,lg:8}} sx={{ width: '100%' }}>
                    <Typography variant="h5" sx={{ mb: 2, textAlign: 'left' }}>Genel Bakış</Typography>
                    <Grid container spacing={3}>
                        <Grid size={{xs:12,sm:6,md:4}}>
                            <StatCard title="Çalışma Alanları" value={stats.workspaceCount} icon={<BusinessCenterIcon />} />
                        </Grid>
                        <Grid size={{xs:12,sm:6,md:4}}>
                            <StatCard title="Toplam İçerik" value={stats.totalPostCount} icon={<ArticleIcon />} />
                        </Grid>
                        <Grid size={{xs:12,sm:6,md:4}}>
                            <StatCard title="Baglı Hesaplar" value={stats.totalAccountCount} icon={<ArticleIcon />} />
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