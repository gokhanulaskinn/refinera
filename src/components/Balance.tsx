import { Box, Typography } from '@mui/material'
import bg from '../assets/images/balance-bg.png';
import React from 'react'

export default function Balance() {
  return (
    <Box
      sx={{
        backgroundImage: `url(${bg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '175px',
        borderRadius: '10px',
        display: 'flex',
        alignItems: 'center',
        px: '20px',
      }}
    >
      <Box>
        <Typography
          sx={{
            color: 'white',
            fontSize: '18px',
            fontWeight: 600,
          }}
        >
          Toplam Bakiyem
        </Typography>
        <Typography
          sx={{
            color: 'white',
            fontSize: '30px',
            fontWeight: 700,
          }}
        >
          100.000.000,00 TL
        </Typography>
        <Typography
          sx={{
            color: 'white',
            fontSize: '14px',
            fontWeight: 600,
          }}
        >
          ~ 155 gr has altın
        </Typography>
      </Box>
    </Box>
  )
}
