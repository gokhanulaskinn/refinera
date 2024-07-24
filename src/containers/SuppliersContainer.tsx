import { Box } from '@mui/material'
import React from 'react'
import TablePageHeader from '../components/TablePageHeader'
import CustomTable from '../components/CustomTable'
import { TableDataType } from '../utils/types'
import CustomTablePagination from '../components/CustomTablePagination'
import { useNavigate } from 'react-router-dom'

export default function SuppliersContainer() {

  const tableData: TableDataType = {
    head: [
      {
        id: 'name',
        label: 'Toptancı Adı'
      },
      {
        id: 'owner',
        label: 'Toptancı Sahibi'
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
          { value: 'Harem Altın', type: 'text' },
          { value: 'Can Hitay', type: 'text' },
          { value: 'admin@refinera.com', type: 'text' },
          { value: '905555555555', type: 'text' },
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
          { value: 'Külçe Altın', type: 'text' },
          { value: 'Ayşe Yılmaz', type: 'text' },
          { value: 'ayse@altyolu.com', type: 'text' },
          { value: '905554443322', type: 'text' },
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
          { value: 'E Altın', type: 'text' },
          { value: 'Mehmet Kaya', type: 'text' },
          { value: 'mehmet@gumusdunyasi.com', type: 'text' },
          { value: '905553331122', type: 'text' },
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
          { value: 'Toptan Altın', type: 'text' },
          { value: 'Selin Demir', type: 'text' },
          { value: 'selin@pirlantamerkezi.com', type: 'text' },
          { value: '905552221133', type: 'text' },
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
          { value: 'Mücevherat', type: 'text' },
          { value: 'Ahmet Çelik', type: 'text' },
          { value: 'ahmet@mucevherat.com', type: 'text' },
          { value: '905551110000', type: 'text' },
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
          { value: 'Zümrüt ve Yakut', type: 'text' },
          { value: 'Nihal Aslan', type: 'text' },
          { value: 'nihal@zumrutyakut.com', type: 'text' },
          { value: '905559998877', type: 'text' },
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
          { value: 'Altın Merkezi', type: 'text' },
          { value: 'Eren Sarı', type: 'text' },
          { value: 'eren@altinmerkezi.com', type: 'text' },
          { value: '905558887766', type: 'text' },
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
          { value: 'Gümüş Takı', type: 'text' },
          { value: 'Cem Kara', type: 'text' },
          { value: 'cem@gumustaki.com', type: 'text' },
          { value: '905557776655', type: 'text' },
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
    nav('/admin/suppliers/new');
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
        title='Toptancı Listesi'
        addText='Yeni Toptancı Ekle'
        handleFilter={() => { }}
        handleAdd={handleAddSeller}
      />
      <CustomTable
        data={tableData}
      />
      <CustomTablePagination />
    </Box>
  )
}
