import { Box, Paper, TextField, Typography } from '@mui/material'
import React from 'react'
import CommonButton from './CommonButton'
import { Add, ArrowForward, ArrowForwardIos, ArrowRight, ArrowRightAltOutlined } from '@mui/icons-material'
import TextInput from './TextInput';
import { useNavigate } from 'react-router-dom';
import MoneyInput from './MoneyInput';

export default function PaymentSummary() {

  const [price, setPrice] = React.useState<number>();
  const nav = useNavigate();

  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}
    >
      <Typography>
        Toplam Ücreti Giriniz
      </Typography>
      <MoneyInput
        label=''
        value={price?.toString() || ''}
        backgroundColor='#F2F4F7'
        onChange={(value: string) => value ? setPrice(parseFloat(value)) : setPrice(undefined)}
      />
      <CommonButton
        onClick={() => { nav(`/seller/get-payment?price=${price}`) }}
        color='white'
        label='Alışverişi Tamamla'
        icon={<ArrowForwardIos />}
      />
    </Paper>
  )
}
