// app/layout.tsx
import type { ReactNode } from 'react';
import './globals.css';
import { Inter } from 'next/font/google';
import { cn } from '@/lib/utils';

const inter = Inter({ subsets: ['latin', 'cyrillic'], variable: '--font-inter' });

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="uk">
      <body className={cn('min-h-screen bg-background antialiased', inter.variable)}>
        {children}
      </body>
    </html>
  );
}
