'use client';
import { useState } from 'react';
import { Typography, Box, Paper, List, ListItem, ListItemText, Button, Divider, Grid, CircularProgress, Avatar } from '@mui/material';
import CreateContentModal from '@/components/CreateContentModal';
import ConnectAccountModal from '@/components/ConnectAccountModal';
import { useQuery } from '@tanstack/react-query';
import { getWorkspace } from '@/services/api/workspaces';
import { getPostsByWorkspace } from '@/services/api/contentPosts';
import { type Workspace, type Post, type Account } from '@/lib/types';


interface Props {
    workspace: Workspace;
    initialPosts: Post[];
}

export default function WorkspaceClientPage({ workspace, initialPosts }: Props) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isConnectModalOpen, setIsConnectModalOpen] = useState(false);

    const { data: currentWorkspace, isLoading: isWorkspaceLoading } = useQuery({
        queryKey: ['workspace', workspace.id],
        queryFn: () => getWorkspace(workspace.id),
        initialData: workspace,
    });

    const { data: posts, isLoading: isPostsLoading } = useQuery({
        queryKey: ['posts', workspace.id],
        queryFn: () => getPostsByWorkspace(workspace.id),
        initialData: initialPosts,
    });
    const connectedAccounts = currentWorkspace?.connectedAccounts ?? [];


    return (

        <Box sx={{ p: 4, maxWidth: '1200px', margin: 'auto' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Box>
                    <Typography variant="h4" component="h1" gutterBottom>
                        {workspace.brandName}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        Sektör: {workspace.industry || 'Belirtilmemiş'}
                    </Typography>
                </Box>
            </Box>

            <Divider sx={{ my: 4 }} />
            <Grid container spacing={4}>
                {/* Sol Sütun: Bağlı Hesaplar */}
                <Grid size={{ xs: 12, md: 4 }}>
                    <Typography variant="h5" component="h2" sx={{ mb: 2 }}>
                        Bağlı Hesaplar
                    </Typography>
                    <Paper elevation={2}>
                        <List>
                            {isWorkspaceLoading ? <CircularProgress sx={{ m: 2 }} /> : (
                                connectedAccounts .map((account:Account) => (
                                    <ListItem key={account.id}>
                                        <Avatar sx={{ mr: 2, bgcolor: '#C13584' }}>
                                        </Avatar>
                                        <ListItemText primary={`${account.platformUsername}`} secondary="Instagram" />
                                    </ListItem>
                                )))}
                            {!isWorkspaceLoading && connectedAccounts.length === 0 && (
                                <ListItem>
                                    <ListItemText primary="Henüz hesap bağlanmamış." />
                                </ListItem>
                            )}
                        </List>
                    </Paper>
                    <Button variant="outlined" sx={{ mt: 2 }} onClick={() => setIsConnectModalOpen(true)}>
                        Yeni Hesap Bağla
                    </Button>
                </Grid>
                <Grid size={{ xs: 12, md: 8 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                        <Typography variant="h5" component="h2">
                            Oluşturulan İçerikler
                        </Typography>
                        <Button variant="contained" color="secondary" onClick={() => setIsModalOpen(true)}>
                            Yeni İçerik Oluştur
                        </Button>
                    </Box>
                    <Paper elevation={2}>
                        <List>
                            {posts.map((post:Post) => (
                                <ListItem key={post.id} divider>
                                    <ListItemText
                                        primary={post.generatedText.substring(0, 100) + '...'}
                                        secondary={`Oluşturulma: ${new Date(post.createdAt).toLocaleDateString('tr-TR')}`}
                                    />
                                </ListItem>
                            ))}
                            {posts.length === 0 && (
                                <ListItem>
                                    <ListItemText primary="Bu çalışma alanı için henüz içerik oluşturulmamış." />
                                </ListItem>
                            )}
                        </List>
                    </Paper>
                </Grid>
            </Grid>
            <CreateContentModal
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                workspaceId={workspace.id}
            />
            <ConnectAccountModal
                open={isConnectModalOpen}
                onClose={() => setIsConnectModalOpen(false)}
                workspaceId={workspace.id}
            />
        </Box>
    );
}