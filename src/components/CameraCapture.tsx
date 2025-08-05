import React, { useState, useRef, useCallback, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  IconButton,
  CircularProgress,
  Alert,
  Stack
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import FlipCameraIosIcon from '@mui/icons-material/FlipCameraIos';
import { useAlert } from '../hooks/useAlert';

interface CameraCaptureProps {
  open: boolean;
  onClose: () => void;
  onCapture: (file: File) => void;
  title: string;
}

export default function CameraCapture({ open, onClose, onCapture, title }: CameraCaptureProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  
  const [isStreaming, setIsStreaming] = useState(false);
  const [isCapturing, setIsCapturing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('environment');
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);
  
  const showSnackbar = useAlert();

  // Kullanılabilir kameraları listele
  const getAvailableCameras = useCallback(async () => {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const videoDevices = devices.filter(device => device.kind === 'videoinput');
      setDevices(videoDevices);
    } catch (err) {
      console.error('Kameralar listelenirken hata:', err);
    }
  }, []);

  // Kamera stream'ini başlat
  const startCamera = useCallback(async () => {
    try {
      setError(null);
      setIsStreaming(true);

      // HTTPS kontrolü
      if (window.location.protocol !== 'https:' && window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
        throw new Error('Kamera erişimi için HTTPS gereklidir');
      }

      // getUserMedia destekleniyor mu kontrolü
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Bu tarayıcı kamera erişimini desteklemiyor');
      }

      // Önceki stream'i durdur
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }

      const constraints: MediaStreamConstraints = {
        video: {
          facingMode: facingMode,
          width: { ideal: 1920, max: 1920 },
          height: { ideal: 1080, max: 1080 }
        },
        audio: false
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          videoRef.current?.play();
        };
      }

      setIsStreaming(true);
    } catch (err: any) {
      console.error('Kamera başlatılırken hata:', err);
      let errorMessage = 'Kamera erişiminde hata oluştu';
      
      if (err.name === 'NotAllowedError') {
        errorMessage = 'Kamera erişim izni verilmedi. Lütfen tarayıcı ayarlarından izin verin.';
      } else if (err.name === 'NotFoundError') {
        errorMessage = 'Kamera bulunamadı. Lütfen cihazınızda kamera olduğundan emin olun.';
      } else if (err.name === 'NotSupportedError') {
        errorMessage = 'Bu tarayıcı kamera erişimini desteklemiyor.';
      } else if (err.message) {
        errorMessage = err.message;
      }
      
      setError(errorMessage);
      setIsStreaming(false);
    }
  }, [facingMode]);

  // Kamera stream'ini durdur
  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setIsStreaming(false);
  }, []);

  // Fotoğraf çek
  const capturePhoto = useCallback(async () => {
    if (!videoRef.current || !canvasRef.current) return;

    try {
      setIsCapturing(true);
      
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      
      if (!context) return;

      // Canvas boyutlarını video boyutlarına ayarla
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      // Video frame'ini canvas'a çiz
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      // Canvas'ı blob'a çevir ve file objesi oluştur
      canvas.toBlob((blob) => {
        if (blob) {
          const file = new File([blob], `id-photo-${Date.now()}.jpg`, {
            type: 'image/jpeg',
            lastModified: Date.now()
          });
          
          // Dosyayı parent bileşene gönder
          setTimeout(() => {
            onCapture(file);
            onClose();
            stopCamera();
          }, 500);
        }
      }, 'image/jpeg', 0.8);

      showSnackbar('Fotoğraf başarıyla çekildi', 'success');
    } catch (err) {
      console.error('Fotoğraf çekilirken hata:', err);
      showSnackbar('Fotoğraf çekilirken hata oluştu', 'error');
    } finally {
      setIsCapturing(false);
    }
  }, [onCapture, onClose, stopCamera, showSnackbar]);

  // Kamera yönünü değiştir
  const switchCamera = useCallback(() => {
    setFacingMode(prev => prev === 'user' ? 'environment' : 'user');
  }, []);

  // Dialog açıldığında kamerayı başlat
  useEffect(() => {
    if (open) {
      getAvailableCameras();
      startCamera();
    } else {
      stopCamera();
    }
  }, [open, startCamera, stopCamera, getAvailableCameras]);

  // Facing mode değiştiğinde kamerayı yeniden başlat
  useEffect(() => {
    if (open && isStreaming) {
      startCamera();
    }
  }, [facingMode, open, isStreaming, startCamera]);

  // Component unmount olduğunda stream'i temizle
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, [stopCamera]);

  const handleClose = () => {
    stopCamera();
    setError(null);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          maxHeight: '90vh'
        }
      }}
    >
      <DialogTitle sx={{ m: 0, p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="h6" component="div">
          {title}
        </Typography>
        <IconButton
          aria-label="kapat"
          onClick={handleClose}
          sx={{
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers sx={{ p: 2 }}>
        {error ? (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        ) : null}

        <Box
          sx={{
            position: 'relative',
            width: '100%',
            maxWidth: 400,
            mx: 'auto',
            aspectRatio: '4/3',
            borderRadius: 2,
            overflow: 'hidden',
            backgroundColor: '#000',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {!isStreaming && !error ? (
            <CircularProgress color="primary" />
          ) : null}

          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: isStreaming ? 'block' : 'none'
            }}
          />

          <canvas
            ref={canvasRef}
            style={{ display: 'none' }}
          />

          {/* Kamera kontrolleri */}
          {isStreaming && (
            <Box
              sx={{
                position: 'absolute',
                bottom: 16,
                left: '50%',
                transform: 'translateX(-50%)',
                display: 'flex',
                gap: 2,
                alignItems: 'center'
              }}
            >
              {devices.length > 1 && (
                <IconButton
                  onClick={switchCamera}
                  sx={{
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    color: 'white',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.3)'
                    }
                  }}
                >
                  <FlipCameraIosIcon />
                </IconButton>
              )}

              <IconButton
                onClick={capturePhoto}
                disabled={isCapturing}
                sx={{
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  color: 'primary.main',
                  width: 60,
                  height: 60,
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 1)'
                  },
                  '&:disabled': {
                    backgroundColor: 'rgba(255, 255, 255, 0.5)'
                  }
                }}
              >
                {isCapturing ? (
                  <CircularProgress size={24} />
                ) : (
                  <CameraAltIcon sx={{ fontSize: 30 }} />
                )}
              </IconButton>
            </Box>
          )}
        </Box>

        <Typography
          variant="body2"
          color="text.secondary"
          align="center"
          sx={{ mt: 2 }}
        >
          Kimlik belgenizi kamera karşısında düz tutun ve fotoğraf çekin
        </Typography>
      </DialogContent>

      <DialogActions sx={{ p: 2 }}>
        <Stack direction="row" spacing={2} sx={{ width: '100%' }}>
          <Button
            onClick={handleClose}
            variant="outlined"
            fullWidth
          >
            İptal
          </Button>
          {error && (
            <Button
              onClick={startCamera}
              variant="contained"
              fullWidth
            >
              Tekrar Dene
            </Button>
          )}
        </Stack>
      </DialogActions>
    </Dialog>
  );
}