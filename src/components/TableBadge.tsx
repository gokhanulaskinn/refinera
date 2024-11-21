import React from 'react'
import { TableRowCellType } from '../utils/types';
import { Box } from '@mui/material';

type TableBadgeProps = {
  cell: TableRowCellType;
}

export default function TableBadge({ cell }: TableBadgeProps) {
  return (
    <Box>
      {Array.isArray(cell.value) ? cell.value.map((badge, index) => (
        <Box
          key={index}
          sx={{
            backgroundColor: '#F2F4F7',
            color: '#000',
            padding: '4px 12px',
            borderRadius: '8px',
            width: 'fit-content',
            cursor: 'pointer',
            display: 'inline-block',
            margin: '4px',
            ...cell.sx
          }}
        >
          {badge}
        </Box>
      )) : (
        <Box
          sx={{
            backgroundColor: '#F2F4F7',
            color: '#000',
            padding: '4px 12px',
            borderRadius: '8px',
            width: 'fit-content',
            cursor: 'pointer',
            ...cell.sx
          }}
        >
          {cell.value}
        </Box>
      )}
    </Box>
  )
}
