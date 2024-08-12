import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from 'react';
import { User, UserRole } from "../utils/types";
import { getUser } from "../services/commonServices";

type AuthContextProps = {
  children: React.ReactNode;
}

type AuthStateType = {
  token: string;
  exp?: Date;
  role: string;
  setRole: (role: string) => void,
  login: (token: string) => void,
  logout: () => void,
  user?: User,
  initialAuthDone: boolean
}

const initialAuthState: AuthStateType = {
  token: "",
  exp: undefined,
  role: '',
  user: undefined,
  setRole: (role: string) => { },
  login: (token: string) => { },
  logout: () => { },
  initialAuthDone: false,
}

export const AuthContext = React.createContext<AuthStateType>(initialAuthState);

function getExp(token: string) {
  var jsonPayload: { exp: number } = jwtDecode(token);
  return jsonPayload.exp;
};

function getId(token: string) {
  var jsonPayload: { sub: string } = jwtDecode(token);
  return jsonPayload.sub;
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
  const [user, setUser] = useState<User>();

  const login = async (token: string, refreshTkn?: string) => {
    try {
      setExp(new Date(getExp(token) * 1000));
      const role = getRole(token);
      if (role === UserRole.SUPERADMIN) {
        setRole('admin');
      } else if (role === UserRole.JEWELER_OWNER || role === UserRole.JEWELER_EMPLOYEE) {
        setRole('seller');
      } else if (role === UserRole.SUPPLIER_OWNER || role === UserRole.SUPPLIER_EMPLOYEE) {
        setRole('supplier');
      }
      setToken(token);
      const res = await getUser(token, getId(token));
      setUser(res);
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
    setUser(undefined);
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
        setRole,
        token,
        user,
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

