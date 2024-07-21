'use client';
import React from 'react';
import Link from 'next/link';
import SignUpWithPassword from './form';

export default function SignUpComponent() {
  return (
    <>
      <div className="my-6 flex items-center justify-center">
        <span className="block h-px w-full bg-stroke dark:bg-dark-3"></span>
      </div>

      <div data-testid="sign-up-form">
        <SignUpWithPassword />
      </div>

      <div className="mt-6 text-center">
        <p>
          Already have an account?{' '}
          <Link href="/auth/signin" className="text-primary">
            Sign in
          </Link>
        </p>
      </div>
    </>
  );
}
