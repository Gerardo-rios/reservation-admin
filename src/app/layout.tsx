'use client';
import 'flatpickr/dist/flatpickr.css';
import '@/css/satoshi.css';
import '@/css/style.css';
import React, { useEffect, useState } from 'react';
import Loader from '@/components/common/Loader/loader.component';
import { Provider } from 'react-redux';
import store, { AppStore } from '@/redux/store';
import { SnackbarProvider } from 'notistack';
import { useSelector } from 'react-redux';
import DefaultLayout from '@/components/Layouts/default-layout.component';
import { useRouter, usePathname } from 'next/navigation';

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
    const isAuthenticated = useSelector((state: AppStore) => state.auth.isAuthenticated);
    const router = useRouter();
    const pathname = usePathname();

    // useEffect(() => {
    //   if (!isAuthenticated && !pathname.startsWith('/auth/')) {
    //     router.push('/auth/signin');
    //   }
    // }, [isAuthenticated, router, pathname]);

    // if (!isAuthenticated) {
    //   return <AuthLayout>{children}</AuthLayout>;
    // }

    return <DefaultLayout>{children}</DefaultLayout>;
  };

  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <Provider store={store}>
          <SnackbarProvider>{loading ? <Loader /> : <AuthWrapper>{children}</AuthWrapper>}</SnackbarProvider>
        </Provider>
      </body>
    </html>
  );
}
