'use client';

import React from 'react';

function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden bg-white dark:bg-gray-dark">
      <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
        <main className="flex items-center justify-center h-full">
          <div className="mx-auto max-w-screen-xl w-full p-4 md:p-6 2xl:p-10">{children}</div>
        </main>
      </div>
    </div>
  );
}

export default AuthLayout;
