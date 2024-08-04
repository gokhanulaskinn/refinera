import { Box, Typography } from '@mui/material'
import React from 'react'
import TablePageHeader from '../components/TablePageHeader'
import BasicTabs from '../components/CustomTabs'
import ComissionCalculation from '../components/ComissionCalculation';
import { TableDataType } from '../utils/types';
import CustomTable from '../components/CustomTable';
import CustomTablePagination from '../components/CustomTablePagination';

export default function ComissionRatesContainer() {

  const tabs = [
    'Ozan',
    'Iyzico',
    'Param',
    'Sipay'
  ];

  const tableData: TableDataType = {
    head: [
      {
        id: 'name',
        label: 'Kuyumcu'
      },
      {
        id: 'owner',
        label: 'POS Sahibi'
      },
      {
        id: 'section',
        label: 'Baz Oran'
      },
      {
        id: 'phone',
        label: 'Kar Marjı'
      },
      {
        id: 'detail',
        label: 'POS Komisyon Oranı'
      },
    ],
    body: [
      {
        rowData: [
          { value: 'Can Hitay', type: 'text' },
          { value: 'Ozan', type: 'text' },
          { value: '2.5', type: 'badge' },
          { value: '0.5', type: 'badge' },
          { value: '3', type: 'badge' }
        ]
      },
      {
        rowData: [
          { value: 'Semih Kuyumculuk', type: 'text' },
          { value: 'Ozan', type: 'text' },
          { value: '2.5', type: 'badge' },
          { value: '0.4', type: 'badge' },
          { value: '2.9', type: 'badge' }
        ]
      },
    ]
  }

  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
        }}
      >
        <TablePageHeader
          title="Pos Komisyon Oranları"
          handleFilter={() => { }}
        handleSearch={(searchText) => console.log(searchText)}
        />
        <BasicTabs
          value={value}
          handleChange={handleChange}
          tabs={tabs}
        />
        <ComissionCalculation />
        <Typography
          sx={{
            fontSize: '20px',
          }}
        >
          Özel Komisyon Oranları
        </Typography>
        <CustomTable
          data={tableData}
        />
        <CustomTablePagination />
      </Box>
    </Box>
  )
}
