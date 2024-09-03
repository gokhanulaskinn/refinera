import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

const SOCKET_URL = 'ws://echo.websocket.org'; // WebSocket URL'inizi buraya girin

// export interface CurrencyData {
//   symbol: string;
//   price: number;
//   timestamp: number;
// }

const useSocket = () => {
  const [currencyData, setCurrencyData] = useState<any[]>([]);

  useEffect(() => {
    const socket: Socket = io(SOCKET_URL);

    socket.on('connect', () => {
      console.log('Connected to WebSocket');
    });

    socket.on('currency-update', (data: any[]) => {
      setCurrencyData(data);
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from WebSocket');
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return currencyData;
};

export default useSocket;
