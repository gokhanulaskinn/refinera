import { Add, Remove } from '@mui/icons-material'
import { Box, IconButton, Typography } from '@mui/material'
import React from 'react'

type CounterProps = {
  count: number;
  setCount: (count: number) => void;
}

export default function Counter({ count, setCount }: CounterProps) {

  return (
    <Box
      onClick={(e) => e.stopPropagation()}
      sx={{
        borderRadius: '4px',
        background: '#F2F4F7',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '8px',
        p: 1
      }}
    >
      <IconButton
        onClick={(e) => {
          e.stopPropagation()
          if (count > 0) {
            setCount(count - 1)
          }
        }}
      >
        <Remove
          sx={{ width: '12px', height: '12px' }}
        />
      </IconButton>

      <Typography
        sx={{
          fontSize: '16px',
          fontWeight: '600',
          width: '20px',
          textAlign: 'center'
        }}
      >
        {count}
      </Typography>
      <IconButton
        onClick={(e) => {
          e.stopPropagation();
          setCount(count + 1)
        }}
      >
        <Add
          sx={{ width: '12px', height: '12px' }}
        />
      </IconButton>
    </Box>
  )
}
