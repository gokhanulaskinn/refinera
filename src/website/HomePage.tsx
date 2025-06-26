import React from 'react'
import Appbar from './components/Appbar'
import HeroSection from './components/HeroSection'
import AboutSection from './components/AboutSection'
import DashboardShowcase from './components/DashboardShowcase'
import PartnersSection from './components/PartnersSection'
import ContactSection from './components/ContactSection'
import Footer from './components/Footer'
import { Box } from '@mui/material'

export default function HomePage() {
  return (
    <>
      <Appbar />
      <Box sx={{
        maxWidth: '1440px',
        mx: 'auto',
        px: { xs: 2, md: 4 },
        my: 2,
      }}>

        <HeroSection />
        <AboutSection />
        <DashboardShowcase />
        <PartnersSection />
        {/* <ContactSection /> */}
      </Box>
      {/* <Footer /> */}
    </>
  )
}
