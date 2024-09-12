import { Box, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material'
import React from 'react'
import CommonButton from './CommonButton'

type ShareLinkDialogProps = {
  open: boolean
  onClose(): void
  handleCopy(): void
  handleShareWithWhatsapp(): void
}

export default function ShareLinkDialog({ open, onClose, handleCopy, handleShareWithWhatsapp }: ShareLinkDialogProps) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
    >
      <DialogTitle>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 'bold'
          }}
        >
          Ödeme Linki
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Typography>
          Ödeme linki sms olarak gönderilmiştir. 
          Ayrıca ödeme linkinizi aşağıdaki butonlardan kopyalayabilir veya whatsapp üzerinden paylaşabilirsiniz.
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: 2,
            mt: 2
          }}
        >
          <CommonButton
            label="Kopyala"
            onClick={handleCopy}
          />
          <CommonButton
            label="Whatsapp'ta Paylaş"
            onClick={handleShareWithWhatsapp}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <CommonButton
          label="Kapat"
          onClick={onClose}
        />
      </DialogActions>
    </Dialog>
  )
}
