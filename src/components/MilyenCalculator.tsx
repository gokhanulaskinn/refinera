import { Paper } from '@mui/material';
import React, { useEffect } from 'react'
import NumberInput from './NumberInput';
import CommonSelect from './CommonSelect';
import { ayars } from '../utils/types';
import { parse } from 'path';

type MilyenCalculatorProps = {
  milyenValues: any;
  setMilyenValues: (values: any) => void;
}

export default function MilyenCalculator({ milyenValues, setMilyenValues }: MilyenCalculatorProps) {

  const [milyenValue, setMilyenValue] = React.useState<number>(0);
  const [totalWeight, setTotalWeight] = React.useState<number>(0);
  const [feeRate, setFeeRate] = React.useState<number>(0);
  const [totalFeeRate, setTotalFeeRate] = React.useState<number>(0);
  const [ayar, setAyar] = React.useState<string>('');

  useEffect(() => {
    if (totalWeight && milyenValue && ayar) {
      setMilyenValues({
        totalWeight,
        milyenValue,
        feeRate,
        totalFeeRate,
        ayarMilyen: parseFloat(ayar)
      })
    } else {
      setMilyenValues({
        totalWeight: 0,
        milyenValue: 0,
        feeRate: 0,
        totalFeeRate: 0,
        ayarMilyen: 0
      })
    }
  }, [milyenValue, totalWeight, feeRate, totalFeeRate, ayar])
 
  return (
    <Paper
      sx={{
        borderRadius: '16px',
        p: 2
      }}
    >
      <NumberInput
        label='Toplam Gram'
        value={totalWeight.toString()}
        onChange={(value) => setTotalWeight(value || 0)}
        backgroundColor='#F2F4F7'
      />
      <CommonSelect
        label='Ayar'
        required
        backgroundColor='#F2F4F7'
        items={ayars}
        value={ayar}
        onChange={(e) => setAyar(e.target.value)}
      />
      <NumberInput
        label='İşçilik Milyen'
        value={milyenValue.toString()}
        onChange={(value) => setMilyenValue(value || 0)}
        backgroundColor='#F2F4F7'
      />
      <NumberInput
        label='Ürün saflık TL vergi'
        value={totalFeeRate.toString()}
        onChange={(value) => setTotalFeeRate(value || 0)}
        backgroundColor='#F2F4F7'
      />
      <NumberInput
        label='İşçilik TL vergi'
        value={feeRate.toString()}
        onChange={(value) => setFeeRate(value || 0)}
        backgroundColor='#F2F4F7'
      />
    </Paper>
  )
}
