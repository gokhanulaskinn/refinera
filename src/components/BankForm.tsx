import { Box, Grid, useTheme } from '@mui/material'
import React, { useEffect } from 'react'
import TextInput from './TextInput'
import CommonButton from './CommonButton';
import { BankAccount } from '../utils/types';
import CreditCardNumberInput from './CreditCardNumberInput';
import UserInfoInput from './UserInfoInput'
import * as yup from 'yup';

type BankFormProps = {
  onSubmit: (values: any) => void
  initialValues?: BankAccount
}

// Add validation schema
const validationSchema = yup.object().shape({
  bankName: yup.string().required('Banka adı zorunludur'),
  accountHolder: yup.string().required('Hesap sahibi zorunludur'),
  iban: yup.string()
    .matches(/^TR\d{24}$/, 'Geçerli bir IBAN giriniz')
    .required('IBAN zorunludur')
});

export default function BankForm({ onSubmit, initialValues }: BankFormProps) {
  const theme = useTheme();

  const [accountValues, setAccountValues] = React.useState<Partial<BankAccount>>({
    bankName: '',
    accountHolder: '',
    iban: ''
  })

  const [errors, setErrors] = React.useState<any>({});

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
        onSubmit={async (e) => {
          e.preventDefault();
          try {
            await validationSchema.validate(accountValues, { abortEarly: false });
            onSubmit(accountValues);
          } catch (err) {
            if (err instanceof yup.ValidationError) {
              const validationErrors: { [key: string]: string } = {};
              err.inner.forEach((error) => {
                if (error.path) {
                  validationErrors[error.path] = error.message;
                }
              });
              setErrors(validationErrors);
            }
          }
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <UserInfoInput
              label="Banka Tercihi"
              required
              value={accountValues.bankName || ''}
              onChange={(value) => setAccountValues({ ...accountValues, bankName: value })}
              backgroundColor='#F2F4F7'
              inputType="text"
              error={!!errors.bankName}
              helperText={errors.bankName}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <UserInfoInput
              required
              label="Hesap Sahibi"
              value={accountValues.accountHolder || ''}
              onChange={(value) => setAccountValues({ ...accountValues, accountHolder: value })}
              backgroundColor='#F2F4F7'
              inputType="text"
              error={!!errors.accountHolder}
              helperText={errors.accountHolder}
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
              error={!!errors.iban}
              helperText={errors.iban}
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
