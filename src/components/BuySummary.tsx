import { Box, Divider, Typography } from '@mui/material'
import React from 'react'
import CustomPaper from './CustomPaper'
import CountDownProgress from './CountDownProgress'
import CommonButton from './CommonButton'
import { ArrowForwardIos } from '@mui/icons-material'

export default function BuySummary() {
  return (
    <CustomPaper>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: 2,
        }}
      >
        <Typography
          sx={{
            fontSize: '18px',
            fontWeight: 400
          }}
        >
          Toplam Tutar
        </Typography>
        <Typography
          sx={{
            fontSize: '42px',
            fontWeight: 500
          }}
        >
          12.976,50 TL
        </Typography>
        <Divider />
        <Typography
          sx={{
            fontSize: '14px',
            fontWeight: 500
          }}
        >
          2,5 gr 24 Ayar İAR Külçe Altın
        </Typography>
        <Divider />
        <CountDownProgress
          timeLeft={20}
          onFinished={() => console.log('finished')}
        />
        <CommonButton
          onClick={() => console.log('clicked')}
          color='white'
          label="Has Altın Al"
          icon={<ArrowForwardIos />}
          sx={{ mt: 4 }}
        />
      </Box>
    </CustomPaper>
  )
}
