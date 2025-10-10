'use client';
import { useState } from 'react';
import { Typography, Box, Paper, List, ListItem, ListItemText, Button, Divider, Grid, CircularProgress, Avatar, Chip,Breadcrumbs,Link as MuiLink } from '@mui/material';
import CreateContentModal from '@/components/CreateContentModal';
import ConnectAccountModal from '@/components/ConnectAccountModal';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link'; // Next.js Link'i
import { getWorkspace } from '@/services/api/workspaces';
import { getPostsByWorkspace } from '@/services/api/contentPosts';
import { type Workspace, type Post, type Account } from '@/lib/types';
import InstagramIcon from '@mui/icons-material/Instagram';
import NavigateNextIcon from '@mui/icons-material/NavigateNext'; // Ayırıcı ikon

import { Instagram } from '@mui/icons-material';
import PostCard from '@/components/PostCard';
import AddIcon from '@mui/icons-material/Add'; // "Ekle" butonu için ikon



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
            <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb" sx={{ mb: 3 }}>
                <MuiLink component={Link} underline="hover" color="inherit" href="/dashboard">
                    Dashboard
                </MuiLink>
                <Typography color="text.primary">{workspace.brandName}</Typography>
            </Breadcrumbs>            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: 'flex-start', mb: 2, gap: 2 }}>

                {/* Sol Taraf: Workspace Bilgileri ve Bağlı Hesaplar */}
                <Box>
                    <Typography variant="h4" component="h1" gutterBottom>
                        {workspace.brandName}
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                        Sektör: {workspace.industry || 'Belirtilmemiş'}
                    </Typography>

                    {/* Bağlı Hesapları Chip'ler olarak gösteriyoruz */}
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                        {connectedAccounts.map((account) => (
                            <Chip
                                key={account.id}
                                icon={<InstagramIcon />}
                                label={`${account.platformUsername}`}
                                variant="outlined"
                                onDelete={() => { /* TODO: Silme fonksiyonu eklenebilir */ }}
                            />
                        ))}
                        <Button variant="text" size="small" startIcon={<AddIcon />} onClick={() => setIsConnectModalOpen(true)}>
                            Hesap Bağla
                        </Button>
                    </Box>
                </Box>

                {/* Sağ Taraf: Ana Eylem Butonu */}
                <Button variant="contained" color="secondary" size="large" onClick={() => setIsModalOpen(true)} sx={{ mt: { xs: 2, md: 0 } }}>
                    Yeni İçerik Oluştur
                </Button>
            </Box>
            <Divider sx={{ my: 4 }} />
            <Typography variant="h5" component="h2" sx={{ mb: 2 }}>
                Oluşturulan İçerikler
            </Typography>

            {isPostsLoading ? <CircularProgress /> : (
                <Grid container spacing={3}>
                    {posts?.map((post) => (
                        <Grid key={post.id} size={{ xs: 12, sm: 6, lg: 4 }}>
                            <PostCard post={post} workspace={workspace} />
                        </Grid>
                    ))}
                </Grid>
            )}

            {!isPostsLoading && posts?.length === 0 && (
                <Typography color="text.secondary" sx={{ mt: 4, textAlign: 'center' }}>
                    Bu çalışma alanı için henüz içerik oluşturulmamış. <br />
                    Yukarıdaki "Yeni İçerik Oluştur" butonuyla ilk içeriğini hemen oluştur!
                </Typography>
            )}
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