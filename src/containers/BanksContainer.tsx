import { Box } from '@mui/material'
import React, { useContext } from 'react'
import TablePageHeader from '../components/TablePageHeader'
import CustomTable from '../components/CustomTable'
import { TableDataType } from '../utils/types'
import CustomTablePagination from '../components/CustomTablePagination'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthProvider'

export default function BanksContainer() {

  const tableData: TableDataType = {
    head: [
      {
        id: 'name',
        label: 'Banka Adı'
      },
      {
        id: 'owner',
        label: 'Hesap Sahibi'
      },
      {
        id: 'iban',
        label: 'IBAN Numarası'
      },
      {
        id: 'actions',
        label: 'İşlemler'
      }
    ],
    body: [
      {
        rowData: [
          { value: 'Ziraat Bankası', type: 'text' },
          { value: 'Can Hitay', type: 'text' },
          { value: 'TR09876543210987654321098', type: 'text' },
          {
            value: '',
            type: 'actions',
            actions: [
              {
                name: 'Düzenle',
                action: () => console.log('Düzenle')
              },
              {
                name: 'Sil',
                action: () => console.log('Sil')
              }
            ]
          }
        ]
      },
      {
        rowData: [
          { value: 'Garanti Bankası', type: 'text' },
          { value: 'Can Hitay', type: 'text' },
          { value: 'TR123456789012345678901234', type: 'text' },
          {
            value: '',
            type: 'actions',
            actions: [
              {
                name: 'Düzenle',
                action: () => console.log('Düzenle')
              },
              {
                name: 'Sil',
                action: () => console.log('Sil')
              }
            ]
          }
        ]
      },

    ]
  }

  const { role } = useContext(AuthContext);

  const nav = useNavigate()

  const handleAddBank = () => {
    nav(`/${role}/banks/new`);
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
        title='Banka Listesi'
        addText='Yeni Banka Ekle'
        handleFilter={() => { }}
        handleAdd={handleAddBank}
      />
      <CustomTable
        data={tableData}
      />
      <CustomTablePagination />
    </Box>
  )
}
