'use client';
import React from 'react';

export default function Verification() {
  return (
    <form>
      <div className="flex items-center gap-4.5">
        <input
          className="h-12.5 w-full rounded-md border-[1.5px] border-stroke bg-transparent px-5 py-1 text-center text-2xl text-dark outline-none transition focus:border-primary active:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
          type="text"
        />
        <input
          className="h-12.5 w-full rounded-md border-[1.5px] border-stroke bg-transparent px-5 py-1 text-center text-2xl text-dark outline-none transition focus:border-primary active:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
          type="text"
        />
        <input
          className="h-12.5 w-full rounded-md border-[1.5px] border-stroke bg-transparent px-5 py-1 text-center text-2xl text-dark outline-none transition focus:border-primary active:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
          type="text"
        />
        <input
          className="h-12.5 w-full rounded-md border-[1.5px] border-stroke bg-transparent px-5 py-1 text-center text-2xl text-dark outline-none transition focus:border-primary active:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
          type="text"
        />
      </div>
      <p className="mb-5 mt-4 text-left font-medium text-dark dark:text-white">
        Did not receive a code?
        <button className="text-primary"> Resend</button>
      </p>
      <button className="flex w-full justify-center rounded-lg bg-primary p-[13px] font-bold text-gray hover:bg-opacity-90">Verify</button>
    </form>
  );
}
