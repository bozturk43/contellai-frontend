'use client';
import React from 'react';
import { AppBar, Toolbar, Typography, Button, Container, Avatar, Box, IconButton, Menu, MenuItem, Chip } from '@mui/material';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn'; // Coin ikonu için import

const Navbar = () => {
  const { user, logout } = useAuth();

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
            variant="h6" component="a" href={isAuthenticated ? "/" : "/"}
            sx={{ flexGrow: 1, fontWeight: 'bold', textDecoration: 'none', color: 'inherit' }}
          >
            ContellAI
          </Typography>

          {isAuthenticated ? (
           <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Chip
                icon={<MonetizationOnIcon />}
                label={user.coinBalance}
                variant="outlined"
                size="small"
                sx={{ color: 'white', borderColor: 'rgba(255, 255, 255, 0.7)',bgcolor:'secondary.main' }}
              />
              <div>
                <IconButton onClick={handleMenu} sx={{ p: 0 }}>
                  <Avatar alt={user.name} sx={{ bgcolor: 'secondary.main' }}>
                    {user.name.charAt(0).toUpperCase()}
                  </Avatar>
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                  keepMounted
                  transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem disabled>Kredi: {user.coinBalance}</MenuItem>
                  <MenuItem onClick={handleLogout}>Çıkış Yap</MenuItem>
                </Menu>
              </div>
            </Box>
          ) : (
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