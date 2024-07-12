import { Box, Grid, useTheme } from '@mui/material'
import React from 'react'
import TextInput from './TextInput'
import CommonButton from './CommonButton';

type SellerFormProps = {
  onSubmit: () => void
}

export default function SellerForm({ onSubmit }: SellerFormProps) {
  const theme = useTheme();

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <TextInput
            label="Şirket Tabela Adı"
            backgroundColor='#F2F4F7'
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextInput
            label="Mağaza Sahibi TC Kimlik Numarası"
            backgroundColor='#F2F4F7'
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextInput
            label="Mağaza Sahibi Adı"
            backgroundColor='#F2F4F7'
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextInput
            label="Mağaza Sahibi Soyadı"
            backgroundColor='#F2F4F7'
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextInput
            label="E-Posta Adresi"
            backgroundColor='#F2F4F7'
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextInput
            label="Cep Telefonu"
            backgroundColor='#F2F4F7'
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextInput
            label="Şirket Türü"
            backgroundColor='#F2F4F7'
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextInput
            label="Şirket Adı"
            backgroundColor='#F2F4F7'
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextInput
            label="Vergi Dairesi"
            backgroundColor='#F2F4F7'
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextInput
            label="Vergi No"
            backgroundColor='#F2F4F7'
          />
        </Grid>
      </Grid>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          gap: 2,
          mt: 3
        }}
      >
        <CommonButton
          label='Vazgeç'
          variant='outlined'
          onClick={() => console.log('vazgeç')}
          sx={{
            width: '100px'
          }}
        />
        <CommonButton
          label='Kaydet'
          onClick={() => onSubmit()}
          sx={{
            width: '100px',
            color: 'white',
          }}
        />
      </Box>
    </Box>
  )
}
