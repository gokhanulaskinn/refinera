import { Box, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import TablePageHeader from '../components/TablePageHeader'
import BasicTabs from '../components/CustomTabs'
import ComissionCalculation from '../components/ComissionCalculation';
import { ApiList, ConstantsType, Jeweler, TableBodyRowType, TableDataType } from '../utils/types';
import CustomTable from '../components/CustomTable';
import CustomTablePagination from '../components/CustomTablePagination';
import useSWR, { mutate } from 'swr';
import { baseUrl, fetcher } from '../utils/global';
import { set } from 'lodash';
import { useAlert } from '../hooks/useAlert';
import { setComissionRate } from '../services/admin/AdminServices';

export default function ComissionRatesContainer() {

  const tabs = [
    'Ozan',
    // 'Iyzico',
    // 'Param',
    // 'Sipay'
  ];
  const showSnacbar = useAlert();
  const [recordPerPage, setRecordPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [constans, setConstans] = React.useState<ConstantsType>();
  const [tableData, setTableData] = useState<TableDataType>({
    head: [
      { id: 'select', label: 'Seçim' },
      { id: 'name', label: 'Kuyumcu' },
      { id: 'owner', label: 'POS Sahibi' },
      { id: 'section', label: 'Baz Oran' },
      { id: 'phone', label: 'Kar Marjı' },
      { id: 'detail', label: 'POS Komisyon Oranı' },
    ],
    body: []
  });
  const [selectedJewelers, setSelectedJewelers] = React.useState<string[]>([]);

  const { data, isLoading, error } = useSWR<ConstantsType>(
    `${baseUrl}/constants`,
    (url: string) => fetcher(url)
  );

  const { data: users, isLoading: jewelerLoading, error: jewelerError } = useSWR<ApiList<Jeweler>>(
    `${baseUrl}/jewelers?skip=${(page - 1) * recordPerPage}&take=${recordPerPage}&search=${search}`,
    (url: string) => fetcher(url)
  );

  const handleSubmit = async (rate: number) => {
    try {
      const res = await setComissionRate(selectedJewelers, rate);
      showSnacbar('İşlem başarılı', 'success');
      mutate(`${baseUrl}/jewelers?skip=${(page - 1) * recordPerPage}&take=${recordPerPage}&search=${search}`);
    } catch (err) {
      showSnacbar('Bir hata oluştu', 'error');
    }
  }

  useEffect(() => {
    if (data) {
      setConstans(data);
    }
  }, [data])

  useEffect(() => {
    if (users) {
      convertData(users);
    } else {
      setTableData({
        head: [
          { id: 'select', label: 'Seçim' },
          { id: 'name', label: 'Kuyumcu' },
          { id: 'owner', label: 'POS Sahibi' },
          { id: 'section', label: 'Baz Oran' },
          { id: 'phone', label: 'Kar Marjı' },
          { id: 'detail', label: 'POS Komisyon Oranı' },
        ],
        body: []
      });
    }
  }, [users, constans])

  const convertData = (data: ApiList<Jeweler>) => {
    const bodyData: TableBodyRowType[] = data.results.map((jeweler) => ({
      id: jeweler.id,
      rowData: [
        { value: jeweler.companyName || '', type: 'text' },
        { value: 'Ozan', type: 'text' },
        { value: constans?.comissionRate.toString() || '0', type: 'badge' },
        { value: jeweler.comissionRate.toString() || '0', type: 'badge' },
        { value: ((constans?.comissionRate || 0) + jeweler.comissionRate).toString() || '0', type: 'badge' }
      ]
    }));

    setTableData({
      head: [
        { id: 'select', label: 'Seçim' },
        { id: 'name', label: 'Kuyumcu' },
        { id: 'owner', label: 'POS Sahibi' },
        { id: 'section', label: 'Baz Oran' },
        { id: 'phone', label: 'Kar Marjı' },
        { id: 'detail', label: 'POS Komisyon Oranı' },
      ],
      body: bodyData
    });
  }

  // const tableDatas: TableDataType = {
  //   head: [
  //     {
  //       id: 'name',
  //       label: 'Kuyumcu'
  //     },
  //     {
  //       id: 'owner',
  //       label: 'POS Sahibi'
  //     },
  //     {
  //       id: 'section',
  //       label: 'Baz Oran'
  //     },
  //     {
  //       id: 'phone',
  //       label: 'Kar Marjı'
  //     },
  //     {
  //       id: 'detail',
  //       label: 'POS Komisyon Oranı'
  //     },
  //   ],
  //   body: [
  //     {
  //       rowData: [
  //         { value: 'Can Hitay', type: 'text' },
  //         { value: 'Ozan', type: 'text' },
  //         { value: '2.5', type: 'badge' },
  //         { value: '0.5', type: 'badge' },
  //         { value: '3', type: 'badge' }
  //       ]
  //     },
  //     {
  //       rowData: [
  //         { value: 'Semih Kuyumculuk', type: 'text' },
  //         { value: 'Ozan', type: 'text' },
  //         { value: '2.5', type: 'badge' },
  //         { value: '0.4', type: 'badge' },
  //         { value: '2.9', type: 'badge' }
  //       ]
  //     },
  //   ]
  // }

  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  if (!constans) return null;

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
        }}
      >
        <TablePageHeader
          title="Pos Komisyon Oranları"
          handleFilter={() => { }}
          handleSearch={(searchText) => console.log(searchText)}
        />
        <BasicTabs
          value={value}
          handleChange={handleChange}
          tabs={tabs}
        />
        <ComissionCalculation
          baseComission={constans.comissionRate}
          canSetRate={selectedJewelers.length > 0}
          onSubmit={handleSubmit}
        />
        <Typography
          sx={{
            fontSize: '20px',
          }}
        >
          Özel Komisyon Oranları
        </Typography>
        <CustomTable
          data={tableData}
          selectable
          selectedIds={selectedJewelers}
          setSelectedIds={setSelectedJewelers}
        />
        <CustomTablePagination />
      </Box>
    </Box>
  )
}
