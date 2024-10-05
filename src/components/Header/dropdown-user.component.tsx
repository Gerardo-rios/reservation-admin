import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ClickOutside from './click-outside.component';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { createLogoutAuth } from '@/redux/states/auth';
import { resetUser, createUser } from '@/redux/states/user';
import { getUser } from '@/services';
import { useSnackbar } from 'notistack';
import { userAdapter } from '@/adapters';
import { getLocalStorageItem } from '@/utilities';
import useFetchAndLoad from '@/hooks/use-fetch-and-load.hook';

const DropdownUser = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const user = useSelector((state: any) => state.user);
  const router = useRouter();
  const dispatch = useDispatch();
  const { loading, callEndpoint } = useFetchAndLoad();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const account_id = getLocalStorageItem('account');
        if (!account_id) return;
        const response = await callEndpoint(getUser(account_id));
        console.log(response);
        const adaptedUser = userAdapter(response.data);
        dispatch(createUser(adaptedUser));
      } catch (error) {
        console.log(error);
        enqueueSnackbar('Error getting user data', { variant: 'error' });
      }
    };
    fetchUserData();
  }, [callEndpoint, dispatch, enqueueSnackbar]);

  const handleLogout = () => {
    dispatch(createLogoutAuth());
    dispatch(resetUser());
    router.push('/auth/signin');
  };

  return (
    <ClickOutside onClick={() => setDropdownOpen(false)} className="relative">
      <Link onClick={() => setDropdownOpen(!dropdownOpen)} className="flex items-center gap-4" href="#">
        <span className="h-12 w-12 rounded-full">
          <Image
            width={112}
            height={112}
            src={user.account.photo}
            style={{
              width: 'auto',
              height: 'auto'
            }}
            alt="User"
            className="overflow-hidden rounded-full"
          />
        </span>

        <span className="flex items-center gap-2 font-medium text-dark dark:text-dark-6">
          <span className="hidden lg:block">{user.person.name}</span>

          <svg
            className={`fill-current duration-200 ease-in ${dropdownOpen && 'rotate-180'}`}
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M3.6921 7.09327C3.91674 6.83119 4.3113 6.80084 4.57338 7.02548L9.99997 11.6768L15.4266 7.02548C15.6886 6.80084 16.0832 6.83119 16.3078 7.09327C16.5325 7.35535 16.5021 7.74991 16.24 7.97455L10.4067 12.9745C10.1727 13.1752 9.82728 13.1752 9.59322 12.9745L3.75989 7.97455C3.49781 7.74991 3.46746 7.35535 3.6921 7.09327Z"
              fill=""
            />
          </svg>
        </span>
      </Link>

      {dropdownOpen && (
        <div
          className={`absolute right-0 mt-7.5 flex w-[280px] flex-col rounded-lg border-[0.5px] border-stroke bg-white shadow-default dark:border-dark-3 dark:bg-gray-dark`}
        >
          <div className="flex items-center gap-2.5 px-5 pb-5.5 pt-3.5">
            <span className="block">
              <span className="block font-medium text-dark dark:text-white">{user.account.username}</span>
              <span className="block font-medium text-dark-5 dark:text-dark-6">{user.account.email}</span>
            </span>
          </div>

          <div className="p-2.5">
            <button
              className="flex w-full items-center gap-2.5 rounded-[7px] p-2.5 text-sm font-medium text-dark-4 duration-300 ease-in-out hover:bg-gray-2 hover:text-dark dark:text-dark-6 dark:hover:bg-dark-3 dark:hover:text-white lg:text-base"
              onClick={handleLogout}
            >
              <svg className="fill-current" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_1815_13085)">
                  <path
                    d="M11.25 8.4375C11.5607 8.4375 11.8125 8.68934 11.8125 9C11.8125 9.31066 11.5607 9.5625 11.25 9.5625H3.02058L4.49107 10.8229C4.72694 11.0251 4.75426 11.3802 4.55208 11.6161C4.34991 11.8519 3.9948 11.8793 3.75893 11.6771L1.13393 9.42708C1.00925 9.32022 0.9375 9.16421 0.9375 9C0.9375 8.83579 1.00925 8.67978 1.13393 8.57292L3.75893 6.32292C3.9948 6.12074 4.34991 6.14806 4.55208 6.38393C4.75426 6.6198 4.72694 6.97491 4.49107 7.17708L3.02058 8.4375H11.25Z"
                    fill=""
                  />
                </g>
                <defs>
                  <clipPath id="clip0_1815_13085">
                    <rect width="18" height="18" rx="5" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              Logout
            </button>
          </div>
        </div>
      )}
    </ClickOutside>
  );
};

export default DropdownUser;
