import { Box, Grid, Typography, useTheme } from '@mui/material'
import React from 'react'
import UserInfoInput from './UserInfoInput'
import CommonButton from './CommonButton';
import { User } from '../utils/types';
import { useAlert } from '../hooks/useAlert';
import * as yup from 'yup';

type UserProfileFormProps = {
  user: User;
  onSubmit: (values: any) => void
}

// Add validation schema
const validationSchema = yup.object().shape({
  firstName: yup.string().required('Ad alanı zorunludur'),
  lastName: yup.string().required('Soyad alanı zorunludur'),
  email: yup.string().email('Geçerli bir e-posta adresi giriniz').required('E-posta alanı zorunludur'),
  phone: yup.string()
    .matches(/^\d{10}$/, 'Telefon numarası 10 haneli olmalıdır')
    .required('Telefon alanı zorunludur'),
  oldPassword: yup.string(),
  password: yup.string().when('oldPassword', {
    is: (val: string) => val && val.length > 0,
    then: (schema) => schema
      .min(6, 'Şifre en az 6 karakter olmalıdır')
      .required('Yeni şifre zorunludur'),
  }),
  confirmPassword: yup.string().when('password', {
    is: (val: string) => val && val.length > 0,
    then: (schema) => schema
      .oneOf([yup.ref('password')], 'Şifreler eşleşmiyor')
      .required('Şifre tekrarı zorunludur'),
  })
});

export default function UserProfileForm({ onSubmit, user }: UserProfileFormProps) {
  const theme = useTheme();
  const showSnackbar = useAlert();

  const [values, setValues] = React.useState<Partial<User>>({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phone: user.phone,
  });

  const [oldPassword, setOldPassword] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const [confirmPassword, setConfirmPassword] = React.useState<string>('');
  const [errors, setErrors] = React.useState<any>({});

  return (
    <Box>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          setErrors({});
          
          try {
            await validationSchema.validate(
              { ...values, oldPassword, password, confirmPassword },
              { abortEarly: false }
            );
            if (oldPassword) {
              onSubmit({ ...values, oldPassword, password });
            } else {
              onSubmit(values);
            }
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
              label="Ad"
              value={values.firstName || ''}
              onChange={(value) => setValues({ ...values, firstName: value })}
              backgroundColor='#F2F4F7'
              inputType="text"
              error={!!errors.firstName}
              helperText={errors.firstName}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <UserInfoInput
              label="Soyad"
              value={values.lastName || ''}
              onChange={(value) => setValues({ ...values, lastName: value })}
              backgroundColor='#F2F4F7'
              inputType="text"
              error={!!errors.lastName}
              helperText={errors.lastName}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <UserInfoInput
              label="E-posta"
              value={values.email || ''}
              onChange={(value) => setValues({ ...values, email: value })}
              backgroundColor='#F2F4F7'
              disabled
              inputType="eposta"
              error={!!errors.email}
              helperText={errors.email}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <UserInfoInput
              label="Telefon"
              value={values.phone || ''}
              onChange={(value) => setValues({ ...values, phone: value.replace(/\D/g, '') })}
              backgroundColor='#F2F4F7'
              inputType="phone"
              error={!!errors.phone}
              helperText={errors.phone}
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <Typography
              variant='h6'
              sx={{
                color: theme.palette.primary.main
              }}
            >
              Şifre Değiştir
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <UserInfoInput
              label="Eski Şifre"
              value={oldPassword}
              onChange={(value) => setOldPassword(value)}
              inputType="password"
              autocomplete='new-password'
              backgroundColor='#F2F4F7'
              error={!!errors.oldPassword}
              helperText={errors.oldPassword}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <UserInfoInput
              label="Yeni Şifre"
              value={password}
              onChange={(value) => setPassword(value)}
              autocomplete='new-password'
              backgroundColor='#F2F4F7'
              inputType="password"
              error={!!errors.password}
              helperText={errors.password}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <UserInfoInput
              label="Yeni Şifre Tekrar"
              value={confirmPassword}
              onChange={(value) => setConfirmPassword(value)}
              autocomplete='new-password'
              backgroundColor='#F2F4F7'
              inputType="password"
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword}
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
