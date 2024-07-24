'use client';
import React from 'react';
import TableThree from '../Tables/table-three';

const Dashboard: React.FC = () => {
  return (
    <>
      <h1 className="text-2xl font-semibold">Courts</h1>

      <div className="flex flex-col gap-10">
        <TableThree />
      </div>
    </>
  );
};

export default Dashboard;
