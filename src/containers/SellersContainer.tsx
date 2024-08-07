import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import TablePageHeader from '../components/TablePageHeader';
import CustomTable from '../components/CustomTable';
import { ApiList, Jeweler, TableBodyRowType, TableDataType } from '../utils/types';
import CustomTablePagination from '../components/CustomTablePagination';
import { useNavigate } from 'react-router-dom';
import useSWR from 'swr';
import { baseUrl, fetcher } from '../utils/global';
import DeleteDialog from '../components/DeleteDialog';
import { deleteSeller } from '../services/seller/SellerServices';
import { useAlert } from '../hooks/useAlert';

export default function SellersContainer() {

  const nav = useNavigate();
  const showSnackBar = useAlert();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedJeweler, setSelectedJeweler] = useState<Jeweler>();
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
      { id: 'status', label: 'Durum' },
      { id: 'actions', label: 'İşlemler' }
    ],
    body: []
  });

  const { data: users, isLoading, error } = useSWR<ApiList<Jeweler>>(
    `${baseUrl}/jewelers?skip=${(page - 1) * recordPerPage}&take=${recordPerPage}&search=${search}`,
    (url: string) => fetcher(url)
  );

  const convertData = (data: ApiList<Jeweler>) => {
    const bodyData: TableBodyRowType[] = data.results.map((jeweler) => ({
      rowData: [
        { value: jeweler.companyName || '', type: 'text' },
        { value: jeweler.companyName || '', type: 'text' },
        { value: jeweler.email || '', type: 'text' },
        { value: jeweler.phone || '', type: 'text' },
        {
          value: jeweler.status === 'ACTIVE' ? 'Aktif' : 'Pasif',
          id: jeweler.status || '',
          type: 'options',
          onSelected: (id: any) => console.log(id),
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
              name: 'Düzenle',
              action: () => console.log('Düzenle')
            },
            {
              name: 'Sil',
              action: () => {
                // setDeleteDialogOpen(true);
                // setSelectedJeweler(jeweler);
              }
            }
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
    if (users) convertData(users);
    else {
      setTableData((prev) => ({
        ...prev,
        body: []
      }));
    }
  }, [users]);

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
        handleFilter={() => { }}
        handleAdd={handleAddSeller}
        handleSearch={setSearch}
      />
      <CustomTable data={tableData} />
      <CustomTablePagination />
      <DeleteDialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onSubmit={() => handleDeleteSeller()}
        title='Kuyumcu Sil'
        content='Kuyumcu silmek istediğinize emin misiniz?'
      />

    </Box>
  );
}