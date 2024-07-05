import { Paper, SxProps } from '@mui/material';
import React from 'react'

type CustomPaperProps = {
  children: React.ReactNode;
  sx?: SxProps;
}

export default function CustomPaper({ children, sx }: CustomPaperProps) {
  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: '16px',
        px: 5,
        py: 3,
        ...sx
      }}
    >
      {children}
    </Paper>
  )
}
