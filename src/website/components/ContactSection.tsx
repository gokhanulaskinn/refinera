import React from 'react';
import { Box, Container, Typography, TextField, Button, Grid } from '@mui/material';

export default function ContactSection() {
  return (
    <Box sx={{ background: '#0a1a2f', color: '#fff', py: { xs: 6, md: 10 } }}>
      <Container maxWidth="sm">
        <Typography variant="h5" fontWeight={700} mb={4} textAlign="center">
          Bizimle İletişime Geçin
        </Typography>
        <Box component="form" noValidate autoComplete="off">
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Adı" variant="filled" InputProps={{ style: { background: '#fff' } }} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Soyadı" variant="filled" InputProps={{ style: { background: '#fff' } }} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="E-posta" type="email" variant="filled" InputProps={{ style: { background: '#fff' } }} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Telefon" type="tel" variant="filled" InputProps={{ style: { background: '#fff' } }} />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Mesajınız" multiline rows={4} variant="filled" InputProps={{ style: { background: '#fff' } }} />
            </Grid>
            <Grid item xs={12} textAlign="center">
              <Button variant="contained" color="primary" size="large" type="submit">
                Gönder
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
} 