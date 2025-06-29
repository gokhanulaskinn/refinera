import React from 'react'
import { AppBar, Toolbar, Box, Typography, Button, useTheme, useMediaQuery } from '@mui/material';
import CommonButton from '../../components/CommonButton';
import { ReactComponent as Logo } from '../../assets/images/big-logo.svg';
import { useNavigate } from 'react-router-dom';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const data = [
  {
    title: 'Gram Altın',
    value: '2.814,30',
    up: true,
    percent: '%0,95',
    amount: '26,48',
  },
  {
    title: 'Dolar',
    value: '33,8935',
    up: true,
    percent: '%0,03',
    amount: '0,0102',
  },
  {
    title: 'Euro',
    value: '37,6010',
    up: false,
    percent: '%-0,04',
    amount: '-0,0150',
  },
  {
    title: 'Sterlin',
    value: '44,5473',
    up: false,
    percent: '%-0,16',
    amount: '-0,0714',
  },
  {
    title: 'Bist 100',
    value: '9.685,49',
    up: true,
    percent: '%1,73',
    amount: '164,71',
  },
  {
    title: 'Bitcoin',
    value: '$60.346',
    up: true,
    percent: '%0,81',
    amount: '$486',
  },
];

function PriceCard({ title, value, up, percent, amount }: any) {
  const theme = useTheme();
  return (
    <Box
      sx={{
        display: 'flex !important',
        flexDirection: 'column',
        alignItems: 'center',
        minWidth: { xs: 100, sm: 120 },
        height: '100%',
        px: 2,
        py: 1,
        borderRight: '1px solid #223C3B',
        '&:last-child': { borderRight: 'none' },
      }}
    >
      <Typography variant="body2" color="#E6E6E6" sx={{ fontWeight: 400 }}>{title}</Typography>
      <Typography variant="h6" color="#fff" sx={{ fontWeight: 700 }}>{value}</Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.5 }}>
        <Box
          sx={{
            width: 16,
            height: 16,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: up ? theme.palette.success.main : theme.palette.error.main,
          }}
        >
          {up ? '▲' : '▼'}
        </Box>
        <Box
          sx={{
            bgcolor: up ? 'rgba(28,186,118,0.1)' : 'rgba(212,61,40,0.1)',
            color: up ? theme.palette.success.main : theme.palette.error.main,
            borderRadius: 1,
            px: 1,
            fontSize: 13,
            fontWeight: 500,
            mr: 0.5,
          }}
        >
          {percent}
        </Box>
        <Box
          sx={{
            bgcolor: up ? 'rgba(28,186,118,0.1)' : 'rgba(212,61,40,0.1)',
            color: up ? theme.palette.success.main : theme.palette.error.main,
            borderRadius: 1,
            px: 1,
            fontSize: 13,
            fontWeight: 500,
          }}
        >
          {amount}
        </Box>
      </Box>
    </Box>
  );
}

export default function Appbar() {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isTablet = useMediaQuery(theme.breakpoints.down('lg'));
  
  // Ekran boyutuna göre gösterilecek kart sayısını belirleme
  let slidesToShow = 6; // Varsayılan tam ekran
  if (isTablet) slidesToShow = 4; // Tablet boyutunda 4 kart
  if (isMobile) slidesToShow = 2; // Mobil boyutunda 2 kart
  
  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: slidesToShow,
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
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  
  return (
    <Box>
      <AppBar position="static" sx={{ bgcolor: '#062B2A', boxShadow: 'none', px: 0 }}>
        <Toolbar sx={{ minHeight: 80, px:0, mx:0 }}>
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            justifyContent: 'space-between',
            width: '100%',
            maxWidth: '1440px',
            mx: 'auto',
            px: { xs: 2, md: 4 }
          }}>
            <Logo style={{ height: 32, width: 'auto' }} />
            <CommonButton
              onClick={() => {
                navigate('/login');
              }}
              label="Giriş Yap"
              color="#fff"
              sx={{
                borderRadius: 8,
                fontSize: 14,
                maxWidth: 100,
              }} />
          </Box>
        </Toolbar>
      </AppBar>
      {/* Alt: Para birimi kutuları */}
      <Box sx={{
        width: '100%',
        bgcolor: '#011B1C',
        px: { xs: 0.5, md: 2 },
      }}>
        <Box sx={{ 
          maxWidth: '1440px', 
          mx: 'auto',
          '.slick-track': { 
            display: 'flex', 
            alignItems: 'center',
            height: '100%'
          },
          '.slick-slide': {
            height: 'auto',
            '& > div': { height: '100%' }
          }
        }}>
          <Slider {...sliderSettings}>
            {data.map((item, i) => (
              <PriceCard key={item.title} {...item} />
            ))}
          </Slider>
        </Box>
      </Box>
    </Box>
  );
}
