import {
  Box,
  FormControl,
  SxProps,
  TextField,
  Typography,
  InputAdornment,
  useTheme,
} from '@mui/material';
import { useEffect, useState } from 'react';

type NumberInputProps = {
  label: string;
  required?: boolean;
  placeholder?: string;
  value?: string;
  onChange?: (value: number | null) => void;
  sx?: SxProps;
  backgroundColor?: string;
  borderEnabled?: boolean;
  endAdornment?: React.ReactNode;
};

export default function NumberInput({
  endAdornment,
  borderEnabled,
  backgroundColor,
  label,
  placeholder,
  value,
  onChange,
  required,
  sx,
}: NumberInputProps) {
  const theme = useTheme();
  const [inputValue, setInputValue] = useState(value);


  useEffect(() => {
    setInputValue(value);
  } , [value]);

  // Kullanıcının girdisini işleyip ondalık sayıya çeviren fonksiyon
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    // Boş bırakılırsa null döner
    if (value === '') {
      setInputValue('');
      onChange?.(null);
      return;
    }

    // Sadece sayılar ve ondalık işaretlerini kontrol etmek için regex
    const floatRegex = /^-?\d*(\.\d*)?$/;

    if (floatRegex.test(value)) {
      setInputValue(value); // Girdi doğru formatta
      const floatValue = parseFloat(value);

      if (!isNaN(floatValue)) {
        onChange?.(floatValue); // Ondalık sayıyı geri döndür
      }
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
          ...sx,
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
          value={inputValue}
          onChange={handleInputChange}
          required={required}
          InputProps={{
            inputMode: 'decimal', // Mobil cihazlarda ondalık sayı girişi için
            endAdornment: (
              <InputAdornment position="end">
                {endAdornment} {/* Özel endAdornment burada gösterilecek */}
              </InputAdornment>
            ),
          }}
          type="text" // 'number' yerine 'text' kullanarak daha fazla esneklik sağlıyoruz
        />
      </FormControl>
    </Box>
  );
}
