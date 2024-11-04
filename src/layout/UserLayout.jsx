import React from 'react';
import UserNavbar from '../components/UserNavbar';
import { Outlet } from 'react-router-dom';

const UserLayout = () => {
  return (
    <div>
          <UserNavbar />
          <main className="flex-1 overflow-y-auto">
           <Outlet />
          </main>
    </div>
  );
}

export default UserLayout;
