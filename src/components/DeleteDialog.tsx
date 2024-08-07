import { Dialog, DialogActions, DialogContent, Typography } from '@mui/material';
import succesImage from '../assets/images/success-image.svg';
import failImage from '../assets/images/fail-image.svg';
import React from 'react'
import CommonButton from './CommonButton';

type DeleteDialogProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  content: string;
  onSubmit: () => void;
}

export default function DeleteDialog({ open, onClose, title, content, onSubmit }: DeleteDialogProps) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      sx={{
        '& .MuiDialog-paper': {
          borderRadius: '20px',
          padding: '20px',
          textAlign: 'center'
        }
      }}
    >
      <DialogContent>
        <Typography
          sx={{
            fontWeight: 600,
            fontSize: '24px',
          }}
        >
          {title}
        </Typography>
        <Typography
          sx={{
            fontSize: '16px',
            color: '#6B6B6B',
            marginTop: '10px'
          }}
        >
          {content}
        </Typography>
      </DialogContent>
      <DialogActions>
        <CommonButton
          variant='outlined'
          onClick={onClose}
          label={'İptal'}
          size='large'
        />
        <CommonButton
          variant='contained'
          color='white'
          onClick={onSubmit}
          label={'Sil'}
          size='large'
        />
      </DialogActions>
    </Dialog>
  )
}
