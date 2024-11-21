import { Box, Checkbox, FormControlLabel, Typography, useTheme } from '@mui/material'
import React from 'react'
import TextInput from './TextInput'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CommonButton from './CommonButton';
import { useNavigate } from 'react-router-dom';

type LoginFormProps = {
  handleLogin: (email: string, password: string) => void
}

export default function LoginForm({ handleLogin }: LoginFormProps) {

  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const theme = useTheme();
  const nav = useNavigate();

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: 700,
        px: { xs: 2, sm: 4, md: 7 },
      }}
    >
      <Box>
        <Typography
          sx={{
            fontSize: 48,
            fontWeight: 400,
          }}
        >
          Refinera'ya
        </Typography>
        <Typography
          sx={{
            fontSize: 48,
            fontWeight: 400,
          }}
        >
          hoş geldiniz
        </Typography>
      </Box>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleLogin(email, password);
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            mt: 5
          }}
        >
          <TextInput
            label="E-Posta Adresi"
            value={email}
            type='email'
            required
            placeholder='E-posta adresinizi giriniz'
            onChange={(e) => setEmail(e.target.value)}
            borderEnabled
          />
          <TextInput
            label="Parola"
            type="password"
            placeholder='Parolanızı Giriniz'
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
            borderEnabled
          />
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
            gap: 2,
            mt: 1
          }}
        >
          <FormControlLabel
            sx={{
              width: '100%',
            }}
            control={
              <Checkbox
                icon={<RadioButtonUncheckedIcon />}
                checkedIcon={<CheckCircleOutlineIcon />}
                sx={{
                  color: theme.palette.primary.main,
                  '&.Mui-checked': {
                    color: theme.palette.primary.main,
                  },
                }}
              />
            }
            label="Beni Hatırla"
          />
          <CommonButton
            label="Şifremi Unuttum"
            onClick={() => nav('/forgot-password')}
            variant='text'
            sx={{
              width: 'wrap-content',
              whiteSpace: 'nowrap',
              px: 2,
            }}
          />
        </Box>
        <Box>
          <CommonButton
            label="Giriş Yap"
            onClick={() => console.log('Giriş Yap')}
            color='white'
            type='submit'
            sx={{
              mt: 2,
            }}
          />
        </Box>
      </form>
    </Box>
  )
}
