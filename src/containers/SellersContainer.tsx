import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import TablePageHeader from '../components/TablePageHeader';
import CustomTable from '../components/CustomTable';
import { ApiList, ConstantsType, Jeweler, Status, TableBodyRowType, TableDataType } from '../utils/types';
import CustomTablePagination from '../components/CustomTablePagination';
import { useNavigate } from 'react-router-dom';
import useSWR, { mutate } from 'swr';
import { baseUrl, fetcher } from '../utils/global';
import DeleteDialog from '../components/DeleteDialog';
import { deleteSeller } from '../services/seller/SellerServices';
import { useAlert } from '../hooks/useAlert';
import BasicMenu from '../components/BasicMenu';
import { updateBaseCommissionRate, updateJeweler } from '../services/admin/AdminServices';
import PosRateDialog from '../components/PosRateDialog';
import { parse } from 'path';

export default function SellersContainer() {

  const nav = useNavigate();
  const showSnackBar = useAlert();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [openPosRateDialog, setOpenPosRateDialog] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedJeweler, setSelectedJeweler] = useState<Jeweler>();
  const [statusFilter, setStatusFilter] = useState('');
  const [total, setTotal] = useState(0);
  const [recordPerPage, setRecordPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [tableData, setTableData] = useState<TableDataType>({
    head: [
      { id: 'name', label: 'Kuyumcu Adı' },
      { id: 'owner', label: 'Kuyumcu Sahibi' },
      { id: 'email', label: 'E-Posta' },
      { id: 'phone', label: 'Telefon Numarası' },
      { id: 'comission', label: 'Komisyon' },
      { id: 'status', label: 'Durum' },
      { id: 'actions', label: 'İşlemler' }
    ],
    body: []
  });

  const { data: constants } = useSWR<ConstantsType>(
    `${baseUrl}/configuration?key=commissionRate`,
    (url: string) => fetcher(url)
  );

  const { data: users, isLoading, error } = useSWR<ApiList<Jeweler>>(
    `${baseUrl}/jewelers?skip=${(page - 1) * recordPerPage}&take=${recordPerPage}&search=${search}${statusFilter ? `&status=${statusFilter}` : ''}`,
    (url: string) => fetcher(url)
  );

  const convertData = (data: ApiList<Jeweler>) => {
    const bodyData: TableBodyRowType[] = data.results.map((jeweler) => ({
      rowData: [
        { value: jeweler.companyName || '', type: 'text' },
        { value: (`${jeweler.firstName} ${jeweler.lastName}`), type: 'text' },
        { value: jeweler.email || '', type: 'text' },
        { value: jeweler.phone || '', type: 'text' },
        { value: jeweler.comissionRate ? `${(jeweler.comissionRate + parseFloat(constants?.commissionRate!)).toFixed(2)}%` : '0%', type: 'text' },
        {
          value: jeweler.status === 'ACTIVE' ? 'Aktif' : 'Pasif',
          id: jeweler.status || '',
          type: 'options',
          onSelected: (id: any) => {
            jeweler.status !== id &&
              handleUpdateStatus(jeweler.id || '', id)
          },
          variant: [
            {
              id: 'ACTIVE',
              label: 'Aktif',
              bgColor: '#1CBA761A',
              textColor: '#1CBA76'
            },
            {
              id: 'INACTIVE',
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
              name: 'POS Oranı Belirle',
              action: () => {
                setSelectedJeweler(jeweler);
                setOpenPosRateDialog(true);
              }
            },
            {
              name: 'Düzenle',
              action: () => nav(`/admin/jewelers/${jeweler.id}/edit`)
            },
            {
              name: 'Sil',
              action: () => {
                handleUpdateStatus(jeweler.id || '', Status.INACTIVE)
              }
            },
          ]
        }
      ]
    }));

    setTableData((prev) => ({
      ...prev,
      body: bodyData
    }));
  };

  useEffect(() => {
    if (users && constants) {
      convertData(users);
      const totalCount = users.total;
      const totalPage = Math.ceil(totalCount / recordPerPage);
      setTotal(totalPage);
    }
    else {
      setTableData((prev) => ({
        ...prev,
        body: []
      }));
    }
  }, [users, constants]);

  useEffect(() => {
    setPage(1);
  }, [recordPerPage, search]);


  const handleAddSeller = () => {
    nav('/admin/jewelers/new');
  };

  const handleDeleteSeller = async () => {
    try {
      const res = await deleteSeller(selectedJeweler?.id || '');
      showSnackBar('Kuyumcu başarıyla silindi', 'success');
    } catch (err) {
      console.log(err)
      showSnackBar('Kuyumcu silinirken bir hata oluştu', 'error');
    } finally {
      setDeleteDialogOpen(false);
    }
  }

  const handleFilterClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleFilterSelect = (item: string) => {
    if (item === 'Aktif Kuyumcular') {
      setStatusFilter('ACTIVE');
    } else if (item === 'Pasif Kuyumcular') {
      setStatusFilter('INACTIVE');
    } else {
      setStatusFilter('');
    }
    setAnchorEl(null);
  }

  const handleUpdateStatus = async (id: string, status: Status) => {
    try {
      const res = await updateJeweler(id, { status });
      mutate(`${baseUrl}/jewelers?skip=${(page - 1) * recordPerPage}&take=${recordPerPage}&search=${search}${statusFilter ? `&status=${statusFilter}` : ''}`);
      showSnackBar('Kuyumcu durumu başarıyla güncellendi', 'success');
    } catch (e) {
      showSnackBar('Kuyumcu durumu güncellenirken bir hata oluştu', 'error');
      console.log(e)
    }
  }

  const handleSetComissionRate = async (rate: number, base: number) => {
    try {
      const res = await updateJeweler(selectedJeweler?.id || '', { comissionRate: rate });
      if (constants?.commissionRate !== base.toString()) {
        await updateBaseCommissionRate(base);
      }
      mutate(`${baseUrl}/jewelers?skip=${(page - 1) * recordPerPage}&take=${recordPerPage}&search=${search}${statusFilter ? `&status=${statusFilter}` : ''}`);
      mutate(`${baseUrl}/configuration?key=commissionRate`);
      showSnackBar('Komisyon oranı başarıyla güncellendi', 'success');
      setOpenPosRateDialog(false);
    } catch (e) {
      console.log(e);
      showSnackBar('Komisyon oranı güncellenirken bir hata oluştu', 'error');
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
        title="Kuyumcu Listesi"
        addText="Kuyumcu Ekle"
        handleFilter={handleFilterClick}
        handleAdd={handleAddSeller}
        handleSearch={setSearch}
      />
      <CustomTable data={tableData} />
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
        onSubmit={() => handleDeleteSeller()}
        title='Kuyumcu Sil'
        content='Kuyumcu silmek istediğinize emin misiniz?'
      />
      <BasicMenu
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        items={['Hepsi', 'Aktif Kuyumcular', 'Pasif Kuyumcular']}
        onSelected={handleFilterSelect}
      />
      <PosRateDialog
        open={openPosRateDialog}
        onClose={() => setOpenPosRateDialog(false)}
        baseCommissionRate={parseFloat(constants?.commissionRate || '0')}
        comissionRate={selectedJeweler?.comissionRate || 0}
        onSubmit={handleSetComissionRate}
      />
    </Box>
  );
}