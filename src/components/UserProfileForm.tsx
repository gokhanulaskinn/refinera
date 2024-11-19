import { Box, Grid, Typography, useTheme } from '@mui/material'
import React from 'react'
import TextInput from './TextInput'
import CommonButton from './CommonButton';
import CommonSelect from './CommonSelect';
import { User } from '../utils/types';
import { useAlert } from '../hooks/useAlert';

type UserProfileFormProps = {
  user: User;
  onSubmit: (values: any) => void
}

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

  return (
    <Box>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (oldPassword !== '') {
            if (password === confirmPassword) {
              onSubmit({ ...values, oldPassword, password });
            } else {
              showSnackbar('Şifreler uyuşmuyor', 'error');
            }
          } else {
            onSubmit(values);
          }
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextInput
              label="Ad"
              value={values.firstName}
              onChange={(e) => setValues({ ...values, firstName: e.target.value })}
              backgroundColor='#F2F4F7'
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextInput
              label="Soyad"
              value={values.lastName}
              onChange={(e) => setValues({ ...values, lastName: e.target.value })}
              backgroundColor='#F2F4F7'
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextInput
              label="E-posta"
              value={values.email}
              onChange={(e) => setValues({ ...values, email: e.target.value })}
              backgroundColor='#F2F4F7'
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextInput
              label="Telefon"
              value={values.phone}
              onChange={(e) => setValues({ ...values, phone: e.target.value })}
              backgroundColor='#F2F4F7'
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
            <TextInput
              label="Eski Şifre"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              type='password'
              autocomplete='new-password'
              backgroundColor='#F2F4F7'
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextInput
              label="Yeni Şifre"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type='password'
              required={oldPassword !== ''}
              autocomplete='new-password'
              backgroundColor='#F2F4F7'
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextInput
              label="Yeni Şifre Tekrar"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              type='password'
              required={oldPassword !== ''}
              autocomplete='new-password'
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
