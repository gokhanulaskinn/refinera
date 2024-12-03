import React, { useState } from 'react';
import { Box, FormControl, SxProps, TextField, Typography, useTheme, IconButton, InputAdornment } from '@mui/material';
import { IMaskInput } from 'react-imask';
import eye from '../assets/icons/eye.svg';
import eyeOff from '../assets/icons/eye-slash.svg';

type UserInfoInputProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  sx?: SxProps;
  backgroundColor?: string;
  borderEnabled?: boolean;
  inputType: 'phone' | 'eposta' | 'tc' | 'text' | 'password';
  required?: boolean;
  error?: boolean;
  helperText?: string;
  type?: string;
  autocomplete?: string;
  placeholder?: string;
};

type CustomProps = {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
};

const MaskedInput = React.forwardRef<HTMLInputElement, CustomProps & { mask: string }>(function MaskedInput(props, ref) {
  const { onChange, mask, ...other } = props;

  return (
    <IMaskInput
      {...other}
      mask={mask}
      definitions={{
        '#': /[0-9]/,
        'A': /[A-Z]/,
        '@': /[@]/,
        '.': /[.]/,
        '*': /[a-zA-Z0-9._-]/,
      }}
      inputRef={ref}
      onAccept={(value: any) => onChange({ target: { name: props.name, value } })}
      overwrite
    />
  );
});

export default function UserInfoInput({ 
  borderEnabled, 
  backgroundColor, 
  label, 
  value, 
  onChange, 
  sx, 
  inputType,
  required,
  error,
  helperText,
  type,
  autocomplete,
  placeholder
}: UserInfoInputProps) {
  const theme = useTheme();
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const getMask = () => {
    switch (inputType) {
      case 'eposta':
        return '*{1,64}@*{1,255}.*{2,}';
      case 'phone':
        return '(000) 000 00 00';
      case 'tc':
        return '00000000000';
      default:
        return '';
    }
  };

  const getPlaceholder = () => {
    switch (inputType) {
      case 'phone':
        return '(555) 444 33 22';
      case 'eposta':
        return 'ornek@ornek.com';
      case 'tc':
        return '12345678901';
      default:
        return placeholder || '';
    }
  }

  return (
    <Box>
      <FormControl
        sx={{
          width: '100%',
          '& .MuiOutlinedInput-root': {
            borderRadius: '60px',
            backgroundColor: backgroundColor,

            '& fieldset': {
              borderColor: error ? 'error.main' : '#9AA6A7',
              borderWidth: borderEnabled ? 1 : 0,
            },
            '&:hover fieldset': {
              borderWidth: borderEnabled ? 1 : 0,
              borderColor: error ? 'error.main' : '#9AA6A7',
            },
            '&.Mui-focused fieldset': {
              borderWidth: borderEnabled ? 1 : 0,
              borderColor: error ? 'error.main' : '#9AA6A7',
            },
            '&.Mui-focused': {
              borderRadius: '60px',
            },
            '& input:-webkit-autofill': {
              WebkitBoxShadow: `0 0 0 1000px ${theme.palette.background.default} inset`,
              WebkitTextFillColor: 'inherit',
            },
          },
          ...sx
        }}
        required={required}
      >
        <Typography
          sx={{
            fontSize: 16,
            fontWeight: 500,
            color: error ? 'error.main' : '#9AA6A7',
          }}
        >
          {label}
        </Typography>
        <TextField
          value={value}
          onChange={(e) => onChange(e.target.value)}
          InputProps={{
            ...((inputType === 'text' || inputType === 'eposta' || inputType === 'password') ? {} : {
              inputComponent: MaskedInput as any,
              inputProps: { mask: getMask() },
            }),
            autoComplete: autocomplete,
            type: (inputType === 'password' && !showPassword) ? 'password' : 'text',
            endAdornment: inputType === 'password' ? (
              <InputAdornment position="end">
                <IconButton
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                  sx={{
                    mr: '-5px'
                  }}
                >
                  <img
                    src={showPassword ? eye : eyeOff}
                    alt={showPassword ? 'Hide password' : 'Show password'}
                    style={{
                      stroke: '#9AA6A7',
                    }}
                  />
                </IconButton>
              </InputAdornment>
            ) : undefined
          }}
          placeholder={getPlaceholder()}
          required={required}
          error={error}
          helperText={helperText}
        />
      </FormControl>
    </Box>
  );
}
