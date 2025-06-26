import React from 'react';
import { Box, Container, Typography } from '@mui/material';

export default function Footer() {
  return (
    <Box sx={{ background: '#0a1a2f', color: '#fff', py: 2 }}>
      <Container maxWidth="lg">
        <Typography variant="body2" textAlign="center">
          © 2024 Refinera. Tüm hakları saklıdır.
        </Typography>
      </Container>
    </Box>
  );
} 