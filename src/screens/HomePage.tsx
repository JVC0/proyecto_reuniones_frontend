import type { Session } from '@supabase/supabase-js';
import { LogoutIcon } from '../components/Icons';
import { supabase } from '../lib/supabase';

interface HomePageProps {
  session: Session;
}

export default function HomePage({ session }: HomePageProps) {
  const email = session?.user?.email ?? '';

  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <header
        className="flex h-14 items-center bg-primary px-4 text-white shadow"
        style={{
          paddingTop: 'env(safe-area-inset-top)',
          height: 'calc(3.5rem + env(safe-area-inset-top))',
        }}
      >
        <h1 className="flex-1 text-[20px] font-medium">Home</h1>
        <button
          type="button"
          aria-label="Log out"
          onClick={() => supabase.auth.signOut()}
          className="flex h-12 w-12 items-center justify-center rounded-full active:bg-white/20"
        >
          <LogoutIcon size={24} />
        </button>
      </header>
      <main className="flex flex-1 items-center justify-center px-6">
        <p className="break-all text-center text-xl font-semibold text-dark">
          Welcome, {email}
        </p>
      </main>
    </div>
  );
}