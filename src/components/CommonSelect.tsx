import { Box, FormControl, SxProps, Typography, Select, MenuItem, useTheme } from '@mui/material';
import { CompanyType } from '../utils/types';

type CommonSelectProps = {
  label: string;
  value?: CompanyType;
  onChange: (e: React.ChangeEvent<{ value: CompanyType }>) => void;
  items: { value: any, label: string }[];
  sx?: SxProps;
  backgroundColor?: string;
  borderEnabled?: boolean;
  required?: boolean;
};

export default function CommonSelect({ borderEnabled, backgroundColor, label, value, onChange, items, sx, required }: CommonSelectProps) {
  const theme = useTheme();

  const handleChange = (event: any) => {
    onChange(event as any);
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
            '&.Mui-focused': {
              borderRadius: '60px',
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
        <Select
          value={value}
          onChange={handleChange}
          displayEmpty
          required={required}
          inputProps={{
            sx: {
              borderRadius: '60px',
              backgroundColor: backgroundColor,
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#9AA6A7',
                borderWidth: borderEnabled ? 1 : 0,
                borderRadius: '60px',
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderWidth: borderEnabled ? 1 : 0,
                borderColor: '#9AA6A7',
                borderRadius: '60px',
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderWidth: borderEnabled ? 1 : 0,
                borderColor: '#9AA6A7',
                borderRadius: '60px',
              },
              '&.MuiOutlinedInput-input:focus': {
                borderWidth: borderEnabled ? 1 : 0,
                borderColor: '#9AA6A7',
                borderRadius: '60px',
              }
            }
          }}
        >
          {items.map((item) => (
            <MenuItem key={item.value} value={item.value}>
              {item.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
