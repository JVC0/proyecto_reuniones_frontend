interface SpinnerProps {
  className?: string;
}

export default function Spinner({ className = 'text-white' }: SpinnerProps) {
  return (
    <span
      role="status"
      aria-label="Loading"
      className={`inline-block h-[22px] w-[22px] animate-spin rounded-full border-[2.5px] border-current border-t-transparent ${className}`}
    />
  );
}