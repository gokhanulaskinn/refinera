import { Box, Grid } from '@mui/material'
import React from 'react'
import TextInput from './TextInput'
import CreditCardNumberInput from './CreditCardNumberInput'
import { PaymentInput } from '../utils/types'

type CardInfoProps = {
  cardInfo: PaymentInput;
  setCardInfo: (cardInfo: PaymentInput) => void;
}

export default function CardInfo({ cardInfo, setCardInfo }: CardInfoProps) {

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextInput
            label='İsim Soyisim'
            value={cardInfo.customerName}
            onChange={(e) => setCardInfo({ ...cardInfo, customerName: e.target.value })}
            backgroundColor='#F2F4F7'
          />
        </Grid>
        <Grid item xs={12}>
          <TextInput
            label='Cep Numarası'
            value={cardInfo.customerPhone}
            onChange={(e) => setCardInfo({ ...cardInfo, customerPhone: e.target.value })}
            backgroundColor='#F2F4F7'
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextInput
            label='Kart Sahibi İsim Soyisim'
            value={cardInfo.cardAccountHolderName}
            onChange={(e) => setCardInfo({ ...cardInfo, cardAccountHolderName: e.target.value })}
            backgroundColor='#F2F4F7'
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextInput
            label='Kart Sahibi TCKN / Pasaport Numarası'
            value={cardInfo.customerIdentity}
            onChange={(e) => setCardInfo({ ...cardInfo, customerIdentity: e.target.value })}
            backgroundColor='#F2F4F7'
          />
        </Grid>
        <Grid item xs={12}>
          <CreditCardNumberInput
            label="Kart Numarası"
            inputType='number'
            value={cardInfo.cardNumber}
            onChange={(e) => setCardInfo({ ...cardInfo, cardNumber: e.replaceAll(' ', '') })}
            backgroundColor='#F2F4F7'
          />

        </Grid>
        <Grid item xs={12} sm={6}>
          <CreditCardNumberInput
            label="Son Geçerlilik Tarihi"
            inputType='exp'
            value={cardInfo.cardExpiry}
            onChange={(e) => setCardInfo({ ...cardInfo, cardExpiry: e })}
            backgroundColor='#F2F4F7'
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CreditCardNumberInput
            label="CVC / CVV"
            inputType='cvc'
            value={cardInfo.cardCvv}
            onChange={(e) => setCardInfo({ ...cardInfo, cardCvv: e })}
            backgroundColor='#F2F4F7'
          />
        </Grid>
      </Grid>
    </Box>
  )
}
