import React from 'react';
import { Box, Container, Typography, Grid, useTheme } from '@mui/material';
import kocak from '../../assets/images/kocak.png';
import gold from '../../assets/images/gold.png';
import albaraka from '../../assets/images/albaraka.png';
import param from '../../assets/images/param.png';
import elekse from '../../assets/images/elekse.png';

const partners = [
  { src: kocak, alt: 'Kocak' },
  { src: gold, alt: 'Nadir Gold' },
  { src: albaraka, alt: 'Albaraka' },
  { src: param, alt: 'Param' },
  { src: elekse, alt: 'Elekse' },
];

export default function PartnersSection() {
  const theme = useTheme();

  return (
    <Box sx={{ background: '#fff', py: { xs: 5, md: 8 }, my: 2, borderRadius: 2, boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
      <Container maxWidth="lg">
        <Typography
          mb={5}
          textAlign="center"
          sx={{
            fontSize: { xs: 26, md: 30 },
          }}
        >
          Partnerlerimiz
        </Typography>
        <Grid
          container
          spacing={{ xs: 3, md: 5 }}
          justifyContent="center"
          alignItems="center"
          sx={{ mt: 2 }}
        >
          {partners.map((partner, i) => (
            <Grid item key={i} xs={6} sm={4} md={2} textAlign="center">
              <Box
                component="img"
                src={partner.src}
                alt={partner.alt}
                sx={{
                  maxHeight: 60,
                  maxWidth: '100%',
                  objectFit: 'contain',
                  mx: 'auto',
                  opacity: 0.8,
                  filter: 'grayscale(30%)',
                  transition: 'all 0.3s ease-in-out',
                  '&:hover': {
                    opacity: 1,
                    filter: 'grayscale(0%)',
                    transform: 'scale(1.05)',
                  }
                }}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
} 