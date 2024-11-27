import { Box } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import TablePageHeader from '../components/TablePageHeader'
import CustomTable from '../components/CustomTable'
import { ApiList, Status, TableBodyRowType, TableDataType, User } from '../utils/types'
import CustomTablePagination from '../components/CustomTablePagination'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthProvider'
import { baseUrl, fetcher, getRoleName } from '../utils/global'
import useSWR, { mutate } from 'swr'
import { useAlert } from '../hooks/useAlert'
import { updateUser } from '../services/commonServices'
import BasicMenu from '../components/BasicMenu'

export default function UsersContainer() {

  const showSnackBar = useAlert();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [total, setTotal] = useState(0);
  const [recordPerPage, setRecordPerPage] = useState(1000);
  const [statusFilter, setStatusFilter] = useState('');
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [tableData, setTableData] = useState<TableDataType>({
    head: [
      { id: 'name', label: 'Ad Soyad' },
      { id: 'email', label: 'E-Posta' },
      { id: 'phone', label: 'Telefon Numarası' },
      { id: 'permission', label: 'Yetki' },
      { id: 'status', label: 'Durum' },
      { id: 'actions', label: 'İşlemler' }
    ],
    body: []
  });

  const { data: users, isLoading, error } = useSWR<ApiList<User>>(
    `${baseUrl}/users?skip=${(page - 1) * recordPerPage}&take=${recordPerPage}&search=${search}${statusFilter ? `&status=${statusFilter}` : ''}`,
    (url: string) => fetcher(url)
  );

  const convertData = (data: ApiList<User>) => {
    const bodyData: TableBodyRowType[] = data.results.map((user) => ({
      rowData: [
        { value: `${user.firstName || ''} ${user.lastName || ''}`, type: 'text' },
        { value: user.email || '', type: 'text' },
        { value: user.phone || '', type: 'text' },
        { value: getRoleName(user.role || ''), type: 'text' },
        {
          value: user.status === 'ACTIVE' ? 'Aktif' : 'Pasif',
          id: user.status || '',
          type: 'options',
          onSelected: (id: any) => {
            user.status !== id &&
              handleUpdateStatus(user.id || '', id)
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
              name: 'Düzenle',
              action: () => nav(`/${role}/users/${user.id}/edit`)
            },
            {
              name: 'Sil',
              action: () => {
                handleUpdateStatus(user.id || '', Status.INACTIVE)
              }
            }
          ]
        }
      ]
    }));

    setTableData({
      head: tableData.head,
      body: bodyData
    });
  }

  useEffect(() => {
    if (users) {
      convertData(users);
      const totalCount = users.total;
      const totalPage = Math.ceil(totalCount / recordPerPage);
      setTotal(totalPage);
    } else {
      setTableData({
        head: tableData.head,
        body: []
      });
    }
  }, [users])

  const { role } = useContext(AuthContext);

  const nav = useNavigate()

  const handleAddUser = () => {
    nav(`/${role}/users/new`);
  }

  const handleUpdateStatus = async (id: string, status: Status) => {
    try {
      const res = await updateUser(id, { status });
      mutate(`${baseUrl}/users?skip=${(page - 1) * recordPerPage}&take=${recordPerPage}&search=${search}${statusFilter ? `&status=${statusFilter}` : ''}`);
      showSnackBar('Kullanıcı durumu başarıyla güncellendi', 'success');
    } catch (e) {
      showSnackBar('Kullanıcı durumu güncellenirken bir hata oluştu', 'error');
      console.log(e)
    }
  }

  const handleFilterSelect = (item: string) => {
    if (item === 'Aktif Kullanıcılar') {
      setStatusFilter('ACTIVE');
    } else if (item === 'Pasif Kullanıcılar') {
      setStatusFilter('INACTIVE');
    } else {
      setStatusFilter('');
    }
    setAnchorEl(null);
  }

  const handleClose = () => {
    setAnchorEl(null);
  }

  const handleFilterClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleChangeRole = (role: string) => {
    console.log(role);
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
        title='Kullanıcı Listesi'
        addText='Kullanıcı Ekle'
        handleAdd={handleAddUser}
        handleFilter={handleFilterClick}
        handleSearch={(searchText) => console.log(searchText)}
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
        items={['Hepsi', 'Aktif Kullanıcılar', 'Pasif Kullanıcılar']}
        onSelected={handleFilterSelect}
      />
    </Box>
  )
}
