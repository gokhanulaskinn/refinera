import { Box } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import TablePageHeader from '../components/TablePageHeader'
import CustomTable from '../components/CustomTable'
import { ApiList, BankAccount, TableBodyRowType, TableDataType } from '../utils/types'
import CustomTablePagination from '../components/CustomTablePagination'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthProvider'
import useSWR from 'swr'
import { baseUrl, fetcher } from '../utils/global'

export default function BanksContainer() {


  const [recordPerPage, setRecordPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('')
  const [tableData, setTableData] = useState<TableDataType>({
    head: [
      { id: 'name', label: 'Banka Adı' },
      { id: 'owner', label: 'Hesap Sahibi' },
      { id: 'iban', label: 'IBAN Numarası' },
      { id: 'actions', label: 'İşlemler' }
    ],
    body: []
  });

  const { data, isLoading, error } = useSWR<ApiList<BankAccount>>(
    `${baseUrl}/bankaccounts?skip=${(page - 1) * recordPerPage}&take=${recordPerPage}&search=${search}`,
    (url: string) => fetcher(url));


  const getOwnerName = (bank: BankAccount) => {
    if (bank.jeweler) {
      return bank.jeweler.companyName;
    } else if (bank.supplier) {
      return bank.supplier.companyName;
    }
    return '';
  }

  const convertData = (data: ApiList<BankAccount>) => {
    const bodyData: TableBodyRowType[] = data.results.map((bank) => ({
      rowData: [
        { value: bank.bankName || '', type: 'text' },
        { value: getOwnerName(bank) || '', type: 'text' },
        { value: bank.iban || '', type: 'text' },
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
    }))
    setTableData({ ...tableData, body: bodyData });
  }

  useEffect(() => {
    if (data) {
      convertData(data);
    } else {
      setTableData({ ...tableData, body: [] });
    }
  }, [data])


  useEffect(() => {
    setPage(1);
  }, [recordPerPage, search])

  const tableDatas: TableDataType = {
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
        handleSearch={setSearch}
      />
      <CustomTable
        data={tableData}
      />
      <CustomTablePagination />
    </Box>
  )
}
