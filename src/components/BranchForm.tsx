import { Box, Grid } from '@mui/material';
import React, { useEffect } from 'react';
import { Branch, BranchInput } from '../utils/types';
import CommonButton from './CommonButton';
import TextInput from './TextInput';

type BranchFormProps = {
  onSubmit: (values: BranchInput) => void;
  initialValues?: Branch;
}

export default function BranchForm({ onSubmit, initialValues }: BranchFormProps) {

  const [values, setValues] = React.useState<BranchInput>({
    name: '',
    address: '',
    phone: '',
  })

  useEffect(() => {
    if (initialValues) {
      setValues({
        name: initialValues.name,
        address: initialValues.address,
        phone: initialValues.phone,
      })
    }
  }, [initialValues])

  return (
    <Box>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(values);
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextInput
              label="Mağaza Adı"
              required
              value={values.name}
              onChange={(e) => setValues({ ...values, name: e.target.value })}
              backgroundColor='#F2F4F7'
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextInput
              label="Adres"
              required
              value={values.address}
              onChange={(e) => setValues({ ...values, address: e.target.value })}
              backgroundColor='#F2F4F7'
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextInput
              label="Cep Telefonu"
              required
              value={values.phone}
              onChange={(e) => setValues({ ...values, phone: e.target.value })}
              backgroundColor='#F2F4F7'
            />
          </Grid>
        </Grid>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            gap: 2,
            mt: 3
          }}
        >
          <CommonButton
            label='Vazgeç'
            variant='outlined'
            onClick={() => console.log('vazgeç')}
            sx={{
              width: '100px'
            }}
          />
          <CommonButton
            label='Kaydet'
            type='submit'
            sx={{
              width: '100px',
              color: 'white',
            }}
          />
        </Box>
      </form>
    </Box>
  )
}
