'use client';
import useFetchAndLoad from '@/hooks/use-fetch-and-load.hook';
import { register } from '@/services';
import { useSnackbar } from 'notistack';
import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function SignUpWithPassword() {
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const [showPasswordInstructions, setShowPasswordInstructions] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState<any>({
    email: '',
    password: '',
    user: '',
    name: '',
    phone: '',
    photo: '',
    address: '',
    role_name: 'admin',
    reEnterPassword: ''
  });

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const { loading, callEndpoint } = useFetchAndLoad();

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value
    });
  };

  const validateForm = (): boolean => {
    for (const key in data) {
      if (!data[key]) {
        enqueueSnackbar('All fields are required', { variant: 'error' });
        return false;
      }
    }
    if (data.password !== data.reEnterPassword) {
      enqueueSnackbar('Password does not match', { variant: 'error' });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    try {
      const registerResponse = await callEndpoint(
        register(data.name, data.phone, data.address, data.role_name, data.email, data.password, data.user, data.photo)
      );
      if (registerResponse) {
        enqueueSnackbar('Register success', { variant: 'success' });
        setTimeout(() => {
          router.push('/auth/signin');
        }, 500);
      }
    } catch (error: any) {
      enqueueSnackbar('Registration failed. Please try again later', { variant: 'error' });
    }
  };

  const handlePhotoChange = (photoUrl: string) => {
    setData({
      ...data,
      photo: photoUrl
    });
  };

  const handleRetypePassword = (e: { target: { value: any } }) => {
    const { value } = e.target;
    if (value !== data.password) {
      enqueueSnackbar('Password does not match', { variant: 'error' });
    }
  };

  const avatarOptions = [
    '/images/avatars/actress.png',
    '/images/avatars/hacker.png',
    '/images/avatars/lion.png',
    '/images/avatars/man.png',
    '/images/avatars/nina.png',
    '/images/avatars/user.png',
    '/images/avatars/bear.png',
    '/images/avatars/cat.png',
    '/images/avatars/panda.png',
    '/images/avatars/rabbit.png'
  ];

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4 flex items-center justify-between">
        <div className="w-1/2 pr-2">
          <label htmlFor="name" className="mb-2.5 block font-medium text-dark dark:text-white">
            Name
          </label>
          <div className="relative">
            <input
              placeholder="Enter your full name"
              className="w-full rounded-lg border border-stroke bg-transparent py-[15px] pl-6 pr-11 font-medium text-dark outline-none focus:border-primary focus-visible:shadow-none dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
              type="text"
              name="name"
              value={data.name}
              onChange={handleChange}
            />
            <span className="absolute right-4.5 top-1/2 -translate-y-1/2">
              <svg className="fill-current" width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M10.9975 1.146C8.59278 1.146 6.64335 3.09542 6.64335 5.50016C6.64335 7.9049 8.59278 9.85433 10.9975 9.85433C13.4023 9.85433 15.3517 7.9049 15.3517 5.50016C15.3517 3.09542 13.4023 1.146 10.9975 1.146ZM8.01835 5.50016C8.01835 3.85481 9.35217 2.521 10.9975 2.521C12.6429 2.521 13.9767 3.85481 13.9767 5.50016C13.9767 7.14551 12.6429 8.47933 10.9975 8.47933C9.35217 8.47933 8.01835 7.14551 8.01835 5.50016Z"
                  fill=""
                ></path>
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M10.9975 11.2293C8.87676 11.2293 6.92287 11.7114 5.47501 12.5258C4.04871 13.3281 2.97669 14.5441 2.97669 16.0418L2.97662 16.1353C2.97559 17.2003 2.97429 18.537 4.14673 19.4917C4.72374 19.9616 5.53096 20.2958 6.62154 20.5165C7.71518 20.7379 9.14056 20.8543 10.9975 20.8543C12.8545 20.8543 14.2799 20.7379 15.3735 20.5165C16.4641 20.2958 17.2713 19.9616 17.8483 19.4917C19.0207 18.537 19.0194 17.2003 19.0184 16.1353L19.0184 16.0418C19.0184 14.5441 17.9463 13.3281 16.52 12.5258C15.0722 11.7114 13.1183 11.2293 10.9975 11.2293ZM4.35169 16.0418C4.35169 15.2614 4.92128 14.4149 6.14912 13.7242C7.35542 13.0457 9.06819 12.6043 10.9975 12.6043C12.9269 12.6043 14.6396 13.0457 15.8459 13.7242C17.0738 14.4149 17.6434 15.2614 17.6434 16.0418C17.6434 17.2406 17.6064 17.9155 16.9801 18.4255C16.6404 18.7021 16.0726 18.9721 15.1007 19.1688C14.1318 19.3649 12.8072 19.4793 10.9975 19.4793C9.18781 19.4793 7.8632 19.3649 6.89433 19.1688C5.92242 18.9721 5.35463 18.7021 5.01498 18.4255C4.38864 17.9155 4.35169 17.2406 4.35169 16.0418Z"
                  fill=""
                ></path>
              </svg>
            </span>
          </div>
        </div>
        <div className="w-1/2 pl-2">
          <label htmlFor="username" className="mb-2.5 block font-medium text-dark dark:text-white">
            Username
          </label>
          <div className="relative">
            <input
              placeholder="Enter your username"
              className="w-full rounded-lg border border-stroke bg-transparent py-[15px] pl-6 pr-11 font-medium text-dark outline-none focus:border-primary focus-visible:shadow-none dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
              type="text"
              name="user"
              value={data.user}
              onChange={handleChange}
            />
            <span className="absolute right-4.5 top-1/2 -translate-y-1/2">
              <svg className="fill-current" width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M10.9975 1.146C8.59278 1.146 6.64335 3.09542 6.64335 5.50016C6.64335 7.9049 8.59278 9.85433 10.9975 9.85433C13.4023 9.85433 15.3517 7.9049 15.3517 5.50016C15.3517 3.09542 13.4023 1.146 10.9975 1.146ZM8.01835 5.50016C8.01835 3.85481 9.35217 2.521 10.9975 2.521C12.6429 2.521 13.9767 3.85481 13.9767 5.50016C13.9767 7.14551 12.6429 8.47933 10.9975 8.47933C9.35217 8.47933 8.01835 7.14551 8.01835 5.50016Z"
                  fill=""
                ></path>
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M10.9975 11.2293C8.87676 11.2293 6.92287 11.7114 5.47501 12.5258C4.04871 13.3281 2.97669 14.5441 2.97669 16.0418L2.97662 16.1353C2.97559 17.2003 2.97429 18.537 4.14673 19.4917C4.72374 19.9616 5.53096 20.2958 6.62154 20.5165C7.71518 20.7379 9.14056 20.8543 10.9975 20.8543C12.8545 20.8543 14.2799 20.7379 15.3735 20.5165C16.4641 20.2958 17.2713 19.9616 17.8483 19.4917C19.0207 18.537 19.0194 17.2003 19.0184 16.1353L19.0184 16.0418C19.0184 14.5441 17.9463 13.3281 16.52 12.5258C15.0722 11.7114 13.1183 11.2293 10.9975 11.2293ZM4.35169 16.0418C4.35169 15.2614 4.92128 14.4149 6.14912 13.7242C7.35542 13.0457 9.06819 12.6043 10.9975 12.6043C12.9269 12.6043 14.6396 13.0457 15.8459 13.7242C17.0738 14.4149 17.6434 15.2614 17.6434 16.0418C17.6434 17.2406 17.6064 17.9155 16.9801 18.4255C16.6404 18.7021 16.0726 18.9721 15.1007 19.1688C14.1318 19.3649 12.8072 19.4793 10.9975 19.4793C9.18781 19.4793 7.8632 19.3649 6.89433 19.1688C5.92242 18.9721 5.35463 18.7021 5.01498 18.4255C4.38864 17.9155 4.35169 17.2406 4.35169 16.0418Z"
                  fill=""
                ></path>
              </svg>
            </span>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <label htmlFor="email" className="mb-2.5 block font-medium text-dark dark:text-white">
          Email
        </label>
        <div className="relative">
          <input
            type="email"
            placeholder="Enter your email"
            name="email"
            className="w-full rounded-lg border border-stroke bg-transparent py-[15px] pl-6 pr-11 font-medium text-dark outline-none focus:border-primary focus-visible:shadow-none dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
            value={data.email}
            onChange={handleChange}
          />
          <span className="absolute right-4.5 top-1/2 -translate-y-1/2">
            <svg className="fill-current" width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M9.11756 2.979H12.8877C14.5723 2.97899 15.9066 2.97898 16.9509 3.11938C18.0256 3.26387 18.8955 3.56831 19.5815 4.25431C20.2675 4.94031 20.5719 5.81018 20.7164 6.8849C20.8568 7.92918 20.8568 9.26351 20.8568 10.9481V11.0515C20.8568 12.7362 20.8568 14.0705 20.7164 15.1148C20.5719 16.1895 20.2675 17.0594 19.5815 17.7454C18.8955 18.4314 18.0256 18.7358 16.9509 18.8803C15.9066 19.0207 14.5723 19.0207 12.8876 19.0207H9.11756C7.43295 19.0207 6.09861 19.0207 5.05433 18.8803C3.97961 18.7358 3.10974 18.4314 2.42374 17.7454C1.73774 17.0594 1.4333 16.1895 1.28881 15.1148C1.14841 14.0705 1.14842 12.7362 1.14844 11.0516V10.9481C1.14842 9.26351 1.14841 7.92918 1.28881 6.8849C1.4333 5.81018 1.73774 4.94031 2.42374 4.25431C3.10974 3.56831 3.97961 3.26387 5.05433 3.11938C6.09861 2.97898 7.43294 2.97899 9.11756 2.979ZM5.23755 4.48212C4.3153 4.60611 3.78396 4.83864 3.39602 5.22658C3.00807 5.61452 2.77554 6.14587 2.65155 7.06812C2.5249 8.01014 2.52344 9.25192 2.52344 10.9998C2.52344 12.7478 2.5249 13.9895 2.65155 14.9316C2.77554 15.8538 3.00807 16.3852 3.39602 16.7731C3.78396 17.161 4.3153 17.3936 5.23755 17.5176C6.17957 17.6442 7.42135 17.6457 9.16927 17.6457H12.8359C14.5839 17.6457 15.8256 17.6442 16.7677 17.5176C17.6899 17.3936 18.2213 17.161 18.6092 16.7731C18.9971 16.3852 19.2297 15.8538 19.3537 14.9316C19.4803 13.9895 19.4818 12.7478 19.4818 10.9998C19.4818 9.25192 19.4803 8.01014 19.3537 7.06812C19.2297 6.14587 18.9971 5.61452 18.6092 5.22658C18.2213 4.83864 17.6899 4.60611 16.7677 4.48212C15.8256 4.35546 14.5839 4.354 12.8359 4.354H9.16927C7.42135 4.354 6.17958 4.35546 5.23755 4.48212ZM4.97445 6.89304C5.21753 6.60135 5.65104 6.56194 5.94273 6.80502L7.92172 8.45418C8.77693 9.16685 9.37069 9.66005 9.87197 9.98246C10.3572 10.2945 10.6863 10.3993 11.0026 10.3993C11.3189 10.3993 11.648 10.2945 12.1332 9.98246C12.6345 9.66005 13.2283 9.16685 14.0835 8.45417L16.0625 6.80502C16.3542 6.56194 16.7877 6.60135 17.0308 6.89304C17.2738 7.18473 17.2344 7.61825 16.9427 7.86132L14.9293 9.5392C14.1168 10.2163 13.4582 10.7651 12.877 11.1389C12.2716 11.5283 11.6819 11.7743 11.0026 11.7743C10.3233 11.7743 9.73364 11.5283 9.12818 11.1389C8.54696 10.7651 7.88843 10.2163 7.07594 9.5392L5.06248 7.86132C4.77079 7.61825 4.73138 7.18473 4.97445 6.89304Z"
                fill=""
              />
            </svg>
          </span>
        </div>
      </div>

      <div className="mb-4">
        <label htmlFor="password" className="mb-2.5 block font-medium text-dark dark:text-white">
          Password
        </label>
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder="Enter your password"
            autoComplete="password"
            className="w-full rounded-lg border border-stroke bg-transparent py-[15px] pl-6 pr-11 font-medium text-dark outline-none focus:border-primary focus-visible:shadow-none dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
            value={data.password}
            onChange={handleChange}
            onMouseEnter={() => setShowPasswordInstructions(true)}
            onMouseLeave={() => setShowPasswordInstructions(false)}
          />
          <span className="absolute right-4.5 top-1/2 -translate-y-1/2" onClick={toggleShowPassword} data-testid="eye-icon-password">
            {showPassword && (
              <svg className="fill-current" width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                  <path
                    d="M4.4955 7.44088C3.54724 8.11787 2.77843 8.84176 2.1893 9.47978C0.857392 10.9222 0.857393 13.0778 2.1893 14.5202C3.9167 16.391 7.18879 19 12 19C13.2958 19 14.4799 18.8108 15.5523 18.4977L13.8895 16.8349C13.2936 16.9409 12.6638 17 12 17C7.9669 17 5.18832 14.82 3.65868 13.1634C3.03426 12.4872 3.03426 11.5128 3.65868 10.8366C4.23754 10.2097 4.99526 9.50784 5.93214 8.87753L4.4955 7.44088Z"
                    fill="#696969"
                  ></path>
                  <path
                    d="M8.53299 11.4784C8.50756 11.6486 8.49439 11.8227 8.49439 12C8.49439 13.933 10.0614 15.5 11.9944 15.5C12.1716 15.5 12.3458 15.4868 12.516 15.4614L8.53299 11.4784Z"
                    fill="#696969"
                  ></path>
                  <path
                    d="M15.4661 12.4471L11.5473 8.52829C11.6937 8.50962 11.8429 8.5 11.9944 8.5C13.9274 8.5 15.4944 10.067 15.4944 12C15.4944 12.1515 15.4848 12.3007 15.4661 12.4471Z"
                    fill="#696969"
                  ></path>
                  <path
                    d="M18.1118 15.0928C19.0284 14.4702 19.7715 13.7805 20.3413 13.1634C20.9657 12.4872 20.9657 11.5128 20.3413 10.8366C18.8117 9.18002 16.0331 7 12 7C11.3594 7 10.7505 7.05499 10.1732 7.15415L8.50483 5.48582C9.5621 5.1826 10.7272 5 12 5C16.8112 5 20.0833 7.60905 21.8107 9.47978C23.1426 10.9222 23.1426 13.0778 21.8107 14.5202C21.2305 15.1486 20.476 15.8603 19.5474 16.5284L18.1118 15.0928Z"
                    fill="#696969"
                  ></path>
                  <path
                    d="M2.00789 3.42207C1.61736 3.03155 1.61736 2.39838 2.00789 2.00786C2.39841 1.61733 3.03158 1.61733 3.4221 2.00786L22.0004 20.5862C22.391 20.9767 22.391 21.6099 22.0004 22.0004C21.6099 22.3909 20.9767 22.3909 20.5862 22.0004L2.00789 3.42207Z"
                    fill="#696969"
                  ></path>
                </g>
              </svg>
            )}
            {!showPassword && (
              <svg className="fill-current" width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M11.9944 15.5C13.9274 15.5 15.4944 13.933 15.4944 12C15.4944 10.067 13.9274 8.5 11.9944 8.5C10.0614 8.5 8.49439 10.067 8.49439 12C8.49439 13.933 10.0614 15.5 11.9944 15.5ZM11.9944 13.4944C11.1691 13.4944 10.5 12.8253 10.5 12C10.5 11.1747 11.1691 10.5056 11.9944 10.5056C12.8197 10.5056 13.4888 11.1747 13.4888 12C13.4888 12.8253 12.8197 13.4944 11.9944 13.4944Z"
                    fill="#545454"
                  ></path>
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12 5C7.18879 5 3.9167 7.60905 2.1893 9.47978C0.857392 10.9222 0.857393 13.0778 2.1893 14.5202C3.9167 16.391 7.18879 19 12 19C16.8112 19 20.0833 16.391 21.8107 14.5202C23.1426 13.0778 23.1426 10.9222 21.8107 9.47978C20.0833 7.60905 16.8112 5 12 5ZM3.65868 10.8366C5.18832 9.18002 7.9669 7 12 7C16.0331 7 18.8117 9.18002 20.3413 10.8366C20.9657 11.5128 20.9657 12.4872 20.3413 13.1634C18.8117 14.82 16.0331 17 12 17C7.9669 17 5.18832 14.82 3.65868 13.1634C3.03426 12.4872 3.03426 11.5128 3.65868 10.8366Z"
                    fill="#545454"
                  ></path>
                </g>
              </svg>
            )}
          </span>
        </div>
        {showPasswordInstructions && (
          <div className="tooltip absolute z-10 w-840 bg-white shadow-lg rounded-lg p-4 text-justify">
            <h3 className="text-dark font-medium mb-2">Password Requirements</h3>
            <ul className="list-disc pl-4 text-dark">
              <li>At least 8 characters</li>
              <li>Must contain at least one uppercase letter</li>
              <li>Must contain at least one lowercase letter</li>
              <li>Must contain at least one number</li>
              <li>Must contain at least one special character</li>
            </ul>
          </div>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="reEnterPassword" className="mb-2.5 block font-medium text-dark dark:text-white">
          Re-type Password
        </label>
        <div className="relative">
          <input
            placeholder="Re-enter your password"
            className="w-full rounded-lg border border-stroke bg-transparent py-[15px] pl-6 pr-11 font-medium text-dark outline-none focus:border-primary focus-visible:shadow-none dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
            type={showPassword ? 'text' : 'password'}
            name="reEnterPassword"
            value={data.reEnterPassword}
            onBlur={handleRetypePassword}
            onChange={handleChange}
          />
          <span className="absolute right-4.5 top-1/2 -translate-y-1/2" onClick={toggleShowPassword} data-testid="eye-icon-password-retype">
            {showPassword && (
              <svg className="fill-current" width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                  <path
                    d="M4.4955 7.44088C3.54724 8.11787 2.77843 8.84176 2.1893 9.47978C0.857392 10.9222 0.857393 13.0778 2.1893 14.5202C3.9167 16.391 7.18879 19 12 19C13.2958 19 14.4799 18.8108 15.5523 18.4977L13.8895 16.8349C13.2936 16.9409 12.6638 17 12 17C7.9669 17 5.18832 14.82 3.65868 13.1634C3.03426 12.4872 3.03426 11.5128 3.65868 10.8366C4.23754 10.2097 4.99526 9.50784 5.93214 8.87753L4.4955 7.44088Z"
                    fill="#696969"
                  ></path>
                  <path
                    d="M8.53299 11.4784C8.50756 11.6486 8.49439 11.8227 8.49439 12C8.49439 13.933 10.0614 15.5 11.9944 15.5C12.1716 15.5 12.3458 15.4868 12.516 15.4614L8.53299 11.4784Z"
                    fill="#696969"
                  ></path>
                  <path
                    d="M15.4661 12.4471L11.5473 8.52829C11.6937 8.50962 11.8429 8.5 11.9944 8.5C13.9274 8.5 15.4944 10.067 15.4944 12C15.4944 12.1515 15.4848 12.3007 15.4661 12.4471Z"
                    fill="#696969"
                  ></path>
                  <path
                    d="M18.1118 15.0928C19.0284 14.4702 19.7715 13.7805 20.3413 13.1634C20.9657 12.4872 20.9657 11.5128 20.3413 10.8366C18.8117 9.18002 16.0331 7 12 7C11.3594 7 10.7505 7.05499 10.1732 7.15415L8.50483 5.48582C9.5621 5.1826 10.7272 5 12 5C16.8112 5 20.0833 7.60905 21.8107 9.47978C23.1426 10.9222 23.1426 13.0778 21.8107 14.5202C21.2305 15.1486 20.476 15.8603 19.5474 16.5284L18.1118 15.0928Z"
                    fill="#696969"
                  ></path>
                  <path
                    d="M2.00789 3.42207C1.61736 3.03155 1.61736 2.39838 2.00789 2.00786C2.39841 1.61733 3.03158 1.61733 3.4221 2.00786L22.0004 20.5862C22.391 20.9767 22.391 21.6099 22.0004 22.0004C21.6099 22.3909 20.9767 22.3909 20.5862 22.0004L2.00789 3.42207Z"
                    fill="#696969"
                  ></path>
                </g>
              </svg>
            )}
            {!showPassword && (
              <svg className="fill-current" width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M11.9944 15.5C13.9274 15.5 15.4944 13.933 15.4944 12C15.4944 10.067 13.9274 8.5 11.9944 8.5C10.0614 8.5 8.49439 10.067 8.49439 12C8.49439 13.933 10.0614 15.5 11.9944 15.5ZM11.9944 13.4944C11.1691 13.4944 10.5 12.8253 10.5 12C10.5 11.1747 11.1691 10.5056 11.9944 10.5056C12.8197 10.5056 13.4888 11.1747 13.4888 12C13.4888 12.8253 12.8197 13.4944 11.9944 13.4944Z"
                    fill="#545454"
                  ></path>
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12 5C7.18879 5 3.9167 7.60905 2.1893 9.47978C0.857392 10.9222 0.857393 13.0778 2.1893 14.5202C3.9167 16.391 7.18879 19 12 19C16.8112 19 20.0833 16.391 21.8107 14.5202C23.1426 13.0778 23.1426 10.9222 21.8107 9.47978C20.0833 7.60905 16.8112 5 12 5ZM3.65868 10.8366C5.18832 9.18002 7.9669 7 12 7C16.0331 7 18.8117 9.18002 20.3413 10.8366C20.9657 11.5128 20.9657 12.4872 20.3413 13.1634C18.8117 14.82 16.0331 17 12 17C7.9669 17 5.18832 14.82 3.65868 13.1634C3.03426 12.4872 3.03426 11.5128 3.65868 10.8366Z"
                    fill="#545454"
                  ></path>
                </g>
              </svg>
            )}
          </span>
        </div>
      </div>
      <div className="mb-4">
        <label htmlFor="phone" className="mb-2.5 block font-medium text-dark dark:text-white">
          Phone
        </label>
        <div className="relative">
          <input
            placeholder="Enter your phone number"
            className="w-full rounded-lg border border-stroke bg-transparent py-[15px] pl-6 pr-11 font-medium text-dark outline-none focus:border-primary focus-visible:shadow-none dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
            type="text"
            name="phone"
            value={data.phone}
            onChange={handleChange}
            onKeyDown={(event) => {
              if (event.key === 'Backspace' || event.key === 'Delete') {
                return;
              }
              if (!/[0-9]/.test(event.key)) {
                event.preventDefault();
              }
            }}
          />
          <span className="absolute right-4.5 top-1/2 -translate-y-1/2">
            <svg className="fill-current" width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
              <g id="SVGRepo_iconCarrier">
                <path
                  d="M16.1007 13.359L15.5719 12.8272H15.5719L16.1007 13.359ZM16.5562 12.9062L17.085 13.438H17.085L16.5562 12.9062ZM18.9728 12.5894L18.6146 13.2483L18.9728 12.5894ZM20.8833 13.628L20.5251 14.2869L20.8833 13.628ZM21.4217 16.883L21.9505 17.4148L21.4217 16.883ZM20.0011 18.2954L19.4723 17.7636L20.0011 18.2954ZM18.6763 18.9651L18.7459 19.7119H18.7459L18.6763 18.9651ZM8.81536 14.7266L9.34418 14.1947L8.81536 14.7266ZM4.00289 5.74561L3.2541 5.78816L3.2541 5.78816L4.00289 5.74561ZM10.4775 7.19738L11.0063 7.72922H11.0063L10.4775 7.19738ZM10.6342 4.54348L11.2346 4.09401L10.6342 4.54348ZM9.37326 2.85908L8.77286 3.30855V3.30855L9.37326 2.85908ZM6.26145 2.57483L6.79027 3.10667H6.79027L6.26145 2.57483ZM4.69185 4.13552L4.16303 3.60368H4.16303L4.69185 4.13552ZM12.0631 11.4972L12.5919 10.9654L12.0631 11.4972ZM16.6295 13.8909L17.085 13.438L16.0273 12.3743L15.5719 12.8272L16.6295 13.8909ZM18.6146 13.2483L20.5251 14.2869L21.2415 12.9691L19.331 11.9305L18.6146 13.2483ZM20.8929 16.3511L19.4723 17.7636L20.5299 18.8273L21.9505 17.4148L20.8929 16.3511ZM18.6067 18.2184C17.1568 18.3535 13.4056 18.2331 9.34418 14.1947L8.28654 15.2584C12.7186 19.6653 16.9369 19.8805 18.7459 19.7119L18.6067 18.2184ZM9.34418 14.1947C5.4728 10.3453 4.83151 7.10765 4.75168 5.70305L3.2541 5.78816C3.35456 7.55599 4.14863 11.144 8.28654 15.2584L9.34418 14.1947ZM10.7195 8.01441L11.0063 7.72922L9.9487 6.66555L9.66189 6.95073L10.7195 8.01441ZM11.2346 4.09401L9.97365 2.40961L8.77286 3.30855L10.0338 4.99296L11.2346 4.09401ZM5.73263 2.04299L4.16303 3.60368L5.22067 4.66736L6.79027 3.10667L5.73263 2.04299ZM10.1907 7.48257C9.66189 6.95073 9.66117 6.95144 9.66045 6.95216C9.66021 6.9524 9.65949 6.95313 9.659 6.95362C9.65802 6.95461 9.65702 6.95561 9.65601 6.95664C9.65398 6.95871 9.65188 6.96086 9.64972 6.9631C9.64539 6.96759 9.64081 6.97245 9.63599 6.97769C9.62634 6.98816 9.61575 7.00014 9.60441 7.01367C9.58174 7.04072 9.55605 7.07403 9.52905 7.11388C9.47492 7.19377 9.41594 7.2994 9.36589 7.43224C9.26376 7.70329 9.20901 8.0606 9.27765 8.50305C9.41189 9.36833 10.0078 10.5113 11.5343 12.0291L12.5919 10.9654C11.1634 9.54499 10.8231 8.68059 10.7599 8.27309C10.7298 8.07916 10.761 7.98371 10.7696 7.96111C10.7748 7.94713 10.7773 7.9457 10.7709 7.95525C10.7677 7.95992 10.7624 7.96723 10.7541 7.97708C10.75 7.98201 10.7451 7.98759 10.7394 7.99381C10.7365 7.99692 10.7335 8.00019 10.7301 8.00362C10.7285 8.00534 10.7268 8.00709 10.725 8.00889C10.7241 8.00979 10.7232 8.0107 10.7223 8.01162C10.7219 8.01208 10.7212 8.01278 10.7209 8.01301C10.7202 8.01371 10.7195 8.01441 10.1907 7.48257ZM11.5343 12.0291C13.0613 13.5474 14.2096 14.1383 15.0763 14.2713C15.5192 14.3392 15.8763 14.285 16.1472 14.1841C16.28 14.1346 16.3858 14.0763 16.4658 14.0227C16.5058 13.9959 16.5392 13.9704 16.5663 13.9479C16.5799 13.9367 16.5919 13.9262 16.6024 13.9166C16.6077 13.9118 16.6126 13.9073 16.6171 13.903C16.6194 13.9008 16.6215 13.8987 16.6236 13.8967C16.6246 13.8957 16.6256 13.8947 16.6266 13.8937C16.6271 13.8932 16.6279 13.8925 16.6281 13.8923C16.6288 13.8916 16.6295 13.8909 16.1007 13.359C15.5719 12.8272 15.5726 12.8265 15.5733 12.8258C15.5735 12.8256 15.5742 12.8249 15.5747 12.8244C15.5756 12.8235 15.5765 12.8226 15.5774 12.8217C15.5793 12.82 15.581 12.8183 15.5827 12.8166C15.5862 12.8133 15.5895 12.8103 15.5926 12.8074C15.5988 12.8018 15.6044 12.7969 15.6094 12.7929C15.6192 12.7847 15.6265 12.7795 15.631 12.7764C15.6403 12.7702 15.6384 12.773 15.6236 12.7785C15.5991 12.7876 15.501 12.8189 15.3038 12.7886C14.8905 12.7253 14.02 12.3853 12.5919 10.9654L11.5343 12.0291ZM9.97365 2.40961C8.95434 1.04802 6.94996 0.83257 5.73263 2.04299L6.79027 3.10667C7.32195 2.578 8.26623 2.63181 8.77286 3.30855L9.97365 2.40961ZM4.75168 5.70305C4.73201 5.35694 4.89075 4.9954 5.22067 4.66736L4.16303 3.60368C3.62571 4.13795 3.20329 4.89425 3.2541 5.78816L4.75168 5.70305ZM19.4723 17.7636C19.1975 18.0369 18.9029 18.1908 18.6067 18.2184L18.7459 19.7119C19.4805 19.6434 20.0824 19.2723 20.5299 18.8273L19.4723 17.7636ZM11.0063 7.72922C11.9908 6.7503 12.064 5.2019 11.2346 4.09401L10.0338 4.99295C10.4373 5.53193 10.3773 6.23938 9.9487 6.66555L11.0063 7.72922ZM20.5251 14.2869C21.3429 14.7315 21.4703 15.7769 20.8929 16.3511L21.9505 17.4148C23.2908 16.0821 22.8775 13.8584 21.2415 12.9691L20.5251 14.2869ZM17.085 13.438C17.469 13.0562 18.0871 12.9616 18.6146 13.2483L19.331 11.9305C18.2474 11.3414 16.9026 11.5041 16.0273 12.3743L17.085 13.438Z"
                  fill="#525252"
                ></path>
              </g>
            </svg>
          </span>
        </div>
      </div>

      <div className="mb-4">
        <label htmlFor="address" className="mb-2.5 block font-medium text-dark dark:text-white">
          Address
        </label>
        <div className="relative">
          <input
            placeholder="Enter your address"
            className="w-full rounded-lg border border-stroke bg-transparent py-[15px] pl-6 pr-11 font-medium text-dark outline-none focus:border-primary focus-visible:shadow-none dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
            type="text"
            name="address"
            value={data.address}
            onChange={handleChange}
          />
          <span className="absolute right-4.5 top-1/2 -translate-y-1/2">
            <svg
              className="fill-current"
              width="22"
              height="22"
              viewBox="0 0 1024 1024"
              fill="#000000"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
              <g id="SVGRepo_iconCarrier">
                <path
                  d="M512 1012.8c-253.6 0-511.2-54.4-511.2-158.4 0-92.8 198.4-131.2 283.2-143.2h3.2c12 0 22.4 8.8 24 20.8 0.8 6.4-0.8 12.8-4.8 17.6-4 4.8-9.6 8.8-16 9.6-176.8 25.6-242.4 72-242.4 96 0 44.8 180.8 110.4 463.2 110.4s463.2-65.6 463.2-110.4c0-24-66.4-70.4-244.8-96-6.4-0.8-12-4-16-9.6-4-4.8-5.6-11.2-4.8-17.6 1.6-12 12-20.8 24-20.8h3.2c85.6 12 285.6 50.4 285.6 143.2 0.8 103.2-256 158.4-509.6 158.4z m-16.8-169.6c-12-11.2-288.8-272.8-288.8-529.6 0-168 136.8-304.8 304.8-304.8S816 145.6 816 313.6c0 249.6-276.8 517.6-288.8 528.8l-16 16-16-15.2zM512 56.8c-141.6 0-256.8 115.2-256.8 256.8 0 200.8 196 416 256.8 477.6 61.6-63.2 257.6-282.4 257.6-477.6C768.8 172.8 653.6 56.8 512 56.8z m0 392.8c-80 0-144.8-64.8-144.8-144.8S432 160 512 160c80 0 144.8 64.8 144.8 144.8 0 80-64.8 144.8-144.8 144.8zM512 208c-53.6 0-96.8 43.2-96.8 96.8S458.4 401.6 512 401.6c53.6 0 96.8-43.2 96.8-96.8S564.8 208 512 208z"
                  fill=""
                ></path>
              </g>
            </svg>
          </span>
        </div>
      </div>

      <div className="mb-4" data-testid="avatar-input">
        <label htmlFor="photo" className="mb-2.5 block font-medium text-dark dark:text-white">
          Avatar
        </label>
        <div className="flex flex-wrap gap-4">
          {avatarOptions.map((avatarUrl: string, index: number) => (
            <div
              key={index}
              className={`cursor-pointer rounded-lg border-2 p-2 ${avatarUrl === data.photo ? 'border-primary' : 'border-transparent'}`}
              onClick={() => handlePhotoChange(avatarUrl)}
            >
              <Image
                width={50}
                height={50}
                src={avatarUrl}
                style={{
                  width: 'auto',
                  height: 'auto'
                }}
                alt={`Avatar ${index + 1}`}
                className="h-12 w-12 rounded-lg"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="mb-4.5">
        <button
          type="submit"
          className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-primary p-4 font-medium text-white transition hover:bg-opacity-90"
          disabled={loading}
        >
          {loading ? 'Creating...' : 'Create Account'}
        </button>
      </div>
    </form>
  );
}
