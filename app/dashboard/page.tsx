import { getMyProfile, getMyWorkspaces } from '@/lib/data';
import { Typography, Box, Grid, Card, CardContent, CardActionArea } from '@mui/material';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { Workspace } from '@/lib/types';



export default async function DashboardPage() {
    const profile = await getMyProfile();
    const workspaces: Workspace[] = await getMyWorkspaces();

    if (!profile) {
        redirect('/auth/login');
    }

    return (
        <Box sx={{ p: 4, maxWidth: '1200px', margin: 'auto' }}>
            <Typography variant="h4" component="h1" gutterBottom>
                Hoş Geldin, {profile.name}!
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                Kredi Bakiyen: {profile.coinBalance}
            </Typography>

            <Typography variant="h5" component="h2" sx={{ mt: 4, mb: 2 }}>
                Çalışma Alanların
            </Typography>

            <Grid container spacing={3}>
                {workspaces.map((ws) => (
                    <Grid key={ws.id} size={{ xs: 12, md: 4 ,sm:6 }}>
                        <Card sx={{ height: '100%' }}>
                            <CardActionArea component={Link} href={`/dashboard/workspaces/${ws.id}`} sx={{ height: '100%' }}>
                                <CardContent>
                                    <Typography variant="h6" component="div">
                                        {ws.brandName}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Sektör: {ws.industry || 'Belirtilmemiş'}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                ))}

                {workspaces.length === 0 && (
                     <Grid size={{ xs: 12}}>
                        <Typography color="text.secondary">
                            Henüz bir çalışma alanınız yok. Yeni bir tane oluşturun!
                        </Typography>
                     </Grid>
                )}
            </Grid>
        </Box>
    );
}