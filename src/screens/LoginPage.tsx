import { useState, type FormEvent } from 'react';
import AuthLayout from '../components/AuthLayout';
import Field from '../components/Field';
import GoogleSection from '../components/GoogleSection';
import Spinner from '../components/Spinner';
import { LockIcon, MailIcon } from '../components/Icons';
import { signInWithGoogle, supabase } from '../lib/supabase';
import { validateEmail, validatePassword } from '../lib/validators';

interface LoginPageProps {
  onRegister: () => void;
  notify: (text: string) => void;
}

interface LoginErrors {
  email?: string | null;
  password?: string | null;
}

export default function LoginPage({ onRegister, notify }: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<LoginErrors>({});
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const clear = (key: keyof LoginErrors) =>
    setErrors((e) => ({ ...e, [key]: null }));

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const next: LoginErrors = {
      email: validateEmail(email),
      password: validatePassword(password),
    };
    setErrors(next);
    if (next.email || next.password) return;

    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });
      if (error) notify(error.message);
      // On success, App's auth listener switches to the home page.
    } catch {
      notify('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogle() {
    setGoogleLoading(true);
    try {
      const { error } = await signInWithGoogle();
      if (error) {
        notify(error.message);
        setGoogleLoading(false);
      }
    } catch {
      notify('Google sign-in failed. Please try again.');
      setGoogleLoading(false);
    }
  }

  return (
    <AuthLayout
      icon={LockIcon}
      title="Welcome back"
      subtitle="Sign in to continue"
      footer={
        <>
          <span>Don&apos;t have an account?</span>
          <button
            type="button"
            onClick={onRegister}
            className="ml-1 rounded px-2 py-2 font-bold text-primary active:bg-accent/40"
          >
            Register
          </button>
        </>
      }
    >
      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <Field
          label="Email"
          icon={MailIcon}
          type="email"
          inputMode="email"
          autoComplete="email"
          enterKeyHint="next"
          value={email}
          onChange={(v) => {
            setEmail(v);
            clear('email');
          }}
          error={errors.email ?? undefined}
        />
        <Field
          label="Password"
          icon={LockIcon}
          password
          autoComplete="current-password"
          enterKeyHint="done"
          value={password}
          onChange={(v) => {
            setPassword(v);
            clear('password');
          }}
          error={errors.password ?? undefined}
        />
        <button
          type="submit"
          disabled={loading}
          className="mt-2 flex h-[52px] w-full items-center justify-center rounded-[14px] bg-primary text-[17px] font-semibold text-white transition active:scale-[0.99] disabled:bg-primary/60"
        >
          {loading ? <Spinner /> : 'Log in'}
        </button>
      </form>
      <GoogleSection
        label="Continue with Google"
        loading={googleLoading}
        disabled={loading || googleLoading}
        onClick={handleGoogle}
      />
    </AuthLayout>
  );
}