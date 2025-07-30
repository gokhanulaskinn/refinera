import React, { useState, useEffect } from 'react';
import { Box, FormControl, SxProps, TextField, Typography, IconButton, InputAdornment, useTheme } from '@mui/material';
import { IMaskInput } from 'react-imask';
import eye from '../assets/icons/eye.svg';
import eyeOff from '../assets/icons/eye-slash.svg';

type MaskedCreditCardNumberInputProps = {
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

export default function MaskedCreditCardNumberInput({ 
  borderEnabled, 
  backgroundColor, 
  label, 
  value, 
  onChange, 
  sx, 
  inputType,
  required, 
  error, 
  helperText
}: MaskedCreditCardNumberInputProps) {
  const [showRealValue, setShowRealValue] = useState(false);
  const [realValue, setRealValue] = useState(getCleanValue(value, inputType));
  const theme = useTheme();

  // Input tipine göre temiz değer elde et
  function getCleanValue(val: string, type: string) {
    switch (type) {
      case 'exp':
        return val.replace(/\D/g, '');
      case 'cvc':
        return val.replace(/\D/g, '');
      case 'phone':
        return val.replace(/\D/g, '');
      case 'iban':
        return val.replace(/[^A-Z0-9]/g, '');
      case 'number':
      default:
        return val.replace(/\D/g, '');
    }
  }

  // Prop value değiştiğinde real value'yu güncelle
  useEffect(() => {
    const cleanValue = getCleanValue(value, inputType);
    setRealValue(cleanValue);
  }, [value, inputType]);

  const handleToggleShowValue = () => {
    setShowRealValue(!showRealValue);
  };

  const handleMouseDownToggle = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const getMask = () => {
    switch (inputType) {
      case 'exp':
        return '00/0000';
      case 'phone':
        return '(000) 000 00 00';
      case 'cvc':
        return '0000';
      case 'iban':
        return 'TR00 0000 0000 0000 0000 0000 00';
      case 'number':
      default:
        return '0000 0000 0000 0000';
    }
  };

  const getMaxLength = () => {
    switch (inputType) {
      case 'exp':
        return 6; // MMYYYY
      case 'cvc':
        return 4; // CVC
      case 'phone':
        return 10; // 10 rakam
      case 'iban':
        return 24; // TR + 22 karakter
      case 'number':
      default:
        return 16; // 16 rakam
    }
  };

  const formatValue = (val: string) => {
    switch (inputType) {
      case 'exp':
        return val.replace(/(.{2})(.{4})/, '$1/$2');
      case 'phone':
        return val.replace(/(.{3})(.{3})(.{2})(.{2})/, '($1) $2 $3 $4');
      case 'iban':
        return val.replace(/(.{2})(.{4})(.{4})(.{4})(.{4})(.{4})(.{2})/, '$1$2 $3 $4 $5 $6 $7 $8');
      case 'cvc':
        return val; // CVC formatlanmaz
      case 'number':
      default:
        return val.replace(/(.{4})/g, '$1 ').trim();
    }
  };

  const getMaskedCharacter = () => {
    switch (inputType) {
      case 'exp':
      case 'cvc':
      case 'phone':
      case 'number':
        return '*';
      case 'iban':
        return 'X'; // IBAN için X kullan
      default:
        return '*';
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (showRealValue) {
      // Gerçek değer modunda normal işlem
      const inputValue = event.target.value;
      const cleanValue = getCleanValue(inputValue, inputType);
      setRealValue(cleanValue);
      const formatted = formatValue(cleanValue);
      onChange(formatted);
    }
    // Maskelenmiş modda onChange'i ignore et, onKeyPress ile handle et
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showRealValue) {
      // Input tipine göre geçerli karakterleri kontrol et
      const isValidChar = inputType === 'iban' 
        ? /[A-Z0-9]/.test(event.key.toUpperCase())
        : /[0-9]/.test(event.key);

      if (!isValidChar && event.key !== 'Backspace' && event.key !== 'Delete' && event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') {
        event.preventDefault();
        return;
      }
      
      if (isValidChar && realValue.length < getMaxLength()) {
        event.preventDefault();
        const newChar = inputType === 'iban' ? event.key.toUpperCase() : event.key;
        const newRealValue = realValue + newChar;
        setRealValue(newRealValue);
        const formatted = formatValue(newRealValue);
        onChange(formatted);
      }
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showRealValue) {
      if (event.key === 'Backspace' && realValue.length > 0) {
        event.preventDefault();
        const newRealValue = realValue.slice(0, -1);
        setRealValue(newRealValue);
        const formatted = formatValue(newRealValue);
        onChange(formatted);
      }
    }
  };

  // Gösterilecek değeri belirle
  const getDisplayValue = () => {
    if (showRealValue) {
      // Gerçek değeri formatted olarak göster
      return formatValue(realValue);
    } else {
      // Maskelenmiş değeri göster
      const maskChar = getMaskedCharacter();
      const masked = realValue.replace(/./g, maskChar);
      return formatValue(masked);
    }
  };

  const getPlaceholder = () => {
    switch (inputType) {
      case 'phone':
        return '(***) *** ** **';
      case 'exp':
        return '**/*****';
      case 'cvc':
        return '***';
      case 'iban':
        return 'TRXX XXXX XXXX XXXX XXXX XXXX XX';
      case 'number':
      default:
        return '**** **** **** ****';
    }
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
          value={getDisplayValue()}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          onKeyDown={handleKeyDown}
          InputProps={{
            inputComponent: showRealValue ? (MaskedInput as any) : undefined,
            inputProps: showRealValue ? { mask: getMask() } : {
              maxLength: getMask().length,
              pattern: inputType === 'iban' ? '[X ]*' : '[* /()]*',
            },
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={handleToggleShowValue}
                  onMouseDown={handleMouseDownToggle}
                  edge="end"
                  sx={{
                    mr: '-5px'
                  }}
                >
                  <img
                    src={showRealValue ? eye : eyeOff}
                    alt={showRealValue ? 'Değeri gizle' : 'Değeri göster'}
                    style={{
                      stroke: '#9AA6A7',
                    }}
                  />
                </IconButton>
              </InputAdornment>
            ),
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
