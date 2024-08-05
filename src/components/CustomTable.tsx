import { Box, Paper, Table, TableContainer } from '@mui/material'
import React from 'react'
import CustomTableHead from './CustomTableHead'
import { TableDataType } from '../utils/types';
import CustomTableBody from './CustomTableBody';
import CustomPaper from './CustomPaper';

type CustomTableProps = {
  data: TableDataType;
  selectable?: boolean;
  selectedIds?: string[];
  setSelectedIds?: (ids: string[]) => void;
}

export default function CustomTable({ data, selectable, selectedIds, setSelectedIds }: CustomTableProps) {
  return (
    <CustomPaper>
      <TableContainer>
        <Table>
          <CustomTableHead
            head={data.head}
          />
          <CustomTableBody
            body={data.body}
            selectable={selectable}
            selectedIds={selectedIds}
            setSelectedIds={setSelectedIds}
          />
        </Table>
      </TableContainer>
    </CustomPaper>

  )
}
