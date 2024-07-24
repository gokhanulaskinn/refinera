import React from 'react'
import CustomPaper from './CustomPaper'
import { Box, TextField, Typography, useTheme } from '@mui/material'
import { SyncAlt } from '@mui/icons-material'

export default function Exchange() {

  const [amount, setAmount] = React.useState(0);
  const [result, setResult] = React.useState('0.00');

  React.useEffect(() => {
    setResult((amount / 2030).toFixed(2));
  }, [amount]);

  return (
    <CustomPaper>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          gap: 2
        }}
      >
        <ExchangeCell
          label='Tutar Giriniz: '
          value={amount}
          onChange={(value) => setAmount(value)}
          rightIcon={<SyncAlt />}
          icon="TL"
        />
        <ExchangeCell label='Karşılığı: ' value={result} onChange={(value) => console.log(value)} icon="Has Altın/gr" />
      </Box>
    </CustomPaper>
  )
}

type ExchangeCellProps = {
  label: string
  value: any
  onChange: (value: number) => void
  button?: React.ReactNode
  rightIcon?: React.ReactNode
  icon: React.ReactNode
  sx?: object
}

function ExchangeCell({ label, value, onChange, button, rightIcon, sx, icon }: ExchangeCellProps) {
  const ref = React.useRef<HTMLInputElement>(null);
  const theme = useTheme();
  return (
    <Box
      onClick={() => ref.current?.focus()}
      sx={{
        position: 'relative',
        background: '#F2F4F7',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: '8px',
        gap: '1rem',
        p: 3,
        ...sx,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem',
        }}
      >
        <Typography>{label}</Typography>
        <TextField
          inputRef={ref}
          value={value || null}
          type='number'
          variant='standard'
          onChange={(e) => onChange(Number(e.target.value))}
          sx={{
            '& .MuiInputBase-root': {
              border: 'none',
              fontWeight: 700,
              fontSize: '30px',
            },
            '& .MuiInputBase-input': {
              padding: 0,
            },
            '& .MuiInput-underline:before': {
              borderBottom: 'none',
            },
            '& .MuiInput-underline:after': {
              borderBottom: 'none',
            },
            '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
              borderBottom: 'none',
            },

          }}
        />
      </Box>
      {button && (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          {button}
        </Box>
      )}
      {rightIcon && (
        <Box
          sx={{
            position: 'absolute',
            right: -31,
            top: 'calc(50% - 24px)',
            display: 'flex',
            zIndex: 1,
            width: 48,
            height: 48,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: '50%',
            color: 'white',
            background: theme.palette.primary.main,
          }}
        >
          {rightIcon}
        </Box>
      )}
      <Box
        sx={{
          position: 'absolute',
          background: '#9AA6A74D',
          top: 16,
          right: 16,
          borderRadius: '4px',
          px: 2,
          py: 0.5,
        }}
      >
        <Typography
          sx={{
            fontSize: '14px',
            fontWeight: 600,
          }}
        >
          {icon}
        </Typography>
      </Box>
    </Box>
  )
}
