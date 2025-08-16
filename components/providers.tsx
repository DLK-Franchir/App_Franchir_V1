
'use client';

import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from '@/components/theme-provider';
import { LocaleProvider } from '@/lib/locale';
import { Toaster } from '@/components/ui/toaster';
import { NotificationProvider } from '@/contexts/notification-context';
import { useEffect, useState } from 'react';

export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div suppressHydrationWarning>
        <SessionProvider>
          <NotificationProvider>
            <LocaleProvider>
              <ThemeProvider
                attribute="class"
                defaultTheme="light"
                enableSystem
                disableTransitionOnChange
              >
                {children}
                <Toaster />
              </ThemeProvider>
            </LocaleProvider>
          </NotificationProvider>
        </SessionProvider>
      </div>
    );
  }

  return (
    <SessionProvider>
      <NotificationProvider>
        <LocaleProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster />
          </ThemeProvider>
        </LocaleProvider>
      </NotificationProvider>
    </SessionProvider>
  );
}
