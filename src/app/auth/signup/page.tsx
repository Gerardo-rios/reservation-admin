import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import SignUpComponent from '@/components/Auth/Signup/signup.component';

export const metadata: Metadata = {
  title: 'Register Page',
  description: 'This is the Register Page'
};

const SignUp: React.FC = () => {
  return (
    <>
      <div className="rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
        <div className="flex flex-row-reverse items-center h-full">
          <div className="w-full xl:w-1/2 mt-80 sm:mt-30 lg:mt-45 xl:mt-60">
            <div className="w-full p-4 sm:p-12.5 xl:p-15">
              <SignUpComponent />
            </div>
          </div>

          <div className="hidden w-full p-7.5 xl:block xl:w-1/2 h-full mt-60 sm:mt-250 lg:mt-100 xl:mt-60">
            <div className="custom-gradient-1 overflow-hidden rounded-2xl px-12.5 pt-12.5 dark:!bg-dark-2 dark:bg-none h-[950px]">
              <Link className="mb-10 inline-block" href="/">
                <Image className="hidden dark:block" src={'/images/logo/logo.svg'} alt="Logo" width={176} height={32} />
                <Image className="dark:hidden" src={'/images/logo/logo-dark.svg'} alt="Logo" width={176} height={32} />
              </Link>
              <p className="mb-3 text-xl font-medium text-dark dark:text-white">Get Started</p>

              <h1 className="mb-4 text-2xl font-bold text-dark dark:text-white sm:text-heading-3">Welcome!</h1>

              <p className="w-full max-w-[375px] font-medium text-dark-4 dark:text-dark-6">
                For create your account please fill up the necessary fields below
              </p>

              <div className="mt-10 h-full flex">
                <Image src={'/images/grids/grid-02.svg'} alt="Logo" width={505} height={425} className="mx-auto dark:opacity-30" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
