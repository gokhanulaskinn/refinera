import { Box, CircularProgress, Paper, Table, TableContainer } from '@mui/material'
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
  isLoading?: boolean
}

export default function CustomTable({ data, selectable, selectedIds, setSelectedIds, isLoading }: CustomTableProps) {
  return (
    <CustomPaper sx={{ position: 'relative', minHeight: 200 }}>
      <TableContainer>
        <Table>
          <CustomTableHead
            head={data.head}
          />
          {isLoading ? (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '300px',
                zIndex: 1
              }}
            >
              <CircularProgress />
            </Box>
          ) : (
            <CustomTableBody
              body={data.body}
              selectable={selectable}
              selectedIds={selectedIds}
              setSelectedIds={setSelectedIds}
            />
          )}
        </Table>
      </TableContainer>
    </CustomPaper>

  )
}
