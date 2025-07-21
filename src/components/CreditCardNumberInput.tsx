import React, { useState } from 'react';
import { Box, FormControl, SxProps, TextField, Typography, useTheme, InputAdornment, IconButton } from '@mui/material';
import { IMaskInput } from 'react-imask';
import EyeIcon from '../assets/icons/eye.svg';
import EyeSlashIcon from '../assets/icons/eye-slash.svg';

type CreditCardNumberInputProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  sx?: SxProps;
  backgroundColor?: string;
  borderEnabled?: boolean;
  inputType: 'number' | 'exp' | 'cvc' | 'iban' | 'phone';
  required?: boolean;
  error?: boolean;
  helperText?: string;
  maskedOn?: boolean;
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
      }}
      inputRef={ref}
      onAccept={(value: any) => onChange({ target: { name: props.name, value } })}
      overwrite
    />
  );
});

export default function CreditCardNumberInput({ borderEnabled, backgroundColor, label, value, onChange, sx, inputType, required, error, helperText, maskedOn = false }: CreditCardNumberInputProps) {
  const theme = useTheme();
  const [showValue, setShowValue] = useState(false);

  const getMask = () => {
    switch (inputType) {
      case 'exp':
        return '00/0000';
      case 'phone':
        return '(000) 000 00 00';
      case 'cvc':
        return '0000';
      case 'iban':
        return 'TR00 0000 0000 0000 0000 0000 00'; // TR IBAN formatı
      case 'number':
      default:
        return '0000 0000 0000 0000';
    }
  };

  const getMaxLength = () => {
    switch (inputType) {
      case 'exp':
        return 7; // MM/YYYY
      case 'phone':
        return 15; // (000) 000 00 00
      case 'cvc':
        return 4;
      case 'iban':
        return 32; // TR00 0000 0000 0000 0000 0000 00
      case 'number':
      default:
        return 19; // 0000 0000 0000 0000
    }
  };

  const formatValue = (val: string) => {
    // Maskeleme aktifken format kontrolü yap
    if (!maskedOn) return val;
    
    // Sadece rakamları al
    const numbers = val.replace(/\D/g, '');
    
    switch (inputType) {
      case 'number':
        // Kredi kartı formatı: 0000 0000 0000 0000
        return numbers.replace(/(\d{4})(?=\d)/g, '$1 ').substr(0, 19);
      case 'exp':
        // Tarih formatı: 00/0000
        if (numbers.length >= 2) {
          return numbers.substr(0, 2) + '/' + numbers.substr(2, 4);
        }
        return numbers;
      case 'phone':
        // Telefon formatı: (000) 000 00 00
        if (numbers.length >= 3) {
          let formatted = '(' + numbers.substr(0, 3) + ')';
          if (numbers.length >= 6) {
            formatted += ' ' + numbers.substr(3, 3);
            if (numbers.length >= 8) {
              formatted += ' ' + numbers.substr(6, 2);
              if (numbers.length >= 10) {
                formatted += ' ' + numbers.substr(8, 2);
              }
            }
          } else if (numbers.length > 3) {
            formatted += ' ' + numbers.substr(3);
          }
          return formatted;
        }
        return numbers;
      case 'iban':
        // IBAN formatı: TR00 0000 0000 0000 0000 0000 00
        let iban = 'TR' + numbers;
        return iban.replace(/(.{4})/g, '$1 ').trim().substr(0, 32);
      default:
        return val;
    }
  };

  const getMaskedDisplay = (val: string) => {
    if (!maskedOn || showValue) return val;
    return val.replace(/\d/g, '*');
  };

  const placeholder = inputType === 'phone' ? '(555) 444 33 22' :  inputType === 'exp' ? 'MM/YYYY' : inputType === 'cvc' ? 'CVC' : inputType === 'iban' ? 'TR00 0000 0000 0000 0000 0000 00' : '1234 5678 9012 3456';

  const handleMouseDown = () => {
    if (maskedOn) {
      setShowValue(true);
    }
  };

  const handleMouseUp = () => {
    if (maskedOn) {
      setShowValue(false);
    }
  };

  const handleMouseLeave = () => {
    if (maskedOn) {
      setShowValue(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    
    if (maskedOn) {
      // Manuel formatla
      const formatted = formatValue(inputValue);
      onChange(formatted);
    } else {
      onChange(inputValue);
    }
  };

  // Maskeleme aktifse normal input kullan, değilse IMask kullan
  const isUsingMask = !maskedOn;

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
          value={getMaskedDisplay(value)}
          onChange={handleChange}
          inputProps={{
            maxLength: getMaxLength()
          }}
          InputProps={{
            inputComponent: isUsingMask ? MaskedInput as any : undefined,
            inputProps: isUsingMask ? { 
              mask: getMask()
            } : {
              maxLength: getMaxLength()
            },
            endAdornment: maskedOn && (
              <InputAdornment position="end">
                <IconButton
                  onMouseDown={handleMouseDown}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseLeave}
                  edge="end"
                  style={{ 
                    padding: '8px',
                    userSelect: 'none'
                  }}
                >
                  <img 
                    src={showValue ? EyeIcon : EyeSlashIcon}
                    alt={showValue ? "Gizle" : "Göster"}
                    style={{ width: 20, height: 20 }}
                  />
                </IconButton>
              </InputAdornment>
            )
          }}
          placeholder={placeholder}
          required={required}
          error={error}
          helperText={helperText}
        />
      </FormControl>
    </Box>
  );
}
