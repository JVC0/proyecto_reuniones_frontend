import Spinner from './Spinner';

interface GoogleSectionProps {
  onClick: () => void;
  disabled?: boolean;
  loading?: boolean;
  label?: string;
}

export default function GoogleSection({
  onClick,
  disabled = false,
  loading = false,
  label = 'Continue with Google',
}: GoogleSectionProps) {
  return (
    <div className="mt-5">
      <div className="flex items-center">
        <div className="h-px flex-1 bg-primary/40" />
        <span className="px-3 text-dark">or</span>
        <div className="h-px flex-1 bg-primary/40" />
      </div>
      <button
        type="button"
        onClick={onClick}
        disabled={disabled}
        className="mt-5 flex h-[52px] w-full items-center justify-center rounded-[14px] border-[1.5px] border-primary bg-background text-base font-semibold text-dark transition active:scale-[0.99] disabled:opacity-60"
      >
        {loading ? (
          <Spinner className="text-primary" />
        ) : (
          <>
            <span className="mr-3 flex h-[26px] w-[26px] items-center justify-center rounded-full bg-primary text-[15px] font-bold text-white">
              G
            </span>
            {label}
          </>
        )}
      </button>
    </div>
  );
}