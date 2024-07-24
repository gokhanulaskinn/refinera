import { Box } from '@mui/material'
import React from 'react'
import TablePageHeader from '../components/TablePageHeader'
import CustomTable from '../components/CustomTable'
import { TableDataType } from '../utils/types'
import CustomTablePagination from '../components/CustomTablePagination'
import { useNavigate } from 'react-router-dom'

export default function LastUsersContainer() {

  const tableData: TableDataType = {
    head: [
      {
        id: 'name',
        label: 'İşlem Sahibi'
      },
      {
        id: 'owner',
        label: 'Kart Sahibi'
      },
      {
        id: 'section',
        label: 'Satış Yapan Mağaza'
      },
      {
        id: 'phone',
        label: 'Telefon Numarası'
      },
      {
        id: 'detail',
        label: 'Detay'
      },
    ],
    body: [
      {
        rowData: [
          { value: 'Can Hitay', type: 'text' },
          { value: 'Can Hitay', type: 'text' },
          { value: 'Karahan Kuyumculuk', type: 'text' },
          { value: '905555555555', type: 'text' },
          { value: ['12.000t'], type: 'badge' }
        ]
      },
      {
        rowData: [
          { value: 'Can Hitay', type: 'text' },
          { value: 'Can Hitay', type: 'text' },
          { value: 'Karahan Kuyumculuk', type: 'text' },
          { value: '905555555555', type: 'text' },
          { value: ['12.000t'], type: 'badge' }
        ]
      },
      {
        rowData: [
          { value: 'Can Hitay', type: 'text' },
          { value: 'Can Hitay', type: 'text' },
          { value: 'Karahan Kuyumculuk', type: 'text' },
          { value: '905555555555', type: 'text' },
          { value: ['12.000t'], type: 'badge' }
        ]
      },
      {
        rowData: [
          { value: 'Can Hitay', type: 'text' },
          { value: 'Can Hitay', type: 'text' },
          { value: 'Karahan Kuyumculuk', type: 'text' },
          { value: '905555555555', type: 'text' },
          { value: ['12.000t'], type: 'badge' }
        ]
      },
      {
        rowData: [
          { value: 'Can Hitay', type: 'text' },
          { value: 'Can Hitay', type: 'text' },
          { value: 'Karahan Kuyumculuk', type: 'text' },
          { value: '905555555555', type: 'text' },
          { value: ['12.000t'], type: 'badge' }
        ]
      },

    ]
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
      }}
    >
      <TablePageHeader
        title='Son Kullanıcılar'
        handleFilter={() => { }}
      />
      <CustomTable
        data={tableData}
      />
      <CustomTablePagination />
    </Box>
  )
}
