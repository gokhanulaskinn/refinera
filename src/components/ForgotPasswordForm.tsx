import { Box, Checkbox, FormControlLabel, Typography, useTheme } from '@mui/material'
import React from 'react'
import TextInput from './TextInput'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CommonButton from './CommonButton';
import { useNavigate } from 'react-router-dom';

type ForgotPasswordFormProps = {
  handleReset: (email: string) => void
}

export default function ForgotPasswordForm({ handleReset }: ForgotPasswordFormProps) {

  const [email, setEmail] = React.useState('')
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
          Şifremi Unuttum
        </Typography>
      </Box>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleReset(email);
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
        </Box>

        <Box
          sx={{
            display: 'flex',
            gap: 2,
          }}
        >
          <CommonButton
            label="Vazgeç"
            variant='outlined'
            onClick={() => nav('/login')}
            type='submit'
            sx={{
              mt: 2,
            }}
          />
          <CommonButton
            label="Şifremi Sıfırla"
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
