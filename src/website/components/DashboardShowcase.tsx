import React from 'react';
import { Box, Container, Typography, Paper, Grid } from '@mui/material';
import dashboardImage from '../../assets/images/banner-image.png';

export default function DashboardShowcase() {
  return (
    <Box
      sx={{
        py: { xs: 6, md: 10 },
      }}
    >
      <Container maxWidth="lg" sx={{ textAlign: 'center' }}>
        <Typography variant="h3" fontWeight={700} mb={4}>
          İhtiyacın olan her şey tek bir panelde!
        </Typography>
        <Typography variant="body1" mb={4}>
          Hızlı, güvenilir, kullanımı kolay!
        </Typography>
        <Box sx={{ position: 'relative', display: 'inline-block', mb: 4 }}>
          <Box
            component="img"
            src={dashboardImage}
            alt="Dashboard"
            sx={{
              width: '100%',
              maxWidth: '100%',
              height: 'auto',
              objectFit: 'contain',
            }}
          />
        </Box>
      </Container>
    </Box>
  );
} 