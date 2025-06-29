import React from 'react';
import { Box, Container, Typography, IconButton, Link, useTheme, useMediaQuery } from '@mui/material';
import logo from '../../assets/images/big-logo.svg';
import instagram from '../../assets/images/instagram.png';
import linkedin from '../../assets/images/linkedin.png';

export default function Footer() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  const legalLinks = [
    {
      title: 'Genel Şartlar',
      href: '/genel-sartlar',
    },
    {
      title: 'Gizlilik Politikası',
      href: '/gizlilik-politikasi',
    },
    {
      title: 'Kullanıcı Sözleşmesi',
      href: '/kullanici-sozlesmesi',
    },
    {
      title: 'Etik Bildirim Formu',
      href: '/etik-bildirim-formu',
    }
  ]
  return (
    <Box sx={{ background: 'rgba(2, 36, 38, 1)', color: '#fff', py: 2 }}>
      <Container
        sx={{
          py: { xs: 2, md: 4 },
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'space-between',
            alignItems: { xs: 'flex-start', md: 'center' },
            gap: { xs: 4, md: 2 },
          }}
        >
          <Box
            sx={{
              maxWidth: '175px',
            }}
          >
            <Box
              component='img'
              src={logo}
              alt='logo'
              sx={{ width: '100px' }}
            />
            <Typography
              sx={{
                fontSize: '14px',
                color: '#fff',
              }}
            >
              Kuyumculukta yeni nesil ödeme devri!
            </Typography>
          </Box>
          <Box sx={{ mt: { xs: 2, md: 0 } }}>
            <Typography
              sx={{
                fontSize: { xs: '15px', md: '16px' },
                fontWeight: 700,
                color: '#fff',
              }}
            >
              İlertişim
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: '13px', md: '14px' },
                color: 'rgba(255, 255, 255, 1)',
              }}
            >
              The Hood Tekmer, 42 Maslak
              <br />
              Ahi Evran Cd. No:6, 34485 Sarıyer/İstanbul
              <br />
              info@refinera.com.tr
            </Typography>
          </Box>
          <Box sx={{ mt: { xs: 2, md: 0 } }}>
            <Typography
              sx={{
                fontSize: { xs: '15px', md: '16px' },
                fontWeight: 700,
                color: '#fff',
              }}
            >
              Bizi Takip Edin
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: '13px', md: '14px' },
                color: 'rgba(255, 255, 255, 1)',
              }}
            >
              <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                <IconButton href="https://www.instagram.com/" target="_blank" sx={{ p: 0 }}>
                  <Box component='img' src={instagram} alt='instagram' sx={{ width: 18, height: 18 }} />
                </IconButton>
                <IconButton href="https://www.linkedin.com/" target="_blank" sx={{ p: 0 }}>
                  <Box component='img' src={linkedin} alt='linkedin' sx={{ width: 18, height: 18 }} />
                </IconButton>
              </Box>
            </Typography>
          </Box>
        </Box>
      </Container>
      <Container maxWidth="lg">
        <Box sx={{
          display: 'flex',
          gap: { xs: 1.5, md: 2 },
          justifyContent: 'center',
          alignItems: 'center',
          flexWrap: 'wrap',
          mt: 2,
          pb: 2,
          px: { xs: 1, md: 0 },
        }}>
          {legalLinks.map((link) => (
            <Link 
              href={link.href} 
              key={link.title}
              sx={{ 
                color: 'rgba(154, 166, 167, 1)', 
                textDecoration: 'none',
                fontSize: { xs: '12px', md: '14px' }
              }}
            >
              {link.title}
            </Link>
          ))}
        </Box>
      </Container>
    </Box>
  );
} 