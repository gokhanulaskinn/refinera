import React from 'react'
import useSWR from 'swr';
import { ApiList, Branch } from '../utils/types';
import { baseUrl, fetcher } from '../utils/global';
import { Box } from '@mui/material';
import CommonSelect from './CommonSelect';

type SelectBranchProps = {
  branchId: string;
  setBranchId: (branchId: string) => void;
}

export default function SelectBranch({ branchId, setBranchId }: SelectBranchProps) {

  const { data, isLoading, error } = useSWR<ApiList<Branch>>(
    `${baseUrl}/branches?skip=0&take=${1000}`,
    (url: string) => fetcher(url));

  return (
    <Box>
      <CommonSelect
        label="Mağaza Seçiniz"
        value={branchId}
        backgroundColor='#F2F4F7'
        onChange={(e) => setBranchId(e.target.value)}
        items={data ? data.results.map((branch) => ({ value: branch.id, label: branch.name })) : []}
      />
    </Box>
  )
}
