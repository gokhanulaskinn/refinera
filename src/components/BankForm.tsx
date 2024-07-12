import { Box, Grid, useTheme } from '@mui/material'
import React from 'react'
import TextInput from './TextInput'
import CommonButton from './CommonButton';

type BankFormProps = {
  onSubmit: () => void
}

export default function BankForm({ onSubmit }: BankFormProps) {
  const theme = useTheme();

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12} md={12}>
          <TextInput
            label="Banka Tercihi"
            backgroundColor='#F2F4F7'
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextInput
            required
            label="Hesap Sahibi"
            backgroundColor='#F2F4F7'
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextInput
            label="IBAN Numarası"
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
