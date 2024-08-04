import { Box, Grid, Typography, useTheme } from '@mui/material'
import React from 'react'
import TextInput from './TextInput'
import CommonButton from './CommonButton';
import CommonSelect from './CommonSelect';
import { CompanyType, Jeweler, JewelerInput } from '../utils/types';
import { companyTypes } from '../utils/global';
import CreditCardNumberInput from './CreditCardNumberInput';

type SellerFormProps = {
  onSubmit: (values: JewelerInput) => void
}

export default function SellerForm({ onSubmit }: SellerFormProps) {

  const [values, setValues] = React.useState<JewelerInput>({
    firstName: 'Mustafa',
    lastName: 'Cevher',
    companyName: 'Cevher Kuyumculuk Lmt. Şti.',
    companyType: CompanyType.LIMITED,
    taxOffice: 'Alemdağ',
    taxNumber: '12341234',
    email: 'test1@kuyumcu.com',
    identity: '1111111110',
    phone: '05321234567',
    companyTableName: 'Cevher Kuyumculuk',
    accountHolder: 'Mustafa Cevher',
    iban: 'TR180006200119000006672315',
    bankName: 'Ziraaat Bankası'
  })

  return (
    <Box>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(values);
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextInput
              label="Şirket Tabela Adı"
              required
              value={values.companyTableName}
              onChange={(e) => setValues({ ...values, companyTableName: e.target.value })}
              backgroundColor='#F2F4F7'
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextInput
              label="Mağaza Sahibi TC Kimlik Numarası"
              required
              value={values.identity}
              onChange={(e) => setValues({ ...values, identity: e.target.value })}
              backgroundColor='#F2F4F7'
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextInput
              label="Mağaza Sahibi Adı"
              required
              value={values.firstName}
              onChange={(e) => setValues({ ...values, firstName: e.target.value })}
              backgroundColor='#F2F4F7'
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextInput
              label="Mağaza Sahibi Soyadı"
              required
              value={values.lastName}
              onChange={(e) => setValues({ ...values, lastName: e.target.value })}
              backgroundColor='#F2F4F7'
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextInput
              label="E-Posta Adresi"
              required
              value={values.email}
              onChange={(e) => setValues({ ...values, email: e.target.value })}
              backgroundColor='#F2F4F7'
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextInput
              label="Cep Telefonu"
              required
              value={values.phone}
              onChange={(e) => setValues({ ...values, phone: e.target.value })}
              backgroundColor='#F2F4F7'
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <CommonSelect
              label='Şirket Türü'
              required
              backgroundColor='#F2F4F7'
              items={companyTypes}
              value={values.companyType}
              onChange={(e) => setValues({ ...values, companyType: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextInput
              label="Şirket Adı"
              required
              value={values.companyName}
              onChange={(e) => setValues({ ...values, companyName: e.target.value })}
              backgroundColor='#F2F4F7'
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextInput
              label="Vergi Dairesi"
              required
              value={values.taxOffice}
              onChange={(e) => setValues({ ...values, taxOffice: e.target.value })}
              backgroundColor='#F2F4F7'
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextInput
              label="Vergi No"
              required
              value={values.taxNumber}
              onChange={(e) => setValues({ ...values, taxNumber: e.target.value })}
              backgroundColor='#F2F4F7'
            />
          </Grid>
          <Typography variant='h6' sx={{ mt: 2, width: '100%' }}>Banka Bilgileri</Typography>
          <Grid item xs={12} md={12}>
            <TextInput
              label="Banka Tercihi"
              required
              value={values.bankName}
              onChange={(e) => setValues({ ...values, bankName: e.target.value })}
              backgroundColor='#F2F4F7'
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextInput
              required
              label="Hesap Sahibi"
              value={values.accountHolder}
              onChange={(e) => setValues({ ...values, accountHolder: e.target.value })}
              backgroundColor='#F2F4F7'
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <CreditCardNumberInput
              label="IBAN Numarası"
              required
              inputType='iban'
              value={values.iban || ''}
              onChange={(value) => setValues({ ...values, iban: value.replaceAll(' ', '') })}
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
