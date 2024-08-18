import { Box, FormControl, SxProps, TextField, Typography, IconButton, InputAdornment, useTheme } from '@mui/material';
import { useState } from 'react';
import eye from '../assets/icons/eye.svg';
import eyeOff from '../assets/icons/eye-slash.svg';

type TextInputProps = {
  label: string;
  required?: boolean;
  multiline?: boolean;
  rows?: number;
  placeholder?: string;
  type?: string;
  value?: any;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  sx?: SxProps;
  autocomplete?: string;
  backgroundColor?: string;
  borderEnabled?: boolean;
  endAdornment?: React.ReactNode; // EndAdornment prop'u eklendi
};

export default function TextInput({ endAdornment, autocomplete, borderEnabled, backgroundColor, label, placeholder, type, value, onChange, required, multiline, rows, sx }: TextInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const theme = useTheme();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <Box>
      <FormControl
        sx={{
          width: '100%',
          '& .MuiOutlinedInput-root': {
            borderRadius: '60px',
            backgroundColor: backgroundColor,

            '& fieldset': {
              borderColor: '#9AA6A7',
              borderWidth: borderEnabled ? 1 : 0,
            },
            '&:hover fieldset': {
              borderWidth: borderEnabled ? 1 : 0,
              borderColor: '#9AA6A7',
            },
            '&.Mui-focused fieldset': {
              borderWidth: borderEnabled ? 1 : 0,
              borderColor: '#9AA6A7',
            },
            '& input:-webkit-autofill': {
              WebkitBoxShadow: `0 0 0 1000px ${theme.palette.background.default} inset`,
              WebkitTextFillColor: 'inherit',
            },
          },
          ...sx
        }}
      >
        <Typography
          sx={{
            fontSize: 16,
            fontWeight: 500,
            color: '#9AA6A7',
          }}
        >
          {label}
        </Typography>
        <TextField
          placeholder={placeholder}
          type={(type === 'password' && showPassword) ? 'text' : type}
          value={value}
          onChange={onChange}
          required={required}
          multiline={multiline}
          rows={rows}
          InputProps={{
            autoComplete: autocomplete,
            endAdornment: (
              <InputAdornment position="end">
                {type === 'password' && (
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
                )}
                {endAdornment} {/* Özel endAdornment burada gösterilecek */}
              </InputAdornment>
            ),
          }}
        />
      </FormControl>
    </Box>
  );
}
