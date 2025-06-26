import React from 'react'
import { AppBar, Toolbar, Box, Typography, Button, useTheme } from '@mui/material';
import CommonButton from '../../components/CommonButton';
import { ReactComponent as Logo } from '../../assets/images/big-logo.svg';
import { useNavigate } from 'react-router-dom';

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
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minWidth: 120,
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
  return (
    <Box>
      <AppBar position="static" sx={{ bgcolor: '#062B2A', boxShadow: 'none', px: 0 }}>
        <Toolbar sx={{ justifyContent: 'space-between', minHeight: 80, px: { xs: 1, md: 4 } }}>
          {/* Sol: Logo ve başlık */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Logo style={{ height: 32 }} />
          </Box>
          {/* Sağ: Giriş Yap butonu */}
          <Box>
            <CommonButton
              onClick={() => {
                navigate('/login');
              }}
             label="Giriş Yap" color="#fff" sx={{ bgcolor: theme.palette.primary.main, borderRadius: 8, px: 3, py: 1, fontWeight: 700, fontSize: 12, '&:hover': { bgcolor: '#b07d4a' } }} />
          </Box>
        </Toolbar>
      </AppBar>
      {/* Alt: Para birimi kutuları */}
      <Box sx={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        bgcolor: '#011B1C',
        px: { xs: 0.5, md: 2 },
        gap: 1,
      }}>
        {data.map((item, i) => (
          <PriceCard key={item.title} {...item} />
        ))}
      </Box>
    </Box>
  );
}
