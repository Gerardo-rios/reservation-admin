import React from 'react';
import VerificationComponent from '@/components/Auth/Verification/verification.component';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Verification Page',
  description: 'This is the Verification Page'
};

const Verification: React.FC = () => {
  return (
    <>
      <div className="overflow-hidden bg-gray-4 px-4 dark:bg-dark-2 sm:px-8">
        <div className="flex h-screen flex-col items-center justify-center overflow-hidden">
          <VerificationComponent />
        </div>
      </div>
    </>
  );
};

export default Verification;
