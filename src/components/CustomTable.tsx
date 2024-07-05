import { Box, Paper, Table, TableContainer } from '@mui/material'
import React from 'react'
import CustomTableHead from './CustomTableHead'
import { TableDataType } from '../utils/types';
import CustomTableBody from './CustomTableBody';
import CustomPaper from './CustomPaper';

type CustomTableProps = {
  data: TableDataType;
}

export default function CustomTable({ data }: CustomTableProps) {
  return (
    <CustomPaper>
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
    </CustomPaper>

  )
}
