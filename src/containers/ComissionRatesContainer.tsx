import { Box, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import useSWR, { mutate } from 'swr';
import ComissionCalculation from '../components/ComissionCalculation';
import CustomTable from '../components/CustomTable';
import CustomTablePagination from '../components/CustomTablePagination';
import BasicTabs from '../components/CustomTabs';
import TablePageHeader from '../components/TablePageHeader';
import { useAlert } from '../hooks/useAlert';
import { setComissionRate, updateBaseCommissionRate } from '../services/admin/AdminServices';
import { baseUrl, fetcher } from '../utils/global';
import { ApiList, ConstantsType, Jeweler, TableBodyRowType, TableDataType, posProviders } from '../utils/types';

export default function ComissionRatesContainer() {

  const tabs = posProviders;
  const showSnacbar = useAlert();
  const [recordPerPage, setRecordPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [total, setTotal] = useState(0);
  const [constans, setConstans] = React.useState<ConstantsType>();
  const [activeTab, setActiveTab] = useState<'Ozan' | 'Elekse' | 'Paywall'>('Ozan');
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

  const { data } = useSWR<ConstantsType>(
    `${baseUrl}/configuration`,
    (url: string) => fetcher(url)
  );

  const { data: users, isLoading: jewelerLoading, error: jewelerError } = useSWR<ApiList<Jeweler>>(
    `${baseUrl}/jewelers?skip=${(page - 1) * recordPerPage}&take=${recordPerPage}&search=${search}`,
    (url: string) => fetcher(url)
  );

  const handleSubmit = async (rate: number, base: number) => {
    try {
      const res = await setComissionRate(selectedJewelers, { name: activeTab, rate: rate });
      if (constans?.[activeTab] !== base.toString()) {
        await updateBaseCommissionRate(activeTab, base);
      }
      showSnacbar('İşlem başarılı', 'success');
      mutate(`${baseUrl}/jewelers?skip=${(page - 1) * recordPerPage}&take=${recordPerPage}&search=${search}`);
      mutate(`${baseUrl}/configuration`);
    } catch (err) {
      showSnacbar('Bir hata oluştu', 'error');
    }
  }

  useEffect(() => {
    if (data) {
      setConstans(data);
    }
  }, [data])


  // useEffect(() => {
  //   if (users) {
  //     convertData(users);
  //     const totalCount = users.total;
  //     const totalPage = Math.ceil(totalCount / recordPerPage);
  //     setTotal(totalPage);
  //   } else {
  //     setTableData({
  //       head: tableData.head,
  //       body: []
  //     });
  //   }
  // }, [users])

  useEffect(() => {
    if (users) {
      convertData(users);
      const totalCount = users.total;
      const totalPage = Math.ceil(totalCount / recordPerPage);
      setTotal(totalPage);
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
        { value: jeweler.pos.name || '', type: 'text' },
        { value: constans?.[jeweler.pos.name as 'Ozan' | 'Elekse' | 'Paywall']?.toString() || '0', type: 'badge' },
        { value: jeweler.pos?.rate?.toString() || '0', type: 'badge' },
        { value: ((parseFloat(constans?.[activeTab] || '0')) + jeweler.pos.rate || 0).toString() || '0', type: 'badge' }
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

  const [value, setValue] = React.useState(0);

  useEffect(() => {
    setActiveTab(tabs[value] as 'Ozan' | 'Elekse' | 'Paywall');
  }, [value])

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
          baseComission={parseFloat(constans?.[activeTab] || '0')}
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
          isLoading={jewelerLoading}
        />
        {total > 1 && (
          <CustomTablePagination
            total={total}
            page={page}
            onPageChange={(page) => setPage(page)}
          />
        )}
      </Box>
    </Box>
  )
}
