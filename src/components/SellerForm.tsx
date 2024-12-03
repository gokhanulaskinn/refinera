import { Box, Grid, Typography, useTheme } from '@mui/material'
import React, { useEffect } from 'react'
import UserInfoInput from './UserInfoInput'
import CommonButton from './CommonButton';
import CommonSelect from './CommonSelect';
import { CompanyType, Jeweler, JewelerInput, posProviders } from '../utils/types';
import { companyTypes } from '../utils/global';
import CreditCardNumberInput from './CreditCardNumberInput';
import NumberInput from './NumberInput';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';

type SellerFormProps = {
  onSubmit: (values: JewelerInput) => void;
  initialValues?: Jeweler;
  isEdit?: boolean;
}

const validationSchema = yup.object().shape({
  companyTableName: yup.string().required('Şirket tabela adı zorunludur'),
  identity: yup.string()
    .matches(/^\d{11}$/, 'TC Kimlik numarası 11 haneli olmalıdır')
    .required('TC Kimlik numarası zorunludur'),
  firstName: yup.string().required('Ad alanı zorunludur'),
  lastName: yup.string().required('Soyad alanı zorunludur'),
  email: yup.string().email('Geçerli bir e-posta adresi giriniz').required('E-posta alanı zorunludur'),
  phone: yup.string()
    .matches(/^\d{10}$/, 'Telefon numarası 10 haneli olmalıdır')
    .required('Telefon alanı zorunludur'),
  companyType: yup.string().required('Şirket türü seçiniz'),
  companyName: yup.string().required('Şirket adı zorunludur'),
  taxOffice: yup.string().required('Vergi dairesi zorunludur'),
  taxNumber: yup.string()
    .matches(/^\d{10}$/, 'Vergi numarası 10 haneli olmalıdır')
    .required('Vergi numarası zorunludur'),
  pos: yup.object().shape({
    name: yup.string().required('POS türü seçiniz'),
    rate: yup.number().min(0, 'POS oranı 0\'dan küçük olamaz').required('POS oranı zorunludur')
  }),
  bankName: yup.string().when('$isEdit', {
    is: false,
    then: (schema) => schema.required('Banka adı zorunludur')
  }),
  accountHolder: yup.string().when('$isEdit', {
    is: false,
    then: (schema) => schema.required('Hesap sahibi zorunludur')
  }),
  iban: yup.string().when('$isEdit', {
    is: false,
    then: (schema) => schema
      .matches(/^TR\d{24}$/, 'Geçerli bir IBAN giriniz')
      .required('IBAN zorunludur')
  })
});

