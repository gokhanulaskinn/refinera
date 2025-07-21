import { Add, Remove } from '@mui/icons-material'
import { Box, IconButton, Typography } from '@mui/material'
import React from 'react'

const counterInputStyle = `
  .counter-input::-webkit-outer-spin-button,
  .counter-input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`

type CounterProps = {
  count: number;
  setCount: (count: number) => void;
}

export default function Counter({ count, setCount }: CounterProps) {

  return (
    <>
      <style>{counterInputStyle}</style>
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

      <input
        type="number"
        className="counter-input"
        value={count === 0 ? '' : count}
        placeholder="0"
        onChange={(e) => {
          const inputValue = e.target.value;
          if (inputValue === '') {
            setCount(0);
          } else {
            const numValue = parseInt(inputValue);
            if (!isNaN(numValue) && numValue >= 0) {
              setCount(numValue);
            }
          }
        }}
        onClick={(e) => e.stopPropagation()}
        style={{
          fontSize: '16px',
          fontWeight: '600',
          width: '40px',
          textAlign: 'center',
          border: 'none',
          background: 'transparent',
          outline: 'none',
          MozAppearance: 'textfield',
          WebkitAppearance: 'none'
        }}
        onWheel={(e) => e.currentTarget.blur()}
      />
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
    </>
  )
}
