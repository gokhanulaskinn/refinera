import { Box, Grid } from '@mui/material';
import React, { useEffect } from 'react';
import { Branch, BranchInput } from '../utils/types';
import CommonButton from './CommonButton';
import TextInput from './TextInput';
import * as yup from 'yup';
import UserInfoInput from './UserInfoInput';

type BranchFormProps = {
  onSubmit: (values: BranchInput) => void;
  initialValues?: Branch;
}

const validationSchema = yup.object().shape({
  name: yup.string().required('Mağaza adı zorunludur'),
  address: yup.string().required('Adres zorunludur'),
  phone: yup.string()
    .matches(/^\d{10}$/, 'Telefon numarası 10 haneli olmalıdır')
    .required('Telefon numarası zorunludur'),
});

export default function BranchForm({ onSubmit, initialValues }: BranchFormProps) {

  const [values, setValues] = React.useState<BranchInput>({
    name: '',
    address: '',
    phone: '',
  })

  const [errors, setErrors] = React.useState<any>({});

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
        onSubmit={async (e) => {
          e.preventDefault();
          try {
            await validationSchema.validate(values, { abortEarly: false });
            onSubmit(values);
          } catch (err) {
            if (err instanceof yup.ValidationError) {
              const validationErrors: { [key: string]: string } = {};
              err.inner.forEach((error) => {
                if (error.path) {
                  validationErrors[error.path] = error.message;
                }
              });
              setErrors(validationErrors);
            }
          }
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <UserInfoInput
              label="Mağaza Adı"
              required
              value={values.name || ''}
              onChange={(e) => setValues({ ...values, name: e})}
              backgroundColor='#F2F4F7'
              inputType='text'
              error={!!errors.name}
              helperText={errors.name}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <UserInfoInput
              label="Adres"
              required
              value={values.address || ''}
              onChange={(e) => setValues({ ...values, address: e})}
              backgroundColor='#F2F4F7'
              inputType='text'
              error={!!errors.address}
              helperText={errors.address}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <UserInfoInput
              label="Cep Telefonu"
              required
              value={values.phone || ''}
              onChange={(e) => setValues({ ...values, phone: e.replaceAll(' ', '').replaceAll('(', '').replaceAll(')', '')})}
              backgroundColor='#F2F4F7'
              inputType='phone'
              error={!!errors.phone}
              helperText={errors.phone}
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
