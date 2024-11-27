import { Box } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import TablePageHeader from '../components/TablePageHeader'
import CustomTable from '../components/CustomTable'
import { ApiList, BankAccount, TableBodyRowType, TableDataType } from '../utils/types'
import CustomTablePagination from '../components/CustomTablePagination'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthProvider'
import useSWR, { mutate } from 'swr'
import { baseUrl, fetcher } from '../utils/global'
import { deleteBank, updateBank } from '../services/commonServices'
import { useAlert } from '../hooks/useAlert'
import DeleteDialog from '../components/DeleteDialog'

export default function BanksContainer() {

  const showSnacbar = useAlert();
  const nav = useNavigate();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedBank, setSelectedBank] = useState<BankAccount>();
  const [total, setTotal] = useState(0);
  const [recordPerPage, setRecordPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('')
  const [tableData, setTableData] = useState<TableDataType>({
    head: [
      { id: 'name', label: 'Banka Adı' },
      { id: 'owner', label: 'Hesap Sahibi' },
      { id: 'iban', label: 'IBAN Numarası' },
      { id: 'isMain', label: 'Varsayılan' },
      { id: 'actions', label: 'İşlemler' }
    ],
    body: []
  });

  const { data, isLoading, error } = useSWR<ApiList<BankAccount>>(
    `${baseUrl}/bankaccounts?skip=${(page - 1) * recordPerPage}&take=${recordPerPage}&search=${search}`,
    (url: string) => fetcher(url));

  const convertData = (data: ApiList<BankAccount>) => {
    const bodyData: TableBodyRowType[] = data.results.map((bank) => ({
      rowData: [
        { value: bank.bankName || '', type: 'text' },
        { value: bank.accountHolder || '', type: 'text' },
        { value: bank.iban || '', type: 'text' },
        {
          value: bank.isMain ? 'Evet' : 'Hayır',
          id: bank.isMain ? 'true' : 'false',
          type: 'options',
          onSelected: (id: any) => {
            bank.isMain !== (id === 'true') &&
              handleUpdateStatus(bank, id === 'true')
          },
          variant: [
            {
              id: 'true',
              label: 'Evet',
              bgColor: '#1CBA761A',
              textColor: '#1CBA76'
            },
            {
              id: 'false',
              label: 'Hayır',
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
              action: () => nav(`/${role}/banks/${bank.id}/edit`)
            },
            {
              name: 'Sil',
              action: () => {
                setSelectedBank(bank);
                setDeleteDialogOpen(true);
              }
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
      const totalCount = data.total;
      const totalPage = Math.ceil(totalCount / recordPerPage);
      setTotal(totalPage);
    } else {
      setTableData({ ...tableData, body: [] });
    }
  }, [data])


  useEffect(() => {
    setPage(1);
  }, [recordPerPage, search])

  const { role } = useContext(AuthContext);

  const handleAddBank = () => {
    nav(`/${role}/banks/new`);
  }

  const handleDeleteBank = async () => {
    try {
      const res = await deleteBank(selectedBank!.id);
      showSnacbar('Banka başarıyla silindi', 'success');
      setDeleteDialogOpen(false);
      setSelectedBank(undefined);
      mutate(`${baseUrl}/bankaccounts?skip=${(page - 1) * recordPerPage}&take=${recordPerPage}&search=${search}`);
    } catch (err) {
      showSnacbar('Bir hata oluştu', 'error');
      console.log(err);
    }
  }

  const handleUpdateStatus = async (bank: BankAccount, isMain: boolean) => {
    try {
      if (bank?.jewelerId) {
        const res = await updateBank(bank.id, {
          isMain,
          jewelerId: bank?.jewelerId,
        });
      } else if (bank?.supplierId) {
        const res = await updateBank(bank.id, {
          isMain,
          supplierId: bank?.supplierId,
        });
      }
      showSnacbar('Banka başarıyla güncellendi', 'success');
      mutate(`${baseUrl}/bankaccounts?skip=${(page - 1) * recordPerPage}&take=${recordPerPage}&search=${search}`);
    } catch (e) {
      showSnacbar('Banka güncellenirken bir hata oluştu', 'error');
      console.log(e)
    }
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
        handleAdd={role !== 'admin' ? handleAddBank : undefined}
        handleSearch={setSearch}
      />
      <CustomTable
        data={tableData}
        isLoading={isLoading}
      />
      {total > 1 && (
        <CustomTablePagination
          total={total}
          page={page}
          onPageChange={(page) => setPage(page)}
        />
      )}
      <DeleteDialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onSubmit={() => handleDeleteBank()}
        title='Banka Hesabı Sil'
        content={`"${selectedBank?.bankName}" adlı banka hesabını silmek istediğinize emin misiniz?`}
      />
    </Box>
  )
}
