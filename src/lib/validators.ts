const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

export const validateEmail = (value?: string | null): string | null => {
  const v = (value ?? '').trim();
  if (!v) return 'Enter your email';
  return EMAIL_RE.test(v) ? null : 'Enter a valid email';
};

export const validatePassword = (
  value?: string | null,
  emptyMsg = 'Enter your password',
): string | null => {
  if (!value) return emptyMsg;
  if (value.length < 6) return 'At least 6 characters';
  return null;
};