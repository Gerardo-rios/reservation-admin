'use client';
import Link from 'next/link';
import React from 'react';
import SignInWithPassword from './form';

export default function SignInComponent() {
  return (
    <>
      <div className="my-6 flex items-center justify-center">
        <span className="block h-px w-full bg-stroke dark:bg-dark-3"></span>
      </div>

      <div data-testid="sign-in-form">
        <SignInWithPassword />
      </div>

      <div className="mt-6 text-center">
        <p>
          Don’t have any account?{' '}
          <Link href="/auth/signup" className="text-primary">
            Sign Up
          </Link>
        </p>
      </div>
    </>
  );
}
