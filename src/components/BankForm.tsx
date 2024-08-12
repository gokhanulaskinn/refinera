import { Box, Grid, useTheme } from '@mui/material'
import React, { useEffect } from 'react'
import TextInput from './TextInput'
import CommonButton from './CommonButton';
import { BankAccount } from '../utils/types';
import CreditCardNumberInput from './CreditCardNumberInput';

type BankFormProps = {
  onSubmit: (values: any) => void
  initialValues?: BankAccount
}

export default function BankForm({ onSubmit, initialValues }: BankFormProps) {
  const theme = useTheme();

  const [accountValues, setAccountValues] = React.useState<Partial<BankAccount>>({
    bankName: '',
    accountHolder: '',
    iban: ''
  })

  useEffect(() => {
    if (initialValues) {
      setAccountValues({
        bankName: initialValues.bankName,
        accountHolder: initialValues.accountHolder,
        iban: initialValues.iban
      })
    }
  }
    , [initialValues])

  return (
    <Box>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(accountValues);
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <TextInput
              label="Banka Tercihi"
              value={accountValues.bankName}
              onChange={(e) => setAccountValues({ ...accountValues, bankName: e.target.value })}
              backgroundColor='#F2F4F7'
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextInput
              required
              label="Hesap Sahibi"
              value={accountValues.accountHolder}
              onChange={(e) => setAccountValues({ ...accountValues, accountHolder: e.target.value })}
              backgroundColor='#F2F4F7'
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <CreditCardNumberInput
              label="IBAN Numarası"
              required
              inputType='iban'
              value={accountValues.iban || ''}
              onChange={(value) => setAccountValues({ ...accountValues, iban: value.replaceAll(' ', '') })}
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
            type='submit'
            sx={{
              width: '100px',
              color: 'white',
            }}
          />
        </Box>
      </form>
    </Box>
  )
}
