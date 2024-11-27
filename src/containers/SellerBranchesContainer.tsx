import { Box } from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useSWR from 'swr'
import CustomTable from '../components/CustomTable'
import CustomTablePagination from '../components/CustomTablePagination'
import TablePageHeader from '../components/TablePageHeader'
import { AuthContext } from '../contexts/AuthProvider'
import { useAlert } from '../hooks/useAlert'
import { baseUrl, fetcher } from '../utils/global'
import { ApiList, Branch, TableBodyRowType, TableDataType } from '../utils/types'

export default function SellerBranchesContainer() {

  const showSnacbar = useAlert();
  const nav = useNavigate();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState<Branch>();
  const [total, setTotal] = useState(0);
  const [recordPerPage, setRecordPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('')
  const [tableData, setTableData] = useState<TableDataType>({
    head: [
      { id: 'name', label: 'Mağaza Adı' },
      { id: 'owner', label: 'Hesap Sahibi' },
      { id: 'iban', label: 'Telefon Numarası' },
      { id: 'actions', label: 'İşlemler' }
    ],
    body: []
  });

  const { data, isLoading, error } = useSWR<ApiList<Branch>>(
    `${baseUrl}/branches?skip=${(page - 1) * recordPerPage}&take=${recordPerPage}&search=${search}`,
    (url: string) => fetcher(url));

  const convertData = (data: ApiList<Branch>) => {
    const bodyData: TableBodyRowType[] = data.results.map((branch) => ({
      rowData: [
        { value: branch.name || '', type: 'text' },
        { value: branch.jeweler.companyName || '', type: 'text' },
        { value: branch.phone || '', type: 'text' },
        {
          value: '',
          type: 'actions',
          actions: [
            {
              name: 'Düzenle',
              action: () => {
                nav(`/seller/branches/${branch.id}/edit`);
              }
            },
            {
              name: 'Sil',
              action: () => {
                console.log('delete')
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
    nav(`/seller/branches/new`);
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
        title='Mağazalar'
        addText='Yeni Mağaza Ekle'
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
      {/* <DeleteDialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onSubmit={() => handleDeleteBank()}
        title='Banka Hesabı Sil'
        content={`"${selectedBank?.bankName}" adlı banka hesabını silmek istediğinize emin misiniz?`}
      /> */}
    </Box>
  )
}
