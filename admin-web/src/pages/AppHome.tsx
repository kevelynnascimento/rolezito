
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import BottomNavigation from '../components/app/BottomNavigation';

const AppHome = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="pb-20">
        <Outlet />
      </main>
      <BottomNavigation />
    </div>
  );
};

export default AppHome;
