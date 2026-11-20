import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';

export function useToast(): [ReactNode, (text: string) => void] {
  const [message, setMessage] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const show = useCallback((text: string) => {
    setMessage(text);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setMessage(null), 4000);
  }, []);

  useEffect(() => () => clearTimeout(timer.current), []);

  const toast = message ? (
    <div
      role="alert"
      className="fixed inset-x-4 bottom-4 z-50 mx-auto max-w-md rounded-lg bg-dark px-4 py-3.5 text-sm text-white shadow-lg"
      style={{ marginBottom: 'env(safe-area-inset-bottom)' }}
    >
      {message}
    </div>
  ) : null;

  return [toast, show];
}