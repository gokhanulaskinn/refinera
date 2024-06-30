import { Box, Paper, Table, TableContainer } from '@mui/material'
import React from 'react'
import CustomTableHead from './CustomTableHead'
import { TableDataType } from '../utils/types';
import CustomTableBody from './CustomTableBody';

type CustomTableProps = {
  data: TableDataType;
}

export default function CustomTable({ data }: CustomTableProps) {
  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: '16px',
        px: 5,
        py: 3
      }}
    >
      <TableContainer>
        <Table>
          <CustomTableHead
            head={data.head}
          />
          <CustomTableBody
            body={data.body}
          />
        </Table>
      </TableContainer>
    </Paper>
  )
}
