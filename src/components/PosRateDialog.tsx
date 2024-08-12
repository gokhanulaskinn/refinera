import { Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Typography } from '@mui/material'
import React from 'react'
import CommonButton from './CommonButton'
import ComissionCalculation from './ComissionCalculation'
import { Close } from '@mui/icons-material'

type PosRateDialogProps = {
  open: boolean
  onClose: () => void
  onSubmit: (rate: number, base: number) => void
  baseCommissionRate: number
  comissionRate: number
}

export default function PosRateDialog({ open, onClose, onSubmit, baseCommissionRate, comissionRate }: PosRateDialogProps) {

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth={false} // fullWidth'ü kaldırdık
      PaperProps={{
        style: {
          width: 'fit-content',
          maxWidth: '90%' // Genişliğin taşmaması için maks genişlik ekledik
        }
      }}
    >
      <DialogTitle>
        <Typography>
          POS Komisyon Oranı Belirle
        </Typography>
        <IconButton
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: '16px',
            top: '8px'
          }}
        >
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ width: 'fit-content' }}> {/* İçeriğin genişliğine göre ayarlıyoruz */}
        <ComissionCalculation
          baseComission={baseCommissionRate}
          comissionRate={comissionRate}
          canSetRate={true}
          onSubmit={(rate, base) => onSubmit(rate, base)}
        />
      </DialogContent>
      {/* <DialogActions>
        <CommonButton
          variant='outlined'
          onClick={onClose}
          label={'İptal'}
          size='large'
        />
        <CommonButton
          variant='contained'
          color='white'
          onClick={() => onSubmit(commissionRate)}
          label={'Kaydet'}
          size='large'
        />
      </DialogActions> */}
    </Dialog>
  )
}
