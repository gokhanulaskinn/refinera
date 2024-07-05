import { Box, Grid, Typography } from '@mui/material'
import React from 'react'
import CustomPaper from '../components/CustomPaper'

export default function SellerAddEditContainer() {
  return (
    <Box>
      <Typography
        sx={{
          fontSize: '30px',
          fontWeight: 400,
        }}
      >
        Kuyumcu Ekle
      </Typography>
      <CustomPaper
        sx={{
          mt: 3
        }}
      >
        <Box>
          <Grid container spacing={3}>
            
          </Grid>
        </Box>
      </CustomPaper>
    </Box>
  )
}
