import React, { useState } from 'react';
import { Box, Container, Typography, Grid, Button } from '@mui/material';
import homeBg from '../../assets/images/home-header-bg.png';
import TextInput from '../../components/TextInput';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form gönderildi:', formData);
    // Form gönderimi işlemi burada yapılabilir
  };

  return (
    <Box
      sx={{
        background: `url(${homeBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: '#fff',
        py: { xs: 6, md: 10 },
        position: 'relative',
        borderRadius: 3,
        overflow: 'hidden',
        my: 4,
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(10, 26, 47, 0.85)',
          zIndex: 1
        }
      }}>
      <Container
        maxWidth="md"
        sx={{
          position: 'relative',
          zIndex: 2,
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          gap: 4,
          alignItems: { xs: 'center', md: 'flex-start' },
          justifyContent: { xs: 'center', md: 'space-between' }
        }}
      >
        <Box>
          <Typography
            variant="h4"
            color="primary"
            sx={{
              fontSize: { xs: '36px ', md: '48px' },
              textAlign: { xs: 'center', md: 'left' }
            }}
          >
            Bizimle
            <br />
            İletişime
            <br />
            Geçin
          </Typography>
        </Box>
        <Box sx={{ width: { xs: '100%', md: '60%' } }}>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextInput
                  label="İsim"
                  value={formData.name}
                  onChange={handleChange('name')}
                  backgroundColor="transparent"
                  borderEnabled={true}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '60px',
                      '& fieldset': { borderColor: '#fff', borderRadius: '60px' },
                      '&:hover fieldset': { borderColor: '#fff', borderRadius: '60px' },
                      '&.Mui-focused fieldset': { borderColor: '#fff', borderRadius: '60px' },
                      '& input': { color: '#fff' }
                    },
                    '& .MuiTypography-root': { color: '#fff' }
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextInput
                  label="Soyisim"
                  value={formData.surname}
                  onChange={handleChange('surname')}
                  backgroundColor="transparent"
                  borderEnabled={true}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '60px',
                      '& fieldset': { borderColor: '#fff', borderRadius: '60px' },
                      '&:hover fieldset': { borderColor: '#fff', borderRadius: '60px' },
                      '&.Mui-focused fieldset': { borderColor: '#fff', borderRadius: '60px' },
                      '& input': { color: '#fff' }
                    },
                    '& .MuiTypography-root': { color: '#fff' }
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextInput
                  label="E-posta"
                  type="email"
                  value={formData.email}
                  onChange={handleChange('email')}
                  backgroundColor="transparent"
                  borderEnabled={true}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': { borderColor: '#fff', borderRadius: '60px' },
                      '&:hover fieldset': { borderColor: '#fff', borderRadius: '60px' },
                      '&.Mui-focused fieldset': { borderColor: '#fff', borderRadius: '60px' },
                      '& input': { color: '#fff' }
                    },
                    '& .MuiTypography-root': { color: '#fff' }
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextInput
                  label="Telefon"
                  value={formData.phone}
                  onChange={handleChange('phone')}
                  backgroundColor="transparent"
                  borderEnabled={true}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '60px',
                      '& fieldset': { borderColor: '#fff', borderRadius: '60px' },
                      '&:hover fieldset': { borderColor: '#fff', borderRadius: '60px' },
                      '&.Mui-focused fieldset': { borderColor: '#fff', borderRadius: '60px' },
                      '& input': { color: '#fff' }
                    },
                    '& .MuiTypography-root': { color: '#fff' }
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextInput
                  label="Mesajınız"
                  multiline={true}
                  rows={4}
                  value={formData.message}
                  onChange={handleChange('message')}
                  backgroundColor="transparent"
                  borderEnabled={true}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '20px',
                      '& fieldset': { borderColor: '#fff' },
                      '&:hover fieldset': { borderColor: '#fff' },
                      '&.Mui-focused fieldset': { borderColor: '#fff' },
                      '& textarea': { color: '#fff' }
                    },
                    '& .MuiTypography-root': { color: '#fff' }
                  }}
                />
              </Grid>
            </Grid>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{
                  borderRadius: '60px',
                  textTransform: 'none',
                  px: 4,
                  py: 1,
                }}
              >
                Gönder
              </Button>
            </Box>
          </form>
        </Box>
      </Container>
    </Box>
  );
} 