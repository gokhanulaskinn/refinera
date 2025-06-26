import React from 'react';
import { Box, Container, Typography, Button } from '@mui/material';
import orangeBg from '../../assets/images/orange-bg.png';

export default function AboutSection() {
  return (
    <Box
      sx={{
        backgroundImage: `linear-gradient(rgba(230, 120, 0, 0.6), rgba(200, 80, 0, 0.7)), url(${orangeBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        borderRadius: 3,
        py: { xs: 6, md: 8 },
        textAlign: 'center',
      }}
    >
      <Container maxWidth="md">
        <Typography variant="h4" fontWeight={700} mb={2} color="white">
          Refinera ile Tanışın
        </Typography>
        <Typography variant="body1" mb={4} color="white">
          Müşteriye komisyon yükünü yansıtmak zorunda kaldığınız günler geride kaldı.
          Yeni nesil bir ödeme platformu olarak kuyumculuk sektörüne büyük bir yenilik getiriyoruz.
          Altın fiyatı ve komisyonu ayrı ayrı işlem görebilme imkanı sunuyoruz.
          Hızlı ve güvenli alışveriş ile sizi mutlu bir alışveriş deneyimine davet ediyoruz.
        </Typography>
        <Button
          sx={{
            bgcolor: 'rgba(9, 56, 59, 1)',
            borderRadius: 8,
            textTransform: 'none',
            color: '#fff',
            '&:hover': {
              bgcolor: 'rgba(9, 56, 59, 1)',
            },
          }}
          variant="contained" size="large">
          Bizimle İletişime Geçin
        </Button>
      </Container>
    </Box>
  );
} 