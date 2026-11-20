import { useState, type InputHTMLAttributes } from 'react';
import { EyeIcon, EyeOffIcon, type IconComponent } from './Icons';

interface FieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'> {
  label: string;
  icon: IconComponent;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  password?: boolean;
}

export default function Field({
  label,
  icon: Icon,
  type = 'text',
  value,
  onChange,
  error,
  password = false,
  ...rest
}: FieldProps) {
  const [show, setShow] = useState(false);
  const inputType = password ? (show ? 'text' : 'password') : type;

  return (
    <div>
      <label className="group relative block">
        <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-primary">
          <Icon size={22} />
        </span>
        <input
          {...rest}
          type={inputType}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder=" "
          aria-invalid={!!error}
          className={`peer block h-14 w-full rounded-[14px] border bg-background pl-12 pr-12 pt-4 text-base text-dark outline-none transition-colors ${error
              ? 'border-red-700 focus:border-2 focus:border-red-700'
              : 'border-accent focus:border-2 focus:border-primary'
            }`}
        />
        <span
          className={`pointer-events-none absolute left-12 top-1/2 origin-left -translate-y-1/2 text-base text-dark transition-all duration-150 peer-focus:top-3.5 peer-focus:scale-75 peer-[:not(:placeholder-shown)]:top-3.5 peer-[:not(:placeholder-shown)]:scale-75 ${error ? 'peer-focus:text-red-700' : 'peer-focus:text-primary'
            }`}
        >
          {label}
        </span>
        {password && (
          <button
            type="button"
            onClick={() => setShow((s) => !s)}
            aria-label={show ? 'Hide password' : 'Show password'}
            className="absolute right-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full text-primary active:bg-accent/40"
          >
            {show ? <EyeOffIcon size={22} /> : <EyeIcon size={22} />}
          </button>
        )}
      </label>
      {error && <p className="mt-1.5 pl-4 text-xs text-red-700">{error}</p>}
    </div>
  );
}