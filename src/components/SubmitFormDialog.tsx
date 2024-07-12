import { Dialog, DialogActions, DialogContent, Typography } from '@mui/material';
import succesImage from '../assets/images/success-image.svg';
import failImage from '../assets/images/fail-image.svg';
import React from 'react'
import CommonButton from './CommonButton';

type SubmitFormDialogProps = {
  open: boolean;
  onClose: () => void;
  type: 'add' | 'edit';
  isSuccessful: boolean;
  title: string;
  content: string;
  actionText1: string;
  actionText2: string;
  onAction1: () => void;
  onAction2: () => void;
}

export default function SubmitFormDialog({ open, onClose, type, isSuccessful, title, content, actionText1, actionText2, onAction1, onAction2 }: SubmitFormDialogProps) {
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
        <img
          src={isSuccessful ? succesImage : failImage}
          alt="success"
          style={{
            width: '250px',
            height: '200px',
            zoom: '1.5',
            marginTop: '-40px'
          }}
        />
        <Typography
          sx={{
            fontWeight: 600,
            fontSize: '24px',
            mt: -5
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
          onClick={onAction1}
          label={actionText1}
          size='large'
        />
        <CommonButton
          variant='contained'
          color='white'
          onClick={onAction2}
          label={actionText2}
          size='large'
        />
      </DialogActions>
    </Dialog>
  )
}
