import { Box, Button, Paper, SxProps, TextField, Typography, useTheme } from '@mui/material'
import React from 'react'
import CommonButton from './CommonButton';
import { Add } from '@mui/icons-material';
import { ReactComponent as EqualIcon } from '../assets/icons/equals-cirlce.svg';

type ComissionCalculationProps = {
  baseComission: number;
  canSetRate?: boolean;
  comissionRate?: number;
  onSubmit: (rate: number, base: number) => void;
}

export default function ComissionCalculation({ baseComission, canSetRate, onSubmit, comissionRate }: ComissionCalculationProps) {

  const [rate, setRate] = React.useState(comissionRate || 0);
  const [base, setBase] = React.useState(baseComission);

  return (
    <Paper
      sx={{
        p: 3,
        borderRadius: '16px',
        display: 'flex',
        gap: 2
      }}
    >
      <Cell
        value={base}
        onChange={setBase}
        label="Baz Oranı"
        rightIcon={
          <Add />
        }
      />
      <Cell
        value={rate}
        onChange={setRate}
        label="Kar Marjı"
        rightIcon={
          <Typography
            sx={{
              color: 'white',
              fontSize: '30px',
            }}
          >
            =
          </Typography>
        }
      />
      <Cell
        value={base + rate}
        onChange={() => { }}
        label="POS Komisyon Oranı"
        sx={{
          flex: 1,
          minWidth: '250px',
        }}
        button={
          <CommonButton
            onClick={() => { onSubmit(rate, base) }}
            label='Komisyon Oranı Belirle'
            disabled={!canSetRate}
            color='white'
            sx={{
              borderRadius: '24px',
            }}
          />
        }
      />
    </Paper>
  )
}


type CellProps = {
  value: number;
  onChange: (newValue: number) => void;
  label: string
  rightIcon?: React.ReactNode
  button?: React.ReactNode
  sx?: SxProps
}

function Cell({ value, onChange, label, rightIcon, button, sx }: CellProps) {

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
    </Box>
  )
}
