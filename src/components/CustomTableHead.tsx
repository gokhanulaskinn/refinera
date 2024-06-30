import { TableHead, TableRow, TableCell } from '@mui/material'
import React from 'react'

type CustomTableHeadProps = {
  head: {
    id: string;
    label: string;
  }[];
}

export default function CustomTableHead({ head }: CustomTableHeadProps) {
  return (
    <TableHead>
      <TableRow>
        {head.map((item, index) => (
          <TableCell
            sx={{
              fontWeight: 400,
              fontSize: '14px',
              color: 'text.secondary'
            }}
            key={index}
          >
            {item.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}
