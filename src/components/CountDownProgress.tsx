import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import CircularProgress, { circularProgressClasses } from '@mui/material/CircularProgress';
import { Typography } from '@mui/material';

type CountDownProgressProps = {
  timeLeft: number;
  onFinished: () => void;
  repeat?: boolean;
  label?: string;
};

export default function CountDownProgress({ timeLeft, onFinished, repeat = false, label }: CountDownProgressProps) {
  const [remainingTime, setRemainingTime] = useState(timeLeft);

  useEffect(() => {
    if (remainingTime <= 0) {
      onFinished();
      if (repeat) {
        setRemainingTime(timeLeft);
      }
      return;
    }

    const intervalId = setInterval(() => {
      setRemainingTime((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [remainingTime, onFinished, repeat, timeLeft]);

  const progressValue = (remainingTime / timeLeft) * 100;

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        height: '100%',
        width: '100%',
      }}
    >
      <Box sx={{ position: 'relative', display: 'inline-flex' }}>
        <CircularProgress
          variant="determinate"
          sx={{
            color: (theme) => theme.palette.grey[200],
          }}
          size={72}
          thickness={4}
          value={100}
        />
        <CircularProgress
          variant="determinate"
          value={progressValue}
          sx={{
            color: '#9AA6A7',
            position: 'absolute',
            left: 0,
            [`& .${circularProgressClasses.circle}`]: {
              strokeLinecap: 'round',
            },
          }}
          size={72}
          thickness={4}
        />
        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {remainingTime}s
        </Box>
      </Box>
      <Typography
        sx={{
          fontSize: 14,
          fontWeight: 400,
          color: 'text.secondary',
        }}>
        {label}
      </Typography>
    </Box>
  );
}
