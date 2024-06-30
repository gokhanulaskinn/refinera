import { Box } from '@mui/material'
import React from 'react'
import TablePageHeader from '../components/TablePageHeader'
import CustomTable from '../components/CustomTable'

export default function SellersContainer() {

  const tableData = {
    head: [
      {
        id: 'name',
        label: 'Ad-Soyad'
      },
      {
        id: 'username',
        label: 'Kullanıcı Adı'
      },
      {
        id: 'email',
        label: 'E-Posta'
      },
      {
        id: 'phone',
        label: 'Telefon Numarası'
      },
      {
        id: 'role',
        label: 'Yetki'
      },
      {
        id: 'status',
        label: 'Durum'
      },
      {
        id: 'actions',
        label: 'İşlemler'
      }
    ],
    body: [
      {
        rowData: [
          {
            value: 'Can Hitay',
            type: 'text',
          },
          {
            value: 'admin',
            type: 'text',
          },
          {
            value: 'admin@refinera.com',
            type: 'text',
          },
          {
            value: '905555555555',
            type: 'text',
          },
          {
            value: 'Admin',
            type: 'text',
          },
          {
            value: 'Aktif',
            type: 'options',
            variant: [
              {
                id: 'active',
                label: 'Aktif',
                bgColor: '#4CAF50',
                textColor: '#fff'
              },
              {
                id: 'passive',
                label: 'Pasif',
                bgColor: '#F44336',
                textColor: '#fff'
              }
            ]
          },
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
      }
    ]
  }


  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
      }}
    >
      <TablePageHeader
        title='Kuyumcu'
      />
      <CustomTable
        data={tableData}
      />
    </Box>
  )
}
