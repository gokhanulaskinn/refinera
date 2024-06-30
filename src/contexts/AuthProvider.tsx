import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from 'react';

type AuthContextProps = {
  children: React.ReactNode;
}

type AuthStateType = {
  token: string;
  exp?: Date;
  role: string;
  login: (token: string) => void,
  logout: () => void,
  initialAuthDone: boolean
}

const initialAuthState: AuthStateType = {
  token: "",
  exp: undefined,
  role: '',
  login: (token: string) => { },
  logout: () => { },
  initialAuthDone: false,
}

export const AuthContext = React.createContext<AuthStateType>(initialAuthState);

function getExp(token: string) {
  var jsonPayload: { exp: number } = jwtDecode(token);
  return jsonPayload.exp;
};

function getRole(token: string) {
  var jsonPayload: { role: string } = jwtDecode(token);
  return jsonPayload.role;
}

export default function AuthProvider({ children }: AuthContextProps) {

  const [token, setToken] = useState('');
  const [initialAuthDone, setInitialAuthDone] = useState(false);
  const [exp, setExp] = useState<Date>();
  const [role, setRole] = useState<string>('');

  const login = (token: string, refreshTkn?: string) => {
    try {
      setExp(new Date(getExp(token) * 1000));
      setRole(getRole(token));
      setToken(token);
    } catch (e) {
      logout();
    } finally {
      setInitialAuthDone(true);
    }
  }

  const logout = () => {
    localStorage.removeItem('token');
    setExp(undefined);
    setRole('');
    setToken('');
  }

  useEffect(() => {
    const tokenData = localStorage.getItem('token') || '';
    if (tokenData) {
      login(tokenData);
    } else {
      setInitialAuthDone(true);
    }
  }, [])

  return (
    <AuthContext.Provider
      value={{
        exp,
        role,
        token,
        login,
        logout,
        initialAuthDone,
      }}>
      {
        children
      }
    </AuthContext.Provider>
  );
}

