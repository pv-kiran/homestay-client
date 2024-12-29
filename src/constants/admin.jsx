import { Home, BedDouble, Grid, Package, UserCircle, Users, Component, TicketPercent } from 'lucide-react';

export const routes = [
  {
    path: '/admin/dashboard',
    title: 'Dashboard',
    icon: <Home className="w-5 h-5" />
  },
  {
    path: '/admin/categories',
    title: 'Categories',
    icon: <Grid className="w-5 h-5" />
  },
  {
    path: '/admin/amenities',
    title: 'Amenities',
    icon: <Component className="w-5 h-5" />
  },
  {
    path: '/admin/users',
    title: 'Users',
    icon: <Users className="w-5 h-5" />
  },
  {
    path: '/admin/rooms',
    title: 'Homestays',
    icon: <BedDouble className="w-5 h-5" />
  },
  {
    path: '/admin/add-ons',
    title: 'Add-ons',
    icon: <Package className="w-5 h-5" />
  },
  {
    path: '/admin/coupons',
    title: 'Coupons',
    icon: <TicketPercent className="w-5 h-5" />
  },
  {
    path: '/admin/account',
    title: 'Account',
    icon: <UserCircle className="w-5 h-5" />
  },
  {
    path: '/admin/bookings',
    title: 'Bookings',
    icon: <UserCircle className="w-5 h-5" />
  }
];