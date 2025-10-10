'use client';
import { Box, Drawer, List, ListItem, ListItemButton, ListItemText, Toolbar, Typography, CircularProgress, Divider } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { getMyWorkspacesClient } from '@/services/api/workspaces';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';
import CreateWorkspaceModal from './CreateWorkspaceModal';

const drawerWidth = 280;

const Sidebar = () => {
    const pathname = usePathname();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { data: workspaces, isLoading } = useQuery({
        queryKey: ['workspaces'],
        queryFn: getMyWorkspacesClient,
    });

    return (
        <>
            <Drawer
                variant="permanent"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    // Drawer'ın kağıdının (paper) layout'un bir parçası gibi davranmasını sağlıyoruz
                    [`& .MuiDrawer-paper`]: { 
                        width: drawerWidth, 
                        height: '100vh', // Tam yükseklik
                        boxSizing: 'border-box',
                        position: 'relative', // Sayfa akışına dahil et
                        borderRight: '1px solid rgba(0, 0, 0, 0.12)' // İnce bir ayırıcı çizgi
                    },
                }}
            >
                {/* Toolbar boşluğuna artık gerek yok, çünkü tüm layout Flexbox ile yönetiliyor */}
                <Box sx={{ overflow: 'auto' }}>
                    <Toolbar>
                         <Typography variant="h6" noWrap component="div">
                            Çalışma Alanları
                        </Typography>
                    </Toolbar>
                    <Divider/>
                    <List>
                        {isLoading ? (
                            <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
                                <CircularProgress />
                            </Box>
                        ) : (
                            workspaces?.map((ws) => (
                                <ListItem key={ws.id} disablePadding>
                                    <ListItemButton
                                        component={Link}
                                        href={`/dashboard/workspaces/${ws.id}`}
                                        selected={pathname === `/dashboard/workspaces/${ws.id}`}
                                    >
                                        <ListItemText primary={ws.brandName} />
                                    </ListItemButton>
                                </ListItem>
                            ))
                        )}
                         <ListItem disablePadding>
                            <ListItemButton onClick={() => setIsModalOpen(true)}>
                                <AddIcon sx={{ mr: 1 }} />
                                <ListItemText primary="Yeni Alan Oluştur" />
                            </ListItemButton>
                        </ListItem>
                    </List>
                </Box>
            </Drawer>
            <CreateWorkspaceModal open={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </>
    );
};

export default Sidebar;