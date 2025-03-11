import { Box } from '@mui/material'
import React, { useState } from 'react'
import TablePageHeader from '../components/TablePageHeader'
import CustomTable from '../components/CustomTable'
import { ApiList, Jeweler, TableBodyRowType, TableDataType, Transaction } from '../utils/types'
import CustomTablePagination from '../components/CustomTablePagination'
import { useNavigate } from 'react-router-dom'
import { baseUrl, fetcher, formatMoney, getTransactionColor, getTransactionStatus } from '../utils/global'
import useSWR, { mutate } from 'swr'
import BasicMenu from '../components/BasicMenu'
import { useAlert } from '../hooks/useAlert'

export default function LastUsersContainer() {

  const [recordPerPage, setRecordPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [total, setTotal] = useState(0);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [statusFilter, setStatusFilter] = useState('');
  const showSnackbar = useAlert();
  const [tableData, setTableData] = useState<TableDataType>({
    head: [
      { id: 'name', label: 'İşlem Sahibi' },
      { id: 'owner', label: 'Kart Sahibi' },
      { id: 'idendity', label: 'TCKN / Pasaport NO' },
      { id: 'phone', label: 'Telefon Numarası' },
      { id: 'section', label: 'Satış Yapan Mağaza' },
      { id: 'pos', label: 'Pos' },
      { id: 'status', label: 'Durum' },
      { id: 'detail', label: 'Detay' },
      { id: 'action', label: 'İşlemler' }
    ],
    body: []
  });

  const { data, isLoading, error } = useSWR<ApiList<Transaction>>(
    `${baseUrl}/transaction?skip=${(page - 1) * recordPerPage}&take=${recordPerPage}&search=${search}&status=${statusFilter}`,
    (url: string) => fetcher(url)
  );

  const handleFilterClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleFilterSelect = (item: string) => {
    if (item === 'Başarılı') {
      setStatusFilter('APPROVED');
    } else if (item === 'Başarısız') {
      setStatusFilter('ERROR');
    } else if (item === 'Beklemede') {
      setStatusFilter('WAITING');
    } else if (item === 'Reddedildi') {
      setStatusFilter('DECLINED');
    } else {
      setStatusFilter('');
    }

    setAnchorEl(null);
  }

  const handleCancelPayment = async (paymentId: string) => {
    try {
      const response = await fetch(`${baseUrl}/paywall/cancel-physical`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ paymentId })
      });

      const result = await response.json();

      if (response.ok) {
        showSnackbar('Ödeme başarıyla iptal edildi', 'success');
        // Tabloyu yenile
        mutate(`${baseUrl}/transaction?skip=${(page - 1) * recordPerPage}&take=${recordPerPage}&search=${search}&status=${statusFilter}`);
      } else {
        showSnackbar(result.message || 'Ödeme iptal edilemedi', 'error');
      }
    } catch (error) {
      showSnackbar('İşlem sırasında bir hata oluştu', 'error');
    }
  };

  const convertData = (data: ApiList<Transaction>) => {
    const bodyData: TableBodyRowType[] = data.results.map((transaction) => ({
      rowData: [
        { value: transaction.transactionOwner || '', type: 'text' },
        { value: transaction.cardholderName || '', type: 'text' },
        { value: transaction.customerIdentity || '---', type: 'text' },
        { value: transaction.phone || '', type: 'text' },
        { value: transaction.jeweler.companyName || '', type: 'text' },
        { value: transaction.pos || 'Ozan', type: 'text' },
        {
          value: transaction.status ? getTransactionStatus(transaction.status) : '', type: 'badge',
          sx: {
            backgroundColor: getTransactionColor(transaction.status),
          }
        },
        {
          value: formatMoney(((transaction.totalAmount / 100).toFixed(2) || '')) + ' TL',
          type: 'badge'
        },
        {
          value: '',
          type: 'actions',
          actions: [
            {
              name: 'Satış İptal',
              action: () => { transaction.pos === 'Physical' && handleCancelPayment(transaction.transactionId || '')}
            }
          ]
        }
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
        handleFilter={handleFilterClick}
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
      <BasicMenu
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        items={['Hepsi', 'Başarılı', 'Başarısız', 'Beklemede']}
        onSelected={handleFilterSelect}
      />
    </Box>
  )
}
