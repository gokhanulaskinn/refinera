import { Box } from '@mui/material'
import React from 'react'
import TablePageHeader from '../components/TablePageHeader'
import CustomTable from '../components/CustomTable'
import { TableDataType } from '../utils/types'
import CustomTablePagination from '../components/CustomTablePagination'
import { useNavigate } from 'react-router-dom'

export default function SellersContainer() {

  const tableData: TableDataType = {
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
            value: 'Can Hitay 1',
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
            id: 'active',
            type: 'options',
            variant: [
              {
                id: 'active',
                label: 'Aktif',
                bgColor: '#1CBA761A',
                textColor: '#1CBA76'
              },
              {
                id: 'passive',
                label: 'Pasif',
                bgColor: '#C438251A',
                textColor: '#D43D28'
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
      },
      {
        rowData: [
          {
            value: 'Can Hitay 1',
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
            value: 'Pasif',
            id: 'passive',
            type: 'options',
            variant: [
              {
                id: 'active',
                label: 'Aktif',
                bgColor: '#1CBA761A',
                textColor: '#1CBA76'
              },
              {
                id: 'passive',
                label: 'Pasif',
                bgColor: '#C438251A',
                textColor: '#D43D28'
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
      },
      {
        rowData: [
          {
            value: 'Can Hitay 1',
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
            value: 'Pasif',
            id: 'passive',
            type: 'options',
            variant: [
              {
                id: 'active',
                label: 'Aktif',
                bgColor: '#1CBA761A',
                textColor: '#1CBA76'
              },
              {
                id: 'passive',
                label: 'Pasif',
                bgColor: '#C438251A',
                textColor: '#D43D28'
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
      },
      {
        rowData: [
          {
            value: 'Can Hitay 1',
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
            value: 'Pasif',
            id: 'passive',
            type: 'options',
            variant: [
              {
                id: 'active',
                label: 'Aktif',
                bgColor: '#1CBA761A',
                textColor: '#1CBA76'
              },
              {
                id: 'passive',
                label: 'Pasif',
                bgColor: '#C438251A',
                textColor: '#D43D28'
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
      },
      {
        rowData: [
          {
            value: 'Can Hitay 1',
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
            value: 'Pasif',
            id: 'passive',
            type: 'options',
            variant: [
              {
                id: 'active',
                label: 'Aktif',
                bgColor: '#1CBA761A',
                textColor: '#1CBA76'
              },
              {
                id: 'passive',
                label: 'Pasif',
                bgColor: '#C438251A',
                textColor: '#D43D28'
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
      },
      {
        rowData: [
          {
            value: 'Can Hitay 1',
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
            value: 'Pasif',
            id: 'passive',
            type: 'options',
            variant: [
              {
                id: 'active',
                label: 'Aktif',
                bgColor: '#1CBA761A',
                textColor: '#1CBA76'
              },
              {
                id: 'passive',
                label: 'Pasif',
                bgColor: '#C438251A',
                textColor: '#D43D28'
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
      },
      {
        rowData: [
          {
            value: 'Can Hitay 1',
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
            value: 'Pasif',
            id: 'passive',
            type: 'options',
            variant: [
              {
                id: 'active',
                label: 'Aktif',
                bgColor: '#1CBA761A',
                textColor: '#1CBA76'
              },
              {
                id: 'passive',
                label: 'Pasif',
                bgColor: '#C438251A',
                textColor: '#D43D28'
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
      },
      {
        rowData: [
          {
            value: 'Can Hitay 1',
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
            value: 'Pasif',
            id: 'passive',
            type: 'options',
            variant: [
              {
                id: 'active',
                label: 'Aktif',
                bgColor: '#1CBA761A',
                textColor: '#1CBA76'
              },
              {
                id: 'passive',
                label: 'Pasif',
                bgColor: '#C438251A',
                textColor: '#D43D28'
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
      },
    ]
  }

  const nav = useNavigate()

  const handleAddSeller = () => {
    nav('/admin/jewelers/new');
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
        title='Kuyumcu'
        handleAdd={handleAddSeller}
      />
      <CustomTable
        data={tableData}
      />
      <CustomTablePagination />
    </Box>
  )
}
