import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout';
import Field from '../components/Field';
import GoogleSection from '../components/GoogleSection';
import Spinner from '../components/Spinner';
import {
  BackIcon,
  LockIcon,
  LockResetIcon,
  MailIcon,
  UserIcon,
  UserPlusIcon,
} from '../components/Icons';
import { redirectUrl, signInWithGoogle, supabase } from '../lib/supabase';
import { validateEmail, validatePassword } from '../lib/validators';

interface RegisterPageProps {
  notify: (text: string) => void;
}

interface RegisterErrors {
  name?: string | null;
  email?: string | null;
  password?: string | null;
  confirm?: string | null;
}

export default function RegisterPage({ notify }: RegisterPageProps) {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [errors, setErrors] = useState<RegisterErrors>({});
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const clear = (key: keyof RegisterErrors) =>
    setErrors((e) => ({ ...e, [key]: null }));

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const next: RegisterErrors = {
      name: name.trim() ? null : 'Enter your name',
      email: validateEmail(email),
      password: validatePassword(password, 'Enter a password'),
      confirm: confirm !== password ? 'Passwords do not match' : null,
    };
    setErrors(next);
    if (Object.values(next).some(Boolean)) return;

    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: { data: { name: name.trim() }, emailRedirectTo: redirectUrl },
      });
      if (error) {
        notify(error.message);
      } else if (!data.session) {
        notify('Account created! Check your email to confirm it.');
        navigate('/login');
      }
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
      icon={UserPlusIcon}
      title="Create account"
      subtitle="Fill in your details to get started"
      header={
        <div className="px-2 pt-2">
          <Link
            to="/login"
            aria-label="Back"
            className="flex h-12 w-12 items-center justify-center rounded-full text-dark active:bg-accent/40"
          >
            <BackIcon size={26} />
          </Link>
        </div>
      }
      footer={
        <>
          <span>Already have an account?</span>
          <Link
            to="/login"
            className="ml-1 rounded px-2 py-2 font-bold text-primary active:bg-accent/40"
          >
            Log in
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <Field
          label="Name"
          icon={UserIcon}
          autoComplete="name"
          autoCapitalize="words"
          enterKeyHint="next"
          value={name}
          onChange={(v) => {
            setName(v);
            clear('name');
          }}
          error={errors.name ?? undefined}
        />
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
          autoComplete="new-password"
          enterKeyHint="next"
          value={password}
          onChange={(v) => {
            setPassword(v);
            clear('password');
          }}
          error={errors.password ?? undefined}
        />
        <Field
          label="Confirm password"
          icon={LockResetIcon}
          password
          autoComplete="new-password"
          enterKeyHint="done"
          value={confirm}
          onChange={(v) => {
            setConfirm(v);
            clear('confirm');
          }}
          error={errors.confirm ?? undefined}
        />
        <button
          type="submit"
          disabled={loading}
          className="mt-2 flex h-[52px] w-full items-center justify-center rounded-[14px] bg-primary text-[17px] font-semibold text-white transition active:scale-[0.99] disabled:bg-primary/60"
        >
          {loading ? <Spinner /> : 'Register'}
        </button>
      </form>
      <GoogleSection
        label="Sign up with Google"
        loading={googleLoading}
        disabled={loading || googleLoading}
        onClick={handleGoogle}
      />
    </AuthLayout>
  );
}