export default function SellerForm({ onSubmit, isEdit, initialValues }: SellerFormProps) {

  const [values, setValues] = React.useState<JewelerInput>({
    firstName: '',
    lastName: '',
    companyName: '',
    companyType: undefined,
    taxOffice: '',
    taxNumber: '',
    email: '',
    identity: '',
    phone: '',
    companyTableName: '',
    accountHolder: '',
    iban: '',
    bankName: '',
    pos: {
      name: '',
      rate: 0
    }
  })

  const [errors, setErrors] = React.useState<any>({});
  const nav = useNavigate();

  useEffect(() => {
    if (initialValues) {
      setValues({
        firstName: '',
        lastName: '',
        companyName: initialValues.companyName,
        companyType: initialValues.companyType,
        taxOffice: initialValues.taxOffice,
        taxNumber: initialValues.taxNumber,
        email: initialValues.email,
        identity: '',
        phone: initialValues.phone,
        companyTableName: initialValues.companyTableName,
        accountHolder: '',
        iban: '',
        bankName: '',
        pos: initialValues.pos
      })
    }
  }, [initialValues])


  // const [values, setValues] = React.useState<JewelerInput>({
  //   firstName: 'Mustafa',
  //   lastName: 'Cevher',
  //   companyName: 'Cevher Kuyumculuk Lmt. Şti.',
  //   companyType: CompanyType.LIMITED,
  //   taxOffice: 'Alemdağ',
  //   taxNumber: '12341234',
  //   email: 'test1@kuyumcu.com',
  //   identity: '1111111110',
  //   phone: '05321234567',
  //   companyTableName: 'Cevher Kuyumculuk',
  //   accountHolder: 'Mustafa Cevher',
  //   iban: 'TR180006200119000006672315',
  //   bankName: 'Ziraaat Bankası',
  //   pos: {
  //     name: 'Ozan',
  //     rate: 0
  //   }
  // })

  return (
    <Box>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          try {
            await validationSchema.validate(values, { 
              abortEarly: false,
              context: { isEdit } 
            });
            onSubmit(values);
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
          <Grid item xs={12} md={6}>
            <UserInfoInput
              label="Şirket Tabela Adı"
              required
              value={values.companyTableName || ''}
              onChange={(value) => setValues({ ...values, companyTableName: value })}
              backgroundColor='#F2F4F7'
              inputType="text"
              error={!!errors.companyTableName}
              helperText={errors.companyTableName}
            />
          </Grid>
          {!isEdit && (
            <Grid item xs={12} md={6}>
              <UserInfoInput
                label="Mağaza Sahibi TC Kimlik Numarası"
                required
                value={values.identity || ''}
                onChange={(value) => setValues({ ...values, identity: value })}
                backgroundColor='#F2F4F7'
                inputType="tc"
                error={!!errors.identity}
                helperText={errors.identity}
              />
            </Grid>
          )}
          {!isEdit && (
            <Grid item xs={12} md={6}>
              <UserInfoInput
                label="Mağaza Sahibi Adı"
                required
                value={values.firstName || ''}
                onChange={(value) => setValues({ ...values, firstName: value })}
                backgroundColor='#F2F4F7'
                inputType="text"
                error={!!errors.firstName}
                helperText={errors.firstName}
              />
            </Grid>
          )}
          {!isEdit && (
            <Grid item xs={12} md={6}>
              <UserInfoInput
                label="Mağaza Sahibi Soyadı"
                required
                value={values.lastName || ''}
                onChange={(value) => setValues({ ...values, lastName: value })}
                backgroundColor='#F2F4F7'
                inputType="text"
                error={!!errors.lastName}
                helperText={errors.lastName}
              />
            </Grid>
          )}
          <Grid item xs={12} md={6}>
            <UserInfoInput
              label="E-Posta Adresi"
              required
              value={values.email || '' }
              onChange={(value) => setValues({ ...values, email: value })}
              backgroundColor='#F2F4F7'
              inputType="eposta"
              error={!!errors.email}
              helperText={errors.email}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <UserInfoInput
              label="Cep Telefonu"
              required
              value={values.phone || '' }
              onChange={(value) => setValues({ ...values, phone: value })}
              backgroundColor='#F2F4F7'
              inputType="phone"
              error={!!errors.phone}
              helperText={errors.phone}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <CommonSelect
              label='Şirket Türü'
              required
              backgroundColor='#F2F4F7'
              items={companyTypes}
              value={values.companyType || ''}
              onChange={(e) => setValues({ ...values, companyType: e.target.value })}
              error={!!errors.companyType}
              helperText={errors.companyType}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <UserInfoInput
              label="Şirket Adı"
              required
              value={values.companyName || ''}
              onChange={(value) => setValues({ ...values, companyName: value })}
              backgroundColor='#F2F4F7'
              inputType="text"
              error={!!errors.companyName}
              helperText={errors.companyName}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <UserInfoInput
              label="Vergi Dairesi"
              required
              value={values.taxOffice || ''}
              onChange={(value) => setValues({ ...values, taxOffice: value })}
              backgroundColor='#F2F4F7'
              inputType="text"
              error={!!errors.taxOffice}
              helperText={errors.taxOffice}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <UserInfoInput
              label="Vergi No"
              required
              value={values.taxNumber || ''}
              onChange={(value) => setValues({ ...values, taxNumber: value })}
              backgroundColor='#F2F4F7'
              inputType="text"
              error={!!errors.taxNumber}
              helperText={errors.taxNumber}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <CommonSelect
              label='Pos Türü'
              required
              backgroundColor='#F2F4F7'
              items={posProviders.map((provider) => ({ label: provider, value: provider }))}
              value={values.pos.name || ''}
              onChange={(e) => setValues({ ...values, pos: { ...values.pos, name: e.target.value } })}
              error={!!errors.pos}
              helperText={errors.pos}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <NumberInput
              label="Pos Oranı"
              required
              value={values.pos.rate.toString() || '0'}
              onChange={(value) => setValues({ ...values, pos: { ...values.pos, rate: value || 0 } })}
              backgroundColor='#F2F4F7'
              error={!!errors.pos}
              helperText={errors.pos}
            />
          </Grid>
          {!isEdit && (
            <>
              <Typography variant='h6' sx={{ mt: 2, width: '100%' }}>Banka Bilgileri</Typography>
              <Grid item xs={12} md={12}>
                <UserInfoInput
                  label="Banka Tercihi"
                  required
                  value={values.bankName || ''}
                  onChange={(value) => setValues({ ...values, bankName: value })}
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
                  value={values.accountHolder || ''}
                  onChange={(value) => setValues({ ...values, accountHolder: value })}
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
                  value={values.iban || ''}
                  onChange={(value) => setValues({ ...values, iban: value.replaceAll(' ', '') })}
                  backgroundColor='#F2F4F7'
                  error={!!errors.iban}
                  helperText={errors.iban}
                />
              </Grid>
            </>
          )}
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
            onClick={() => nav('/admin/jewelers')}
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
