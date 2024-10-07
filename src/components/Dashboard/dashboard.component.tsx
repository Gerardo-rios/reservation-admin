'use client';
import React, { useEffect, useCallback } from 'react';
import DashboardTable from '../Tables/dashboard-table';
import { AppStore } from '@/redux/store';
import { useSelector } from 'react-redux';
import useFetchAndLoad from '@/hooks/use-fetch-and-load.hook';
import { useDispatch } from 'react-redux';
import { getUser } from '@/services';
import { createUser } from '@/redux/states/user';
import { userAdapter } from '@/adapters';
import Loader from '../common/Loader/loader.component';

const Dashboard: React.FC = () => {
  const { loading, callEndpoint } = useFetchAndLoad();
  const dispatch = useDispatch();
  const accountId = useSelector((state: AppStore) => state.auth.account);

  const fetchData = useCallback(async () => {
    if (accountId) {
      try {
        const getAccountResponse = await callEndpoint(getUser(accountId));
        if (getAccountResponse) {
          dispatch(createUser(userAdapter(getAccountResponse.data)));
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    }
  }, [accountId, callEndpoint, dispatch]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <>
      <h1 className="text-2xl font-semibold">Courts</h1>
      <div className="flex flex-col gap-10">{loading ? <Loader /> : <DashboardTable />}</div>
    </>
  );
};

export default Dashboard;
