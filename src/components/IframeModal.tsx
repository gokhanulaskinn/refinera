import React, { useEffect } from 'react';
import { Box, Modal, Typography } from '@mui/material';

interface IframeModalProps {
  open: boolean;
  iframeUrl: string;
  onClose: () => void;
}

const IframeModal: React.FC<IframeModalProps> = ({ open, iframeUrl, onClose }) => {
  const handleIframeLoad = () => {
    window.addEventListener('message', (event) => {
      if (event.data === 'closeIframe') {
        onClose();
      }
    });
  };

  useEffect(() => {
    if (open) {
      handleIframeLoad();
    }
  }, [open]);

  return (
    <Modal
      open={open}
      onClose={() => { }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          maxWidth: 800,
          width: '100%',
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h6" component="h2">
          3D Secure Doğrulama
        </Typography>
        <iframe src={iframeUrl} width="100%" height="600px" />
      </Box>
    </Modal>
  );
};

export default IframeModal;
