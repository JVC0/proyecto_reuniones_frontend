import { useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import type { Session } from '@supabase/supabase-js';
import { supabase } from './lib/supabase';
import { useToast } from './components/Toast';
import Spinner from './components/Spinner';
import LoginPage from './screens/LoginPage';
import RegisterPage from './screens/RegisterPage';
import HomePage from './screens/HomePage';

export default function App() {
  const [session, setSession] = useState<Session | null | undefined>(undefined);
  const [toast, notify] = useToast();

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data: sub } = supabase.auth.onAuthStateChange((_event, s) => {
      setSession(s);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  if (session === undefined) {
    return (
      <div className="flex min-h-dvh items-center justify-center bg-background">
        <Spinner className="text-primary" />
      </div>
    );
  }

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            session ? (
              <HomePage session={session} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        <Route
          path="/login"
          element={
            !session ? (
              <LoginPage notify={notify} />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route
          path="/register"
          element={
            !session ? (
              <RegisterPage notify={notify} />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />

        <Route path="*" element={<Navigate to={session ? '/' : '/login'} replace />} />
      </Routes>
      {toast}
    </>
  );
}