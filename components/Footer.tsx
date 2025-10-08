'use client';
import React from 'react';
import { Box, Container, Typography, Link } from '@mui/material';

const Footer = () => {
  return (
    <Box 
      component="footer" 
      sx={{ 
        py: 3,
        px: 4,
        mt: 'auto',
        backgroundColor: (theme) => 
          theme.palette.mode === 'light' 
            ? theme.palette.grey[200] 
            : theme.palette.grey[800],
      }}
    >
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