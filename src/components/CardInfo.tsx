import { Box, Grid } from '@mui/material'
import React from 'react'
import TextInput from './TextInput'

export default function CardInfo() {
  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextInput
            label='İsim Soyisim'
            backgroundColor='#F2F4F7'
          />
        </Grid>
        <Grid item xs={12}>
          <TextInput
            label='Cep Numarası'
            backgroundColor='#F2F4F7'
          />
        </Grid>
        <Grid item xs={12}>
          <TextInput
            label='Kart Sahibi İsim Soyisim'
            backgroundColor='#F2F4F7'
          />
        </Grid>
        <Grid item xs={12}>
          <TextInput
            label='Kart Numarası'
            backgroundColor='#F2F4F7'
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextInput
            label='Ay / Yıl'
            backgroundColor='#F2F4F7'
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextInput
            label='CVC / CVV'
            backgroundColor='#F2F4F7'
          />
        </Grid>
      </Grid>
    </Box>
  )
}
