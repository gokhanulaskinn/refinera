import React from 'react';
import { Box, FormControl, SxProps, TextField, Typography, useTheme } from '@mui/material';
import { IMaskInput } from 'react-imask';

type UserInfoInputProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  sx?: SxProps;
  backgroundColor?: string;
  borderEnabled?: boolean;
  inputType: 'phone' | 'eposta' | 'tc'
  required?: boolean;
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

export default function UserInfoInput({ borderEnabled, backgroundColor, label, value, onChange, sx, inputType, required }: UserInfoInputProps) {
  const theme = useTheme();

  const getMask = () => {
    switch (inputType) {
      case 'eposta':
        return 'A@A.A';
      case 'phone':
        return '(000) 000 00 00';
      case 'tc':
        return '00000000000';
      default:
        return '0000 0000 0000 0000';
    }
  };

  // const placeholder = inputType === 'phone' ? '(555) 444 33 22' :  inputType === 'exp' ? 'MM/YYYY' : inputType === 'cvc' ? 'CVC' : inputType === 'iban' ? 'TR00 0000 0000 0000 0000 0000 00' : '1234 5678 9012 3456';

  const getPlaceholder = () => {
    switch (inputType) {
      case 'phone':
        return '(555) 444 33 22';
      case 'eposta':
        return 'ornek@ornek.com';
      case 'tc':
        return '12345678901';
      default:
        return '1234 5678 9012 3456';
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
            color: '#9AA6A7',
          }}
        >
          {label}
        </Typography>
        <TextField
          value={value}
          onChange={(e) => onChange(e.target.value)}
          InputProps={{
            inputComponent: MaskedInput as any,
            inputProps: { mask: getMask() },
          }}
          placeholder={getPlaceholder()}
          required={required}
        />
      </FormControl>
    </Box>
  );
}
