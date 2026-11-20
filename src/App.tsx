import { useEffect, useState, type ReactNode } from 'react';
import type { Session } from '@supabase/supabase-js';
import { supabase } from './lib/supabase';
import { useToast } from './components/Toast';
import Spinner from './components/Spinner';
import LoginPage from './screens/LoginPage';
import RegisterPage from './screens/RegisterPage';
import HomePage from './screens/HomePage';

type AuthView = 'login' | 'register';

export default function App() {
  const [session, setSession] = useState<Session | null | undefined>(undefined);
  const [view, setView] = useState<AuthView>('login');
  const [toast, notify] = useToast();

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data: sub } = supabase.auth.onAuthStateChange((_event, s) => {
      setSession(s);
      if (!s) setView('login');
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  let screen: ReactNode;
  if (session === undefined) {
    screen = (
      <div className="flex min-h-dvh items-center justify-center bg-background">
        <Spinner className="text-primary" />
      </div>
    );
  } else if (session) {
    screen = <HomePage session={session} />;
  } else if (view === 'register') {
    screen = <RegisterPage onBack={() => setView('login')} notify={notify} />;
  } else {
    screen = <LoginPage onRegister={() => setView('register')} notify={notify} />;
  }

  return (
    <>
      {screen}
      {toast}
    </>
  );
}