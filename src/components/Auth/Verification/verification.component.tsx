'use client';
import React from 'react';
import Verification from './form';

export default function VerificationComponent() {
  return (
    <>
      <div className="no-scrollbar overflow-y-auto py-20">
        <div className="mx-auto w-full max-w-[480px]">
          <div className="text-center">
            <div className="rounded-xl bg-white p-4 shadow-card-10 dark:bg-gray-dark lg:p-7.5 xl:p-12.5">
              <a className="mx-auto mb-7.5 inline-flex" href="/">
                <img
                  alt="Logo"
                  fetchPriority="high"
                  width="176"
                  height="32"
                  decoding="async"
                  data-nimg="1"
                  className="dark:hidden"
                  src="/images/logo/logo-dark.svg"
                  style={{ color: 'transparent' }}
                />
                <img
                  alt="Logo"
                  fetchPriority="high"
                  width="176"
                  height="32"
                  decoding="async"
                  data-nimg="1"
                  className="hidden dark:block"
                  src="/images/logo/logo.svg"
                  style={{ color: 'transparent' }}
                />
              </a>
              <h1 className="mb-2.5 text-3xl font-black leading-[48px] text-dark dark:text-white">Verify Your Account</h1>
              <p className="mb-7.5 font-medium text-dark-4 dark:text-dark-6">Enter the 4 digit code sent to the registered email id.</p>
              <Verification />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
