import { Button, CircularProgress, SxProps } from '@mui/material'
import React from 'react'

type CommonButtonProps = {
  onClick?: () => void
  label: string
  color?: string
  type?: 'submit' | 'button' | 'reset'
  variant?: 'text' | 'outlined' | 'contained';
  disabled?: boolean
  textColor?: string
  sx?: SxProps
  icon?: React.ReactNode
  size?: 'small' | 'medium' | 'large'
  loading?: boolean
}

export default function CommonButton({ loading, size, type, label, onClick, color = 'primary', variant = 'contained', disabled = false, sx, icon }: CommonButtonProps) {
  return (
    <Button
      onClick={onClick}
      variant={variant}
      disabled={disabled || loading}
      type={type}
      size={size}
      sx={{
        width: '100%',
        borderRadius: 25,
        color: color,
        textTransform: 'none',
        display: 'flex',
        justifyContent: icon ? 'space-between' : 'center',
        gap: '10px',
        alignItems: 'center',
        ...sx,
      }}
    >
      {loading ? (
        <CircularProgress
          size={24}
          color="inherit"
          sx={{
            mx:'auto'
          }}
        />
      ) : (
        <>
          {label}
          {icon}
        </>
      )}
    </Button>
  )
}
