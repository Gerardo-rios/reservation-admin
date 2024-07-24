'use client';
import React from 'react';
import DashboardTable from '../Tables/dashboard-table';

const Dashboard: React.FC = () => {
  return (
    <>
      <h1 className="text-2xl font-semibold">Courts</h1>

      <div className="flex flex-col gap-10">
        <DashboardTable />
      </div>
    </>
  );
};

export default Dashboard;
