import { Box, Typography, useTheme } from '@mui/material'
import React, { useEffect } from 'react'
import ReportCardBig from '../components/ReportCardBig'
import { baseUrl, fetcher, formatMoney } from '../utils/global';
import useSWR from 'swr';

export default function AdminReportContainer() {
  const theme = useTheme();
  const [totalRevenue, setTotalRevenue] = React.useState(0);
  const [totalProfit, setTotalProfit] = React.useState(0);

  const { data, isLoading, error } = useSWR<any>(
    `${baseUrl}/reports`,
    (url: string) => fetcher(url)
  );

  useEffect(() => {
    if(!data) return;
    const price = (data?.totalRevenue / 100).toString();
    setTotalRevenue(parseFloat(price));
    const profit = (data?.totalProfit / 100).toString();
    setTotalProfit(parseFloat(profit));
  }, [data])


  return (
    <Box>
      <Typography
        sx={{
          fontSize: '30px',
          fontWeight: '400'
        }}
      >
        Raporlar
      </Typography>
      <Box
        sx={{
          display: 'flex',
          gap: 2,
          mt: 4
        }}
      >
        <ReportCardBig
          label="Toplam Gerçekleşen Kar"
          badgeColor={theme.palette.primary.main}
          price={totalProfit.toFixed(2)}
        />
        <ReportCardBig
          label="Toplam Gerçekleşen Ciro"
          badgeColor={theme.palette.primary.main}
          price={totalRevenue.toFixed(2)}
        />
      </Box>
    </Box>
  )
}
