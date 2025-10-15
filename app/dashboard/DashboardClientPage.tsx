'use client';
import { useState } from 'react';
import { Typography, Box, Grid, Card, CardContent, CardActionArea, Button, CircularProgress } from '@mui/material';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { type Workspace } from '@/lib/types';
import CreateWorkspaceModal from '@/components/CreateWorkspaceModal';
import { getMyWorkspacesClient } from '@/services/api/workspaces';

interface Props {
    initialWorkspaces: Workspace[];
}

export default function DashboardClientPage({ initialWorkspaces }: Props) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { data: workspaces, isLoading } = useQuery({
        queryKey: ['workspaces'],
        queryFn: getMyWorkspacesClient,
        initialData: initialWorkspaces,
    });

    return (
        <Box sx={{ p: 4, maxWidth: '1200px', margin: 'auto' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                <Typography variant="h4" component="h1">
                    Çalışma Alanların
                </Typography>
                <Button variant="contained" onClick={() => setIsModalOpen(true)}>
                    Yeni Çalışma Alanı Ekle
                </Button>
            </Box>

            {isLoading ? <CircularProgress /> : (
                <Grid container spacing={3}>
                    {workspaces?.map((ws) => (
                        <Grid size={{xs:12,sm:6,md:4}} key={ws.id}>
                            <Card sx={{ height: '100%' }}>
                                <CardActionArea component={Link} href={`/dashboard/workspaces/${ws.id}`} sx={{ height: '100%' }}>
                                    <CardContent>
                                        <Typography variant="h6" component="div">{ws.brandName}</Typography>
                                        <Typography variant="body2" color="text.secondary">Sektör: {ws.industry || 'Belirtilmemiş'}</Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    ))}
                    {!isLoading && workspaces?.length === 0 && (
                         <Grid size={{xs:12}}>
                            <Typography color="text.secondary">Henüz bir çalışma alanınız yok. Başlamak için bir tane ekleyin!</Typography>
                         </Grid>
                    )}
                </Grid>
            )}

            <CreateWorkspaceModal open={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </Box>
    );
}