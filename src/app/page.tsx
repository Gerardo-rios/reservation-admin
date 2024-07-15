import { Dashboard } from '@/components/Dashboard';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Reservation Fields Admin Page',
  description: 'This is the Home page for the Reservation Fields Admin Page'
};

export default function Home() {
  return <Dashboard />;
}
