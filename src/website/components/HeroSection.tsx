import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import bannerImage from '../../assets/images/home-header-bg.png';
import personImage from '../../assets/images/home-header-person.png';

export default function HeroSection() {
  return (
    <Box
      sx={{
        backgroundImage: `url(${bannerImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        py: { xs: 6, md: 10 },
        position: 'relative',
        overflow: 'visible',
        borderRadius: 3,
        my: 2,
        minHeight: { xs: 500, md: 700 },
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Container maxWidth="lg" sx={{ height: '100%' }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: { xs: 'column', md: 'row' },
            position: 'relative',
            height: '100%',
          }}
        >
          <Box
            sx={{
              flex: 1,
              textAlign: { xs: 'center', md: 'left' },
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: { xs: 'center', md: 'flex-start' },
              pr: { xs: 0, md: 4 },
            }}
          >
            <Typography
              sx={{
                fontSize: { xs: 40, md: 60 },
                lineHeight: { xs: 1.2, md: 1.4 },
                letterSpacing: { xs: 0, md: 0.5 },
                maxWidth: { xs: '100%', md: '50%' },
                mb: { xs: 2, md: 4 },
              }}
              color="white" 
              gutterBottom>
              Kuyumculukta<br />Yeni Nesil Ödeme<br />Devri
            </Typography>
          </Box>
          <Box
            sx={{
              position: { xs: 'static', md: 'absolute' },
              right: { xs: 0, md: -80 },
              zIndex: 2,
              mt: { xs: 4, md: 0 },
              display: { xs: 'none', sm: 'none', md: 'block' },
            }}
          >
            <Box
              component="img"
              src={personImage}
              alt="Adam"
              sx={{
                height: { xs: 450, md: 700 },
                display: 'block',
              }}
            />
          </Box>
        </Box>
      </Container>
    </Box>
  );
} 