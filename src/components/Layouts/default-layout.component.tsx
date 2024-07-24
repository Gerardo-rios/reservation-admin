'use client';
import React from 'react';
import Sidebar from '@/components/Sidebar/sidebar.component';
import Header from '@/components/Header/header.component';

function DefaultLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="flex h-screen overflow-hidden">
        <Sidebar />
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          <Header />
          <main>
            <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">{children}</div>
          </main>
        </div>
      </div>
    </>
  );
}

export default DefaultLayout;
