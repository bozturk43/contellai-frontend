'use client';
import React from 'react';
import { AppBar, Toolbar, Typography, Button, Container, Avatar, Box, IconButton, Menu, MenuItem } from '@mui/material';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext'; // AuthContext'i kullanmak için hook'umuzu import ediyoruz

const Navbar = () => {
  // Context'ten SADECE user ve logout fonksiyonlarını alıyoruz
  const { user, logout } = useAuth();

  // isAuthenticated bilgisini 'user' nesnesinin varlığına göre anlık olarak belirliyoruz
  const isAuthenticated = !!user;
  
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    logout();
  };

  return (
    <AppBar position="static" color="primary" elevation={0}>
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Typography 
            variant="h6" component="a" href={isAuthenticated ? "/" : "/"} // Giriş yapınca dashboard'a gidebilir
            sx={{ flexGrow: 1, fontWeight: 'bold', textDecoration: 'none', color: 'inherit' }}
          >
            ContellAI
          </Typography>

          {isAuthenticated ? (
            // Kullanıcı GİRİŞ YAPMIŞSA: Avatar ve menüyü göster
            <div>
              <IconButton onClick={handleMenu} sx={{ p: 0 }}>
                <Avatar alt={user.name} sx={{ bgcolor: 'secondary.main' }}>
                  {user.name.charAt(0).toUpperCase()}
                </Avatar>
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                keepMounted
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem disabled>Kredi: {user.coinBalance}</MenuItem>
                <MenuItem onClick={handleLogout}>Çıkış Yap</MenuItem>
              </Menu>
            </div>
          ) : (
            // Kullanıcı GİRİŞ YAPMAMIŞSA: Giriş Yap butonunu göster
            <Link href="/login" passHref>
              <Button color="secondary" variant='contained' sx={{color:"white"}}>
                Giriş Yap
              </Button>
            </Link>
          )}

        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;