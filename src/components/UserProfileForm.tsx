import { Box, Grid, useTheme } from '@mui/material'
import React from 'react'
import TextInput from './TextInput'
import CommonButton from './CommonButton';
import CommonSelect from './CommonSelect';
import { User } from '../utils/types';

type UserProfileFormProps = {
  user: User;
  onSubmit: (values: any) => void
}

export default function UserProfileForm({ onSubmit, user }: UserProfileFormProps) {
  const theme = useTheme();

  const [values, setValues] = React.useState<Partial<User>>({
    firstName: user.firstName,
    email: user.email,
    phone: user.phone,
  })

  console.log(values);

  return (
    <Box>
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
        <Grid item xs={12} md={6}>
          <TextInput
            label="Password"
            type='password'
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
    </Box>
  )
}
