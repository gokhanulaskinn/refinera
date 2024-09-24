import { Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Typography } from '@mui/material'
import React from 'react'
import CommonButton from './CommonButton'
import ComissionCalculation from './ComissionCalculation'
import { Close } from '@mui/icons-material'
import BasicTabs from './CustomTabs'
import { PosType, posProviders } from '../utils/types'

type PosRateDialogProps = {
  open: boolean
  onClose: () => void
  onSubmit: (pos: PosType, base: number) => void
  constants: any
  pos: PosType
}

export default function PosRateDialog({ open, onClose, onSubmit, constants, pos }: PosRateDialogProps) {

  const tabs = posProviders;
  const [value, setValue] = React.useState(tabs.indexOf(pos.name));
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

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
      <BasicTabs
          value={value}
          handleChange={handleChange}
          tabs={tabs}
        />
        <ComissionCalculation
          baseComission={parseFloat(constants?.[tabs[value]] || '0')}
          comissionRate={pos.rate}
          canSetRate={true}
          onSubmit={(rate, base) => onSubmit({
            name: tabs[value],
            rate
          }, base)}
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
