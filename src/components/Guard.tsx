import React, { useContext, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthProvider';

type GuardProps = {
  children: React.ReactNode;
}

const nonAuthRoutes = ['/login'];

export default function Guard({ children }: GuardProps) {

  const { exp, logout, initialAuthDone } = useContext(AuthContext);

  const nav = useNavigate();
  const loc = useLocation();

  useEffect(() => {
    if (!initialAuthDone) return;
    if (!exp && !nonAuthRoutes.includes(loc.pathname)) {
      nav(`/login?redirect=${loc.pathname}&redirectQs=${loc.search.slice(1)}`, { replace: true });
    }

    if (exp && nonAuthRoutes.includes(loc.pathname)) {
      const qs = new URLSearchParams(loc.search);
      let redirectUrl = qs.get('redirect');
      if (redirectUrl) {
        redirectUrl += '?' + qs.get('redirectQs');
      } else {
        redirectUrl = '/';
      }
      nav(redirectUrl, { replace: true });
    }

    if (exp) {
      if (exp < new Date()) {
        if (!nonAuthRoutes.includes(loc.pathname)) {
          nav(`/login?redirect=${loc.pathname}&redirectQs=${loc.search.slice(1)}`, { replace: true });
          logout!();
        }
      }
    } else {
      if (!nonAuthRoutes.includes(loc.pathname)) {
        nav(`/login?redirect=${loc.pathname}&redirectQs=${loc.search.slice(1)}`, { replace: true });
        logout!();
      }
    }
  }, [loc.pathname, exp, initialAuthDone])

  if (!exp) return null;

  return (
    <div>{children}</div>
  )
}

