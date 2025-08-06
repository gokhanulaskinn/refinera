import React, { useState } from 'react';
import { Box, Container, Typography, Grid, Button } from '@mui/material';
import homeBg from '../../assets/images/home-header-bg.png';
import TextInput from '../../components/TextInput';
import { useAlert } from '../../hooks/useAlert';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    phone: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const showSnackbar = useAlert();

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Form validation
    if (!formData.name || !formData.surname || !formData.email || !formData.phone || !formData.message) {
      showSnackbar('Lütfen tüm alanları doldurunuz', 'error');
      return;
    }

    setLoading(true);

    try {
      const requestData = {
        firstName: formData.name,
        lastName: formData.surname,
        email: formData.email,
        phone: formData.phone,
        message: formData.message
      };

      const response = await fetch('/api/context/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData)
      });

      if (response.ok) {
        showSnackbar('Mesajınız başarıyla gönderildi. En kısa sürede size dönüş yapacağız.', 'success');
        setFormData({
          name: '',
          surname: '',
          email: '',
          phone: '',
          message: ''
        });
      } else {
        const errorData = await response.json();
        showSnackbar(errorData.message || 'Mesaj gönderilirken bir hata oluştu', 'error');
      }
    } catch (error) {
      showSnackbar('Bağlantı hatası. Lütfen daha sonra tekrar deneyin.', 'error');
    } finally {
      setLoading(false);
    }
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
                disabled={loading}
                sx={{
                  borderRadius: '60px',
                  textTransform: 'none',
                  px: 4,
                  py: 1,
                }}
              >
                {loading ? 'Gönderiliyor...' : 'Gönder'}
              </Button>
            </Box>
          </form>
        </Box>
      </Container>
    </Box>
  );
} 