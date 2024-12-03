import { Box, Grid } from '@mui/material';
import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthProvider';
import { User } from '../utils/types';
import CommonButton from './CommonButton';
import SelectBranch from './SelectBranch';
import TextInput from './TextInput';
import UserInfoInput from './UserInfoInput';
import * as yup from 'yup';

type UserFormProps = {
  onSubmit: (values: any) => void;
  initialValues?: User;
}

// Add validation schema
const validationSchema = yup.object().shape({
  firstName: yup.string().required('Ad alanı zorunludur'),
  lastName: yup.string().required('Soyad alanı zorunludur'),
  email: yup.string().email('Geçerli bir e-posta adresi giriniz').required('E-posta alanı zorunludur'),
  phone: yup.string()
    .matches(/^\d{10}$/, 'Telefon numarası 10 haneli olmalıdır')
    .required('Telefon alanı zorunludur'),
  identity: yup.string()
    .matches(/^\d{11}$/, 'TC Kimlik numarası 11 haneli olmalıdır')
    .required('TC Kimlik numarası zorunludur'),
});

export default function UserForm({ onSubmit, initialValues }: UserFormProps) {

  const { role } = useContext(AuthContext);
  const [branch, setBranch] = React.useState<string>('');
  const nav = useNavigate();

  const [userInput, setUserInput] = React.useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    identity: ''
  })

  // Add error state
  const [errors, setErrors] = React.useState<Partial<typeof userInput>>({});

  useEffect(() => {
    if (initialValues) {
      setUserInput({
        firstName: initialValues.firstName || '',
        lastName: initialValues.lastName || '',
        email: initialValues.email || '',
        phone: initialValues.phone || '',
        identity: initialValues.identity || ''
      });
      setBranch(initialValues.branches?.[0]?.id || '');
    }
  }, [initialValues])

  // Update form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await validationSchema.validate(userInput, { abortEarly: false });
      onSubmit({
        ...userInput,
        branch
      });
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
  };

  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <UserInfoInput
              label="Ad"
              value={userInput.firstName}
              onChange={(e) => setUserInput({ ...userInput, firstName: e})}
              backgroundColor='#F2F4F7'
              inputType='text'
              required
              error={!!errors.firstName}
              helperText={errors.firstName}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <UserInfoInput
              label="Soyad"
              required
              value={userInput.lastName}
              onChange={(e) => setUserInput({ ...userInput, lastName: e})}
              backgroundColor='#F2F4F7'
              inputType='text'
              error={!!errors.lastName}
              helperText={errors.lastName}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <UserInfoInput
              label="E-posta"
              required
              inputType='eposta'
              value={userInput.email}
              onChange={(e) => setUserInput({ ...userInput, email: e })}
              backgroundColor='#F2F4F7'
              error={!!errors.email}
              helperText={errors.email}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <UserInfoInput
              label='Telefon'
              inputType='phone'
              required
              value={userInput.phone}
              onChange={(value) => setUserInput({ ...userInput, phone: value.replace(/[^0-9]/g, '') })}
              backgroundColor='#F2F4F7'
              error={!!errors.phone}
              helperText={errors.phone}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <UserInfoInput
              label='TC Kimlik Numarası'
              inputType='tc'
              required
              value={userInput.identity}
              onChange={(value) => setUserInput({ ...userInput, identity: value.replace(/[^0-9]/g, '') })}
              backgroundColor='#F2F4F7'
              error={!!errors.identity}
              helperText={errors.identity}
            />
          </Grid>
          {role === 'seller' && (
            <Grid item xs={12} md={6}>
              <SelectBranch
                required
                branchId={branch}
                setBranchId={setBranch}
              />
            </Grid>
          )}
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
            onClick={() => nav(`/${role}/users`)}
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
