import type { ReactNode } from 'react';
import type { IconComponent } from './Icons';

interface AuthLayoutProps {
  icon: IconComponent;
  title: string;
  subtitle: string;
  children: ReactNode;
  footer?: ReactNode;
  header?: ReactNode;
}

export default function AuthLayout({
  icon: Icon,
  title,
  subtitle,
  children,
  footer,
  header,
}: AuthLayoutProps) {
  return (
    <div className="flex min-h-dvh flex-col bg-background">
      {header}
      <main className="flex flex-1 items-center justify-center px-6 py-6">
        <div className="w-full max-w-[420px] text-center">
          <div className="mx-auto flex h-[84px] w-[84px] items-center justify-center rounded-full bg-primary text-white">
            <Icon size={44} />
          </div>
          <h1 className="mt-5 text-[28px] font-bold text-dark">{title}</h1>
          <p className="mt-1.5 text-[15px] text-primary">{subtitle}</p>
          <div className="mt-7 rounded-3xl bg-light p-6 text-left shadow-[0_8px_20px_rgba(79,65,16,0.15)]">
            {children}
          </div>
          <div className="mt-5 flex items-center justify-center text-dark">{footer}</div>
        </div>
      </main>
    </div>
  );
}