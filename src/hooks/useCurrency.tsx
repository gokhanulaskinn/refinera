import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

const SOCKET_URL = 'https://refinera.com.tr'; // WebSocket URL'inizi buraya girin
const SOCKET_PATH = '/ws/socket.io'; 
// export interface CurrencyData {
//   symbol: string;
//   price: number;
//   timestamp: number;
// }

const useSocket = () => {
  const [incomingData, setCurrencyData] = useState<any[]>([]);

  useEffect(() => {
    const socket: Socket = io(SOCKET_URL, {
      path: SOCKET_PATH,  
    });

    socket.on('connect', () => {
      console.log('Connected to WebSocket');
    });

    // socket.on('currency-update', (data: any[]) => {
    //   setCurrencyData(data);
    // });
    socket.on('mergedSymbols', (data) => {
      console.log('Received merged symbols data:');
      console.log('Received merged symbols data:', data);
      setCurrencyData(data);
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from WebSocket');
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return incomingData;
};

export default useSocket;
