import React from 'react';
import { Box, Container, Typography, useTheme } from '@mui/material';
import kocak from '../../assets/images/kocak.png';
import gold from '../../assets/images/gold.png';
import albaraka from '../../assets/images/albaraka.png';
import param from '../../assets/images/param.png';
import elekse from '../../assets/images/elekse.png';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const partners = [
  { src: kocak, alt: 'Kocak' },
  { src: gold, alt: 'Nadir Gold' },
  { src: albaraka, alt: 'Albaraka' },
  { src: param, alt: 'Param' },
  { src: elekse, alt: 'Elekse' },
];

export default function PartnersSection() {
  const theme = useTheme();
  
  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    cssEase: "linear",
    arrows: false,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      }
    ]
  };

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
        <Box sx={{ 
          mt: 2,
          '.slick-track': { 
            display: 'flex', 
            alignItems: 'center'
          },
          '.slick-slide': {
            height: 'auto',
            '& > div': { 
              height: '100%', 
              display: 'flex', 
              justifyContent: 'center' 
            }
          }
        }}>
          <Slider {...sliderSettings}>
            {partners.map((partner, i) => (
              <Box key={i} sx={{ px: 2, textAlign: 'center' }}>
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
              </Box>
            ))}
          </Slider>
        </Box>
      </Container>
    </Box>
  );
} 