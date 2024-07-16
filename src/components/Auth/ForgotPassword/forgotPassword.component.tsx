'use client';

import React from 'react';
import PasswordReset from './form';

export default function PasswordResetComponent() {
  return (
    <>
      <div className="my-6 flex items-center justify-center">
        <span className="block h-px w-full bg-stroke dark:bg-dark-3"></span>
      </div>

      <div>
        <PasswordReset />
      </div>
    </>
  );
}
