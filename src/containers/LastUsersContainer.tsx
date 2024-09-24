import { Box } from '@mui/material'
import React, { useState } from 'react'
import TablePageHeader from '../components/TablePageHeader'
import CustomTable from '../components/CustomTable'
import { ApiList, Jeweler, TableBodyRowType, TableDataType, Transaction } from '../utils/types'
import CustomTablePagination from '../components/CustomTablePagination'
import { useNavigate } from 'react-router-dom'
import { baseUrl, fetcher, formatMoney } from '../utils/global'
import useSWR from 'swr'

export default function LastUsersContainer() {

  const [recordPerPage, setRecordPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [total, setTotal] = useState(0);
  const [tableData, setTableData] = useState<TableDataType>({
    head: [
      { id: 'name', label: 'İşlem Sahibi' },
      { id: 'owner', label: 'Kart Sahibi' },
      { id: 'phone', label: 'Telefon Numarası' },
      { id: 'section', label: 'Satış Yapan Mağaza' },
      { id: 'pos', label: 'Pos' },
      { id: 'detail', label: 'Detay' }
    ],
    body: []
  });

  const { data, isLoading, error } = useSWR<ApiList<Transaction>>(
    `${baseUrl}/transaction?skip=${(page - 1) * recordPerPage}&take=${recordPerPage}&search=${search}`,
    (url: string) => fetcher(url)
  );

  const convertData = (data: ApiList<Transaction>) => {
    const bodyData: TableBodyRowType[] = data.results.map((transaction) => ({
      rowData: [
        { value: transaction.transactionOwner || '', type: 'text' },
        { value: transaction.cardholderName || '', type: 'text' },
        { value: transaction.phone || '', type: 'text' },
        { value: transaction.jeweler.companyName || '', type: 'text' },
        { value: transaction.pos || 'Ozan', type: 'text' },
        { value: [formatMoney(((transaction.totalAmount / 100).toFixed(2) || '')) + ' TL'], type: 'badge' }
      ]
    })
    );
    setTableData({ ...tableData, body: bodyData });
  }

  React.useEffect(() => {
    if (data) {
      convertData(data);
      const totalCount = data.total;
      const totalPage = Math.ceil(totalCount / recordPerPage);
      setTotal(totalPage);
    } else {
      setTableData({ ...tableData, body: [] });
    }
  }, [data])

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
        handleSearch={setSearch}
      />
      <CustomTable
        data={tableData}
      />
      {total > 1 && (
        <CustomTablePagination
          total={total}
          page={page}
          onPageChange={(page) => setPage(page)}
        />
      )}
    </Box>
  )
}
