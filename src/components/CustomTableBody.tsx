import React from 'react'
import { TableBodyRowType } from '../utils/types'
import { TableBody, TableCell, TableRow } from '@mui/material';

type CustomTableBodyProps = {
  body: TableBodyRowType[];

}

export default function CustomTableBody({ body }: CustomTableBodyProps) {
  return (
    <TableBody>
      {body.map((row, index) => (
        <TableRow key={index}>
          {row.rowData.map((cell, index) => (
            <TableCell key={index}>
              {cell.value}
            </TableCell>
          ))}
        </TableRow>
      ))}
    </TableBody>
  )
}
