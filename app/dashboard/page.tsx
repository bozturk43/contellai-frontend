import { getMyProfile, getMyWorkspaces } from '@/lib/data';
import { Typography, Box, Paper, List, ListItem, ListItemText } from '@mui/material';
import { redirect } from 'next/navigation';

// Bu artık bir Sunucu Bileşeni (Server Component)!
// 'use client' yok, ve fonksiyon 'async'.
export default async function DashboardPage() {
    
    // Verileri doğrudan sunucuda 'await' ile çekiyoruz
    const profile = await getMyProfile();
    const workspaces = await getMyWorkspaces();

    // Eğer kullanıcı giriş yapmamışsa (cookie yoksa), profile null gelecek
    // ve kullanıcıyı login sayfasına yönlendireceğiz.
    if (!profile) {
        redirect('/login');
    }

    return (
        <Box sx={{ p: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>
                Hoş Geldin, {profile.name}!
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                Kredi Bakiyen: {profile.coinBalance}
            </Typography>

            <Typography variant="h5" component="h2" sx={{ mt: 4, mb: 2 }}>
                Çalışma Alanların
            </Typography>

            <Paper elevation={2}>
                <List>
                    {workspaces.map((ws: any) => (
                        <ListItem key={ws.id}>
                            <ListItemText primary={ws.brandName} secondary={`ID: ${ws.id}`} />
                        </ListItem>
                    ))}
                    {workspaces.length === 0 && (
                        <ListItem>
                            <ListItemText primary="Henüz bir çalışma alanınız yok." />
                        </ListItem>
                    )}
                </List>
            </Paper>
        </Box>
    );
}