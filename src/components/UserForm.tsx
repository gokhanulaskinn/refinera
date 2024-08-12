import { Box, Grid, useTheme } from '@mui/material'
import React, { useContext, useEffect } from 'react'
import TextInput from './TextInput'
import CommonButton from './CommonButton';
import CommonSelect from './CommonSelect';
import { identity } from 'lodash';
import { User } from '../utils/types';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthProvider';

type UserFormProps = {
  onSubmit: (values: any) => void;
  initialValues?: User;
}

export default function UserForm({ onSubmit, initialValues }: UserFormProps) {

  const {role} = useContext(AuthContext);
  const nav = useNavigate();

  const [userInput, setUserInput] = React.useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    identity: ''
  })

  useEffect(() => {
    if (initialValues) {
      setUserInput({
        firstName: initialValues.firstName || '',
        lastName: initialValues.lastName || '',
        email: initialValues.email || '',
        phone: initialValues.phone || '',
        identity: initialValues.identity || ''
      })
    }
  }, [initialValues])

  return (
    <Box>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(userInput);
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextInput
              label="Ad"
              value={userInput.firstName}
              onChange={(e) => setUserInput({ ...userInput, firstName: e.target.value })}
              backgroundColor='#F2F4F7'
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextInput
              label="Soyad"
              value={userInput.lastName}
              onChange={(e) => setUserInput({ ...userInput, lastName: e.target.value })}
              backgroundColor='#F2F4F7'
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextInput
              label="E-posta"
              value={userInput.email}
              onChange={(e) => setUserInput({ ...userInput, email: e.target.value })}
              backgroundColor='#F2F4F7'
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextInput
              label="Telefon"
              value={userInput.phone}
              onChange={(e) => setUserInput({ ...userInput, phone: e.target.value })}
              backgroundColor='#F2F4F7'
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextInput
              label="TC Kimlik No"
              value={userInput.identity}
              onChange={(e) => setUserInput({ ...userInput, identity: e.target.value })}
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
            onClick={() => nav(`/${role}/users`)}
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
