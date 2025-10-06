'use client';
import React from 'react';
import { Box, Container, Typography, Link } from '@mui/material';

const Footer = () => {
  return (
    <Box 
      component="footer" 
      sx={{ 
        py: 3, // Dikey padding
        px: 4, // Yatay padding
        mt: 'auto', // Footer'ı sayfanın en altına iter
        backgroundColor: (theme) => 
          theme.palette.mode === 'light' 
            ? theme.palette.grey[200] 
            : theme.palette.grey[800],
      }}
    >
      {/* Container, içeriği Navbar ile aynı hizada tutar */}
        {/* Typography'ye align="right" vererek yazıyı Container'ın sağına yaslarız */}
        <Typography variant="body2" color="text.secondary" align="right">
          {'Copyright © '}
          <Link color="inherit" href="/">
            ContellAI
          </Link>{' '}
          {new Date().getFullYear()}
          {'.'}
        </Typography>
    </Box>
  );
};

export default Footer;